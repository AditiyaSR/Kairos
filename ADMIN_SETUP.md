# 🔐 Kairos AI Admin Portal - Secure Access Guide

## Overview

The admin panel has been moved to a **dedicated password-protected page** at `/admin`.

✅ **Benefits:**
- ✅ Admin panel NOT visible to public users
- ✅ Password-protected access only
- ✅ Settings button removed from landing page
- ✅ Secure login page with professional UI

---

## 🚀 How to Access Admin Panel

### Local Development:
1. Visit: **http://localhost:3000/admin**
2. Enter password: See `.env.local` file
3. Manage all site content

### Production (Vercel):
1. Visit: **https://your-domain.vercel.app/admin**
2. Enter password
3. Manage content

---

## 🔑 Security Setup

### Change Admin Password

Edit `.env.local` file:

```env
# .env.local
NEXT_PUBLIC_ADMIN_PASSWORD=YourNewSecurePassword123!
```

**Password Requirements:**
- ✅ At least 12 characters (recommended)
- ✅ Mix of letters, numbers, and symbols
- ✅ No spaces
- ✅ Unique and strong

### Example Strong Passwords:
```
Kairos@Dubai2024!secure
AdminPanel#Kairos$2024
SecureAccess123!AiPanel
```

---

## 📱 Admin Portal Features

Once logged in, you can:

### 1. **Dashboard**
   - View overall site statistics
   - Quick access to all sections

### 2. **Content Management**
   - Hero section (headline, CTA text)
   - Problem section
   - Solution section
   - Case study data

### 3. **Services**
   - Add/edit/delete services
   - Upload icons
   - Manage features

### 4. **Testimonials**
   - Add/edit/delete testimonials
   - Star ratings
   - Author info

### 5. **FAQs**
   - Manage FAQ items
   - Edit questions & answers

### 6. **Contact Submissions**
   - View all contact form submissions
   - Track lead information

### 7. **Settings**
   - Update site metadata
   - Configure general settings

---

## 🔒 Vercel Environment Variables

### Step 1: Add to Vercel Dashboard

Go to: **Dashboard → Project Settings → Environment Variables**

Add the following:

```
Key: NEXT_PUBLIC_ADMIN_PASSWORD
Value: YourSecurePassword123!
Environments: Production, Preview, Development
```

### Step 2: Save and Redeploy

1. Click **Save**
2. Vercel will automatically redeploy
3. Wait for deployment to complete

---

## 📄 File Structure

```
src/app/
├── page.tsx          # Landing page (admin panel hidden)
├── admin/
│   └── page.tsx      # Admin login & panel page (NEW)
├── api/
│   ├── services/
│   ├── testimonials/
│   ├── faqs/
│   ├── contacts/
│   └── content/
└── layout.tsx
```

---

## 🔄 Admin Panel Features

### Session Management
- **Auto-logout**: Session persists during browser session
- **Logout button**: Click "Logout" to exit
- **localStorage**: Auth status stored locally

### Data Persistence
- All changes saved to database instantly
- Changes appear on landing page automatically
- No page refresh needed

### Real-time Updates
- Forms submit without page reload
- Instant feedback on success/error
- Toast notifications

---

## 🛡️ Security Best Practices

✅ **DO:**
- ✅ Use strong, unique passwords
- ✅ Change password regularly
- ✅ Log out after editing
- ✅ Use HTTPS only (Vercel handles this)

❌ **DON'T:**
- ❌ Share admin password
- ❌ Commit password to GitHub
- ❌ Use weak passwords
- ❌ Leave admin portal open unattended

---

## 🚨 Troubleshooting

### "Invalid password" Error
- ✅ Check `.env.local` file
- ✅ Ensure password matches exactly
- ✅ Check for spaces before/after password

### Can't access `/admin` page
- ✅ Verify dev server is running
- ✅ Check browser console for errors
- ✅ Restart dev server: `npm run dev`

### Changes not saving
- ✅ Check internet connection
- ✅ Verify API routes are working
- ✅ Check browser console for errors

### Password reset
- ✅ Edit `.env.local` with new password
- ✅ Restart dev server
- ✅ For Vercel: Update env var in dashboard

---

## 📊 Admin Portal Sections

### 1. Services Management
```
✓ Add new service
✓ Edit service details
✓ Change service icon
✓ Update feature list
✓ Delete service
✓ Reorder services
```

### 2. Testimonials Management
```
✓ Add new testimonial
✓ Edit author name/role
✓ Update star rating
✓ Change testimonial text
✓ Delete testimonial
✓ Reorder testimonials
```

### 3. FAQs Management
```
✓ Add new FAQ
✓ Edit question
✓ Update answer
✓ Delete FAQ
✓ Reorder FAQs
```

### 4. Content Editor
```
✓ Edit hero headline
✓ Update CTA text
✓ Change section titles
✓ Modify descriptions
✓ Update all copy
```

---

## 🌐 Deployment Checklist

- [ ] Change admin password in `.env.local`
- [ ] Update password in Vercel dashboard
- [ ] Test admin login on production
- [ ] Verify landing page hides admin elements
- [ ] Test all CRUD operations
- [ ] Verify database persists changes
- [ ] Check mobile responsiveness

---

## 📞 Support

If you encounter issues:

1. **Check browser console**: F12 → Console tab
2. **Verify environment variables**: `.env.local` or Vercel dashboard
3. **Test API routes**: Open `/api/content` in browser
4. **Restart server**: Stop and run `npm run dev` again
5. **Check database**: Ensure Prisma is synced

---

## 🔐 Password Storage

### Local Development:
```env
# .env.local (DO NOT commit to Git)
NEXT_PUBLIC_ADMIN_PASSWORD=YourPassword123!
```

### Production (Vercel):
```
Dashboard → Settings → Environment Variables
Add NEXT_PUBLIC_ADMIN_PASSWORD
```

---

## ⚡ Quick Access

- **Landing Page**: https://localhost:3000
- **Admin Login**: https://localhost:3000/admin
- **API Routes**: https://localhost:3000/api/[route]
- **Vercel Dashboard**: https://vercel.com/dashboard

---

**Your admin portal is now secure and hidden from public view!** 🎉
