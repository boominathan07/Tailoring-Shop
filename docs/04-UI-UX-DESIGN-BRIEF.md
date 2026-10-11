# Guru Tailoring --- UI/UX Design Brief

**Version:** V1.0\
**Design Tool:** Stitch\
**Status:** Approved working design system

## 1. Design Direction

The UI should feel like it was designed by a senior web developer for a
real local tailoring business.

Qualities: - Minimal - Professional - Warm - Practical -
Photography-first - Easy to scan - Human, not AI-generated

Avoid: - Generic SaaS appearance - Excessive gradients - Glassmorphism -
Decorative UI without purpose - Excessive cards - Artificial filler
copy - Overly complex dashboards

## 2. Color Palette

Primary approved colors:

-   `#A3B18A`
-   `#F2E8CF`

Use the palette intentionally rather than applying one color to
everything.

Maintain sufficient contrast for text and interactive elements.

Do not make every component use the primary color.

## 3. Typography

Use a clean, readable web font system.

Priorities: - Clear hierarchy - Comfortable line height - Strong
readability - No excessively small text

Recommended baseline: - Body: 16px - Supporting text: 14--15px - Small
metadata: never below 12--13px unless decorative - Buttons: readable,
medium weight - Headings: strong but not oversized

## 4. Buttons

Buttons should be: - Clear - Compact - Consistent - Properly padded -
Easy to click

Primary actions: - Publish - Save - Add - Submit

Secondary actions: - Edit - Cancel - Back

Minimum touch target: 44px.

Buttons must never touch or cross card borders.

## 5. Cards

Cards are used for: - Designs - Services - Our Work - Content previews

Rules: - Consistent width - Consistent image ratio - Consistent internal
padding - Clear hierarchy - Actions stay inside the card - No overflow -
No excessive card height - Do not add filler text to make cards look
full

## 6. Grid Rules

Admin catalogue grids: - Desktop: 3 cards per row - Tablet: 2 cards per
row - Mobile: 1 card per row

Public grids should adapt according to content and screen size while
maintaining visual balance.

## 7. Sidebar --- Approved Admin Model

There is ONE approved admin sidebar model.

Structure:

``` text
Guru Tailoring
[Collapse Toggle]

Dashboard
Enquiries
Custom Requests
Designs
Services
Our Work

────────────

Settings
View Website
Logout
```

Rules: - Compact navigation - No large empty center area - No vertical
distribution just to fill viewport height - Same width and visual
language across admin pages - Same active-state behavior - Desktop can
collapse - Mobile becomes a drawer - Main content must never overlap the
sidebar - No horizontal overflow

New admin pages must reuse this model rather than inventing another
sidebar.

## 8. Navbar / Active State

The active navigation item must be visually obvious.

Use the approved active style, including the correct underline/indicator
where established.

Do not invent a different active state per page.

## 9. Forms

Forms should: - Use visible labels - Have clear required indicators -
Use inline validation - Avoid unnecessary fields - Use comfortable input
sizes - Work on mobile - Avoid excessive width

Do not rely on placeholder text as the only label.

## 10. Modals

Use modals for: - Archive confirmation - Leave-without-saving
confirmation - Other short confirmations

Do not use huge modals for complex forms.

Add/Edit forms use dedicated pages when the form is substantial.

## 11. Tables / Lists

Use tables only when tabular information improves scanning, especially
enquiries.

Rules: - Clear headers - Appropriate column widths - No overflow -
Responsive mobile behavior - Action controls remain usable

## 12. Shadows

Use subtle shadows to establish hierarchy.

Avoid: - Heavy floating shadows - Excessive layered effects

Cards, dropdowns, and modals can use restrained shadows.

## 13. Images

Photography is central to the product.

Rules: - Preserve important tailoring details - Use consistent aspect
ratios - Do not stretch images - Avoid unnecessary decorative image
overlays - Do not include watermarks or unwanted generated text - Use
meaningful alt text

## 14. Content Rules

Do not add content simply to fill empty space.

Avoid generic filler: - "Crafted with passion..." - "Perfect for every
occasion..." - "Premium experience..."

unless the business explicitly provides such messaging.

Prefer short, meaningful descriptions.

## 15. Public Website UX

Primary customer actions: - View - Enquire - WhatsApp - Request Custom
Design

Do not force signup.

The user should be able to reach a useful action quickly.

## 16. WhatsApp UX

WhatsApp buttons should: - Be clearly identifiable - Open the configured
business WhatsApp number - Optionally prefill a contextual message -
Never require customer login

## 17. Accessibility

Requirements: - Sufficient contrast - Visible focus - Keyboard
navigation - Semantic labels - Minimum 44px touch targets - Status not
communicated by color alone - Descriptive image alt text - Clear error
messages

## 18. Responsive Navigation

### Desktop

Full navigation.

### Tablet

Adaptive spacing/layout.

### Mobile

Public site uses mobile navigation.

Admin uses drawer navigation.

Drawer must have: - Open control - Close control - Outside-click
behavior where appropriate - No content overlap

## 19. Empty States

Keep empty states simple.

Example:

`No services yet`

`Add your first service to start building your online service catalogue.`

`+ Add Service`

Do not use large decorative illustrations unless genuinely useful.

## 20. Loading States

Use restrained skeletons/spinners appropriate to the component.

Avoid blocking the entire page for small actions.

## 21. Error States

Errors should: - Explain what happened - Tell the user what to do -
Appear near the relevant action/field - Avoid technical jargon

## 22. Pagination

For catalogue/admin lists:

`Showing 1–12 of 24`

`← Previous  1  2  3  Next →`

Desktop and mobile layouts must not overflow.

## 23. Approved Stitch Principle

When refining an approved Stitch screen: - Make the smallest necessary
change - Do not regenerate the whole design - Do not change unrelated
approved components - Preserve existing visual language
