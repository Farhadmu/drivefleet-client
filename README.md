# DriveFleet — Premium Car Rental Platform

🔗 **Live Site:** [https://drivefleet-client-kappa.vercel.app/]

## About DriveFleet

DriveFleet is a full-stack car rental platform where users can explore premium vehicles, view detailed car information, make bookings, manage their listings, and maintain profiles — all through a sleek, modern dark-themed interface built for speed and simplicity.

## Key Features

- 🔐 **Secure Authentication System** — Email/password and Google OAuth login powered by Firebase, with JWT tokens stored in HTTPOnly cookies to protect all private API routes from unauthorized access
- 🚗 **Full Car Listing Management** — Logged-in users can add new car listings, update existing ones, and delete their own cars with a confirmation modal — full CRUD operations backed by MongoDB
- 📅 **Smart Booking System** — Users can book any available car with driver preference and special notes, view their complete booking history, and cancel bookings anytime from the My Bookings page
- 🔍 **Search and Filter** — Search cars by name using MongoDB `$regex` operator for partial matching, and filter by car type (SUV, Sedan, Luxury, etc.) using the `$in` operator for instant results
- 📱 **Fully Responsive Design** — Optimized for all screen sizes including mobile, tablet, and desktop with a clean dark UI using Tailwind CSS and consistent design throughout

## Tech Stack

| Frontend | Backend |
|----------|---------|
| React 18 | Node.js |
| React Router v6 | Express.js |
| Tailwind CSS | MongoDB Atlas |
| Firebase Auth | JWT + Cookies |
| Axios | Cookie-Parser |
| React Hot Toast | Dotenv |
| SweetAlert2 | CORS |

## Pages

- **Home** — Banner, Available Cars (6 cards), Why Choose Us, How It Works, Testimonials
- **Explore Cars** — All cars with search and filter
- **Car Details** — Full car info with Book Now button
- **Add Car** — Private form to list a new vehicle
- **My Bookings** — View and cancel your bookings
- **My Added Cars** — Manage your own car listings
- **Login / Register** — Auth pages with Google login
- **404 Page** — Custom not found page

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)
- Firebase project

### Client Setup
```bash
git clone <your-client-repo-url>
cd drivefleet-client
npm install
cp .env.example .env
# Fill Firebase config in .env
npm run dev
```

### Environment Variables
```
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Deployment

- **Client:** Deployed on [Vercel](https://vercel.com)
- **Server:** Deployed on [vercel](https://vercel.com)


