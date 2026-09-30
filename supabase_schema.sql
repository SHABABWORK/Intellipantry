-- ==============================================================================
-- INTELLIPANTRY — MASTER MULTI-USER REAL-TIME DATABASE SCHEMA
-- PostgreSQL + Row Level Security (RLS) + Realtime Replication
-- ==============================================================================
--
-- INSTRUCTIONS FOR SUPABASE DASHBOARD:
-- 1. Open Supabase Dashboard -> SQL Editor
-- 2. Paste this entire script and click "Run"
-- 3. Everything is idempotent (safe to run multiple times without data loss)
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. PROFILES TABLE (Linked 1:1 with auth.users)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Auto-create profile trigger on auth.users signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Helper function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_profiles_updated_at ON public.profiles;
CREATE TRIGGER trigger_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- ==============================================================================
-- 2. PANTRY ITEMS TABLE (Master User-Isolated Inventory: pantry_items)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.pantry_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  brand TEXT,
  category TEXT NOT NULL DEFAULT 'Pantry',
  barcode TEXT,
  product_image TEXT,
  quantity NUMERIC NOT NULL DEFAULT 1,
  quantity_unit TEXT NOT NULL DEFAULT 'pcs',
  purchase_date DATE,
  expiry_date DATE,
  low_stock_threshold NUMERIC DEFAULT 2,
  notes TEXT,
  storage_location TEXT DEFAULT 'Pantry',
  unit TEXT DEFAULT 'pcs',                 -- Compatibility alias column
  minimum_stock NUMERIC DEFAULT 2,          -- Compatibility alias column
  description TEXT,                         -- Compatibility alias column
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Ensure all columns exist idempotently if pantry_items was created previously
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS product_name TEXT;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS brand TEXT;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Pantry';
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS barcode TEXT;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS product_image TEXT;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS quantity NUMERIC DEFAULT 1;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS quantity_unit TEXT DEFAULT 'pcs';
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS purchase_date DATE;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS expiry_date DATE;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS low_stock_threshold NUMERIC DEFAULT 2;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS storage_location TEXT DEFAULT 'Pantry';
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS unit TEXT DEFAULT 'pcs';
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS minimum_stock NUMERIC DEFAULT 2;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Universal Shelf Life & Expiry Prediction Columns
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS actual_expiry_date DATE;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS estimated_expiry_date DATE;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS effective_expiry_date DATE;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS expiry_type TEXT DEFAULT 'actual'; -- 'actual' or 'estimated'
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS shelf_life_days INTEGER;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS product_status TEXT DEFAULT 'Unopened'; -- 'Unopened' or 'Opened'
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS opened_date DATE;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS opened_shelf_life_days INTEGER;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS recommended_use_by_date DATE;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS storage_type TEXT;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS storage_recommendation TEXT;
ALTER TABLE public.pantry_items ADD COLUMN IF NOT EXISTS expiry_status TEXT;

-- Performance Indexes for Pantry Items
CREATE INDEX IF NOT EXISTS idx_pantry_items_user_id ON public.pantry_items (user_id);
CREATE INDEX IF NOT EXISTS idx_pantry_items_expiry ON public.pantry_items (user_id, expiry_date);
CREATE INDEX IF NOT EXISTS idx_pantry_items_effective_expiry ON public.pantry_items (user_id, effective_expiry_date);
CREATE INDEX IF NOT EXISTS idx_pantry_items_expiry_status ON public.pantry_items (user_id, expiry_status);
CREATE INDEX IF NOT EXISTS idx_pantry_items_barcode ON public.pantry_items (user_id, barcode);
CREATE INDEX IF NOT EXISTS idx_pantry_items_created ON public.pantry_items (user_id, created_at DESC);

-- Enable Row Level Security (RLS) on pantry_items
ALTER TABLE public.pantry_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can only view their own pantry items" ON public.pantry_items;
DROP POLICY IF EXISTS "Users can only insert their own pantry items" ON public.pantry_items;
DROP POLICY IF EXISTS "Users can only update their own pantry items" ON public.pantry_items;
DROP POLICY IF EXISTS "Users can only delete their own pantry items" ON public.pantry_items;

CREATE POLICY "Users can only view their own pantry items"
  ON public.pantry_items FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert their own pantry items"
  ON public.pantry_items FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can only update their own pantry items"
  ON public.pantry_items FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can only delete their own pantry items"
  ON public.pantry_items FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS trigger_pantry_items_updated_at ON public.pantry_items;
CREATE TRIGGER trigger_pantry_items_updated_at
  BEFORE UPDATE ON public.pantry_items
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Synchronize alias columns on insert/update in pantry_items
CREATE OR REPLACE FUNCTION public.sync_pantry_items_aliases()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.quantity_unit IS NULL AND NEW.unit IS NOT NULL THEN
    NEW.quantity_unit := NEW.unit;
  END IF;
  IF NEW.unit IS NULL AND NEW.quantity_unit IS NOT NULL THEN
    NEW.unit := NEW.quantity_unit;
  END IF;
  IF NEW.low_stock_threshold IS NULL AND NEW.minimum_stock IS NOT NULL THEN
    NEW.low_stock_threshold := NEW.minimum_stock;
  END IF;
  IF NEW.minimum_stock IS NULL AND NEW.low_stock_threshold IS NOT NULL THEN
    NEW.minimum_stock := NEW.low_stock_threshold;
  END IF;
  IF NEW.notes IS NULL AND NEW.description IS NOT NULL THEN
    NEW.notes := NEW.description;
  END IF;
  IF NEW.description IS NULL AND NEW.notes IS NOT NULL THEN
    NEW.description := NEW.notes;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_sync_pantry_items_aliases ON public.pantry_items;
CREATE TRIGGER trigger_sync_pantry_items_aliases
  BEFORE INSERT OR UPDATE ON public.pantry_items
  FOR EACH ROW EXECUTE FUNCTION public.sync_pantry_items_aliases();

-- Synchronize effective expiry dates and status on insert/update in pantry_items
CREATE OR REPLACE FUNCTION public.sync_pantry_expiry_dates()
RETURNS TRIGGER AS $$
BEGIN
  -- 1. If actual_expiry_date is empty but legacy expiry_date exists
  IF NEW.actual_expiry_date IS NULL AND NEW.expiry_date IS NOT NULL AND (NEW.expiry_type IS NULL OR NEW.expiry_type = 'actual') THEN
    NEW.actual_expiry_date := NEW.expiry_date;
  END IF;

  -- 2. Calculate effective_expiry_date following priority: actual > opened use-by > estimated
  IF NEW.actual_expiry_date IS NOT NULL THEN
    NEW.effective_expiry_date := NEW.actual_expiry_date;
    IF NEW.expiry_type IS NULL OR NEW.expiry_type != 'estimated' THEN
      NEW.expiry_type := 'actual';
    END IF;
  ELSIF NEW.estimated_expiry_date IS NOT NULL THEN
    NEW.effective_expiry_date := NEW.estimated_expiry_date;
    NEW.expiry_type := 'estimated';
  ELSIF NEW.expiry_date IS NOT NULL THEN
    NEW.effective_expiry_date := NEW.expiry_date;
  END IF;

  -- 3. If product is opened and recommended_use_by_date is earlier, keep active reminder in effective date if no actual
  IF NEW.product_status = 'Opened' AND NEW.recommended_use_by_date IS NOT NULL THEN
    IF NEW.actual_expiry_date IS NULL AND NEW.estimated_expiry_date IS NULL THEN
      NEW.effective_expiry_date := NEW.recommended_use_by_date;
    END IF;
  END IF;

  -- 4. Keep legacy expiry_date synced with effective_expiry_date
  IF NEW.effective_expiry_date IS NOT NULL THEN
    NEW.expiry_date := NEW.effective_expiry_date;
  END IF;

  -- 5. Calculate expiry_status if not explicitly provided
  IF NEW.effective_expiry_date IS NOT NULL THEN
    IF NEW.effective_expiry_date < CURRENT_DATE THEN
      NEW.expiry_status := 'Expired';
    ELSIF NEW.effective_expiry_date = CURRENT_DATE THEN
      NEW.expiry_status := 'Expires Today';
    ELSIF NEW.effective_expiry_date <= (CURRENT_DATE + 7) THEN
      NEW.expiry_status := 'Very Soon';
    ELSIF NEW.effective_expiry_date <= (CURRENT_DATE + 30) THEN
      NEW.expiry_status := 'Expiring Soon';
    ELSE
      NEW.expiry_status := 'Fresh';
    END IF;
  ELSE
    NEW.expiry_status := 'Fresh';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_sync_pantry_expiry_dates ON public.pantry_items;
CREATE TRIGGER trigger_sync_pantry_expiry_dates
  BEFORE INSERT OR UPDATE ON public.pantry_items
  FOR EACH ROW EXECUTE FUNCTION public.sync_pantry_expiry_dates();

-- Backward compatibility table: pantry_products (mirrors pantry_items if already used)
CREATE TABLE IF NOT EXISTS public.pantry_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  brand TEXT,
  category TEXT NOT NULL DEFAULT 'Pantry',
  barcode TEXT,
  product_image TEXT,
  description TEXT,
  ingredients TEXT,
  nutrition JSONB,
  quantity NUMERIC NOT NULL DEFAULT 1,
  unit TEXT NOT NULL DEFAULT 'pcs',
  purchase_date DATE,
  expiry_date DATE,
  minimum_stock NUMERIC DEFAULT 2,
  storage_location TEXT DEFAULT 'Pantry',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.pantry_products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can only view their own pantry products" ON public.pantry_products;
DROP POLICY IF EXISTS "Users can only insert their own pantry products" ON public.pantry_products;
DROP POLICY IF EXISTS "Users can only update their own pantry products" ON public.pantry_products;
DROP POLICY IF EXISTS "Users can only delete their own pantry products" ON public.pantry_products;

CREATE POLICY "Users can only view their own pantry products"
  ON public.pantry_products FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert their own pantry products"
  ON public.pantry_products FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can only update their own pantry products"
  ON public.pantry_products FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can only delete their own pantry products"
  ON public.pantry_products FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Backward compatibility migration: Migrate existing data from pantry_products and products to pantry_items
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'pantry_products') THEN
    INSERT INTO public.pantry_items (
      id, user_id, product_name, brand, category, barcode, product_image,
      quantity, quantity_unit, unit, purchase_date, expiry_date, low_stock_threshold, minimum_stock, notes, description, storage_location, created_at, updated_at
    )
    SELECT 
      id, user_id, product_name, brand, category, barcode, product_image,
      quantity, unit, unit, purchase_date, expiry_date, COALESCE(minimum_stock, 2), COALESCE(minimum_stock, 2), description, description, COALESCE(storage_location, 'Pantry'), created_at, updated_at
    FROM public.pantry_products
    ON CONFLICT (id) DO NOTHING;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'products') THEN
    INSERT INTO public.pantry_items (
      id, user_id, product_name, brand, category, barcode, product_image,
      quantity, quantity_unit, unit, purchase_date, expiry_date, low_stock_threshold, minimum_stock, notes, description, storage_location, created_at, updated_at
    )
    SELECT 
      id, user_id, name, brand, category, barcode, image_url,
      quantity, unit, unit, purchase_date, expiry_date, COALESCE(min_stock, 2), COALESCE(min_stock, 2), NULL, NULL, COALESCE(storage_location, 'Pantry'), created_at, updated_at
    FROM public.products
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;


-- ==============================================================================
-- 3. ALERTS TABLE (Linked to auth.users with 24h Email Deduplication)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'system', -- 'expiry', 'expired', 'low_stock', 'security', 'system'
  product_id TEXT,
  product_name TEXT,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  email_sent_at TIMESTAMPTZ,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Ensure all columns exist idempotently if table was created in an earlier migration
ALTER TABLE public.alerts ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.alerts ADD COLUMN IF NOT EXISTS product_id TEXT;
ALTER TABLE public.alerts ADD COLUMN IF NOT EXISTS product_name TEXT;
ALTER TABLE public.alerts ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'system';
ALTER TABLE public.alerts ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT false;
ALTER TABLE public.alerts ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMPTZ;
ALTER TABLE public.alerts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now());

-- Deduplication & Query Performance Indexes
CREATE INDEX IF NOT EXISTS idx_alerts_user_unread ON public.alerts (user_id, is_read, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_user_created ON public.alerts (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_user_dedup ON public.alerts (user_id, type, product_id, email_sent, email_sent_at DESC);

ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can only view their own alerts" ON public.alerts;
DROP POLICY IF EXISTS "Users can insert their own alerts" ON public.alerts;
DROP POLICY IF EXISTS "Users can update their own alerts" ON public.alerts;
DROP POLICY IF EXISTS "Users can delete their own alerts" ON public.alerts;

CREATE POLICY "Users can only view their own alerts"
  ON public.alerts FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own alerts"
  ON public.alerts FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own alerts"
  ON public.alerts FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own alerts"
  ON public.alerts FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Backward compatibility: Migrate from public.pantry_alerts if existing
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'pantry_alerts') THEN
    INSERT INTO public.alerts (id, user_id, title, message, type, is_read, created_at)
    SELECT id, user_id, title, message, type, is_read, created_at
    FROM public.pantry_alerts
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;

-- Helper SQL Function: calculate alert summaries for user
CREATE OR REPLACE FUNCTION public.get_user_pantry_alerts_summary(target_user_id UUID, warning_days INT DEFAULT 7)
RETURNS TABLE (
  item_id UUID,
  product_name TEXT,
  quantity NUMERIC,
  quantity_unit TEXT,
  expiry_date DATE,
  low_stock_threshold NUMERIC,
  alert_category TEXT,
  days_until_expiry INT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id AS item_id,
    p.product_name,
    p.quantity,
    COALESCE(p.quantity_unit, p.unit, 'pcs') AS quantity_unit,
    p.expiry_date,
    COALESCE(p.low_stock_threshold, p.minimum_stock, 2) AS low_stock_threshold,
    CASE 
      WHEN p.expiry_date IS NOT NULL AND p.expiry_date < CURRENT_DATE THEN 'expired'
      WHEN p.expiry_date IS NOT NULL AND p.expiry_date <= (CURRENT_DATE + warning_days) THEN 'expiry'
      WHEN p.quantity <= COALESCE(p.low_stock_threshold, p.minimum_stock, 2) THEN 'low_stock'
      ELSE 'normal'
    END AS alert_category,
    CASE 
      WHEN p.expiry_date IS NOT NULL THEN (p.expiry_date - CURRENT_DATE)
      ELSE NULL
    END AS days_until_expiry
  FROM public.pantry_items p
  WHERE p.user_id = target_user_id
    AND (
      (p.expiry_date IS NOT NULL AND p.expiry_date <= (CURRENT_DATE + warning_days))
      OR (p.quantity <= COALESCE(p.low_stock_threshold, p.minimum_stock, 2))
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ==============================================================================
-- 4. NOTIFICATION PREFERENCES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.notification_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email_notifications BOOLEAN NOT NULL DEFAULT true,
  expiry_alerts BOOLEAN NOT NULL DEFAULT true,
  expired_product_alerts BOOLEAN NOT NULL DEFAULT true,
  low_stock_alerts BOOLEAN NOT NULL DEFAULT true,
  shopping_recommendations BOOLEAN NOT NULL DEFAULT true,
  meal_plan_notifications BOOLEAN NOT NULL DEFAULT true,
  weekly_summary BOOLEAN NOT NULL DEFAULT false,
  security_notifications BOOLEAN NOT NULL DEFAULT true,
  preferences JSONB NOT NULL DEFAULT '{"email_notifications":true,"alert_expiry":true,"alert_expired":true,"alert_low_stock":true,"alert_security":true,"alert_weekly_summary":false,"shopping_recommendations":true,"meal_plan_notifications":true}'::jsonb,
  pantry_settings JSONB NOT NULL DEFAULT '{"expiry_warning_days":7,"low_stock_threshold":2,"default_unit":"pcs","default_category":"Pantry"}'::jsonb,
  general_settings JSONB NOT NULL DEFAULT '{"language":"English","timezone":"Asia/Kolkata","currency":"INR","date_format":"DD/MM/YYYY","theme":"light"}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Ensure individual boolean columns exist idempotently
ALTER TABLE public.notification_preferences ADD COLUMN IF NOT EXISTS email_notifications BOOLEAN DEFAULT true;
ALTER TABLE public.notification_preferences ADD COLUMN IF NOT EXISTS expiry_alerts BOOLEAN DEFAULT true;
ALTER TABLE public.notification_preferences ADD COLUMN IF NOT EXISTS expired_product_alerts BOOLEAN DEFAULT true;
ALTER TABLE public.notification_preferences ADD COLUMN IF NOT EXISTS low_stock_alerts BOOLEAN DEFAULT true;
ALTER TABLE public.notification_preferences ADD COLUMN IF NOT EXISTS shopping_recommendations BOOLEAN DEFAULT true;
ALTER TABLE public.notification_preferences ADD COLUMN IF NOT EXISTS meal_plan_notifications BOOLEAN DEFAULT true;
ALTER TABLE public.notification_preferences ADD COLUMN IF NOT EXISTS weekly_summary BOOLEAN DEFAULT false;
ALTER TABLE public.notification_preferences ADD COLUMN IF NOT EXISTS security_notifications BOOLEAN DEFAULT true;

ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own preferences" ON public.notification_preferences;
DROP POLICY IF EXISTS "Users can insert their own preferences" ON public.notification_preferences;
DROP POLICY IF EXISTS "Users can update their own preferences" ON public.notification_preferences;
DROP POLICY IF EXISTS "Users can delete their own preferences" ON public.notification_preferences;

CREATE POLICY "Users can view their own preferences"
  ON public.notification_preferences FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences"
  ON public.notification_preferences FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
  ON public.notification_preferences FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own preferences"
  ON public.notification_preferences FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS trigger_notification_preferences_updated_at ON public.notification_preferences;
CREATE TRIGGER trigger_notification_preferences_updated_at
  BEFORE UPDATE ON public.notification_preferences
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 4B. COMPREHENSIVE USER SETTINGS TABLE (PANTRY, APPEARANCE, PRIVACY)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.user_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  -- Pantry Engine Settings
  minimum_stock_threshold INTEGER DEFAULT 2,
  low_stock_warning_level INTEGER DEFAULT 2,
  default_planning_period_days INTEGER DEFAULT 7,
  default_storage_type TEXT DEFAULT 'Pantry',
  expiry_warning_period_days INTEGER DEFAULT 7,
  default_quantity_unit TEXT DEFAULT 'pcs',
  auto_add_scanned_products BOOLEAN DEFAULT true,
  auto_calculate_expiry BOOLEAN DEFAULT true,
  opened_product_tracking BOOLEAN DEFAULT true,
  smart_shopping_recommendations BOOLEAN DEFAULT true,
  food_waste_tracking BOOLEAN DEFAULT true,
  -- Appearance & Localization Settings
  theme TEXT DEFAULT 'light',
  layout_mode TEXT DEFAULT 'comfortable',
  language TEXT DEFAULT 'English',
  timezone TEXT DEFAULT 'Asia/Kolkata',
  currency TEXT DEFAULT 'INR',
  date_format TEXT DEFAULT 'DD/MM/YYYY',
  -- Privacy Settings
  analytics_enabled BOOLEAN DEFAULT true,
  ai_personalization BOOLEAN DEFAULT true,
  recipe_personalization BOOLEAN DEFAULT true,
  shopping_personalization BOOLEAN DEFAULT true,
  profile_visibility TEXT DEFAULT 'private',
  data_usage_consent BOOLEAN DEFAULT true,
  -- JSON Fallbacks for complete interoperability
  preferences JSONB DEFAULT '{}'::jsonb,
  pantry_settings JSONB DEFAULT '{}'::jsonb,
  general_settings JSONB DEFAULT '{}'::jsonb,
  privacy_settings JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own settings" ON public.user_settings;
DROP POLICY IF EXISTS "Users can insert their own settings" ON public.user_settings;
DROP POLICY IF EXISTS "Users can update their own settings" ON public.user_settings;
DROP POLICY IF EXISTS "Users can delete their own settings" ON public.user_settings;

CREATE POLICY "Users can view their own settings"
  ON public.user_settings FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings"
  ON public.user_settings FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings"
  ON public.user_settings FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own settings"
  ON public.user_settings FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS trigger_user_settings_updated_at ON public.user_settings;
CREATE TRIGGER trigger_user_settings_updated_at
  BEFORE UPDATE ON public.user_settings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 4C. SHOPPING LIST & MEAL PLANS TABLES (FOR REAL-TIME DATABASE METRICS)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.shopping_list (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  quantity NUMERIC NOT NULL DEFAULT 1,
  unit TEXT NOT NULL DEFAULT 'pcs',
  category TEXT DEFAULT 'Pantry',
  is_bought BOOLEAN NOT NULL DEFAULT false,
  added_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.shopping_list ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage their own shopping list" ON public.shopping_list;
CREATE POLICY "Users manage their own shopping list"
  ON public.shopping_list FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.meal_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_name TEXT NOT NULL,
  planned_date DATE NOT NULL DEFAULT CURRENT_DATE,
  meal_type TEXT DEFAULT 'Dinner',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage their own meal plans" ON public.meal_plans;
CREATE POLICY "Users manage their own meal plans"
  ON public.meal_plans FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- ==============================================================================
-- 5. ACTIVITY LOGS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL, -- 'added', 'updated', 'quantity_changed', 'deleted'
  product_id TEXT,
  product_name TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_activity_logs_user_created ON public.activity_logs (user_id, created_at DESC);

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own activity logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Users can insert their own activity logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Users can delete their own activity logs" ON public.activity_logs;

CREATE POLICY "Users can view their own activity logs"
  ON public.activity_logs FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activity logs"
  ON public.activity_logs FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own activity logs"
  ON public.activity_logs FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Backward compatibility: Migrate from public.pantry_activity if existing
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'pantry_activity') THEN
    INSERT INTO public.activity_logs (id, user_id, action, product_id, product_name, details, created_at)
    SELECT id, user_id, action, product_id, product_name, details, created_at
    FROM public.pantry_activity
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;


-- ==============================================================================
-- 6. EMAIL NOTIFICATIONS AUDIT TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.email_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  notification_type TEXT NOT NULL DEFAULT 'login_security',
  status TEXT NOT NULL DEFAULT 'sent',
  provider TEXT NOT NULL DEFAULT 'resend',
  sent_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.email_notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own email audit" ON public.email_notifications;
CREATE POLICY "Users can view their own email audit"
  ON public.email_notifications FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own email audit" ON public.email_notifications;
CREATE POLICY "Users can insert their own email audit"
  ON public.email_notifications FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);


-- ==============================================================================
-- 7. SUPABASE REALTIME REPLICATION CONFIGURATION
-- ==============================================================================
DO $$
BEGIN
  -- Add pantry_items to realtime publication
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'pantry_items'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.pantry_items;
  END IF;

  -- Add pantry_products to realtime publication (compatibility)
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'pantry_products'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.pantry_products;
  END IF;

  -- Add alerts to realtime publication
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'alerts'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.alerts;
  END IF;

  -- Add notification_preferences to realtime publication
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'notification_preferences'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.notification_preferences;
  END IF;

  -- Add user_settings to realtime publication
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'user_settings'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.user_settings;
  END IF;

  -- Add shopping_list to realtime publication
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'shopping_list'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.shopping_list;
  END IF;

  -- Add meal_plans to realtime publication
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'meal_plans'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.meal_plans;
  END IF;

  -- Add activity_logs to realtime publication
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'activity_logs'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_logs;
  END IF;
END $$;


-- ==============================================================================
-- 8. UNIVERSAL REFERENCE SHELF-LIFE DATABASE (shelf_life_reference)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.shelf_life_reference (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  typical_shelf_life_days INTEGER NOT NULL,
  opened_shelf_life_days INTEGER,
  refrigerated_shelf_life_days INTEGER,
  frozen_shelf_life_days INTEGER,
  storage_type TEXT DEFAULT 'Cool & Dry Place',
  storage_recommendation TEXT,
  is_estimate BOOLEAN NOT NULL DEFAULT true,
  source_type TEXT NOT NULL DEFAULT 'general_estimate',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Ensure all columns exist idempotently
ALTER TABLE public.shelf_life_reference ADD COLUMN IF NOT EXISTS product_name TEXT;
ALTER TABLE public.shelf_life_reference ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.shelf_life_reference ADD COLUMN IF NOT EXISTS typical_shelf_life_days INTEGER;
ALTER TABLE public.shelf_life_reference ADD COLUMN IF NOT EXISTS opened_shelf_life_days INTEGER;
ALTER TABLE public.shelf_life_reference ADD COLUMN IF NOT EXISTS refrigerated_shelf_life_days INTEGER;
ALTER TABLE public.shelf_life_reference ADD COLUMN IF NOT EXISTS frozen_shelf_life_days INTEGER;
ALTER TABLE public.shelf_life_reference ADD COLUMN IF NOT EXISTS storage_type TEXT;
ALTER TABLE public.shelf_life_reference ADD COLUMN IF NOT EXISTS storage_recommendation TEXT;
ALTER TABLE public.shelf_life_reference ADD COLUMN IF NOT EXISTS is_estimate BOOLEAN DEFAULT true;
ALTER TABLE public.shelf_life_reference ADD COLUMN IF NOT EXISTS source_type TEXT DEFAULT 'general_estimate';

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_shelf_life_product ON public.shelf_life_reference (LOWER(product_name));
CREATE INDEX IF NOT EXISTS idx_shelf_life_category ON public.shelf_life_reference (LOWER(category));

-- Row Level Security: Publicly Readable Reference Data
ALTER TABLE public.shelf_life_reference ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view reference shelf life" ON public.shelf_life_reference;
CREATE POLICY "Anyone can view reference shelf life"
  ON public.shelf_life_reference FOR SELECT
  TO public
  USING (true);

-- Add shelf_life_reference to realtime publication
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'shelf_life_reference'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.shelf_life_reference;
  END IF;
END $$;

-- Populate Universal Reference Shelf-Life Database (Idempotent Upsert)
INSERT INTO public.shelf_life_reference (product_name, category, typical_shelf_life_days, opened_shelf_life_days, refrigerated_shelf_life_days, frozen_shelf_life_days, storage_type, storage_recommendation, is_estimate, source_type)
VALUES
  -- Dairy
  ('Fresh Milk', 'Dairy', 7, 5, 7, NULL, 'Refrigerator', 'Keep refrigerated below 4°C. Consume within 3–5 days after opening.', true, 'general_estimate'),
  ('UHT Milk', 'Dairy', 270, 7, 7, NULL, 'Pantry / Refrigerator after opening', 'Store unopened at room temperature. Refrigerate immediately after opening and consume within 3–7 days.', true, 'general_estimate'),
  ('Yogurt / Curd', 'Dairy', 28, 7, 28, NULL, 'Refrigerator', 'Keep refrigerated below 4°C. Consume within 3–7 days of opening.', true, 'general_estimate'),
  ('Cheese', 'Dairy', 90, 21, 90, 180, 'Refrigerator', 'Wrap tightly in parchment or wax paper; store in refrigerator drawer. Consume within 7–28 days.', true, 'general_estimate'),
  ('Butter', 'Dairy', 180, 30, 180, 365, 'Refrigerator', 'Store refrigerated in airtight butter dish or original wrapper; can be frozen up to 1 year.', true, 'general_estimate'),
  ('Paneer', 'Dairy', 7, 3, 7, 90, 'Refrigerator', 'Submerge in water in refrigerator and change water daily; consume within 2–3 days of opening.', true, 'general_estimate'),
  ('Ghee', 'Dairy', 365, 180, 365, NULL, 'Cool & Dry Place', 'Keep in a clean airtight container away from direct sunlight and moisture.', true, 'general_estimate'),

  -- Eggs
  ('Eggs', 'Eggs', 35, NULL, 35, NULL, 'Refrigerator', 'Store in original carton on an inside refrigerator shelf, not the door.', true, 'general_estimate'),

  -- Grains & Flours
  ('Rice', 'Grains', 365, 180, NULL, NULL, 'Cool & Dry Place', 'Store in a cool, dark, dry place in an airtight container to prevent pests.', true, 'general_estimate'),
  ('Wheat', 'Grains', 365, 180, NULL, NULL, 'Cool & Dry Place', 'Keep in airtight containers in a cool and dry pantry.', true, 'general_estimate'),
  ('Wheat Flour', 'Flour', 180, 90, 365, 730, 'Cool & Dry Place', 'Store in an airtight container in a dry cupboard or freezer to extend freshness.', true, 'general_estimate'),
  ('Oats', 'Grains', 365, 180, NULL, NULL, 'Cool & Dry Place', 'Keep tightly sealed in a dry pantry away from heat and moisture.', true, 'general_estimate'),
  ('Pasta', 'Dry Food', 730, 365, NULL, NULL, 'Cool & Dry Place', 'Store in dry airtight container away from moisture.', true, 'general_estimate'),
  ('Noodles', 'Dry Food', 365, 180, NULL, NULL, 'Cool & Dry Place', 'Keep in original packaging or sealed airtight container in pantry.', true, 'general_estimate'),

  -- Pulses & Legumes
  ('Dal', 'Pulses', 730, 365, NULL, NULL, 'Cool & Dry Place', 'Keep in an airtight jar in a cool, dark pantry. Protect from moisture.', true, 'general_estimate'),
  ('Lentils', 'Pulses', 730, 365, NULL, NULL, 'Cool & Dry Place', 'Store in airtight containers in a cool and dry cupboard.', true, 'general_estimate'),
  ('Dry Beans', 'Pulses', 730, 365, NULL, NULL, 'Cool & Dry Place', 'Keep sealed in airtight containers in a dry, ventilated area.', true, 'general_estimate'),

  -- Canned Food
  ('Canned Vegetables', 'Canned Food', 1095, 4, 4, NULL, 'Pantry / Refrigerator after opening', 'Store unopened in pantry. Once opened, transfer contents to glass/plastic container and refrigerate for 3–4 days.', true, 'general_estimate'),
  ('Canned Fruits', 'Canned Food', 1095, 4, 4, NULL, 'Pantry / Refrigerator after opening', 'Store unopened in pantry. Once opened, transfer contents to glass/plastic container and refrigerate for 3–4 days.', true, 'general_estimate'),
  ('Canned Meat', 'Canned Food', 1825, 4, 4, NULL, 'Pantry / Refrigerator after opening', 'Store unopened in pantry. Once opened, transfer contents to covered glass/plastic container and refrigerate for 3–4 days.', true, 'general_estimate'),

  -- Spices & Staples (Salt, Sugar, Honey: 1825+ days general long shelf life)
  ('Whole Spices', 'Spices', 1095, 730, NULL, NULL, 'Cool & Dry Place', 'Store in airtight glass or metal spice jars away from heat, steam, and direct light.', true, 'general_estimate'),
  ('Ground Spices', 'Spices', 730, 365, NULL, NULL, 'Cool & Dry Place', 'Store tightly sealed away from stove heat and humidity to retain aroma and potency.', true, 'general_estimate'),
  ('Salt', 'Staples', 1825, NULL, NULL, NULL, 'Cool & Dry Place', 'Keep dry in a tightly covered container. Non-perishable mineral; 1825+ days indefinite shelf life.', true, 'general_estimate'),
  ('Sugar', 'Staples', 1825, NULL, NULL, NULL, 'Cool & Dry Place', 'Store in an airtight container to keep out moisture, insects, and odors. 1825+ days indefinite shelf life.', true, 'general_estimate'),
  ('Honey', 'Sweeteners', 1825, NULL, NULL, NULL, 'Cool & Dry Place', 'Keep tightly capped at room temperature. Does not spoil; crystallization is natural and reversible with gentle warming.', true, 'general_estimate'),
  ('Cooking Oil', 'Oils', 730, 270, NULL, NULL, 'Cool & Dry Place', 'Keep tightly capped in a dark pantry cupboard away from stove heat.', true, 'general_estimate'),

  -- Condiments & Sauces
  ('Ketchup', 'Condiments', 365, 30, 180, NULL, 'Refrigerator', 'Refrigerate after opening to maintain flavor and prevent spoilage; consume within 30 days.', true, 'general_estimate'),
  ('Mayonnaise', 'Condiments', 180, 60, 60, NULL, 'Refrigerator', 'Always refrigerate immediately after opening; do not freeze. Consume within 30–60 days.', true, 'general_estimate'),
  ('Soy Sauce', 'Sauces', 1095, 365, 365, NULL, 'Cool & Dry / Refrigerator', 'Can be kept in cool pantry; refrigerating after opening preserves peak flavor for up to 1 year.', true, 'general_estimate'),
  ('Pickles', 'Condiments', 730, 90, 90, NULL, 'Refrigerator', 'Keep brine covering pickles. Refrigerate after opening and use a dry, clean spoon.', true, 'general_estimate'),

  -- Bakery & Snacks
  ('Bread', 'Bakery', 7, 7, 14, 90, 'Room Temperature', 'Store in a cool dry breadbox at room temperature. Freeze sliced loaf for up to 3 months.', true, 'general_estimate'),
  ('Biscuits', 'Snacks', 365, 30, NULL, NULL, 'Cool & Dry Place', 'Store in an airtight biscuit tin to prevent sogginess. Consume within 30 days.', true, 'general_estimate'),
  ('Cookies', 'Snacks', 365, 30, NULL, NULL, 'Cool & Dry Place', 'Keep in an airtight jar with a moisture-absorbent seal away from direct sunlight.', true, 'general_estimate'),
  ('Breakfast Cereal', 'Cereals', 365, 90, NULL, NULL, 'Cool & Dry Place', 'Roll inner bag tightly and clip shut or transfer to airtight cereal container.', true, 'general_estimate'),
  ('Chocolate', 'Snacks', 730, 30, NULL, NULL, 'Cool & Dry Place', 'Store between 15–18°C in a dry cupboard away from strong odors and heat.', true, 'general_estimate'),

  -- Nuts & Spreads
  ('Almonds', 'Nuts', 365, 90, 180, 365, 'Cool & Dry / Refrigerator', 'Keep in an airtight container; refrigerate or freeze to protect delicate natural oils from rancidity.', true, 'general_estimate'),
  ('Cashews', 'Nuts', 365, 90, 180, 365, 'Cool & Dry / Refrigerator', 'Store in sealed jar in a cool pantry or refrigerator to preserve freshness.', true, 'general_estimate'),
  ('Peanuts', 'Nuts', 180, 60, 180, 365, 'Cool & Dry Place', 'Store in airtight container in a cool, dark location.', true, 'general_estimate'),
  ('Peanut Butter', 'Spreads', 730, 180, 180, NULL, 'Cool & Dry / Refrigerator', 'Store in a cool dry pantry. Natural peanut butter without stabilizers should be refrigerated after opening.', true, 'general_estimate'),

  -- Beverages
  ('Coffee', 'Beverages', 365, 90, NULL, 730, 'Cool & Dry Place', 'Keep in an opaque, airtight canister at room temperature away from heat, light, and moisture.', true, 'general_estimate'),
  ('Tea', 'Beverages', 730, 365, NULL, NULL, 'Cool & Dry Place', 'Store loose leaf or tea bags in an airtight tin away from spices and moisture.', true, 'general_estimate'),
  ('Packaged Juice', 'Beverages', 365, 7, 7, NULL, 'Refrigerator after opening', 'Unopened in pantry; refrigerate immediately after breaking seal and consume within 5–7 days.', true, 'general_estimate'),
  ('Soft Drinks', 'Beverages', 365, 3, 3, NULL, 'Refrigerator after opening', 'Keep refrigerated after opening to preserve carbonation and flavor. Consume in 1–3 days.', true, 'general_estimate'),

  -- Vegetables
  ('Potatoes', 'Vegetables', 75, 5, NULL, NULL, 'Cool & Dark Place', 'Store in a well-ventilated basket in a cool, dark spot (not the fridge). Keep away from onions.', true, 'general_estimate'),
  ('Onions', 'Vegetables', 75, 10, 10, NULL, 'Cool & Dry Place', 'Store in open mesh bags or ventilated bin in dry room. Once cut, refrigerate in airtight container up to 10 days.', true, 'general_estimate'),
  ('Garlic', 'Vegetables', 135, 10, 10, NULL, 'Cool & Dry Place', 'Store whole bulbs at room temperature in open mesh bag. Peeled cloves must be refrigerated.', true, 'general_estimate'),
  ('Tomatoes', 'Vegetables', 7, 3, 7, NULL, 'Refrigerator', 'Store stem-side down. Unripe tomatoes can ripen at room temp; refrigerate fully ripe tomatoes.', true, 'general_estimate'),
  ('Carrots', 'Vegetables', 25, 5, 25, NULL, 'Refrigerator', 'Remove green tops, keep in perforated produce bag in vegetable crisper drawer.', true, 'general_estimate'),

  -- Fruits
  ('Apples', 'Fruits', 45, 5, 45, NULL, 'Refrigerator', 'Refrigerate in the crisper drawer. Keep separate from other produce as apples emit ethylene gas.', true, 'general_estimate'),
  ('Bananas', 'Fruits', 5, 2, 5, 60, 'Room Temperature / Refrigerator', 'Keep at room temperature until ripe. Peel and freeze overripe bananas for smoothies/baking.', true, 'general_estimate'),
  ('Oranges', 'Fruits', 21, 4, 21, NULL, 'Refrigerator', 'Can stay at room temp for 5 days or refrigerated in crisper drawer for up to 3 weeks.', true, 'general_estimate'),
  ('Grapes', 'Fruits', 10, 3, 10, 180, 'Refrigerator', 'Do not wash until ready to eat. Store unwashed in ventilated bag in the refrigerator.', true, 'general_estimate'),

  -- Meat & Seafood
  ('Raw Chicken', 'Meat', 2, 2, 2, 270, 'Refrigerator', 'Store on lowest refrigerator shelf to prevent drips. Cook within 1–2 days or freeze immediately.', true, 'general_estimate'),
  ('Raw Beef', 'Meat', 4, 4, 4, 365, 'Refrigerator', 'Keep refrigerated in cold meat drawer; cook or freeze within 3–5 days.', true, 'general_estimate'),
  ('Raw Fish', 'Seafood', 2, 2, 2, 180, 'Refrigerator', 'Keep on ice or coldest part of fridge; cook within 1–2 days or freeze immediately.', true, 'general_estimate'),
  ('Cooked Meat', 'Cooked Food', 4, 4, 4, 90, 'Refrigerator', 'Chill within 2 hours of cooking; store in shallow airtight container in fridge for up to 3–4 days.', true, 'general_estimate'),
  ('General Leftovers', 'Cooked Food', 4, 4, 4, 90, 'Refrigerator', 'Cool and refrigerate in airtight container within 2 hours. Consume within 3–4 days.', true, 'general_estimate'),

  -- Frozen Food
  ('Frozen Vegetables', 'Frozen Food', 365, 4, 4, 365, 'Freezer', 'Keep frozen at -18°C or colder. Seal bag tightly after each use to prevent freezer burn.', true, 'general_estimate'),
  ('Frozen Chicken', 'Frozen Food', 270, 2, 2, 270, 'Freezer', 'Wrap tightly to prevent air exposure; thaw only in refrigerator, never on counter.', true, 'general_estimate'),
  ('Frozen Meat', 'Frozen Food', 365, 4, 4, 365, 'Freezer', 'Store in heavy-duty freezer wrap or vacuum sealed bags at -18°C.', true, 'general_estimate'),
  ('Frozen Fish', 'Frozen Food', 180, 2, 2, 180, 'Freezer', 'Keep frozen until ready to cook. Best used within 3–6 months for optimal texture.', true, 'general_estimate')
ON CONFLICT (product_name) DO UPDATE SET
  category = EXCLUDED.category,
  typical_shelf_life_days = EXCLUDED.typical_shelf_life_days,
  opened_shelf_life_days = EXCLUDED.opened_shelf_life_days,
  refrigerated_shelf_life_days = EXCLUDED.refrigerated_shelf_life_days,
  frozen_shelf_life_days = EXCLUDED.frozen_shelf_life_days,
  storage_type = EXCLUDED.storage_type,
  storage_recommendation = EXCLUDED.storage_recommendation,
  updated_at = timezone('utc'::text, now());
