from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from backend.models.database import supabase
from pydantic import BaseModel
from typing import List, Optional

security = HTTPBearer()

class UserClaims(BaseModel):
    user_id: str
    role: str
    site_ids: Optional[List[str]] = []
    feeder_ids: Optional[List[str]] = []
    household_id: Optional[str] = None

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> UserClaims:
    token = credentials.credentials
    try:
        # Development override for easy RBAC testing
        if token.startswith("mock-"):
            role = token.split("-")[1] # e.g. mock-Resident -> Resident
            return UserClaims(
                user_id="mock_user_id",
                role=role,
                site_ids=["site_1"],
                feeder_ids=["feeder_1"],
                household_id="hh_1" if role == "Resident" else None
            )

        # Supabase decode the JWT to get user object
        user_response = supabase.auth.get_user(token)
        if not user_response.user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        
        user_id = user_response.user.id
        # Role and scopes should ideally be custom claims or queried from role_assignments table
        # Here we mock retrieving claims from user app_metadata or similar
        app_metadata = user_response.user.app_metadata or {}
        role = app_metadata.get('role', 'Resident')
        
        return UserClaims(
            user_id=user_id,
            role=role,
            site_ids=app_metadata.get('site_ids', []),
            feeder_ids=app_metadata.get('feeder_ids', []),
            household_id=app_metadata.get('household_id')
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication failed: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )

def require_role(required_roles: List[str]):
    def role_checker(user: UserClaims = Depends(get_current_user)):
        if user.role not in required_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Operation not permitted for your role"
            )
        return user
    return role_checker
