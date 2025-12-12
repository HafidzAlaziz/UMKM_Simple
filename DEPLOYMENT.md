# UMKM E-commerce - Deployment Guide

## Prerequisites

- Node.js 18+ installed
- PostgreSQL or SQLite database
- Git for version control

## Environment Setup

### Backend (.env)

Create `server/.env` file:

```env
PORT=5000
DATABASE_URL="file:./dev.db"  # For SQLite
# DATABASE_URL="postgresql://user:password@localhost:5432/umkm_db"  # For PostgreSQL
JWT_SECRET="your_jwt_secret_key_here"
JWT_REFRESH_SECRET="your_refresh_secret_key_here"
NODE_ENV=production
```

### Frontend

Update `client/src/lib/api.ts` baseURL for production:

```typescript
const api = axios.create({
    baseURL: process.env.VITE_API_URL || 'http://localhost:5000/api',
    // ...
});
```

Create `client/.env.production`:

```env
VITE_API_URL=https://your-api-domain.com/api
```

## Database Migration

### For SQLite (Development/Small Scale)

```bash
cd server
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

### For PostgreSQL (Production)

1. Create PostgreSQL database
2. Update `DATABASE_URL` in `.env`
3. Run migrations:

```bash
cd server
npx prisma migrate deploy
npm run prisma:seed
```

## Build Process

### Backend

```bash
cd server
npm install
npm run build
```

### Frontend

```bash
cd client
npm install
npm run build
```

## Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Frontend on Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Set build command: `cd client && npm install && npm run build`
4. Set output directory: `client/dist`
5. Add environment variable: `VITE_API_URL`

#### Backend on Railway

1. Create new project on Railway
2. Add PostgreSQL database
3. Connect GitHub repository
4. Set root directory: `server`
5. Add environment variables from `.env`
6. Deploy

### Option 2: Single VPS (DigitalOcean, Linode, etc.)

#### Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

#### Setup Application

```bash
# Clone repository
git clone your-repo-url
cd umkm-ecommerce

# Setup backend
cd server
npm install
npm run build
pm2 start dist/index.js --name umkm-api

# Setup frontend
cd ../client
npm install
npm run build
```

#### Configure Nginx

Create `/etc/nginx/sites-available/umkm`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /path/to/umkm-ecommerce/client/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/umkm /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Setup SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

#### Setup PM2 Startup

```bash
pm2 startup
pm2 save
```

### Option 3: Docker Deployment

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: umkm
      POSTGRES_PASSWORD: password
      POSTGRES_DB: umkm_db
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgresql://umkm:password@postgres:5432/umkm_db
      JWT_SECRET: your_secret
      JWT_REFRESH_SECRET: your_refresh_secret
    depends_on:
      - postgres

  frontend:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

Deploy:

```bash
docker-compose up -d
```

## Post-Deployment

### Create Admin User

Connect to database and update a user's role:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'admin@example.com';
```

### Monitor Application

```bash
# View PM2 logs
pm2 logs umkm-api

# Monitor resources
pm2 monit

# Restart application
pm2 restart umkm-api
```

### Backup Database

```bash
# PostgreSQL
pg_dump -U umkm umkm_db > backup.sql

# SQLite
cp server/dev.db server/backup-$(date +%Y%m%d).db
```

## Troubleshooting

### CORS Issues

Ensure backend CORS is configured for your frontend domain:

```typescript
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
```

### Database Connection Issues

- Check `DATABASE_URL` format
- Ensure database server is running
- Verify network connectivity
- Check firewall rules

### Build Errors

- Clear node_modules and reinstall
- Check Node.js version compatibility
- Verify all environment variables are set

## Performance Tips

1. Enable gzip compression in Nginx
2. Set up CDN for static assets
3. Configure database connection pooling
4. Enable Redis for session storage
5. Set up monitoring (e.g., PM2, New Relic)

## Security Checklist

- [ ] Change all default secrets
- [ ] Enable HTTPS
- [ ] Set secure cookie flags
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Regular security updates
- [ ] Database backups automated
- [ ] Environment variables secured

## Support

For issues, check:
- Application logs: `pm2 logs`
- Nginx logs: `/var/log/nginx/`
- Database logs
- Browser console for frontend errors
