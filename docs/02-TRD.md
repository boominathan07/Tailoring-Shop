# Guru Tailoring --- Technical Requirements Document (TRD)

**Version:** V1.0\
**Status:** Working baseline\
**Stack:** MERN

## 1. Technical Objective

Build a maintainable MERN application with: - Public customer-facing
website - Protected admin application - REST API backend - MongoDB
database - Secure admin authentication - Image upload/storage - WhatsApp
deep-link integration - Responsive UI

## 2. Architecture

Recommended structure:

`Browser → React Frontend → Express/Node API → MongoDB`

External services: - Image storage provider - WhatsApp

Keep business logic on the backend, not in the React client.

## 3. Frontend

Use React.

Responsibilities: - Public pages - Admin pages - Forms - Client-side
validation - Loading/error/empty states - API integration - Protected
admin routes - Responsive behavior

The frontend must never be the source of truth for authorization.

## 4. Backend

Use Node.js + Express.

Responsibilities: - Authentication - Authorization - Validation - CRUD
APIs - Pagination - Publish/unpublish/archive rules - Enquiry handling -
Custom request handling - Settings - Image metadata handling -
Consistent errors

## 5. Database

Use MongoDB with Mongoose.

Core collections: - User - Design - Service - Work - Enquiry -
CustomRequest - BusinessSettings

No customer-auth collection is required for V1.

## 6. Authentication

Admin authentication only in V1.

Recommended approach: - Email/password login - Password hashing with
bcrypt/Argon2 - Secure HTTP-only cookie containing session/JWT - Backend
authorization middleware - Role check for admin routes

Never accept `role=admin` from public registration.

## 7. Authorization

Public endpoints: - Published designs - Published services - Published
work - Enquiry submission - Custom request submission

Admin endpoints: - CRUD management - Publish/unpublish/archive - Enquiry
management - Custom request management - Settings - Authentication

## 8. API Principles

Use RESTful routes.

Example: - `GET /api/designs` - `GET /api/designs/:id` -
`POST /api/admin/designs` - `PATCH /api/admin/designs/:id` -
`POST /api/admin/designs/:id/publish` -
`POST /api/admin/designs/:id/archive`

Use consistent response and error structures.

## 9. Validation

Validate on both: - Frontend for user experience - Backend for
security/data integrity

Required fields must be enforced server-side.

Phone numbers should support Indian numbers.

Uploaded files must be validated for: - Type - Size - Count where
applicable

## 10. Image Handling

Do not store large image binaries directly in MongoDB.

Use an external object/image storage provider.

Store metadata such as: - URL - Public ID/key - Width - Height - Alt
text - Primary flag

Images must be optimized for web delivery.

## 11. Pagination

Public and admin catalogue endpoints should support pagination.

Default page size should be small enough for performance.

Example: `GET /api/designs?page=1&limit=12`

Services and portfolio grids should not load unlimited records.

## 12. Content Status

Content entities use: - Draft - Published - Archived

Public APIs return published content only.

Admin APIs can query all required statuses.

Unpublishing must not delete content.

## 13. Enquiry Rules

An enquiry must retain: - Customer name - Phone - Message - Related
content reference when applicable - Status - Created/updated timestamps

Admin status changes must be server validated.

## 14. Custom Request Rules

A custom request may contain: - Customer name - Phone - Garment type -
Requirements - Preferred date - Reference image metadata - Status

Reference uploads must use the same secure upload rules as other images.

## 15. WhatsApp

Generate WhatsApp links on the client/server using the configured
business number.

Do not hardcode the number in multiple frontend components.

The number should come from BusinessSettings or controlled
configuration.

## 16. Security

Required: - Password hashing - HTTP-only secure cookies - CORS
configuration - Input validation - Rate limiting for public submission
endpoints - File validation - Authorization middleware - Environment
variables for secrets - No secrets committed to Git - Safe error
messages - Mongo query/input sanitization where appropriate

## 17. Error Handling

Use consistent API errors:

``` json
{
  "success": false,
  "message": "Human-readable message",
  "code": "VALIDATION_ERROR"
}
```

Never expose stack traces or secrets to clients in production.

## 18. Logging

Backend should log useful operational information: - Authentication
failures - Server errors - Important admin actions where appropriate

Do not log passwords, tokens, or unnecessary personal information.

## 19. Accessibility

Frontend must support: - Keyboard navigation - Visible focus - Labels
for inputs - Useful error messages - Sufficient contrast - Minimum 44px
touch targets - Descriptive image alt text - No color-only status
communication

## 20. Responsive Behavior

Public site: - Desktop - Tablet - Mobile

Admin: - Desktop compact sidebar - Collapsed desktop state - Mobile
drawer - No horizontal overflow

## 21. Environment Configuration

Secrets and environment-specific values must be stored in environment
variables.

Examples: - MongoDB URI - JWT/session secret - Image storage
credentials - WhatsApp/business configuration where appropriate - Client
API base URL

## 22. Deployment Requirements

Production deployment should separate: - Frontend - Backend - Database -
Image storage

Use HTTPS.

Configure production CORS and secure cookies correctly.

## 23. Technical Non-Goals

Do not introduce: - Microservices - GraphQL - Complex event-driven
architecture - Kubernetes - Multi-tenant architecture - Real-time
sockets unless a proven V1 need appears

Keep the architecture appropriate for one tailoring business.
