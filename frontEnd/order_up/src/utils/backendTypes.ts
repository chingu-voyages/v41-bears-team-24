export interface CreateOrderItem{
    // Amount of this specific item(with these exact modifications) to add to the order
    quantity : Number,
    modifications : string | undefined,
    // Id of the menu item to be added
    menuItemId : Number
}

export interface CreateOrder{
    customerName : String,
    orderItems : Array<CreateOrderItem>
}