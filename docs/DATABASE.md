# MediFlow AI — Database Structure

## Entity Relationship Overview

```
User ──────< Expense
User ──────< Delivery
User ──────< Notification

Hospital ──< Delivery
Hospital ──< Invoice
Hospital ──< Quotation
Hospital ──< Payment
Hospital ──< ClientInteraction

Product ─── Inventory (1:1)
Product ───< DeliveryItem
Product ───< InvoiceItem
Product ───< QuotationItem

Delivery ──< DeliveryItem
Delivery ──< DeliveryTimeline
```

## Core Tables

### users
| Column | Type | Notes |
|--------|------|-------|
| id | cuid | PK |
| email | string | unique |
| password_hash | string | bcrypt |
| name | string | |
| role | enum | OWNER, ADMIN, ACCOUNTANT, DELIVERY_STAFF, SALES_EXECUTIVE |
| is_active | boolean | |

### hospitals
| Column | Type | Notes |
|--------|------|-------|
| name | string | |
| contact_person | string | |
| phone, email, address | string | |
| gst_number | string | |
| pending_amount | float | |
| total_revenue | float | |

### expenses
| Column | Type | Notes |
|--------|------|-------|
| amount | float | |
| gst | float | |
| category | enum | PETROL, FOOD, TOLL, TRAVEL, HOTEL, COURIER, MISCELLANEOUS |
| vendor | string | |
| bill_image | string | URL/path |
| expense_date | datetime | |

### products & inventory
- Products have SKU, category, unit_price, gst_rate
- Inventory tracks quantity, low_stock_threshold, batch_number, expiry_date

### deliveries
- Status: PENDING, DELIVERED, RETURNED
- Timeline events for audit trail

### invoices & quotations
- Line items with GST per product
- Auto-calculated subtotal, gst_amount, total

### payments
- Status: PAID, UNPAID, PARTIAL, OVERDUE
- due_date for reminder system

## PostgreSQL Migration

Change `provider` in `schema.prisma` to `postgresql` and update `DATABASE_URL`.

```bash
npm run db:migrate
```
