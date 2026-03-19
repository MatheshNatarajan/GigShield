from sqlalchemy.orm import Session
from models.db import User, Claim
from typing import Tuple

class FraudDetectionService:
    @staticmethod
    def evaluate_claim(db: Session, user_id: int, claim_id: int, zone_id: int, activity_drop: float, is_active: bool) -> Tuple[bool, str]:
        """
        Runs multi-layer Anti-spoofing System:
        Returns (is_fraudulent: bool, reason: str)
        """
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            return True, "User not found"
            
        # Layer 1: Location & Activity Validation
        if not is_active:
            # User wasn't even logged into the partner app during disruption
            return True, "Layer 1: User inactivity during disruption window."
            
        # Trust Score System check
        if user.trust_score < 50.0:
            return True, f"Layer 3: Trust Score too low ({user.trust_score}). Manual Review required."
            
        # Layer 2: Fraud Ring / Disruption Validation
        # If the zone actually didn't experience an order drop, but the user claims a huge loss
        if activity_drop < 0.10:
            return True, "Layer 2: Zone Activity Drop did not match claimed disruption."
            
        # Passed all checks gracefully
        return False, "Passed"
        
fraud_detector = FraudDetectionService()
