import { Request, Response } from 'express';
import prisma from '../config/db';
import { sendWelcomeEmail } from '../config/mail';

export const subscribe = async (req: Request, res: Response) => {
  const { firstName, lastName, email } = req.body;

  try {
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    const subscriber = await prisma.subscriber.create({
      data: {
        firstName,
        lastName,
        email,
      },
    });

    // Send Welcome Email (Non-blocking to prevent timeouts)
    sendWelcomeEmail(email, firstName).catch(err => console.error('Background Email Error:', err));

    res.status(201).json({ message: 'Successfully joined the movement!', subscriber });
  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
