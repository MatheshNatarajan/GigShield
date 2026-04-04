from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from models.schemas import PolicyCreate, PolicyResponse, PremiumCalculationRequest, PremiumCalculationResponse
from models.db import Policy, User, SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_risk_multiplier(city: str):
    city = city.lower()
    if "chennai" in city:
        return 1.5, "High"
    elif "bangalore" in city:
        return 1.2, "Medium"
    elif "coimbatore" in city:
        return 1.0, "Low"
    else:
        return 1.0, "Low"

@router.post("/calculate-premium", response_model=PremiumCalculationResponse)
def calculate_premium(request: PremiumCalculationRequest):
    multiplier, risk_level = get_risk_multiplier(request.city)
    base_premium = request.weekly_income * 0.01
    final_premium = base_premium * multiplier
    coverage = request.weekly_income * 0.3
    
    return {
        "premium": round(final_premium, 2),
        "coverage": round(coverage, 2),
        "risk_level": risk_level
    }

@router.post("/subscribe", response_model=PolicyResponse)
def subscribe_to_policy(policy_data: PolicyCreate, db: Session = Depends(get_db)):
    # Verify User
    user = db.query(User).filter(User.id == policy_data.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Deactivate existing active policies for this user
    db.query(Policy).filter(Policy.user_id == user.id, Policy.active_status == True).update({"active_status": False})

    # Register Policy (1 week duration)
    new_policy = Policy(
        user_id=policy_data.user_id,
        start_date=datetime.utcnow(),
        end_date=datetime.utcnow() + timedelta(days=7),
        weekly_premium=policy_data.weekly_premium,
        coverage_amount=policy_data.coverage_amount,
        active_status=True
    )
    
    db.add(new_policy)
    db.commit()
    db.refresh(new_policy)
    
    return new_policy
