# 🔧 Supabase Database Setup Guide

## ⚠️ Problem
```
GET https://dpzxrleaxctcetybowkt.supabase.co/rest/v1/profiles 404 (Not Found)
```
**Matlab:** Profiles table Supabase ma nahi hai!

---

## ✅ Solution - Database Setup (5 minutes)

### Step 1: Supabase Console Kholо
1. Jao: https://app.supabase.com
2. Apna project select karo
3. Left sidebar ma "SQL Editor" click karo

### Step 2: Tables Create Karo
1. "New Query" button click karo
2. File se SQL code copy karo: `SUPABASE_SETUP_COMPLETE.sql`
3. Entire code ko paste karo SQL editor ma
4. **Execute** button click karo ▶️

### Step 3: Wait Karo
- Query execute hone ke liye 30 seconds wait karo
- Success message dikhe to ✅ hogaya!

---

## 📋 What Gets Created

### Tables:
1. **profiles** - User profiles & roles
2. **courses** - STEM courses (8 sample courses included)
3. **contact_messages** - Contact form submissions
4. **homepage_content** - Website content
5. **course_reviews** - Course reviews & ratings

### Sample Data:
- ✅ 8 courses (Robotics, Coding, AI, Leadership)
- ✅ Homepage content (Mission, Vision)
- ✅ RLS policies (Row Level Security)

---

## 🎯 Quick Copy-Paste Method

### Option 1: File se (Recommended)
```
1. Open: SUPABASE_SETUP_COMPLETE.sql
2. Copy entire content
3. Paste in Supabase SQL Editor
4. Execute
```

### Option 2: Minimal Setup (If file nahi mila)
```sql
-- Profiles table sirf
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
```

---

## ✨ After Setup

### Now Available:
- ✅ Admin Login (`/admin-login`)
- ✅ Admin Dashboard (`/admin`)
- ✅ Manage Courses
- ✅ Contact Form with email
- ✅ Course Reviews & Ratings

### Test It:
1. Go to `/admin-login`
2. Email: `admin@stembots.com`
3. Password: `Stembots@2026`
4. Click courses, messages tabs

---

## 🐛 Troubleshooting

### Still Getting 404?
1. Check SQL execution completed
2. Refresh page (Ctrl+R)
3. Clear browser cache (Ctrl+Shift+Delete)

### Tables exist but no data?
- Run the "INSERT SAMPLE DATA" section again
- Or just add one course manually in admin panel

### Auth issues?
- Make sure you have Supabase auth enabled
- Check project settings → Authentication

---

## 📊 Database Schema Summary

```
Profiles
├─ id (UUID)
├─ username
├─ email
├─ role (user | admin)
└─ timestamps

Courses
├─ id (UUID)
├─ title, description
├─ age_group, category
├─ image_url
└─ timestamps

Contact Messages
├─ id (UUID)
├─ name, email, phone
├─ message
└─ created_at

Course Reviews
├─ id (UUID)
├─ course_id (FK)
├─ student_name, rating (1-5)
├─ review_text
└─ created_at

Homepage Content
├─ id (UUID)
├─ section_id (unique)
├─ content
└─ updated_at
```

---

## 🚀 After Tables Are Created

**Website will automatically work:**
- Admin dashboard loads
- Courses display with reviews
- Contact form sends messages
- All features functional!

---

## 💡 Questions?

If anything fails:
1. Check console errors
2. Make sure all SQL executed
3. Verify Supabase project is correct
4. Check RLS policies are created

**That's it! Database setup complete in 5 minutes! 🎉**
