**Project Title**

GigShield AI – Parametric Income Protection for Gig Workers

**Problem Statement:**

India’s gig economy delivery workers (Zomato, Swiggy, Amazon, Zepto, etc.) depend on daily and weekly earnings. External disruptions such as extreme weather, pollution, floods, and sudden curfews significantly affect their ability to work, causing them to lose 20–30% of their income.
Currently, gig workers do not have any financial protection against these uncontrollable external disruptions.
Our solution aims to provide AI-powered parametric insurance that automatically compensates delivery partners when disruptions reduce their ability to work.

**Target Persona:**

Food Delivery Workers (Swiggy / Zomato)

**Characteristics:**
Work outdoors for long hours
Earnings depend on number of deliveries
Highly affected by environmental disruptions

**Example scenario:**
A Swiggy delivery partner in Chennai cannot work due to heavy rain or floods, causing income loss for that day or week.
GigShield AI automatically detects this disruption and provides instant income protection payout.


**Proposed Solution:**
GigShield AI is an AI-enabled parametric insurance platform that protects gig workers from income loss caused by environmental disruptions.

**Key capabilities:**
AI-based risk profiling
Dynamic weekly premium calculation
Parametric triggers for automatic claims
Real-time disruption monitoring
AI-based fraud detection
Instant payouts
Unlike traditional insurance, this system does not require manual claim submission. Payouts are automatically triggered when predefined conditions are met.

**Weekly Premium Model:**

Gig workers typically receive payments weekly, so our insurance model follows a weekly premium system.
Example:
Average weekly income of delivery worker: ₹7000
Insurance premium: 2% of weekly income
Example calculation:
Weekly Income = ₹7000
 Premium = ₹140 per week
Higher-risk areas may have slightly higher premiums based on AI risk analysis.
Parametric Triggers:
Our platform uses a parametric insurance model where disruptions are detected automatically using external data sources such as weather APIs, pollution indices, and government alerts. The system continuously monitors predefined thresholds like rainfall above 100 mm, temperature above 42°C, AQI above 350, flood warnings, or curfew announcements. When any of these parameters are exceeded in a delivery zone, the system automatically identifies a potential disruption that may affect gig workers’ ability to work.
Once a disruption is detected, the platform evaluates the impact on delivery activity in that area. Instead of providing a fixed payout, the system estimates the worker’s missed earning opportunity by comparing their expected earnings under normal conditions (based on historical delivery patterns such as average orders per hour and earnings per order) with their actual earnings during the disruption period.
The difference represents the income lost due to the disruption, and the insurance payout is calculated as a percentage of this missed opportunity. The compensation is then automatically triggered and credited to the worker, eliminating the need for manual claims while ensuring fair and data-driven payouts.
**AI Integration:**

AI is used in two key components:
AI-Based Risk Profiling
Machine learning models analyze:
Location risk
Historical weather data
Pollution levels
Delivery demand trends
The model generates a risk score which determines the weekly premium.
Models to be used:
Random Forest
Logistic Regression
Decision Trees
AI-Based Fraud Detection:
AI monitors suspicious claim patterns such as:
Claims from unaffected locations
Duplicate claims
Inactive delivery accounts
Anomaly detection models help flag fraudulent claims.

**System Workflow:**

1) Delivery Partner Registers on the Platform
The delivery partner creates an account on the platform by providing basic details such as name, contact information, delivery platform (e.g., Swiggy or Zomato), and working location.
The system also captures the worker’s primary delivery zone using GPS or location input. This information helps the platform understand the worker’s operating environment and assess potential disruption risks.

2) AI System Analyzes Location-Based Risk Factors
After registration, the AI risk assessment engine analyzes environmental and geographic factors related to the worker’s location.The system collects data from external APIs such as weather services, pollution monitoring systems, and historical disruption records.
Using this data, the AI model calculates a risk score that represents the probability of income disruption in that area.
Example factors analyzed:
Rainfall frequency
Temperature levels
Pollution (AQI)
Flood-prone zones
Historical disruption events

3) Weekly Premium is Calculated
Based on the calculated risk score, the system determines an appropriate weekly insurance premium for the delivery worker.
Workers in higher-risk areas may have slightly higher premiums, while workers in lower-risk areas receive lower premiums.
The premium is designed to be affordable and aligned with the weekly earnings cycle of gig workers.
Example:
Weekly income: ₹7000
Premium: ₹70 per week

4) Worker Purchases a Weekly Policy
The worker reviews the calculated premium and activates the insurance policy by paying the weekly premium.
Once the payment is successful, the system generates an active policy that provides coverage for disruptions during that week.
The policy details include:
Coverage duration
Maximum payout amount
Eligible disruption events

5) System Continuously Monitors Disruption Data
After the policy becomes active, the platform continuously monitors external data sources such as weather APIs, pollution APIs, and local alerts.
The system checks whether any environmental or social disruptions are occurring in the worker’s delivery zone.
Examples of monitored events:
Heavy rainfall
Heatwaves
Severe air pollution
Flood warnings
Government-imposed movement restrictions

6) Parametric Trigger Event Detected
If any monitored condition crosses predefined thresholds, the system detects a parametric trigger event.
Example triggers:
Rainfall exceeds 100 mm
Temperature exceeds 42°C
AQI exceeds 350
Once the trigger condition is satisfied, the system automatically initiates the claim process without requiring manual claim submission.

7) System Validates Worker Eligibility
Before issuing a payout, the platform performs an automated eligibility check to prevent fraud and ensure fairness.
The system verifies:
Worker location within the affected zone
Active policy status
Worker activity status during the disruption period
AI-based fraud detection models may also analyze suspicious claim patterns.

8) Automatic Payout is Initiated
If the worker passes the eligibility verification, the platform automatically initiates the payout process.
The compensation amount is calculated based on:
Estimated income loss
Coverage limits
Duration of disruption
The payout is credited directly to the worker’s registered payment method or digital wallet.
This automated process ensures fast, transparent, and hassle-free compensation for gig workers affected by external disruptions.

Tech Stack:
Purpose in This Project
React.js + Tailwind CSS
Used to build a responsive and user-friendly frontend interface for delivery partners to register, view policies, and track payouts.
FastAPI (Python)
Acts as the backend API layer to handle user requests, manage policies, process claims, and connect all system components.
Python + Scikit-learn
Used to build AI/ML models for risk prediction, premium calculation, fraud detection, and income loss estimation.
PostgreSQL / MongoDB
Stores all application data such as user details, policies, claims, risk scores, and transaction history.
OpenWeather API
Provides real-time weather data (rainfall, temperature) to detect environmental disruptions.
AQI API
Supplies air quality data to identify pollution-based disruptions affecting delivery workers.
Google Maps API
Used for location tracking and zone identification to validate whether a worker is in a disruption-affected area.
Razorpay Sandbox / Mock Wallet
Handles payout simulation by processing automatic compensation to workers when a disruption event is triggered.

**Key Features:**

AI-powered risk profiling – Uses AI to analyze location, weather, and disruption history to calculate worker risk and insurance premium.
Weekly pricing model – Premiums are calculated weekly to match the earning cycle of gig workers.
Parametric insurance triggers – Claims are automatically triggered when environmental conditions exceed predefined limits.
Automated payout system – Compensation is processed automatically once disruption conditions are confirmed.
Fraud detection system – Detects suspicious or duplicate claims using anomaly detection and location verification.
Risk monitoring dashboard – Shows real-time data on disruptions, policies, claims, and payouts.
Analytics Dashboard:
The platform includes a dashboard for admins  that visualizes:
Active insurance policies
Triggered disruption events
Total payouts issued
High-risk delivery zones
This helps admins monitor risk levels and claim activity.
Future Enhancements:
Integration with delivery platform APIs (Swiggy / Zomato)
Real-time gig worker income tracking
Mobile application version
Advanced geospatial risk prediction
Blockchain-based claim verification
Development Plan:
Phase 1 (Ideation)
Define system architecture
Design parametric triggers
Define AI models
Phase 2 (Core Development)
Build backend APIs
Integrate weather data
Implement risk scoring model
Phase 3 (Product Enhancement)
Fraud detection system
Analytics dashboard
UI improvements
Expected Impact:
GigShield AI will provide:
Financial stability for gig workers by compensating income loss caused by external disruptions such as heavy rain, extreme heat, or severe pollution.
Faster insurance payouts through automated parametric triggers that detect disruption events and initiate claim processing instantly without requiring manual submission.
Reduced claim fraud using AI-based anomaly detection, location verification, and activity validation to ensure payouts are only given to genuinely affected workers.
Affordable income protection with a simple weekly premium model that aligns with the earning cycle of gig economy delivery partners.
The platform ensures gig workers are protected from unpredictable environmental disruptions while maintaining a simple and transparent insurance model.

