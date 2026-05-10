import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendContactEmail } from '../config/mail';

const prisma = new PrismaClient();

export const submitMessage = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = await prisma.contactMessage.create({
      data: {
        firstName,
        lastName,
        email,
        message
      }
    });

    // Send email notification and confirmation
    await sendContactEmail(firstName, lastName, email, message);

    res.status(201).json({ message: "Message sent successfully", data: newMessage });
  } catch (error) {
    console.error("Submit message error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.contactMessage.delete({
      where: { id: String(id) }
    });
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Delete message error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
