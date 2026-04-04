from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from models.schemas import UserCreate, UserResponse, PolicyResponse
from models.db import User, Policy, engine, SessionLocal

# Ensure DB tables are created (dev strategy)
import models.db as db_models
db_models.init_db()

router = APIRouter()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(
        name=user.name, 
        gig_platform=user.gig_platform,
        base_location_lat=user.base_location_lat,
        base_location_lon=user.base_location_lon
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.get("/{user_id}/policies", response_model=List[PolicyResponse])
def get_user_policies(user_id: int, db: Session = Depends(get_db)):
    policies = db.query(Policy).filter(Policy.user_id == user_id).all()
    return policies
