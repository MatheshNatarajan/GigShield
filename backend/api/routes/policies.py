from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from models.schemas import PolicyCreate, PolicyResponse
from models.db import Policy, User, Zone, SessionLocal
from core.ai.risk_profiling import risk_model

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/quote/{user_id}/{zone_id}")
def get_premium_quote(user_id: int, zone_id: int, db: Session = Depends(get_db)):
    """ Calls AI to evaluate real-time Risk Score and Premium """
    user = db.query(User).filter(User.id == user_id).first()
    zone = db.query(Zone).filter(Zone.id == zone_id).first()
    
    if not user or not zone:
        raise HTTPException(status_code=404, detail="User or Zone not found")
        
    # In a real scenario, fetch real-time upcoming weather/AQI for the Zone
    # For MVP, simulate a random upcoming weather severity metric (0-100) and AQI (50-450)
    simulated_weather_metric = 45.0
    simulated_aqi = 210
    
    premium = risk_model.calculate_weekly_premium(
        user_id, 
        user.base_location_lat, 
        user.base_location_lon, 
        simulated_weather_metric, 
        simulated_aqi
    )
    
    return {
        "zone_id": zone_id,
        "base_risk": simulated_weather_metric,
        "estimated_weekly_premium": premium
    }

@router.post("/subscribe", response_model=PolicyResponse)
def subscribe_to_policy(policy_data: PolicyCreate, db: Session = Depends(get_db)):
    # Verify User & Zone
    user = db.query(User).filter(User.id == policy_data.user_id).first()
    if not user: raise HTTPException(404, "User not found")
    
    # Register Policy (1 week duration)
    new_policy = Policy(
        user_id=policy_data.user_id,
        zone_id=policy_data.zone_id,
        start_date=datetime.utcnow(),
        end_date=datetime.utcnow() + timedelta(days=7),
        weekly_premium=policy_data.weekly_premium,
        active_status=True
    )
    
    db.add(new_policy)
    db.commit()
    db.refresh(new_policy)
    
    return new_policy
