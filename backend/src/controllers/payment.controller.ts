import { Request, Response } from 'express';
import stripe from '../config/stripe';
import prisma from '../config/db';
import { sendReceiptEmail } from '../config/mail';

export const createDonation = async (req: Request, res: Response) => {
  const { amount, donorName, donorEmail } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: 'Donation to Jagdeep Sacha Campaign',
              description: 'Support our vision for Caledon',
            },
            unit_amount: Math.round(amount * 100), // Ensure it's an integer
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/donate?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/donate?canceled=true`,
      customer_email: donorEmail,
      metadata: {
        donorName,
        donorEmail,
      },
    });

    // Save initial donation record to DB
    await prisma.donation.create({
      data: {
        stripeSessionId: session.id,
        amount: Math.round(amount * 100),
        currency: 'CAD',
        donorName,
        donorEmail,
        status: 'pending',
      },
    });

    res.status(200).json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const verifyDonation = async (req: Request, res: Response) => {
  const { session_id } = req.body;

  if (!session_id) {
    return res.status(400).json({ message: 'Session ID is required' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === 'paid') {
      // Payment is verified
      const updatedDonation = await prisma.donation.update({
        where: { stripeSessionId: session_id },
        data: {
          stripePaymentIntentId: session.payment_intent as string,
          status: 'completed',
        },
      });

      // Send Receipt Email
      if (updatedDonation.donorEmail) {
        await sendReceiptEmail(
          updatedDonation.donorEmail,
          updatedDonation.donorName || 'Supporter',
          updatedDonation.amount / 100, // Pass dollars to email helper
          updatedDonation.id
        );
      }

      res.status(200).json({ message: 'Donation successful', donation: updatedDonation });
    } else {
      res.status(400).json({ message: 'Payment not completed' });
    }
  } catch (error) {
    console.error('Error verifying Stripe donation:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
