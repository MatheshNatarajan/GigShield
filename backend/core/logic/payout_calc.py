from services.mock_delivery import mock_delivery_api
from typing import Tuple

class PayoutCalculator:
    
    PAYOUT_PERCENTAGE = 0.80 # 80% coverage
    
    @staticmethod
    def calculate_missed_opportunity(expected_earnings: float, actual_earnings: float) -> Tuple[float, float]:
        """
        Calculates missed opportunity and payout amount based on:
        Missed Opportunity = Expected - Actual
        Payout = 80% of Missed Opportunity
        """
        if actual_earnings >= expected_earnings:
            return 0.0, 0.0
            
        missed_opportunity = expected_earnings - actual_earnings
        payout = missed_opportunity * PayoutCalculator.PAYOUT_PERCENTAGE
        
        return round(missed_opportunity, 2), round(payout, 2)
        
payout_calculator = PayoutCalculator()
