import random
from typing import Tuple

class MockDeliveryPlatform:
    """ Mock wrapper for Swiggy/Zomato APIs """
    
    @staticmethod
    def is_user_active(user_id: int, time_window_start, time_window_end) -> bool:
        """ Returns true if the user was actively accepting runs during the disruption window. """
        # Normally queries DB 'DeliveryActivity'
        # Emulating a 90% chance user was active to test positive flow mostly
        return random.random() < 0.90

    @staticmethod
    def get_zone_activity_drop(zone_id: int) -> float:
        """ Returns the % drop in orders in the zone. e.g., 0.45 means 45% drop """
        # E.g., during heavy rain, there is a large order drop
        return random.uniform(0.30, 0.80)
        
    @staticmethod
    def get_actual_earnings(user_id: int, time_window_start, time_window_end) -> float:
        """ Fetches exactly how much the gig worker made during the 2-4 hour disruption period """
        # Usually between 0 and 200 INR during a heavy disruption
        return random.uniform(0.0, 200.0)
        
    @staticmethod
    def get_historical_expected_earnings(user_id: int, day_of_week: int, time_of_day: str) -> float:
        """ Fetches how much they NORMALLY make during this window """
        # E.g., a 4-hour evening slot normally nets them 400-800 INR
        return random.uniform(400.0, 800.0)

mock_delivery_api = MockDeliveryPlatform()
