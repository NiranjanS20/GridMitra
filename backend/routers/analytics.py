from fastapi import APIRouter, Depends, HTTPException
import subprocess
import json
import os
from backend.core.security import require_role, UserClaims

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/forecast-and-optimize")
def get_forecast_and_optimization(
    region: str = "mayur_vihar",
    current_user: UserClaims = Depends(require_role(["Operator", "Cooperative"]))
):
    """
    Executes the ML inference pipeline in the background ML environment
    and returns the optimized dispatch instructions and forecast charts.
    """
    # Path to the ML python executable and script
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    
    # Determine the python executable based on OS (Windows venv path)
    python_exe = os.path.join(base_dir, "ml", "venv", "Scripts", "python.exe")
    script_path = os.path.join(base_dir, "ml", "run_inference.py")
    
    if not os.path.exists(python_exe):
        # Fallback to system python if venv not found (for debugging)
        python_exe = "python"
        
    try:
        # Run the ML script in a subprocess and capture stdout
        result = subprocess.run(
            [python_exe, script_path, region],
            capture_output=True,
            text=True,
            check=True
        )
        
        # Parse the JSON output from the ML script
        ml_data = json.loads(result.stdout)
        
        return {
            "status": "success",
            "data": ml_data
        }
        
    except subprocess.CalledProcessError as e:
        print(f"ML Script Error: {e.stderr}")
        raise HTTPException(status_code=500, detail="Failed to run ML inference pipeline.")
    except json.JSONDecodeError as e:
        print(f"JSON Parse Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to parse ML output.")
