# Guru Tailoring --- Product Requirements Document (PRD)

**Version:** V1.0\
**Status:** Approved working baseline\
**Product:** Guru Tailoring Website & Admin Management System

## 1. Product Overview

Guru Tailoring is a ladies tailoring business that currently relies
heavily on manual WhatsApp communication for sharing designs, services,
prices, and completed work.

The product is a professional public website plus a protected admin
application.

The website will help customers discover: - Blouse and dress designs -
Tailoring services - Completed work - Custom design options

The admin application will help the tailor manage: - Designs -
Services - Our Work - Enquiries - Custom Requests - Business settings

The product is **not an e-commerce platform in V1**. Its primary purpose
is to **showcase, generate enquiries, and simplify communication**.

## 2. Business Problems

### 2.1 Manual design sharing

The tailor currently sends blouse/design references manually through
WhatsApp.

Problems: - Repetitive work - No central catalogue - Difficult to
organize many designs - Customers repeatedly ask for photos

### 2.2 Manual service and price sharing

The tailor has many services but has to manually send names,
descriptions, prices, and images.

### 2.3 Completed work is not properly showcased

Previous dresses and blouses are not organized as a public portfolio.

### 2.4 Limited online reach

The business currently depends mainly on local customers and wants to
gradually attract online customers.

### 2.5 Enquiries are scattered

Website enquiries and custom requests need a central place for the
tailor to review and follow up.

## 3. Product Goals

1.  Create a searchable/browseable online catalogue.
2.  Reduce repetitive WhatsApp sharing.
3.  Make service and pricing information easy to discover.
4.  Showcase real completed tailoring work.
5.  Generate more customer enquiries.
6.  Give the tailor control over website content without developer help.
7.  Keep the customer journey fast and low-friction.

## 4. Users

### Customer

A visitor looking for tailoring services, designs, completed work, or a
custom design.

### Admin

The tailor/business owner managing the website and incoming requests.

## 5. Customer Authentication

Customer signup/login is **out of V1 scope**.

Customers can: - Browse - View designs/services/work - Enquire - Contact
through WhatsApp - Submit custom requests

without creating an account.

Customer information is captured when a request/enquiry needs it.

## 6. Admin Authentication

Admin access is protected by authentication and role-based
authorization.

Public users must never be able to self-register as an admin.

## 7. Public Website Scope

### Home

Introduce Guru Tailoring, highlight important services/designs/work,
build trust, and provide contact actions.

### Designs

Customers can browse designs, open details, see pricing, and enquire.

### Services

Customers can browse services, view pricing information, and enquire.

### Our Work

Customers can see completed work and enquire about similar work.

### Custom Design

Customers can upload a reference image and submit requirements.

### Contact / WhatsApp

Customers can contact the business directly.

## 8. Admin Scope

V1 admin navigation: - Dashboard - Enquiries - Custom Requests -
Designs - Services - Our Work - Settings

Do not create unnecessary admin pages.

## 9. Designs Management

Admin can: - Add - Edit - Publish - Unpublish - Archive - Restore -
Upload multiple images - Select primary image - Set category - Set
starting price or price-on-enquiry - Add short description - Configure
customization availability

Statuses: - Draft - Published - Archived

## 10. Services Management

Admin can: - Add - Edit - Publish - Unpublish - Archive - Restore - Set
category - Set starting price or price-on-enquiry - Add short
description - Add optional "What's included" - Configure customization -
Add optional image

Statuses: - Draft - Published - Archived

## 11. Our Work Management

Admin can: - Add completed work - Upload multiple photos - Select
primary image - Edit - Publish - Unpublish - Archive - Restore - Add
category - Add optional description - Associate work with a service -
Add occasion

Statuses: - Draft - Published - Archived

## 12. Enquiries

A customer can submit: - Name - Phone - Message/request - Related
design/service/work where applicable

Admin can view and update enquiry status.

Statuses: - New - Contacted - In Progress - Completed - Closed

## 13. Custom Requests

Customer submits: - Name - Phone - Garment type - Reference image -
Requirements - Preferred date

Admin can review the request, contact the customer, and update status.

Statuses: - New - Reviewed - Contacted - In Progress - Completed -
Closed

## 14. WhatsApp

WhatsApp is a communication channel, not something the website tries to
replace.

Contextual WhatsApp actions should open a conversation with the
configured business number and, where useful, include a short contextual
message.

## 15. Current Business Information

**Business:** Guru Tailoring\
**Phone / WhatsApp:** 7639189075

**Address:**\
1/236 Pillayar kovil street,\
Vadakku Illandai Kulam,\
Tamilnadu - 628953

## 16. Content Principles

Content must be useful and concise.

Do not add filler copy just to fill empty space.

Prefer meaningful descriptions over generic marketing sentences.

## 17. Responsive Requirements

Desktop, tablet, and mobile must be supported.

Admin: - Desktop uses approved compact sidebar. - Mobile uses drawer
navigation. - No horizontal overflow.

Minimum touch target: 44px.

## 18. V1 Non-Goals

Out of scope: - Customer signup/login - Online payments - Shopping
cart - Checkout - Order tracking - Delivery management - Inventory -
Staff management - Advanced analytics - Reviews/comments - Loyalty
system - Multi-branch management - Subscription system - Complex
appointment management

## 19. Success Criteria

The tailor can independently: - Add and publish designs - Add and
publish services - Add and publish completed work - Review enquiries -
Review custom requests - Update business information

Customers can: - Understand the business - Browse
designs/services/work - Submit enquiries - Submit custom requests -
Contact through WhatsApp

## 20. Core Product Loop

Customer:
`Discover → Browse → Interested → Enquire / WhatsApp → Admin follow-up`

Business:
`Create content → Publish → Customer discovers → Enquiry → Follow-up → More completed work → More content`

## 21. Product Definition

> A visual digital catalogue and enquiry management website for Guru
> Tailoring, allowing customers to discover designs, services and
> completed work, then easily contact the tailor, while giving the
> tailor a simple admin system to manage the online presence and
> incoming requests.
