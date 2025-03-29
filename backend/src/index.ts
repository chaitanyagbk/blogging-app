import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

const app = new Hono();

// ✅ Allow all necessary domains dynamically
app.use(
  '/*',
  cors({
    origin: (origin) => {
      if (!origin) return "*"; // Allow non-browser clients like Postman

      const allowedOrigins = [
        "http://localhost:5173",
        "https://blogging-app-gules-phi.vercel.app",
        "https://blogging-app-git-main-gbk-chaitanyas-projects.vercel.app",
        "https://blogging-bvzvfbqvn-gbk-chaitanyas-projects.vercel.app"
      ];
      
      return allowedOrigins.includes(origin) ? origin : allowedOrigins[0]; // Default to production URL
    },
    credentials: true,
  })
);

// Define routes
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

export default app;
