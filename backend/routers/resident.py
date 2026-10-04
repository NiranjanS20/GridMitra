from fastapi import APIRouter, Depends
from backend.core.security import get_current_user, require_role, UserClaims

router = APIRouter()

@router.get("/today")
def get_today(user: UserClaims = Depends(require_role(["Resident"]))):
    # Aggregated call: stage, outlook strip, do-now card, protected loads, battery, credits
    return {
        "stage": "Anticipate",
        "outlook_strip": "Tight",
        "do_now_card": {"title": "Delay washing machine", "reward": "₹15"},
        "battery": {"soc": 45, "target": 80},
        "wallet": {"credits": 240}
    }

@router.get("/outlook")
def get_outlook(user: UserClaims = Depends(require_role(["Resident"]))):
    return {"message": "Outlook data for resident"}

@router.get("/loads")
def get_loads(user: UserClaims = Depends(require_role(["Resident"]))):
    return {"essential": ["Fridge", "Lights"], "comfort": ["AC", "Washing Machine"]}

@router.get("/dr-offers")
def get_dr_offers(user: UserClaims = Depends(require_role(["Resident"]))):
    return [{"id": "dr-101", "description": "Reduce 1kW", "reward": 50, "status": "pending"}]
