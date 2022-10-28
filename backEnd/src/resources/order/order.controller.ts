import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../errors/asyncHandler';
import prisma from '../../prismaClient';
import { OrderStatus } from "@prisma/client";
import { isValidStatus, isValidOrderItem, OrderItem } from './order.types';

async function orderExists(req: Request, res: Response, next: NextFunction) {
    const { id } = res.locals.id ? res.locals : req.params;
    const order = await prisma.order.findUnique({
        where: { id: Number(id) }
    });

    if (!order) {
        return next({
            status: 404, message: "Order Not Found"
        });
    }

    res.locals.order = order;
    next();
}

async function read(req: Request, res: Response) {
    res.status(200).json({ data: res.locals.order });
}

async function list(req: Request, res: Response) {
    const data = await prisma.order.findMany({
        include: {
            OrderItem: {
                include: {
                    menuItem: true
                }
            }
        }
    });
    return res.status(200).json({ data: data });
}

async function create(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    const {
        customerName,
        orderItems
    } = req.body;
    if (!Array.isArray(orderItems)) {
        return next({
            status: 400,
            message: "No list of order items provided."
        });
    }

    for (const item of orderItems) {
        if (!isValidOrderItem(item)) {
            return next({
                status: 400,
                message: "Invalid order item found in list of order items"
            });
        }
        var orderItem = item as OrderItem;
        var menuItem = await prisma.menuItem.findUnique({
            where: { id: Number(orderItem.menuItemId) }
        });
        if (!menuItem) {
            return next({
                status: 400,
                message: `Could not find menu item specified in order: ${orderItem.menuItemId}`
            });
        }
    }
    let status: OrderStatus = "UPNEXT";

    let order = await prisma.order.create({
        data: {
            customerName,
            status,
            // TODO: GET THE USER ID FROM COOKIE
            userId: 3,
            OrderItem: { create: orderItems }
        }
    });
    res.status(201).json({ data: order });
}

async function update(req: Request, res: Response, next: NextFunction) {
    const {
        customerName,
        userId,
        status
    } = req.body;

    if (status && !isValidStatus(status)) {
        return next({
            status: 400,
            message: `Invalid status ${status}`
        });
    }

    const { id } = res.locals.order;

    const order = await prisma.order.update({
        where: { id },
        data: {
            customerName: customerName ? String(customerName) : undefined,
            status: status,
            userId: userId ? Number(userId) : undefined,
        }
    });

    res.status(200).json(order);
}

async function remove(req: Request, res: Response) {
    const order = await prisma.order.delete({
        where: { id: res.locals.order.id }
    });
    res.status(200).json({ data: order });
}

export default {
    create: [asyncHandler(create)],
    list: [asyncHandler(list)],
    read: [asyncHandler(orderExists), asyncHandler(read)],
    update: [asyncHandler(orderExists), asyncHandler(update)],
    delete: [asyncHandler(orderExists), asyncHandler(remove)]
};