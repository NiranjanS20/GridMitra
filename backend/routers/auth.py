from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Dict, Any

router = APIRouter()

class OTPRequest(BaseModel):
    phone_number: str

class OTPVerify(BaseModel):
    phone_number: str
    code: str

class StaffLogin(BaseModel):
    email: str
    password: str

@router.post("/otp/request")
def request_otp(data: OTPRequest):
    # Mock OTP request logic
    return {"message": "OTP requested", "phone_number": data.phone_number}

@router.post("/otp/verify")
def verify_otp(data: OTPVerify):
    # Mock OTP verify logic
    return {"message": "OTP verified", "token": "mock-jwt-token-for-resident"}

@router.post("/staff/login")
def staff_login(data: StaffLogin):
    # Mock Staff login
    return {"message": "Staff login successful", "token": "mock-jwt-token-for-staff"}
