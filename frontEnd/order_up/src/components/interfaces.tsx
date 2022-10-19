export interface orderItem {name: string, price: number};

export interface order { id: number,
    items: {name: string, price: number}[] };

