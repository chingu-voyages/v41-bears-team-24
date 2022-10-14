import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../errors/asyncHandler';
import prisma from '../client';

async function list(req: Request, res: Response) {
    const data = await prisma.menuCategory.findMany();
    res.status(200).json({ data });
}

async function categoryExists(req: Request, res: Response, next: NextFunction) {
  const { categoryId } = res.locals.categoryId ? res.locals : req.params;
    const category = await prisma.menuCategory.findUnique({
        where: {
            id: Number(categoryId)
        }
    });

    if (!category) {
        return next({
            status: 404, message: "Menu Category Not Found"
        });
    }

    res.locals.category = category;
    next();
}

async function read(req: Request, res: Response) {
    res.status(200).json({ data: res.locals.category });
}

async function update(req: Request, res: Response) {
    const { categoryId } = req.params;
    const categoryName = req.body?.categoryName;
    const category = await prisma.menuCategory.update({
        where: { id: Number(categoryId) },
        data: { name: String(categoryName) },
    });

    res.status(200).json({ data: category });
}

async function isValidCategoryName(req: Request, res: Response, next: NextFunction) {
    const categoryName = req.body?.categoryName;
    // TODO: Validate that the category name doesn't have any invalid characters
    if (!categoryName) {
        return next({
            status: 400,
            message: "categoryName is required for creating a new category."
        });
    }
    const existingCategory = await prisma.menuCategory.findFirst({
        where: {
            name: String(categoryName)
        }
    });
    if (existingCategory) {
        return next({
            status: 400,
            message: `Category with name ${categoryName} already exists.`
        });
    }

    next();
}

async function create(req: Request, res: Response) {
    const categoryName = req.body?.categoryName;

    const newCategory = await prisma.menuCategory.create({
        data: {
            name: categoryName,
        },
    });
    console.log(newCategory);

    res.status(201).json({ data: newCategory });
}

module.exports = {
    create: [asyncHandler(isValidCategoryName), asyncHandler(create)],
    list: asyncHandler(list),
    read: [asyncHandler(categoryExists), asyncHandler(read)],
    update: [asyncHandler(categoryExists), asyncHandler(isValidCategoryName), asyncHandler(update)]
};