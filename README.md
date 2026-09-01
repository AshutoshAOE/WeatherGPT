# WeatherGPT

WeatherGPT is a conversational AI platform that makes weather forecasts, alerts, and climate information actionable using multi-model confidence engines and sector-based intelligence.

## Setup Instructions

### Backend
1. Navigate to the `backend/` directory.
2. Ensure you have Python 3.11+ installed.
3. Activate the virtual environment (`venv`).
4. Install dependencies via `pip install -r requirements.txt`.
5. Copy `.env.example` to `.env` and fill in your keys.
6. Run the FastAPI server: `uvicorn app.main:app --reload`.

### Frontend
1. Navigate to the `frontend/` directory.
2. Ensure you have Node.js 20+ installed.
3. Install dependencies: `npm install`.
4. Copy `.env.example` to `.env`.
5. Start the Vite server: `npm run dev`.

### Database (PostgreSQL + PostGIS + pgvector)
To run WeatherGPT, you need a local PostgreSQL database with the PostGIS and pgvector extensions installed.

**For Windows Users:**
Installing `pgvector` natively on Windows can be complicated as it typically requires compiling from source using MSVC.
If you prefer not to use Docker, you can install PostgreSQL using the EnterpriseDB installer, then use StackBuilder to install PostGIS. For `pgvector`, you may need to use a pre-compiled Windows release or follow the official compilation instructions.

1. Ensure the PostgreSQL service is running.
2. Create the `weathergpt` database.
3. Enable extensions in your database:
   ```sql
   CREATE EXTENSION IF NOT EXISTS postgis;
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
