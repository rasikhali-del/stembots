# Stembots Education Platform Requirements Document

## 1. Application Overview

### 1.1 Application Name
Stembots
\n### 1.2 Application Description
A modern, animated education platform website offering STEM-related courses and learning programs. The platform targets young learners with a professional, creative, and youth-focused design featuring smooth animations and transitions.

### 1.3 Core Purpose
Provide an engaging online platform for STEM education, showcasing courses in Robotics, AI, Coding, and STEM Kits, while enabling communication through contact forms and administrative content management.

## 2. Website Pages

### 2.1 Home Page
**Purpose**: Brand introduction and user engagement

**Content Requirements**:
- Hero section with animated headline: \"Empowering Young Minds Through STEM Education\"
- Featured programs section displaying: Robotics, AI, Coding, STEM Kits
- Instagram-inspired content sections with cards/highlights
- Call-to-Action buttons: \"Explore Courses\" and \"Contact Us\"
- Smooth scroll animations throughout the page

**Animation Requirements**:
- Fade-in effects
- Slide-up animations
- Hover effects on interactive elements
- Page-load transitions

### 2.2 Courses Page
**Purpose**: Display all educational offerings

**Content Requirements**:
- Course cards containing:
  - Course title
  - Short description
  - Age group
  - Category (Robotics / Coding / AI / STEM)\n- Animated filter functionality
- \"Enroll Now\" button (information-based, non-payment)

**Animation Requirements**:
- Hover micro-interactions on course cards
- Smooth filter transitions
\n### 2.3 About Page
**Purpose**: Build trust and communicate mission

**Content Requirements**:
- About Stembots section
- Vision and mission statements
- STEM education importance explanation
- Team/mentors section
\n**Animation Requirements**:
- Animated timeline or card presentations
\n### 2.4 Contact Us Page
**Purpose**: Enable communication with users

**Content Requirements**:
- Contact form with fields: Name, Email, Message
- Google Map placeholder
- Social media links
- Form submissions stored in database
\n**Animation Requirements**:
- Animated submit feedback
\n### 2.5 Admin Panel\n**Purpose**: Secure administrative access for content management

**Access Requirements**:
- Hidden route (e.g., /admin)
- JWT-protected authentication
- Admin login only (no public signup)
\n**Functionality**:
- View contact form messages
- Edit course content\n- Update homepage text
\n## 3. Design Requirements

### 3.1 Visual Style
- Education-focused color palette\n- Modern typography
- Soft shadows for depth
- Clean, organized layout
- Unique UI design (original, not template-based)

### 3.2 Animation & Interaction
- Smooth page transitions using Framer Motion
- Animated navbar\n- Animated footer
- Micro-interactions on hover states
- Responsive animations across all devices

### 3.3 Responsive Design
- Mobile-first approach
- Fully responsive across all screen sizes
\n## 4. Functional Requirements

### 4.1 Contact Form
- Collect user information: Name, Email, Message
- Store submissions in MongoDB database
- Provide visual feedback upon submission
\n### 4.2 Admin Authentication
- JWT-based authentication system
- Password hashing using bcrypt
- Protected admin routes
- Session management\n
### 4.3 Admin Content Management
- View and manage contact form submissions
- Edit course information (title, description, age group, category)\n- Update homepage content and text
\n## 5. Reference Content

### 5.1 Content Source
- Instagram account: @stem.bots
- Use educational theme, tone, and information from this source
\n### 5.2 Layout Inspiration
- Reference: Nurture template style layout structure
- Implementation: Original code with unique styling and custom branding
- Note: Do not copy code; re-implement with original UI components

## 6. Database Schema

### 6.1 Contact Messages Collection
- Name (String)
- Email (String)
- Message (Text)
- Submission timestamp\n\n### 6.2 Admin Users Collection
- Username (String)\n- Hashed password (String)
- Role (Admin)\n\n### 6.3 Courses Collection
- Course title (String)
- Description (Text)
- Age group (String)
- Category (String: Robotics/Coding/AI/STEM)\n\n### 6.4 Homepage Content Collection
- Section identifier (String)
- Content text (Text)
- Last updated timestamp

## 7. API Routes

### 7.1 Public Routes
- GET /api/courses - Retrieve all courses
- POST /api/contact - Submit contact form
- GET /api/homepage - Retrieve homepage content
\n### 7.2 Admin Routes (Protected)
- POST /api/admin/login - Admin authentication
- GET /api/admin/messages - Retrieve contact messages
- PUT /api/admin/courses/:id - Update course information
- PUT /api/admin/homepage - Update homepage content

## 8. Deployment Requirements

### 8.1 Deliverables
- Complete frontend code
- Complete backend code
- MongoDB schemas
- API route implementations
- Admin authentication logic\n- Animation and transition implementations
- Deployment instructions documentation