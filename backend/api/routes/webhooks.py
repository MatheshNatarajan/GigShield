from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from models.db import Policy, User, Claim, SessionLocal
from pydantic import BaseModel
import time

router = APIRouter()

class SimulationTrigger(BaseModel):
    user_id: int
    trigger_type: str # Heavy Rain, Extreme Heat, Pollution, Order Drop, Flood Alert
    value: float = 0

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def process_payout(claim_id: int):
    # Simulate waiting for the disruption period to end
    # In a real scenario, this would be 40 mins. For demo, we might want it shorter or just static.
    # We will code it as 40 mins but the status check in UI will show 'Processing'.
    db = SessionLocal()
    try:
        time.sleep(10) # Demo delay: 10 seconds (instead of 40 mins for instant gratification)
        claim = db.query(Claim).filter(Claim.id == claim_id).first()
        if claim:
            claim.status = "Paid"
            db.commit()
    finally:
        db.close()

@router.post("/simulate-trigger")
def simulate_trigger(trigger: SimulationTrigger, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    # 1. Fetch User & Active Policy
    user = db.query(User).filter(User.id == trigger.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    active_policy = db.query(Policy).filter(
        Policy.user_id == user.id,
        Policy.active_status == True
    ).first()
    
    if not active_policy:
        raise HTTPException(status_code=400, detail="No active policy found for this user")

    # 2. Duplicate Check: Only once per user per trigger type in the current policy period
    existing_claim = db.query(Claim).filter(
        Claim.user_id == user.id,
        Claim.policy_id == active_policy.id,
        Claim.trigger_type == trigger.trigger_type
    ).first()
    
    if existing_claim:
        return {"status": "Already Triggered", "message": f"Policy coverage for {trigger.trigger_type} already utilized for this period."}

    # 3. Trigger Logic
    condition_met = False
    if trigger.trigger_type == "Heavy Rain":
        if trigger.value > 100: condition_met = True
    elif trigger.trigger_type == "Extreme Heat":
        if trigger.value > 42: condition_met = True
    elif trigger.trigger_type == "Pollution":
        if trigger.value > 350: condition_met = True
    elif trigger.trigger_type == "Order Drop":
        if trigger.value < 10: condition_met = True
    elif trigger.trigger_type == "Flood Alert":
        if trigger.value == 1: condition_met = True
    
    if not condition_met:
        return {"status": "Condition not met", "message": f"{trigger.trigger_type} condition not met with value {trigger.value}"}

    # 4. Calculate Payout & Schedule
    payout_amount = user.weekly_income * 0.3
    disruption_period = 40 # minutes
    end_time = datetime.utcnow() + timedelta(minutes=disruption_period)

    # 5. Create Claim (Status: Processing)
    new_claim = Claim(
        user_id=user.id,
        policy_id=active_policy.id,
        trigger_type=trigger.trigger_type,
        payout_amount=payout_amount,
        disruption_end_time=end_time,
        status="Processing",
        expected_earnings=user.weekly_income,
        actual_earnings=user.weekly_income * 0.7, 
        missed_opportunity=payout_amount
    )
    db.add(new_claim)
    db.commit()
    db.refresh(new_claim)
    
    # Schedule payout update (Background)
    background_tasks.add_task(process_payout, new_claim.id)

    return {
        "status": "Success",
        "trigger": trigger.trigger_type,
        "payout_amount": payout_amount,
        "message": f"⚠ {trigger.trigger_type} Detected! Claim processing for the next {disruption_period} mins. ₹{payout_amount} Payout Held."
    }

@router.get("/claims/{user_id}")
def get_user_claims(user_id: int, db: Session = Depends(get_db)):
    return db.query(Claim).filter(Claim.user_id == user_id).all()
