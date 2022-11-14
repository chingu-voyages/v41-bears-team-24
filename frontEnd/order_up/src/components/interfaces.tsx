export interface orderItem {name: string, price: string, modification: string, menuItemId: number, quantity: number, id: number};

export interface cartOrder { id: number, completed: boolean, items: orderItem[] };

export interface User {createdAt: string, firstName: string, lastName: string, id: number,
        password: string, role: string, username: string};

export const EmptyUser = {createdAt: '', firstName: '', lastName: '', id: 0, password: '', role: '', username: ''};


