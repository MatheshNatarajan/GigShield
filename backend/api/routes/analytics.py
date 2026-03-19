from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from models.db import Policy, Disruption, Claim, Zone, SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/dashboard")
def get_dashboard_stats(db: Session = Depends(get_db)):
    """
    Returns analytics for the admin dashboard.
    """
    active_policies = db.query(Policy).filter(Policy.active_status == True).count()
    active_disruptions = db.query(Disruption).filter(Disruption.end_time == None).count()
    
    total_claims = db.query(Claim).count()
    flagged_claims = db.query(Claim).filter(Claim.status == "Flagged").count()
    
    total_payout_amount = db.query(func.sum(Claim.payout_amount)).filter(Claim.status == "Approved").scalar() or 0.0
    
    # Zone Risks Heatmap mock data
    zones = db.query(Zone).all()
    heatmap = [{"zone": z.name, "risk_score": z.current_risk_score} for z in zones]
    
    return {
        "metrics": {
            "active_policies": active_policies,
            "active_disruptions": active_disruptions,
            "total_claims_processed": total_claims,
            "fraud_flagged_claims": flagged_claims,
            "total_payout_released": total_payout_amount
        },
        "risk_heatmap": heatmap
    }
