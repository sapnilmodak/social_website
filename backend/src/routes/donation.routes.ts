import { Router } from 'express';
import { createDonation, verifyDonation } from '../controllers/payment.controller';

const router = Router();

router.post('/create', createDonation);
router.post('/verify', verifyDonation);

export default router;
