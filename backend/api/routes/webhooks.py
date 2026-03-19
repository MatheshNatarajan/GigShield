from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from datetime import datetime

from models.schemas import DisruptionTrigger
from models.db import Disruption, Policy, Claim, Zone, SessionLocal
from core.logic.fraud_detection import fraud_detector
from core.logic.payout_calc import payout_calculator
from services.mock_delivery import mock_delivery_api

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def process_disruption_payouts(db: Session, disruption: Disruption):
    """
    Background Task: Emulates the real-time trigger payout workflow.
    """
    # 1. Fetch all active policies for the affected Zone
    affected_policies = db.query(Policy).filter(
        Policy.zone_id == disruption.zone_id,
        Policy.active_status == True
    ).all()
    
    # Validation step -> fetch actual zone stats
    zone_activity_drop = mock_delivery_api.get_zone_activity_drop(disruption.zone_id)
    
    for pk in affected_policies:
        u_id = pk.user_id
        
        # 2. Estimate / Fetch User Earnings
        expected = mock_delivery_api.get_historical_expected_earnings(u_id, 3, 'evening')
        actual = mock_delivery_api.get_actual_earnings(u_id, disruption.start_time, disruption.end_time)
        is_active = mock_delivery_api.is_user_active(u_id, disruption.start_time, disruption.end_time)
        
        missed, payout = payout_calculator.calculate_missed_opportunity(expected, actual)
        
        if payout <= 0:
            continue # No loss recorded
            
        # 3. Fraud Detection Applied
        is_fraud, fraud_reason = fraud_detector.evaluate_claim(db, u_id, 0, disruption.zone_id, zone_activity_drop, is_active)
        
        status = "Flagged" if is_fraud else "Approved"
        
        # 4. Create Claim & Trigger Payout (Mock Wallet)
        claim = Claim(
            user_id=u_id,
            policy_id=pk.id,
            disruption_id=disruption.id,
            expected_earnings=expected,
            actual_earnings=actual,
            missed_opportunity=missed,
            payout_amount=payout if not is_fraud else 0.0,
            status=status,
            fraud_reason=fraud_reason if is_fraud else None
        )
        db.add(claim)
    
    db.commit()


@router.post("/disruption")
def trigger_disruption(trigger: DisruptionTrigger, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """
    Webhook exposed for OpenWeather / AQI Alerts.
    e.g. Receive Rainfall > 100mm Alert
    """
    # Create the Disruption Event
    disruption = Disruption(
        zone_id=trigger.zone_id,
        type=trigger.type,
        severity=trigger.severity,
        threshold_value=trigger.threshold_value,
        start_time=datetime.utcnow()
    )
    db.add(disruption)
    db.commit()
    db.refresh(disruption)
    
    # Process Parametric Payments in background
    background_tasks.add_task(process_disruption_payouts, db, disruption)
    
    return {"message": "Disruption recorded, parametric policy evaluation triggered.", "disruption_id": disruption.id}
