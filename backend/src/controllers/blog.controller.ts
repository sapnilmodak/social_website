import { Request, Response } from 'express';
import prisma from '../config/db';

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        description,
        imageUrl: `/uploads/${file.filename}`,
      },
    });

    res.status(201).json(blog);
  } catch (error) {
    console.error("Create blog error:", error);
    res.status(500).json({ error: "Failed to create blog" });
  }
};

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await prisma.blog.findUnique({
      where: { id: String(id) }
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.blog.delete({
      where: { id: String(id) }
    });
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
};
