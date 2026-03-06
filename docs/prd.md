# Stembots Education Platform Requirements Document

## 1. Application Overview

### 1.1 Application Name
Stembots

### 1.2 Application Description\nA modern, animated education platform website offering STEM-related courses and learning programs. The platform targets young learners with a professional, creative, and youth-focused design featuring smooth animations and transitions.

### 1.3 Core Purpose
Provide an engaging online platform for STEM education, showcasing courses in Robotics, AI, Coding, and STEM Kits, while enabling communication through contact forms and administrative content management.\n
## 2. Website Pages

### 2.1 Home Page
**Purpose**: Brand introduction and user engagement\n
**Content Requirements**:\n- Hero section with animated headline: \"Empowering Young Minds Through STEM Education\"
- High-quality professional background image (arts/creative/education-related, visually appealing and modern)
- Dark overlay or gradient applied to background image to ensure text readability
- Background image optimized for fast loading without quality loss
- Featured programs section displaying: Robotics, AI, Coding, STEM Kits
- Instagram-inspired content sections with cards/highlights
- Call-to-Action buttons: \"Explore Courses\" and \"Contact Us\"
- Smooth scroll animations throughout the page
\n**Animation Requirements**:
- Fade-in effects
- Slide-up animations
- Hover effects on interactive elements
- Page-load transitions
\n### 2.2 Courses Page
**Purpose**: Display all educational offerings

**Content Requirements**:
- Course cards containing:
  - Course title\n  - Short description
  - Age group
  - Category (Robotics / Coding / AI / STEM)
- Animated filter functionality
- \"Enroll Now\" button with WhatsApp redirect functionality

**WhatsApp Redirect Requirements**:
- When user clicks on any course card or \"Enroll\" button, redirect to WhatsApp chat
- Use WhatsApp deep link format: https://wa.me/?text=\n- Auto-populated message must include:
  - Course name\n  - Website name (STEMBOTS)
  - Inquiry intent (e.g., \"I want to enroll in this course\")
- Ensure smooth functionality on both desktop and mobile devices

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

### 2.4 Contact Us Page
**Purpose**: Enable communication with users

**Content Requirements**:
- Contact form with fields: Name, Email, Message
- Google Map placeholder\n- Social media links
- Form submissions stored in database
\n**Animation Requirements**:
- Animated submit feedback

### 2.5 Admin Panel
**Purpose**: Secure administrative access for content management

**Access Requirements**:
- Hidden route (e.g., /admin)
- JWT-protected authentication\n- Admin login only (no public signup)

**Functionality**:
- View contact form messages
- Edit course content
- Update homepage text

## 3. Design Requirements

### 3.1 Visual Style
- Education-focused color palette
- Modern typography\n- Soft shadows for depth\n- Clean, organized layout
- Unique UI design (original, not template-based)

### 3.2 Animation & Interaction
- Smooth page transitions using Framer Motion
- Animated navbar
- Animated footer
- Micro-interactions on hover states
- Responsive animations across all devices
\n### 3.3 Responsive Design
- Mobile-first approach
- Fully responsive across all screen sizes

## 4. Functional Requirements

### 4.1 Contact Form
- Collect user information: Name, Email, Message\n- Store submissions in MongoDB database\n- Provide visual feedback upon submission

### 4.2 Admin Authentication
- JWT-based authentication system
- Password hashing using bcrypt
- Protected admin routes
- Session management

### 4.3 Admin Content Management
- View and manage contact form submissions
- Edit course information (title, description, age group, category)
- Update homepage content and text
\n### 4.4 WhatsApp Integration
- Implement WhatsApp deep link redirect on Courses page
- Auto-generate message with course details and inquiry intent
- Ensure cross-device compatibility (desktop and mobile)

## 5. Reference Content

### 5.1 Content Source\n- Instagram account: @stem.bots
- Use educational theme, tone, and information from this source

### 5.2 Layout Inspiration
- Reference: Nurture template style layout structure
- Implementation: Original code with unique styling and custom branding\n- Note: Do not copy code; re-implement with original UI components

## 6. Database Schema

### 6.1 Contact Messages Collection\n- Name (String)
- Email (String)
- Message (Text)
- Submission timestamp\n
### 6.2 Admin Users Collection
- Username (String)
- Hashed password (String)
- Role (Admin)

### 6.3 Courses Collection
- Course title (String)
- Description (Text)
- Age group (String)
- Category (String: Robotics/Coding/AI/STEM)

### 6.4 Homepage Content Collection
- Section identifier (String)
- Content text (Text)\n- Last updated timestamp
\n## 7. API Routes\n
### 7.1 Public Routes
- GET /api/courses - Retrieve all courses
- POST /api/contact - Submit contact form
- GET /api/homepage - Retrieve homepage content

### 7.2 Admin Routes (Protected)\n- POST /api/admin/login - Admin authentication
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
- WhatsApp redirect functionality
- Optimized background image implementation
- Deployment instructions documentation