# Supabase Setup for Waitlist

## Database Table

Create a table called `waitlist` with the following schema:

```sql
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  interest TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies (optional but recommended)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Prevent anonymous reads (admin only)
CREATE POLICY "Admin only reads" ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);
```

## Environment Variables

Add these to your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Getting Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy your Project URL (this is your `NEXT_PUBLIC_SUPABASE_URL`)
4. Copy your anon/public key (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Features

- Email collection with optional interest field
- Duplicate email handling (shows friendly message instead of error)
- Clean success and error states
- No email sending configured (emails are only stored for now)