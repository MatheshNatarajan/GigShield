import pandas as pd
from sklearn.linear_model import LogisticRegression
import numpy as np
import random

# A mock ML model mimicking actual usage for hackathons.
# Predicts Risk Score (0 to 100) based on location context, weather history, etc.

class RiskProfilerModel:
    def __init__(self):
        # We manually structure weights to make realistic dynamic pricing
        self.base_risk = 20.0
        
    def calculate_weekly_premium(self, user_id: int, lat: float, lon: float, weather_forecast_metric: float, AQI_forecast: int) -> float:
        """
        Calculates a dynamic weekly premium.
        Weather metric scale 0(Sunny) to 100(Severe)
        AQI forecast e.g. 50(Good) to 400+(Severe)
        """
        # Feature Engineering (MVP mocked versions)
        # Random noise per location logic
        location_risk_modifier = random.uniform(0.8, 1.2)
        
        # Risk profiling inference
        weather_risk = weather_forecast_metric * 0.4
        pollution_risk = (AQI_forecast / 500) * 100 * 0.3
        
        total_risk_score = (self.base_risk + weather_risk + pollution_risk) * location_risk_modifier
        
        # Clip score between 10 and 95
        total_risk_score = max(10, min(95, total_risk_score))
        
        # Calculate dynamic weekly price (e.g., base $5/week, scales up to $15/week depending on risk)
        weekly_premium = 5.0 + (total_risk_score / 100) * 10.0
        
        return round(weekly_premium, 2)

risk_model = RiskProfilerModel()
