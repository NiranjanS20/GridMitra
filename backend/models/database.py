from supabase import create_client, Client
from backend.core.config import settings

# Initialize Supabase client
try:
    supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
except Exception as e:
    print(f"Warning: Supabase client failed to initialize ({e}). Using mock.")
    class MockSupabase:
        def table(self, *args, **kwargs): return self
        def select(self, *args, **kwargs): return self
        def insert(self, *args, **kwargs): return self
    supabase = MockSupabase()
    supabase_admin = MockSupabase()
