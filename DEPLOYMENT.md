# Tourist Portal - Vercel Deployment Guide

## Quick Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git push origin mvp-tourist-portal
   ```

2. **Visit [vercel.com](https://vercel.com) and:**
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your `tourist_friendly` repository
   - Select the `mvp-tourist-portal` branch
   - Vercel will auto-detect Next.js settings

3. **Configure environment variables in Vercel dashboard:**
   - Go to Project Settings → Environment Variables
   - Add any required variables (see `.env.example`)
   - For MVP, you can deploy without any environment variables

4. **Deploy:**
   - Click "Deploy"
   - Your app will be live at `https://your-project-name.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from your project directory:**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Link to existing project or create new one
   - Select your preferred settings
   - Deploy!

## Environment Variables for Production

For the MVP, no environment variables are required. The app uses mock data and works out of the box.

### Optional Environment Variables:

Copy from `.env.example` and set in Vercel dashboard if needed:

- `NEXT_PUBLIC_APP_URL` - Automatically set by Vercel
- `GOOGLE_MAPS_API_KEY` - For maps integration (future feature)
- `AI_SERVICE_API_KEY` - For AI assistant (future feature)

## Production Optimizations

The app is already optimized for production with:

✅ **Performance:**
- Next.js 15.5.3 with App Router
- Static generation for marketing pages
- Optimized images and assets
- Security headers configured

✅ **SEO Ready:**
- Proper meta tags and titles
- Semantic HTML structure
- Responsive design

✅ **Monitoring:**
- Built-in Vercel Analytics support
- Error boundaries in place

## Post-Deployment Checklist

After deployment:

1. ✅ **Test Core Features:**
   - Home page loads correctly
   - Attractions page with filtering works
   - API endpoints respond correctly
   - Mobile responsive design

2. ✅ **Performance Check:**
   - Run Lighthouse audit
   - Check Core Web Vitals in Vercel dashboard

3. ✅ **Custom Domain (Optional):**
   - Add your custom domain in Vercel dashboard
   - Configure DNS settings

## Troubleshooting

### Common Issues:

1. **Build Fails:**
   - Check `npm run build` works locally
   - Verify all dependencies are in `package.json`
   - Check TypeScript errors

2. **Environment Variables:**
   - Ensure variables are set in Vercel dashboard
   - Check variable names match exactly
   - Restart deployment after adding variables

3. **API Routes Not Working:**
   - Verify API files are in `src/app/api/` directory
   - Check file naming conventions
   - Test API endpoints locally first

## Next Steps

After successful deployment:

1. **Monitor Performance:** Check Vercel dashboard for metrics
2. **Add Features:** Implement Google Maps, AI assistant from tasks.md
3. **Custom Domain:** Configure your own domain
4. **Analytics:** Add Google Analytics or Vercel Analytics

## Support

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment:** [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Project Issues:** Check GitHub issues or create new ones

---

🚀 **Your Tourist Portal MVP is ready for the world!**