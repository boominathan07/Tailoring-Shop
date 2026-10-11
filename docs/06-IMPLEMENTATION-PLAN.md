# Guru Tailoring --- Implementation Plan

**Version:** V1.0\
**Status:** Ready for implementation planning\
**Stack:** MERN

## 1. Implementation Principle

Build in small vertical slices.

Each phase should produce a working part of the product.

Do not build every backend model first and leave the application
disconnected for a long period.

## 2. Phase 0 --- Project Setup

### Backend

-   Initialize Node.js project
-   Configure Express
-   Configure environment variables
-   Configure MongoDB connection
-   Configure error handling
-   Configure request logging
-   Configure CORS
-   Configure security middleware

### Frontend

-   Initialize React application
-   Configure routing
-   Configure API client
-   Configure global UI tokens
-   Configure responsive layout system

### Repository

Recommended:

``` text
root/
├── client/
├── server/
├── docs/
└── README.md
```

## 3. Phase 1 --- Authentication

Implement: - Admin login - Password hashing - Secure session/JWT
strategy - Auth middleware - Admin role middleware - Protected admin
routes - Logout - Auth state restoration

Test: - Valid login - Invalid login - Unauthenticated admin access -
Non-admin access - Logout

## 4. Phase 2 --- Database Models

Implement Mongoose models: - User - Design - Service - Work - Enquiry -
CustomRequest - BusinessSettings

Add: - Validation - Indexes - Status enums - Timestamps

Create the initial admin account through a secure seed/setup process.

## 5. Phase 3 --- Public Content APIs

Implement read APIs:

``` text
GET /api/designs
GET /api/designs/:slug

GET /api/services
GET /api/services/:slug

GET /api/works
GET /api/works/:slug
```

Rules: - Public endpoints return published content only - Pagination
supported - Filters where required - No internal fields exposed

## 6. Phase 4 --- Admin Content APIs

Implement authenticated APIs for:

### Designs

-   Create
-   Update
-   Publish
-   Unpublish
-   Archive
-   Restore

### Services

-   Create
-   Update
-   Publish
-   Unpublish
-   Archive
-   Restore

### Work

-   Create
-   Update
-   Publish
-   Unpublish
-   Archive
-   Restore

## 7. Phase 5 --- Image Upload

Choose and configure an external image/object storage provider.

Implement: - Upload - Validation - Metadata storage - Primary image
selection - Delete/remove uploaded image where appropriate -
Optimization

Do not store image binaries in MongoDB.

## 8. Phase 6 --- Public Website Integration

Connect the approved UI to APIs.

Implement: - Home content - Designs - Design details - Services -
Service details - Our Work - Work details - WhatsApp actions

Handle: - Loading - Empty - Error - Not found - Pagination

## 9. Phase 7 --- Enquiries

Backend: - Create enquiry API - Get admin enquiries - Get enquiry
details - Update status

Frontend: - Enquiry form - Success state - Admin enquiry list - Admin
enquiry detail - Status updates

Add rate limiting and validation to public submission.

## 10. Phase 8 --- Custom Requests

Backend: - Create request - Upload references - Admin list - Admin
detail - Status update

Frontend: - Custom design form - Reference upload - Validation - Success
state - Admin management

## 11. Phase 9 --- WhatsApp Integration

Centralize WhatsApp number configuration.

Implement contextual links for: - Design enquiry - Service enquiry -
Similar work enquiry - General contact

Example message:

`Hi, I am interested in the Bridal Zari Blouse design.`

## 12. Phase 10 --- Admin Frontend

Connect approved Stitch designs.

Order: 1. Admin shell/sidebar 2. Login 3. Dashboard 4. Enquiries 5.
Custom Requests 6. Designs 7. Add/Edit Design 8. Services 9. Add/Edit
Service 10. Our Work 11. Add/Edit Work 12. Settings

Use the exact approved sidebar model across all admin screens.

## 13. Phase 11 --- Business Settings

Implement: - Get settings - Update settings - Business hours - WhatsApp
number - Address - Website information - Optional social links

Public site consumes these settings.

## 14. Phase 12 --- Validation & UX Polish

Review every important state:

### Loading

-   Lists
-   Detail pages
-   Forms

### Empty

-   No designs
-   No services
-   No work
-   No enquiries
-   No custom requests

### Error

-   API failure
-   Validation
-   Upload failure
-   Unauthorized
-   Not found

### Success

-   Created
-   Updated
-   Published
-   Archived
-   Enquiry submitted
-   Request submitted

## 15. Phase 13 --- Responsive QA

Test: - Desktop - Tablet - Mobile

Verify: - No horizontal overflow - Sidebar behavior - Mobile drawer -
Cards - Forms - Buttons - Pagination - Modals - Image grids

## 16. Phase 14 --- Security QA

Verify: - Admin routes are protected - Role checks work - Passwords are
hashed - Cookies/tokens are secure - Public endpoints do not leak admin
data - Upload validation works - Rate limits work - Environment secrets
are not committed

## 17. Phase 15 --- Production Readiness

Prepare: - Production environment variables - MongoDB production
database - Image storage - Frontend deployment - Backend deployment -
HTTPS - CORS - Domain - Error monitoring/logging

## 18. Phase 16 --- Acceptance Testing

### Customer acceptance

A customer can: - Open website - Browse designs - View design details -
Browse services - View completed work - Submit enquiry - Submit custom
request - Open WhatsApp

### Admin acceptance

Admin can: - Login - Add/edit/publish designs - Add/edit/publish
services - Add/edit/publish work - View enquiries - Update enquiry
status - View custom requests - Update request status - Update business
settings

## 19. Recommended Build Order

The practical coding order is:

``` text
1. Project setup
2. MongoDB + configuration
3. Admin authentication
4. Core models
5. Image storage
6. Designs API + UI
7. Services API + UI
8. Our Work API + UI
9. Public website integration
10. Enquiries
11. Custom Requests
12. WhatsApp
13. Settings
14. Responsive/accessibility QA
15. Security QA
16. Deployment
```

## 20. Definition of Done

A feature is not complete when its screen exists.

A feature is complete when:

``` text
UI
↓
API
↓
Database
↓
Validation
↓
Loading state
↓
Error state
↓
Success state
↓
Responsive behavior
↓
Accessibility
↓
Security
```

all work together.

## 21. V1 Completion Boundary

Once the following work:

-   Public catalogue
-   Services
-   Our Work
-   Enquiries
-   Custom Requests
-   WhatsApp
-   Admin management
-   Settings
-   Authentication

is working end-to-end, stop adding features.

Deploy and collect real business feedback before expanding the product.
