## Features

### Home Page
- Product listing with images, price, and discount
- Search products by name or category
- Category filter buttons (Beauty, Mobiles, Groceries, Fashion)
- Responsive product grid layout

### Wishlist
- Add and remove products from wishlist
- Wishlist item count shown in navbar
- View all wishlisted products on wishlist page

### Cart
- Add products to cart
- Increase and decrease product quantity
- Remove products from cart
- Automatic total price calculation
- Stock validation (quantity cannot exceed available stock)

### Checkout
- Uses saved default user address
- Option to enter new delivery address
- Payment method simulation:
  - Cash on Delivery
  - UPI
  - Google Pay
- Order placement simulation

### Order Confirmation
- Displays order success message
- Shows order ID and total amount

### Order Tracking
- Track order status:
  - Placed
  - Shipped
  - Out for Delivery
  - Delivered

### User Profile
- Displays default user details
- Shows saved address
- Displays complete order history
- Shows status of each order

### Navbar
- Fixed navigation bar across all pages
- Search bar
- Wishlist icon with item count
- Cart icon with item count
- User profile navigation

---

## Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Bootstrap 5

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Tools
- MongoDB Compass
- Postman
- dotenv

---

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

