import { Router } from 'express';
import { subscribe } from '../controllers/subscriber.controller';

const router = Router();

router.post('/join', subscribe);

export default router;
