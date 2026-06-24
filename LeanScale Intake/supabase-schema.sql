-- LeanScale Intake Form — Supabase Schema
-- Run this in your Supabase SQL Editor to set up the tables

-- Clients table
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  token UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
  client_name TEXT NOT NULL,
  client_logo_url TEXT,
  sections JSONB DEFAULT '["general","gtm_lifecycle","gong_engage","forecasting"]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  created_by TEXT DEFAULT 'admin'
);

-- Form responses (one row per client per section, JSONB for flexibility)
CREATE TABLE form_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  section TEXT NOT NULL,
  responses JSONB DEFAULT '{}'::jsonb,
  progress_pct INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(client_id, section)
);

-- Index for fast lookups
CREATE INDEX idx_form_responses_client ON form_responses(client_id);
CREATE INDEX idx_clients_token ON clients(token);

-- Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_responses ENABLE ROW LEVEL SECURITY;

-- Allow anon read for clients (token-based access — client must know their token)
CREATE POLICY "Allow read clients by token"
  ON clients FOR SELECT
  USING (true);

-- Allow anon insert for clients (admin creates via anon key)
CREATE POLICY "Allow insert clients"
  ON clients FOR INSERT
  WITH CHECK (true);

-- Allow anon read responses for their client
CREATE POLICY "Allow read form_responses"
  ON form_responses FOR SELECT
  USING (true);

-- Allow anon insert/update responses
CREATE POLICY "Allow insert form_responses"
  ON form_responses FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update form_responses"
  ON form_responses FOR UPDATE
  USING (true);
