import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../errors/asyncHandler';
import prisma from '../../prismaClient';
import { validEmployee } from '../../auth/auth'
import AWS from 'aws-sdk'

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const myBucket = new AWS.S3({
    params: { Bucket: process.env.S3_BUCKET_NAME },
    region: process.env.AWS_REGION
})


async function list(req: Request, res: Response) {
    const data = await prisma.menuItem.findMany();
    return res.status(200).json({ data: data });
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

    // Send image to S3 and get back URL
    function generatePreSignedPutUrl( fileName: string , fileType: string) {
        myBucket.getSignedUrl('putObject', {
            Key: fileName,
            ContentType: fileType,
            Expires: process.env.AWS_URL_EXPIRATION_TIME
        } , (err , url) => {
            return url // API Response Here
        });
    }


    const {
        name,
        price,
        ingredients,
        description,
        calorieCount,
        image,
        category
    } = req.body;

    const newItem = await prisma.menuItem.create({
        data: {
            name: String(name),
            // TODO: change price to a safe format. Maybe integer cents?
            price: Number(price),
            ingredients: String(ingredients),
            description: String(description),
            calorieCount: Number(calorieCount),
            imageUrl: String(image),
            category: { connect: { name: category } },
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
    list: [/*asyncHandler(validEmployee(["MANAGER","ADMIN"])),*/ asyncHandler(list)],
    read: [asyncHandler(menuItemExists), asyncHandler(read)],
    update: [asyncHandler(menuItemExists), asyncHandler(update)],
    delete: [asyncHandler(menuItemExists), asyncHandler(remove)]
};