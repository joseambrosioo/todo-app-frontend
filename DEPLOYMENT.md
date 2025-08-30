# Frontend Deployment Guide

This guide covers deploying the Todo App frontend to various hosting platforms.

## Prerequisites

- Node.js 18+ installed
- Backend API deployed and accessible
- Environment variables configured

## Environment Variables

Set these environment variables on your hosting platform:

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

## Deployment Options

### Vercel (Recommended)

1. **Connect your GitHub repository**
2. **Set environment variables:**
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
3. **Deploy automatically** on git push

### Netlify

1. **Connect your GitHub repository**
2. **Set environment variables:**
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
3. **Build command:** `npm run build`
4. **Publish directory:** `.next`

### Railway

1. **Connect your GitHub repository**
2. **Set environment variables:**
   ```bash
   railway variables set NEXT_PUBLIC_API_URL=https://your-backend-domain.com
   ```
3. **Deploy automatically** on git push

### Render

1. **Create new Static Site**
2. **Connect your GitHub repository**
3. **Set environment variables:**
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
4. **Build command:** `npm run build`
5. **Publish directory:** `.next`

## Build and Deploy

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the application:**
   ```bash
   npm run build
   ```

3. **Start the server (if needed):**
   ```bash
   npm start
   ```

## Environment Configuration

### Local Development
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Production
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

## API Integration

The frontend communicates with your backend API through the `NEXT_PUBLIC_API_URL` environment variable.

### API Endpoints Used
- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## CORS Configuration

Ensure your backend allows requests from your frontend domain:

```typescript
app.use(cors({
  origin: ["http://localhost:3000", "https://your-frontend-domain.com"],
  credentials: true,
}));
```

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check `NEXT_PUBLIC_API_URL` is correct
   - Verify backend is running and accessible
   - Check CORS configuration

2. **Build Failures**
   - Ensure Node.js 18+
   - Check for TypeScript errors
   - Verify all dependencies installed

3. **Environment Variables Not Loading**
   - Restart build process after setting variables
   - Check variable names are correct
   - Ensure variables are set before build

### Build Logs

Check your hosting platform's build logs for:
- Dependency installation errors
- TypeScript compilation errors
- Build process failures

## Performance Optimization

- **Image Optimization**: Next.js automatically optimizes images
- **Code Splitting**: Automatic code splitting for better performance
- **Static Generation**: Pages are pre-rendered for faster loading

## Security Notes

- Never commit `.env.local` files to Git
- Use HTTPS in production
- Validate API responses on frontend
- Implement proper error handling

## Monitoring

- Set up error tracking (e.g., Sentry)
- Monitor API response times
- Track user interactions and performance
