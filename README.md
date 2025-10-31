# Travel Experience Booking Platform

## 🎫 Active Promo Codes

Try these promotional codes for special discounts:

# Codes 
| `SUMMER25`  | `FIRSTTRIP` | `GET10OFF` | `HALLOWEEN30` | `TRAVELNOW` | `WEEKEND50` | `LOCALGUIDE` | `FAMILYFUN` |  `EXPLORE75` | `LASTCALL` |

## 🌟 Features

### User Features
- User registration and authentication
- Profile management
- Booking history
- Promo code application system
- Secure checkout process
- Real-time booking confirmation
- Experience search and filtering

### Experience Features
- Browse various travel experiences
- Detailed experience pages with descriptions
- Dynamic pricing
- Real-time availability checking
- Location-based experiences
- Rating and review system
- Interactive booking calendar

### Booking System
- Secure payment processing
- Multiple payment method support
- Instant booking confirmation
- Booking modification options
- Promo code integration
- Email confirmation system
- Booking status tracking

## 🛠️ Technical Stack

### Frontend
- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS
- Context API for state management
- Responsive design
- Dynamic routing
- Loading states and error handling

### Backend
- Node.js
- Express.js
- MongoDB database
- JWT authentication
- RESTful API architecture
- Middleware for authentication and promo code validation

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file with necessary environment variables
4. Start the server:
   ```bash
   npm start
   ```

## 📁 Project Structure

### Frontend Structure
```
frontend/
  ├── app/                 # Next.js 13+ app directory
  │   ├── components/      # Reusable UI components
  │   ├── checkout/        # Checkout flow
  │   ├── confirm/        # Booking confirmation
  │   ├── experiences/    # Experience pages
  │   ├── context/        # React Context providers
  │   └── utils/          # Utility functions
  └── public/             # Static assets
```

### Backend Structure
```
backend/
  ├── controllers/        # Request handlers
  ├── middlewares/        # Custom middlewares
  ├── models/            # MongoDB schemas
  ├── routes/            # API routes
  └── mongodb/           # Database configuration
```

## 🔒 Environment Variables

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=your_backend_url
```

### Backend (.env)
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
FRONTEND_URL=your_frontend_url
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

