from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import os
from config.settings import settings

engine = create_engine(settings.DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    phone = Column(String, index=True)
    city = Column(String) # Chennai, Bangalore, etc.
    gig_platform = Column(String) # Swiggy, Zomato
    weekly_income = Column(Float, default=7000.0)
    base_location_lat = Column(Float, nullable=True)
    base_location_lon = Column(Float, nullable=True)
    trust_score = Column(Float, default=85.0)
    income_stability_score = Column(Float, default=70.0)
    
    policies = relationship("Policy", back_populates="user")
    claims = relationship("Claim", back_populates="user")

class Zone(Base):
    __tablename__ = "zones"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    current_risk_score = Column(Float, default=0.0)
    active_disruptions = Column(Integer, default=0)

class Policy(Base):
    __tablename__ = "policies"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    zone_id = Column(Integer, ForeignKey("zones.id"), nullable=True)
    start_date = Column(DateTime, default=datetime.utcnow)
    end_date = Column(DateTime)
    weekly_premium = Column(Float)
    coverage_amount = Column(Float)
    active_status = Column(Boolean, default=True)
    
    user = relationship("User", back_populates="policies")
    zone = relationship("Zone")

class Disruption(Base):
    __tablename__ = "disruptions"
    id = Column(Integer, primary_key=True, index=True)
    zone_id = Column(Integer, ForeignKey("zones.id"))
    type = Column(String) # Rain, AQI, Curfew
    severity = Column(Float)
    threshold_value = Column(Float)
    start_time = Column(DateTime, default=datetime.utcnow)
    end_time = Column(DateTime, nullable=True)

class Claim(Base):
    __tablename__ = "claims"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    policy_id = Column(Integer, ForeignKey("policies.id"))
    disruption_id = Column(Integer, ForeignKey("disruptions.id"), nullable=True)
    trigger_type = Column(String) # Rain, Heat, etc.
    event_timestamp = Column(DateTime, default=datetime.utcnow)
    disruption_end_time = Column(DateTime) # Payout happens after this
    expected_earnings = Column(Float)
    actual_earnings = Column(Float)
    missed_opportunity = Column(Float)
    payout_amount = Column(Float)
    status = Column(String, default="Processing") # Processing, Paid, Flagged
    fraud_reason = Column(String, nullable=True)
    
    user = relationship("User", back_populates="claims")
    policy = relationship("Policy")
    disruption = relationship("Disruption")

class DeliveryActivity(Base):
    __tablename__ = "delivery_activity"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    timestamp = Column(DateTime, default=datetime.utcnow)
    lat = Column(Float)
    lon = Column(Float)
    status = Column(String) # active, resting

# Helper to create tables
def init_db():
    Base.metadata.create_all(bind=engine)
