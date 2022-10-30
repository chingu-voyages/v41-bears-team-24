export interface orderItem {name: string, price: string, modification: string, menuItemId: number, id: number};

export interface cartOrder { id: number, items: orderItem[] };

export interface User {createdAt: string, firstName: string, lastName: string, id: number,
        password: string, role: string, username: string};

