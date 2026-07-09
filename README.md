# GigShield AI — Parametric Income Protection for Gig Workers

AI-enabled parametric insurance that detects environmental and market disruptions (weather, pollution, floods, curfews) and issues fast payouts to gig workers whose earnings are impacted.

## What this is
A prototype platform to protect delivery and gig workers from income loss using automatic parametric triggers, AI-based risk profiling, fraud detection, and instant payouts.

## Stack
- Backend: FastAPI (Python)
- AI/ML: scikit-learn (models: Random Forest, Logistic Regression, Isolation Forest)
- Database: PostgreSQL (or configured DB)
- Frontend: React + Vite
- Integrations: OpenWeather, Google Maps, payment gateway (e.g., Razorpay)

## Repo layout
```
frontend/               # React + Vite frontend (UI)
backend/                # FastAPI backend, AI model integration
workflow.jpeg           # system workflow diagram
architechture.jpeg      # architecture diagram
README.md               # project overview (this file)
```

## Key concepts & features
- Parametric triggers (e.g., heavy rainfall, extreme temperature, high AQI, flood/curfew alerts)
- Weekly premium model based on income
- AI-based risk profiling and fraud detection (geo + activity verification, temporal consistency, behavioral models)
- Trust score to determine payout flow (instant / flagged / strict validation)

## How to run (high level)
- Frontend: install and run via Node (see `frontend/` package.json)
- Backend: Python 3.8+ (3.10 recommended), create virtualenv, install requirements, run FastAPI (uvicorn)
- AI models: ensure model artifacts/data and feature pipelines are available to the backend

Example (backend)
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Configuration
- Provide API keys and DB credentials via environment variables (OpenWeather key, Google Maps key, DB URL, payment gateway keys)
- Check backend config files for exact env names

## Next steps / Recommendations
- Add `backend/requirements.txt` and `frontend/package.json` if missing
- Add `.env.example`, CI, and deployment instructions
- Add tests for model and backend logic, and a LICENSE file
- Consider modularizing AI code (models/, features/) and adding evaluation notebooks

---

GigShield AI — empowering gig workers with fast, automated income protection.