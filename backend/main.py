from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import auth, resident, operator, discom, analytics

app = FastAPI(title="Mohalla Grid Backend API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Update for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Mohalla Grid API"}

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(resident.router, prefix="/me", tags=["Resident"])
app.include_router(operator.router, prefix="/sites", tags=["Operator"])
app.include_router(discom.router, prefix="/feeders", tags=["DISCOM Engineer"])
app.include_router(analytics.router)
