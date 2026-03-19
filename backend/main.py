from fastapi import FastAPI
from api.routes import users, policies, webhooks, analytics
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="GigShield AI API", version="1.0.0", description="Parametric Insurance MVP for Gig Workers")

# Add CORS middleware for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(policies.router, prefix="/policies", tags=["Policies"])
app.include_router(webhooks.router, prefix="/webhooks", tags=["Webhooks"])
app.include_router(analytics.router, prefix="/admin", tags=["Analytics"])

@app.get("/")
def read_root():
    return {"message": "Welcome to GigShield AI MVP"}
