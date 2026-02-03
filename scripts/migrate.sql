-- AgoraMinds waitlist table migration
-- Run once via Neon console or psql

CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('individual','nonprofit')),
  organization_name VARCHAR(255),
  motivation TEXT,
  referral_source VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add organization_name if upgrading from previous schema
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS organization_name VARCHAR(255);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist (email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created ON waitlist (created_at DESC);
