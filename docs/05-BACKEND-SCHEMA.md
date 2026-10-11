# Guru Tailoring --- Backend Schema

**Version:** V1.0\
**Database:** MongoDB\
**ODM:** Mongoose\
**Status:** Design baseline

## 1. Collections

V1 collections:

1.  User
2.  Design
3.  Service
4.  Work
5.  Enquiry
6.  CustomRequest
7.  BusinessSettings

## 2. User

Purpose: authenticated admin users.

Fields:

  Field          Type        Required Notes
  -------------- --------- ---------- ------------------------
  name           String           Yes Admin display name
  email          String           Yes Unique, normalized
  passwordHash   String           Yes Never return to client
  role           Enum             Yes `admin`
  isActive       Boolean          Yes Default true
  lastLoginAt    Date              No Last successful login
  createdAt      Date            Auto 
  updatedAt      Date            Auto 

Indexes: - unique email

No public customer signup in V1.

## 3. Design

Fields:

  -------------------------------------------------------------------------------------
  Field                    Type                            Required Notes
  ------------------------ ------------------ --------------------- -------------------
  name                     String                               Yes Design title

  slug                     String                               Yes Public URL
                                                                    identifier

  category                 Enum                                 Yes Blouse, Dress,
                                                                    Bridal, Other

  description              String                                No Short description

  pricingType              Enum                                 Yes `starting_price`,
                                                                    `enquiry`

  startingPrice            Number                       Conditional Required when
                                                                    starting_price

  customizationAvailable   Boolean                              Yes Default false

  customizationNotes       String                                No Optional

  images                   Array                                Yes At least one for
                                                                    publish

  primaryImage             Object/Reference         Yes for publish Primary image
                                                                    metadata

  status                   Enum                                 Yes Draft, Published,
                                                                    Archived

  createdBy                ObjectId(User)                       Yes Admin

  createdAt                Date                                Auto 

  updatedAt                Date                                Auto 
  -------------------------------------------------------------------------------------

Image object may contain: - url - storageKey/publicId - width - height -
alt - order

Indexes: - slug unique - status - category - createdAt

## 4. Service

Fields:

  Field                    Type                          Required Notes
  ------------------------ ------------------------ ------------- ------------------------------------------
  name                     String                             Yes Service name
  slug                     String                             Yes Public URL identifier
  category                 Enum                               Yes Blouse, Dress, Bridal, Alteration, Other
  description              String                              No Short description
  pricingType              Enum                               Yes starting_price, enquiry
  startingPrice            Number                     Conditional Required for starting_price
  includedItems            Array`<String>`{=html}              No What's included
  customizationAvailable   Boolean                            Yes Default false
  customizationDetails     String                              No Optional
  image                    Object                              No Optional image
  status                   Enum                               Yes Draft, Published, Archived
  createdBy                ObjectId(User)                     Yes Admin
  createdAt                Date                              Auto 
  updatedAt                Date                              Auto 

Indexes: - slug unique - status - category - createdAt

## 5. Work

Fields:

  Field            Type                         Required Notes
  ---------------- ------------------- ----------------- ------------------------------------------
  title            String                            Yes Work title
  slug             String                            Yes Public URL identifier
  category         Enum                              Yes Blouse, Dress, Bridal, Alteration, Other
  description      String                             No Short description
  images           Array                             Yes At least one for publish
  primaryImage     Object/Reference      Yes for publish Primary image
  relatedService   ObjectId(Service)                  No Optional
  occasion         Enum                               No Wedding, Festival, Party, Casual, Other
  status           Enum                              Yes Draft, Published, Archived
  createdBy        ObjectId(User)                    Yes Admin
  createdAt        Date                             Auto 
  updatedAt        Date                             Auto 

Indexes: - slug unique - status - category - createdAt

## 6. Enquiry

Purpose: customer enquiries without customer accounts.

Fields:

  Field         Type         Required Notes
  ------------- ---------- ---------- ------------------------------------------------
  name          String            Yes Customer name
  phone         String            Yes Customer phone
  message       String            Yes Customer request
  relatedType   Enum               No Design, Service, Work
  relatedId     ObjectId           No Related content
  status        Enum              Yes New, Contacted, In Progress, Completed, Closed
  source        Enum              Yes Website, WhatsApp, Other
  notes         String             No Admin notes
  createdAt     Date             Auto 
  updatedAt     Date             Auto 

Indexes: - status - phone - createdAt

## 7. CustomRequest

Fields:

  -------------------------------------------------------------------------
  Field             Type                          Required Notes
  ----------------- ---------------- --------------------- ----------------
  name              String                             Yes Customer

  phone             String                             Yes Customer

  garmentType       Enum/String                        Yes Blouse, Dress,
                                                           Bridal, Other

  requirements      String                             Yes Customer
                                                           description

  referenceImages   Array                               No Uploaded
                                                           references

  preferredDate     Date                                No Customer
                                                           preference

  status            Enum                               Yes New, Reviewed,
                                                           Contacted, In
                                                           Progress,
                                                           Completed,
                                                           Closed

  notes             String                              No Admin notes

  createdAt         Date                              Auto 

  updatedAt         Date                              Auto 
  -------------------------------------------------------------------------

Indexes: - status - phone - createdAt

## 8. BusinessSettings

V1 should normally contain one active settings document.

Fields:

  Field                Type               Required
  -------------------- ---------------- ----------
  businessName         String                  Yes
  phone                String                  Yes
  whatsappNumber       String                  Yes
  address              String                  Yes
  businessHours        Object                  Yes
  websiteTitle         String                  Yes
  websiteDescription   String                   No
  instagramUrl         String                   No
  facebookUrl          String                   No
  updatedBy            ObjectId(User)          Yes
  createdAt            Date                   Auto
  updatedAt            Date                   Auto

Business hours may contain per-day: - enabled - open - close

## 9. Relationships

``` text
User
 ├── creates → Design
 ├── creates → Service
 └── creates → Work

Service
 └── may be referenced by → Work

Enquiry
 └── may reference → Design / Service / Work

CustomRequest
 └── contains → Reference Images
```

## 10. Status Rules

### Design / Service / Work

`Draft → Published → Archived`

Allowed actions: - Draft → Publish - Published → Unpublish/Draft -
Draft/Published → Archive - Archived → Restore

Archived content must not appear publicly.

## 11. Slugs

Public content should have unique slugs.

Example: `bridal-zari-blouse`

Generate from name but handle collisions safely.

## 12. Soft Delete

Prefer archive/status handling for business content instead of
destructive deletion.

Permanent deletion should not be exposed as a primary V1 action.

## 13. Timestamps

All primary collections should use: - createdAt - updatedAt

## 14. Data Validation

Server-side validation is mandatory.

Examples: - Required names - Valid pricing - Valid enum values - Valid
phone number - Valid status transitions - Image constraints

## 15. Privacy

Do not expose unnecessary customer information through public APIs.

Public content APIs must never return: - Enquiry data - Custom request
data - Admin credentials - Internal notes

## 16. Schema Principle

Keep the schema small.

Do not add fields merely because a future feature might exist.

Add fields when they solve a real V1 requirement.
