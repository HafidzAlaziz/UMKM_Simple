# Vercel Deployment Guide

## Frontend (Client) Deployment

### Prerequisites
- Vercel account
- GitHub repository connected

### Deployment Steps

1. **Login to Vercel**
   - Go to https://vercel.com
   - Connect your GitHub account

2. **Import Project**
   - Click "Add New Project"
   - Select your repository: `HafidzAlaziz/UMKM_Simple`
   - Click "Import"

3. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables** (Optional)
   If you have backend deployed:
   - Add `VITE_API_URL` = your backend URL

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Important Files

**vercel.json** (already created in client folder)
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This file ensures all routes redirect to index.html for React Router to work.

### After Deployment

Your site will be available at:
- `https://your-project-name.vercel.app`

### Troubleshooting

**404 Error on Routes:**
- Make sure `vercel.json` exists in `client` folder
- Redeploy the project

**Build Fails:**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Try building locally first: `npm run build`

**Environment Variables:**
- If using backend API, set `VITE_API_URL` in Vercel dashboard
- Update `client/src/lib/api.ts` to use `import.meta.env.VITE_API_URL`

## Backend Deployment Options

### Option 1: Railway

1. Go to https://railway.app
2. Connect GitHub
3. New Project → Deploy from GitHub
4. Select repository
5. Set root directory: `server`
6. Add environment variables:
   - `DATABASE_URL` (PostgreSQL from Railway)
   - `JWT_SECRET`
   - `JWT_REFRESH_SECRET`
   - `NODE_ENV=production`
7. Deploy

### Option 2: Render

1. Go to https://render.com
2. New Web Service
3. Connect repository
4. Root directory: `server`
5. Build command: `npm install && npm run build`
6. Start command: `npm start`
7. Add environment variables
8. Create PostgreSQL database
9. Deploy

### Option 3: Heroku

```bash
cd server
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
git subtree push --prefix server heroku main
```

## Full Stack Deployment

1. **Deploy Backend** first (Railway/Render)
2. Get backend URL (e.g., `https://your-api.railway.app`)
3. **Deploy Frontend** to Vercel
4. Add environment variable in Vercel:
   - `VITE_API_URL` = `https://your-api.railway.app/api`
5. Redeploy frontend

## Database Migration

For production, use PostgreSQL instead of SQLite:

```bash
# Update DATABASE_URL in .env
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# Run migrations
npx prisma migrate deploy
npx prisma db seed
```

## Post-Deployment Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend deployed and accessible
- [ ] Database connected and seeded
- [ ] Environment variables set correctly
- [ ] CORS configured for frontend domain
- [ ] Create admin user via script or Prisma Studio
- [ ] Test login/register
- [ ] Test checkout flow
- [ ] Test admin panel

## Custom Domain (Optional)

In Vercel:
1. Go to project settings
2. Domains
3. Add your custom domain
4. Follow DNS configuration instructions
