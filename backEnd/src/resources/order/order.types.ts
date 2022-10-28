import { OrderStatus } from "@prisma/client";

interface OrderItem {
    quantity: Number,
    modification: string | null | undefined,
    menuItemId: Number
}

function isValidOrderItem(toBeDetermined: any) {
    if ((toBeDetermined as OrderItem).menuItemId) {
        return true
    }
    return false
}

function isValidStatus(status: String) {
    return status == OrderStatus.COMPLETED || OrderStatus.UPNEXT;
}

export { OrderItem, isValidOrderItem, isValidStatus };