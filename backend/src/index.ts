import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

import path from 'path';
import donationRoutes from './routes/donation.routes';
import subscriberRoutes from './routes/subscriber.routes';
import adminRoutes from './routes/admin.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: false, // Allow loading images from the server
}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/donation', donationRoutes);
app.use('/api/subscriber', subscriberRoutes);
app.use('/api/admin', adminRoutes);
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
