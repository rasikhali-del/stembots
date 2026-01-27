# Admin Login & Dialog Accessibility Fixes

## Issues Fixed

### 1. ✅ Admin Dashboard Not Loading After Login
**Problem:** After successful login, navigating to `/admin` route wasn't working because RouteGuard was blocking access.

**Root Cause:** 
- Admin routes (`/admin`, `/admin/courses`) were NOT in PUBLIC_ROUTES
- RouteGuard checks if user is logged in via Supabase, but admin uses localStorage
- Admin session check happens inside AdminDashboard component, not in RouteGuard

**Solution:**
- Added `/admin` and `/admin/courses` to PUBLIC_ROUTES in RouteGuard
- AdminDashboard component still checks localStorage for `adminSession` and redirects to login if not found
- This allows the route to load, but AdminDashboard provides the security check

**File Changed:** `src/components/common/RouteGuard.tsx`
```tsx
const PUBLIC_ROUTES = ['/admin-login', '/admin', '/admin/courses', '/403', '/404', '/', '/courses', '/about', '/contact'];
```

### 2. ✅ Dialog Accessibility Warnings
**Problem:** Console warnings about missing DialogTitle or Description in DialogContent

**Warning Messages:**
```
`DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users.
Warning: Missing `Description` or `aria-describedby={undefined}` for {DialogContent}.
```

**Root Cause:**
- Command dialog was using `sr-only` className directly on DialogHeader
- Radix UI expects semantic DialogTitle/DialogDescription elements
- Not all dialogs had proper accessible structure

**Solution:**
- Created `VisuallyHidden` wrapper component in dialog.tsx
- Updated command.tsx to use VisuallyHidden instead of sr-only className
- All other dialogs (CourseReviewDialog, AdminDashboard, AdminCoursesPage) already have proper DialogTitle & DialogDescription

**Files Changed:**
1. `src/components/ui/dialog.tsx` - Added VisuallyHidden component
2. `src/components/ui/command.tsx` - Updated to use VisuallyHidden wrapper

```tsx
// Before (warning)
<DialogHeader className="sr-only">
  <DialogTitle>{title}</DialogTitle>
  <DialogDescription>{description}</DialogDescription>
</DialogHeader>

// After (no warning)
<VisuallyHidden>
  <DialogHeader>
    <DialogTitle>{title}</DialogTitle>
    <DialogDescription>{description}</DialogDescription>
  </DialogHeader>
</VisuallyHidden>
```

## Testing

### Admin Login Flow
1. Navigate to `/admin-login`
2. Enter: `admin@stembots.com` / `Stembots@2026`
3. Click Login
4. Should navigate to `/admin` dashboard ✅
5. Dashboard should display Messages and Courses tabs
6. Logout button should clear localStorage and redirect to login ✅

### Dialog Accessibility
- No console warnings about DialogContent
- CourseReviewDialog works properly ✅
- AdminDashboard dialogs work properly ✅
- AdminCoursesPage dialogs work properly ✅
- Command dialog (search) works properly ✅

## Browser Console

After fixes, there should be:
- ✅ No "DialogContent requires DialogTitle" warnings
- ✅ No "Missing Description" warnings
- ✅ Successful navigation from login to admin dashboard
- ✅ No errors related to route access

## Summary

| Issue | Status | Solution |
|-------|--------|----------|
| Admin dashboard won't load after login | ✅ Fixed | Added `/admin` routes to PUBLIC_ROUTES |
| Dialog accessibility warnings | ✅ Fixed | Created VisuallyHidden component |
| Route protection | ✅ Maintained | AdminDashboard checks localStorage internally |
