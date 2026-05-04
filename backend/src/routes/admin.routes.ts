import { Router } from 'express';
import { 
  getStats, 
  getSubscribers, 
  getDonations, 
  uploadPhoto, 
  getPhotos, 
  deletePhoto, 
  updateSEO, 
  getSEO,
  trackVisit
} from '../controllers/admin.controller';
import { upload } from '../middleware/upload';

const router = Router();

// Analytics
router.post('/track-visit', trackVisit);
router.get('/stats', getStats);

// Subscribers
router.get('/subscribers', getSubscribers);

// Donations
router.get('/donations', getDonations);

// Community Photos
router.post('/photos', upload.single('photo'), uploadPhoto);
router.get('/photos', getPhotos);
router.delete('/photos/:id', deletePhoto);

// SEO
router.post('/seo', updateSEO);
router.get('/seo', getSEO);

export default router;
