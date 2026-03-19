**GigShield AI**
AI-Powered Parametric Insurance for Gig Economy Workers

**Problem Statement**
Gig economy delivery workers (Swiggy, Zomato, Amazon, etc.) lose income due to external disruptions like rain, heat, pollution, and curfews.
There is currently no system that protects their income from such uncontrollable events.
**Target Persona**
Food Delivery Partner (Swiggy/Zomato)
Works daily for income
Paid weekly
Highly dependent on weather and mobility

**System Workflow **
1️⃣ User Registration
 Delivery partner signs up and provides location and work details.
2️⃣ AI Risk Analysis
 The system analyzes location-based factors such as weather patterns, pollution levels, and historical disruptions to generate a risk score.
3️⃣ Weekly Premium Calculation
 Premium is calculated based on:
Weekly income
Risk score
4️⃣ Policy Activation
 The worker purchases a weekly insurance policy.
5️⃣ Real-Time Monitoring
 System continuously tracks:
Weather data
Pollution levels
External disruptions
6️⃣ Parametric Trigger Detection
 When predefined thresholds are crossed (e.g., heavy rain, extreme heat), a trigger event is detected.
7️⃣ Eligibility & Fraud Check
 System verifies:
Worker location
Active policy
Activity status
8️⃣ Automatic Payout
 Compensation is calculated and transferred instantly to the worker.
 
**Weekly Premium Model**
Premium = ~1% of weekly income
Adjusted dynamically using AI risk score

**Parametric Triggers**
Event
Condition
Heavy Rain
Rainfall > 100 mm
Extreme Heat
Temperature > 42°C
Pollution
AQI > 350
Flood
Govt alert
Curfew
Movement restriction

**AI/ML Integration**
1. Risk Profiling
Predicts disruption probability
Calculates premium dynamically
2. Fraud Detection
Detects fake claims
Validates location and activity
3. Income Loss Estimation
Estimates expected vs actual earnings
Ensures fair payout calculation

**System Architecture **
Frontend: React.js + Tailwind CSS
Backend: FastAPI
AI Engine: Risk + Fraud models
Database: PostgreSQL
APIs: Weather, AQI, Maps
Payment: Razorpay / Wallet
Tech Stack

**Core Features**
AI-based risk profiling
Weekly premium model
Parametric trigger system
Automated payout system
Fraud detection
Real-time disruption monitoring

**Advanced Features **
1) Dynamic Premium Pricing
 Premium changes based on real-time risk
2) Delivery Activity-Based Trigger
 Detects income loss using drop in orders
3) Risk Heatmap Dashboard
 Shows high-risk zones visually
4) Disruption Prediction (AI)
 Predicts events before they occur
5) Worker Reputation Score
 Rewards trusted users with lower premiums

**Expected Impact**
Protects gig workers’ income
Enables fast, automatic payouts
Reduces fraud using AI
Builds a scalable insurance solution
