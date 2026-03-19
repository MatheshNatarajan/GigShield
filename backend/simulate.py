import requests
import time
import subprocess
import os

BASE_URL = "http://127.0.0.1:8000"

def run_simulation():
    print("🚀 Starting GigShield AI End-to-End Simulation...")
    
    # Ensure server is running (assumes `uvicorn main:app --reload` is running in another tab)
    try:
        requests.get(f"{BASE_URL}/")
    except requests.exceptions.ConnectionError:
        print("❌ Server is not running! Please run 'uvicorn main:app --reload' before simulation.")
        return

    # 1. Register Users
    print("\n📦 Registering Mock Users...")
    users_data = [
        {"name": "Ravi Kumar", "gig_platform": "Swiggy", "base_location_lat": 12.9716, "base_location_lon": 77.5946},
        {"name": "Suresh Raina", "gig_platform": "Zomato", "base_location_lat": 12.9716, "base_location_lon": 77.5946}
    ]
    u_ids = []
    for u in users_data:
        res = requests.post(f"{BASE_URL}/users/register", json=u)
        user = res.json()
        print(f"  ✅ Created User: {user['name']} (ID: {user['id']})")
        u_ids.append(user['id'])

    # 2. Setup DB context (via hacky DB access to create zones)
    # Ideally should be an API endpoint, doing direct DB inject for simulation ease
    from models.db import Zone, SessionLocal, init_db
    init_db()
    db = SessionLocal()
    zone = db.query(Zone).filter(Zone.name == "Bangalore Core").first()
    if not zone:
        zone = Zone(name="Bangalore Core", current_risk_score=45.0)
        db.add(zone)
        db.commit()
        db.refresh(zone)
    print(f"\n🌍 Zone Active: {zone.name} (ID: {zone.id})")
    
    # 3. Get AI Quotes & Subscribe to Policies
    print("\n🛡️ Subscribing Users to Parametric Policies...")
    for u_id in u_ids:
        quote = requests.get(f"{BASE_URL}/policies/quote/{u_id}/{zone.id}").json()
        print(f"  💡 Quote for User {u_id}: ₹{quote['estimated_weekly_premium']} / week")
        
        policy_data = {
            "user_id": u_id,
            "zone_id": zone.id,
            "weekly_premium": quote['estimated_weekly_premium']
        }
        res = requests.post(f"{BASE_URL}/policies/subscribe", json=policy_data)
        print(f"  ✅ Policy Subscribed (ID: {res.json()['id']})")

    # 4. Trigger Weather Disruption
    print("\n⛈️ TRIGGERING WEATHER ALERT (RAINFALL > 100mm)!")
    trigger_data = {
        "zone_id": zone.id,
        "type": "Rainfall",
        "severity": 115.0,
        "threshold_value": 100.0
    }
    res = requests.post(f"{BASE_URL}/webhooks/disruption", json=trigger_data)
    print(f"  🚨 Response: {res.json()['message']}")

    # Wait for Background Payout Task
    time.sleep(2)

    # 5. Fetch Dashboard Analytics
    print("\n📊 Fetching Admin Dashboard Analytics...")
    res = requests.get(f"{BASE_URL}/admin/dashboard").json()
    metrics = res['metrics']
    print(f"  📈 Total Claims Processed: {metrics['total_claims_processed']}")
    print(f"  🚩 Fraud Flagged Claims: {metrics['fraud_flagged_claims']}")
    print(f"  💰 Total Payout Released: ₹{metrics['total_payout_released']}")
    
    print("\n🏁 Simulation Complete!")

if __name__ == "__main__":
    run_simulation()
