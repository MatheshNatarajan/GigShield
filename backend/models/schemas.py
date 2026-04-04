from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# USER SCHEMAS
class UserBase(BaseModel):
    name: str
    phone: str
    city: str
    gig_platform: str
    weekly_income: Optional[float] = 7000.0

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    trust_score: float
    income_stability_score: float

    class Config:
        from_attributes = True

# PREMIUM SCHEMAS
class PremiumCalculationRequest(BaseModel):
    city: str
    weekly_income: float

class PremiumCalculationResponse(BaseModel):
    premium: float
    coverage: float
    risk_level: str

# POLICY SCHEMAS
class PolicyBase(BaseModel):
    user_id: int
    weekly_premium: float
    coverage_amount: float

class PolicyCreate(PolicyBase):
    pass

class PolicyResponse(PolicyBase):
    id: int
    start_date: datetime
    end_date: Optional[datetime] = None
    active_status: bool
    
    class Config:
        from_attributes = True

# DISRUPTION SCHEMAS
class DisruptionBase(BaseModel):
    zone_id: int
    type: str # Rain, AQI, Curfew
    severity: float
    threshold_value: float

class DisruptionTrigger(DisruptionBase):
    pass
