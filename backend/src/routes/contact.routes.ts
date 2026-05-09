import { Router } from 'express';
import { submitMessage, getMessages, deleteMessage } from '../controllers/contact.controller';

const router = Router();

router.post('/submit', submitMessage);
router.get('/', getMessages);
router.delete('/:id', deleteMessage);

export default router;
