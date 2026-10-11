# Guru Tailoring --- Application Flow

**Version:** V1.0\
**Status:** Working baseline

## 1. System Actors

Two primary actors:

1.  Customer --- guest user in V1
2.  Admin --- authenticated business user

## 2. Customer Navigation

``` text
Home
├── Designs
│   └── Design Details
│       ├── Enquire
│       └── WhatsApp
├── Services
│   └── Service Details
│       ├── Enquire
│       └── WhatsApp
├── Our Work
│   └── Work Details
│       └── Enquire About Similar
├── Custom Design
│   └── Submit Custom Request
└── Contact / WhatsApp
```

## 3. Home Flow

`Home → Browse featured content → View details → Enquire / WhatsApp`

Home should provide clear routes to the important business actions.

## 4. Design Flow

``` text
Designs
↓
Browse / filter
↓
Select design
↓
Design details
↓
View images + pricing
↓
Enquire or WhatsApp
```

### WhatsApp action

Generate a contextual message such as:

`Hi, I am interested in the Bridal Zari Blouse design.`

The exact message can be generated from content data.

## 5. Service Flow

``` text
Services
↓
Browse services
↓
Select service
↓
Service details
↓
View price / price-on-enquiry
↓
Enquire or WhatsApp
```

## 6. Our Work Flow

``` text
Our Work
↓
Browse completed work
↓
Select work
↓
View details
↓
Enquire About Similar
↓
WhatsApp or enquiry
```

## 7. Custom Design Flow

``` text
Custom Design
↓
Reference photo
↓
Garment type
↓
Requirements
↓
Preferred date
↓
Name + phone
↓
Submit
↓
Success confirmation
```

Minimum required information should be kept low enough to avoid
abandonment.

## 8. General Enquiry Flow

``` text
Customer
↓
Enquire
↓
Name
Phone
Message
Related content
↓
Submit
↓
Backend validates
↓
Create enquiry
↓
Show success
↓
Optional WhatsApp follow-up
```

## 9. Admin Authentication Flow

``` text
/admin/login
↓
Email + password
↓
Backend authentication
↓
Role check
↓
Authenticated admin session
↓
Admin dashboard
```

Unauthorized access:

``` text
Unauthenticated → Login
Authenticated non-admin → Forbidden
```

## 10. Admin Navigation

``` text
Dashboard
Enquiries
Custom Requests
Designs
Services
Our Work
Settings
```

All admin pages use the same approved compact sidebar model.

Do not create page-specific sidebar variants.

## 11. Design Management Flow

``` text
Designs
├── Add Design
│   ├── Upload photos
│   ├── Add details
│   ├── Pricing
│   ├── Customization
│   ├── Save Draft
│   └── Publish
├── Edit
├── Publish / Unpublish
└── Archive / Restore
```

## 12. Service Management Flow

``` text
Services
├── Add Service
│   ├── Name
│   ├── Category
│   ├── Description
│   ├── Pricing
│   ├── Optional image
│   ├── What's included
│   ├── Save Draft
│   └── Publish
├── Edit
├── Publish / Unpublish
└── Archive / Restore
```

## 13. Our Work Management Flow

``` text
Our Work
├── Add Work
│   ├── Upload photos
│   ├── Work details
│   ├── Related service
│   ├── Occasion
│   ├── Preview
│   ├── Save Draft
│   └── Publish
├── Edit
├── Publish / Unpublish
└── Archive / Restore
```

## 14. Enquiry Management Flow

``` text
New enquiry
↓
Admin opens enquiry
↓
Reviews customer + related content
↓
Contacts customer
↓
Updates status
```

Statuses: - New - Contacted - In Progress - Completed - Closed

## 15. Custom Request Management Flow

``` text
New request
↓
Admin opens request
↓
Reviews reference image + requirements
↓
Contacts customer
↓
Updates status
```

Statuses: - New - Reviewed - Contacted - In Progress - Completed -
Closed

## 16. Settings Flow

``` text
Settings
↓
Edit business information
↓
Save Changes
↓
Validate
↓
Persist settings
↓
Updated public website
```

## 17. Publish Flow

For Designs, Services, and Our Work:

``` text
Draft
↓
Admin completes required information
↓
Publish
↓
Status = Published
↓
Public API includes item
↓
Customer can see item
```

Unpublish:

`Published → Unpublished/Draft state → Hidden from public`

Archive:

`Published/Draft → Archived → Hidden from public`

## 18. Global Error Flow

Any important action should have:

`Loading → Success OR Inline error`

For destructive/archive actions:

`Click → Confirmation → Action → Success`

## 19. Mobile Flow

Customer: - Responsive navigation - No horizontal overflow

Admin: - Sidebar becomes drawer - Drawer can open/close - Main content
remains usable - Touch targets at least 44px

## 20. V1 Product Rule

Do not add additional screens or flows unless they solve a real business
problem.
