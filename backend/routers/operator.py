from fastapi import APIRouter, Depends
from backend.core.security import get_current_user, require_role, UserClaims

router = APIRouter()

@router.get("/{site_id}/overview")
def get_site_overview(site_id: str, user: UserClaims = Depends(require_role(["Operator"]))):
    return {"site_id": site_id, "status": "nominal", "active_overrides": 0}

@router.get("/{site_id}/dispatch")
def get_site_dispatch(site_id: str, user: UserClaims = Depends(require_role(["Operator"]))):
    return {"site_id": site_id, "dispatch_plan": []}

@router.post("/{site_id}/overrides")
def create_override(site_id: str, payload: dict, user: UserClaims = Depends(require_role(["Operator"]))):
    return {"message": "Override submitted for review", "site_id": site_id, "payload": payload}
