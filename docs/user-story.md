# User Story - Cart & Order Testing

## Test Scenario: Complete Order Flow

### User Goal
As a customer, I want to browse the menu, add items to my cart with customizations, and place an order for pickup or delivery.

### Step-by-Step Testing Guide

#### 1. Browse Menu
- [ ] Navigate to `/menu` 
- [ ] Click on a category (e.g., "BBQ Sandwiches")
- [ ] Click on a specific menu item

#### 2. Customize & Add to Cart
- [ ] On menu item page, verify item details display correctly
- [ ] Select size options (if available)
- [ ] Choose sauce preference
- [ ] Select side dish (if available) 
- [ ] Adjust quantity using +/- buttons
- [ ] Verify price updates with customizations
- [ ] Click "Add to Cart" button
- [ ] Verify success feedback ("Added to Cart!")

#### 3. View Cart
- [ ] Check navbar cart icon shows item count badge
- [ ] Click cart icon in navbar
- [ ] Verify cart modal opens with added item
- [ ] Check item shows correct name, price, customizations
- [ ] Test quantity adjustment (+/- buttons)
- [ ] Test item removal

#### 4. Add More Items
- [ ] Close cart and add another item from different category
- [ ] Verify cart updates with multiple items
- [ ] Check cart total calculates correctly

#### 5. Checkout Process
- [ ] Open cart and fill out customer information:
  - [ ] Name (required)
  - [ ] Phone (required) 
  - [ ] Email (optional)
- [ ] Select order type: Pickup vs Delivery
- [ ] If delivery selected, verify address field appears
- [ ] Add special instructions (optional)
- [ ] Verify total price shows correctly
- [ ] Click "Place Order"

#### 6. Order Confirmation
- [ ] Verify order processes successfully
- [ ] Check for order number in success message
- [ ] Verify cart clears after successful order
- [ ] Cart icon should show 0 items

### Expected Results
✅ **Cart Functionality**
- Items persist in cart across page navigation
- Cart icon shows accurate item count
- Price calculations include customizations
- Cart data persists after browser refresh

✅ **Order Processing**  
- Order creates successfully in Firebase
- Customer receives order number
- Cart clears after successful order
- Error handling for missing required fields

### Edge Cases to Test
- [ ] Add same item with different customizations
- [ ] Remove all items from cart
- [ ] Submit order with missing required fields
- [ ] Test with browser refresh during process
- [ ] Test cart persistence across browser sessions

### Bugs/Issues Found
_(Document any issues here)_

---

**Testing Date:** ___________
**Tester:** ___________
**Status:** ⏳ In Progress | ✅ Passed | ❌ Failed