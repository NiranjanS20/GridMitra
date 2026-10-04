from fastapi import APIRouter, Depends
from backend.core.security import get_current_user, require_role, UserClaims

router = APIRouter()

@router.get("/")
def get_feeders(user: UserClaims = Depends(require_role(["DISCOM Engineer"]))):
    return [{"feeder_id": "f-01", "status": "stressed", "load": "95%"}]

@router.get("/{feeder_id}")
def get_feeder_details(feeder_id: str, user: UserClaims = Depends(require_role(["DISCOM Engineer"]))):
    return {"feeder_id": feeder_id, "details": {}}

@router.post("/dr-requests")
def create_dr_request(payload: dict, user: UserClaims = Depends(require_role(["DISCOM Engineer"]))):
    return {"message": "DR request created successfully", "request": payload}
