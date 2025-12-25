# CrochetStory

A production-ready handcrafted crochet product website built with Next.js, MongoDB, and Cloudinary.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```
MONGODB_URI=mongodb://localhost:27017/crochetstory
JWT_SECRET=your-secret-key-here
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

3. Initialize admin account:
```bash
node scripts/init-admin.js [username] [password]
```

4. Run development server:
```bash
npm run dev
```

## Features

- Public pages: Home and Products
- Admin panel: Secure login and product management
- Multiple image uploads per product
- Cloudinary integration for image storage
- MongoDB for data persistence
- Responsive design with Tailwind CSS
