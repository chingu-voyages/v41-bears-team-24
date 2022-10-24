import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../errors/asyncHandler';
import prisma from '../../prismaClient';
import { validEmployee } from '../../auth/auth'
import jwt from 'jsonwebtoken'

async function list(req: Request, res: Response) {
    console.log('test')
    // test
    const decoded = jwt.decode(req.cookies.ORDER_UP_TOKEN, {complete: true})
    console.log('decoded payload :', decoded?.payload)
    const payload = decoded?.payload

    if (validEmployee(req.cookies.ORDER_UP_TOKEN)) {
        const data = await prisma.menuItem.findMany();
        res.status(200).json({ payload });
    } else {
        res.status(401).json({ error: 'Employee is not authorized to perform this action' })
    }
}

async function menuItemExists(req: Request, res: Response, next: NextFunction) {
    const { menuItemId } = res.locals.menuItemId ? res.locals : req.params;
    const menuItem = await prisma.menuItem.findUnique({
        where: {
            id: Number(menuItemId)
        }
    });

    if (!menuItem) {
        return next({
            status: 404, message: "Menu Item Not Found"
        });
    }

    res.locals.menuItem = menuItem;
    next();
}

async function read(req: Request, res: Response) {
    res.status(200).json({ data: res.locals.menuItem });
}

// model MenuItem {
//     id           Int     @id @default(autoincrement())
//     name         String
//     price        Decimal
//     ingredients  String
//     description  String
//     calorieCount Int
//     imageUrl     String

//     categoryId Int

async function update(req: Request, res: Response) {
    const {
        name,
        price,
        ingredients,
        description,
        calorieCount,
        imageUrl,
        categoryId
    } = req.body;

    const { id } = res.locals.menuItem;

    const menuItem = await prisma.menuItem.update({
        where: { id },
        data: {
            name: name ? String(name) : undefined,
            // TODO: change price to a safe format. Maybe integer cents?
            price: price ? Number(price) : undefined,
            ingredients: ingredients ? String(ingredients) : undefined,
            description: description ? String(description) : undefined,
            calorieCount: calorieCount ? Number(calorieCount) : undefined,
            imageUrl: imageUrl ? String(imageUrl) : undefined,
            category: categoryId ? { connect: { id: categoryId } } : undefined
        },
    });

    res.status(200).json({ data: menuItem });
}

async function create(req: Request, res: Response) {
    //TODO: Data Validations
    const {
        name,
        price,
        ingredients,
        description,
        calorieCount,
        imageUrl,
        categoryId
    } = req.body;

    const newItem = await prisma.menuItem.create({
        data: {
            name: String(name),
            // TODO: change price to a safe format. Maybe integer cents?
            price: Number(price),
            ingredients: String(ingredients),
            description: String(description),
            calorieCount: Number(calorieCount),
            imageUrl: String(imageUrl),
            category: { connect: { id: categoryId } },
        },
    });

    res.status(201).json({ data: newItem });
}

async function remove(req: Request, res: Response) {
    const menuItem = await prisma.menuItem.delete({
        where: { id: res.locals.menuItem.id }
    });
    res.status(200).json({ data: menuItem });
}

export default {
    create: [asyncHandler(create)],
    list: asyncHandler(list),
    read: [asyncHandler(menuItemExists), asyncHandler(read)],
    update: [asyncHandler(menuItemExists), asyncHandler(update)],
    delete: [asyncHandler(menuItemExists), asyncHandler(remove)]
};