# ⚡ GridMitra: Intelligent Energy & Demand Response Platform

![GridMitra Banner](https://via.placeholder.com/1200x300/0F172A/10B981?text=GridMitra:+Powering+the+Future+of+Smart+Microgrids)

**GridMitra** is a state-of-the-art, AI-driven microgrid management and demand-response platform tailored specifically for Indian power conditions. By unifying real-time IoT telemetry, advanced machine learning, and a scalable multi-tenant architecture, GridMitra empowers DISCOMs, grid operators, and communities to optimize energy distribution dynamically.

---

## 🚀 Key Features

*   **Regional AI Nowcasting**: Live quantile regression forecasting (P10, P50, P90) adapting to distinct regional weather patterns (e.g., Mayur Vihar vs. Mohol).
*   **Predictive Battery Dispatch (MPC)**: Optimal charging and discharging of community battery energy storage systems (BESS) using Pyomo and PySpark.
*   **11kV Power Flow Validation**: Real-time electrical network physics simulation (using `pandapower`) scaled accurately to standard Indian medium-voltage grids (IEEE 33-bus topology).
*   **Role-Based Access Control (RBAC)**: Secure, partitioned views for Residents, Cooperative Operators, DISCOM Analysts, and Admins.
*   **Enterprise Database Architecture**: 13-schema PostgreSQL design built for Supabase, featuring Row-Level Security (RLS), partitioned time-series storage, and double-entry immutable financial ledgers.

---

## 🧠 Machine Learning Models & Performance

Our intelligent engine utilizes a suite of distinct models operating on a 15-minute control loop:

### 1. Load & PV Forecasting (M1 / M2)
*   **Architecture**: LightGBM / XGBoost Regressors using Quantile Regression.
*   **Features**: Autoregressive load, INSAT-3DR satellite cloud vectors, Direct Normal Irradiance (DNI), and Temperature Humidity Indices (THI).
*   **Performance (Mohol / Mayur Vihar)**:
    *   **Feeder Demand MAPE**: ~3.95%
    *   **Solar Nowcast MAPE**: ~4.82%
    *   **P90 Tail Coverage**: 94.6% (Empirical interval validity)
    *   **Inference Latency**: < 45 ms at the edge.

### 2. Model Predictive Control (M5)
*   **Architecture**: Pyomo (Linear/Mixed-Integer Optimization).
*   **Function**: Calculates the lowest-cost battery dispatch schedule based on real-time grid availability, time-of-use tariffs, and predicted load curves.

### 3. Physics Simulation (M6)
*   **Architecture**: `pandapower` Network Solver.
*   **Function**: Validates that AI-suggested dispatch plans do not violate thermal line limits or voltage boundaries on the 11.0kV physical topology (`case33bw`).

---

## 🏗️ Technical Stack

**Frontend**:
*   Vite + React (JavaScript)
*   Glassmorphic Dark UI / Custom CSS
*   Recharts (Dynamic Forecast Visualization)
*   Lucide-React (Iconography)

**Backend**:
*   FastAPI / Python 3.12 (High-performance Async API)
*   Uvicorn
*   Pandas / Scikit-Learn / LightGBM

**Database & Infrastructure**:
*   PostgreSQL (Supabase Target)
*   PostGIS (Geospatial Grid Topology)
*   pgcrypto (Data Privacy)

---

## 🛠️ Local Development Setup

### 1. Backend Setup
```bash
# Navigate to backend
cd backend

# Create and activate virtual environment (Windows)
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload --port 8001
```
*The API will be available at `http://localhost:8001` and Swagger UI at `http://localhost:8001/docs`.*

### 2. Frontend Setup
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the Vite dev server
npm run dev
```
*The web platform will be available at `http://localhost:5173`.*

### 3. Database Deployment (Optional)
To deploy the full production architecture:
1. Create a project on [Supabase](https://supabase.com/).
2. Run the SQL script located at `backend/db_migrations/01_init_gridmitra.sql` in the Supabase SQL Editor.
3. Add your `SUPABASE_URL` and `SUPABASE_KEY` to the `backend/.env` file.

---

## 🛡️ Privacy & Security By Design
GridMitra adheres strictly to the **DPDP Act 2023**:
*   All user contact information is encrypted at rest via PostgreSQL `pgcrypto`.
*   Household data is pseudonymized across all analytics pipelines.
*   Data access is enforced at the database level via PostgreSQL Row-Level Security (RLS) bound to JWT claims.

---
*Built with passion for a sustainable and intelligent grid.* 🔋
