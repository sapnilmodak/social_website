import { Request, Response } from 'express';
import prisma from '../config/db';

// 1. Visit Count
export const trackVisit = async (req: Request, res: Response) => {
  try {
    await prisma.analytics.upsert({
      where: { id: 'site_stats' },
      update: { visitorCount: { increment: 1 } },
      create: { id: 'site_stats', visitorCount: 1 },
    });
    res.status(200).json({ message: 'Visit tracked' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const analytics = await prisma.analytics.findUnique({ where: { id: 'site_stats' } });
    const subCount = await prisma.subscriber.count();
    const totalDonations = await prisma.donation.aggregate({
      _sum: { amount: true },
      where: { status: 'completed' }
    });

    res.status(200).json({
      visitorCount: analytics?.visitorCount || 0,
      subscriberCount: subCount,
      totalDonations: (Number(totalDonations._sum.amount) || 0) / 100,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// 2. Subscribers List
export const getSubscribers = async (req: Request, res: Response) => {
  try {
    const subscribers = await prisma.subscriber.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// 3. Transaction History
export const getDonations = async (req: Request, res: Response) => {
  try {
    const donations = await prisma.donation.findMany({
      where: { status: 'completed' },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// 4. Community Photos
export const uploadPhoto = async (req: Request, res: Response) => {
  try {
    const caption = req.body.caption;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const photo = await prisma.communityPhoto.create({
      data: {
        url: `/uploads/${file.filename}`,
        caption: typeof caption === 'string' ? caption : null,
      },
    });

    res.status(201).json(photo);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getPhotos = async (req: Request, res: Response) => {
  try {
    const photos = await prisma.communityPhoto.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deletePhoto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.communityPhoto.delete({ 
      where: { id: String(id) } 
    });
    res.status(200).json({ message: 'Photo deleted' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// 5. SEO Keywords
export const updateSEO = async (req: Request, res: Response) => {
  try {
    const { title, description, keywords } = req.body;

    const config = await prisma.sEOConfig.upsert({
      where: { id: 'main_config' },
      update: { 
        title: typeof title === 'string' ? title : undefined, 
        description: typeof description === 'string' ? description : undefined, 
        keywords: typeof keywords === 'string' ? keywords : undefined 
      },
      create: { 
        id: 'main_config', 
        title: typeof title === 'string' ? title : null, 
        description: typeof description === 'string' ? description : null, 
        keywords: typeof keywords === 'string' ? keywords : null 
      },
    });
    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getSEO = async (req: Request, res: Response) => {
  try {
    const config = await prisma.sEOConfig.findUnique({ where: { id: 'main_config' } });
    res.status(200).json(config || {});
  } catch (error) {
    res.status(500).json({ error });
  }
};
