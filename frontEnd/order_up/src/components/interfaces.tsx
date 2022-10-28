export interface orderItem {name: string, price: number};

export interface order { id: number,
    items: {name: string, price: number}[] };

export interface User {createdAt: string, firstName: string, lastName: string, id: number,
        password: string, role: string, username: string};

