import { CreateOrder } from "./backendTypes";

/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
const API_BASE_URL = "https://v41-bears-team-24-production.up.railway.app"
   //process.env.REACT_APP_API_BASE_URL || "http://localhost:" + 5000;

/**
 * Defines the default headers for these functions to work with the express server
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the request.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url: URL, options: any, onCancel?: any): Promise<Error | any> {
    try {
        const response = await fetch(url.toString(), options);

        if (response.status === 204) {
            return null;
        }

        const payload = await response.json();

        if (payload.error) {
            return Promise.reject({ message: payload.error });
        }
        return payload;
    } catch (error: any) {
        if (error.name !== "AbortError") {
            console.error(error.stack);
            throw error;
        }
        return Promise.resolve(onCancel);
    }
}

/**
 * Retrieves all existing Menu Items.
 * @returns {Promise<[MenuItem]>}
 *  a promise that resolves to a possibly empty array of Menu Items saved in the database.
 */
export async function listMenuItems(signal?: AbortSignal) {
    const url = new URL(`${API_BASE_URL}/api/menuItem`);
    const result = await fetchJson(url, { headers, signal }, { data: [] });
    return result.data;
}

/**
 * Retrieves an existing menu item.
 * @returns {Promise<MenuItem | undefined>}
 *  a promise that resolves to an menu item object
 */
export async function getMenuItem(menuItemId: Number, signal?: AbortSignal) {
    const url = new URL(`${API_BASE_URL}/api/menuItem/${menuItemId}`);
    const result = await fetchJson(url, { headers, signal }, { data: undefined });
    return result.data;
}

export interface MenuItem {
    id: Number | undefined,
    name: String,
    price: Number,
    ingredients: String,
    description: String,
    calorieCount: Number,
    imageUrl: String,
    categoryId: Number,
}

/**
 * Creates a menu item.
 * @returns {Promise<MenuItem>}
 *  a promise that resolves to a new menu item object
 */
export async function createMenuItem(menuItem: MenuItem, signal?: AbortSignal): Promise<MenuItem | undefined> {
    const url = new URL(`${API_BASE_URL}/api/menuItem`);
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(menuItem),
        signal,
    };
    const result = await fetchJson(url, options, { data: undefined });
    return result.data;
}

/**
 *
 * @param {AbortSignal} signal
 * AbortSignal to abort fetching.
 * @returns {object} `MenuItem`
 * Object representing the modified menu item.
 */
export async function editMenuItem(menuItem: MenuItem, signal?: AbortSignal) {
    const url = new URL(`${API_BASE_URL}/api/menuItem/${menuItem.id}`);
    const options = {
        method: "PUT",
        headers,
        body: JSON.stringify(menuItem),
        signal,
    };
    const menuItemReturned = await fetchJson(url, options);
    return menuItemReturned.data;
}

/**
 * Retrieves all existing orders.
 * @returns {Promise<[any]>}
 *  a promise that resolves to a possibly empty array of orders saved in the database.
 */
export async function listOrders(signal?: AbortSignal) {
    const url = new URL(`${API_BASE_URL}/api/order`);
    const result = await fetchJson(url, { headers, signal }, { data: [] });
    return result.data;
}

/**
 * Retrieves an existing order.
 * @returns {Promise<Order>}
 *  a promise that resolves to an order object, or undefined if the item does not exist
 */
 export async function getOrder(orderId: Number, signal?: AbortSignal) {
    const url = new URL(`${API_BASE_URL}/api/order/${orderId}`);
    const result = await fetchJson(url, { headers, signal }, { data: undefined });
    return result.data;
}

export async function createOrder(newOrder : CreateOrder, signal?: AbortSignal) {
    const url = new URL(`${API_BASE_URL}/api/order`);
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(newOrder),
        signal,
    };
    const result = await fetchJson(url, options);
    return result.data;
}

export async function login(username: String, password: String, signal?: AbortSignal) {
    console.log(API_BASE_URL);
    const url = new URL(`${API_BASE_URL}/signin`);
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify({ username, password }),
        signal,
    };
    return await fetchJson(url, options);
}

export async function completeOrder(id: number, signal?: AbortSignal) {
    const url = new URL(`${API_BASE_URL}/api/order/${id}`);
    const body = { customerName: null,
    			  userID: null,
    			  status: "COMPLETED"}
    const options = {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
        signal,
    };
    const orderReturned = await fetchJson(url, options);
    return orderReturned;
}


// TODO: Remove this.
// These lines are for development purpose, so you can call the functions
// from your browser's console
(window as any).CreateOrder = createOrder;
(window as any).ListOrders = listOrders;
(window as any).GetOrder = getOrder;
(window as any).CreateMenuItem = createMenuItem;
(window as any).ListMenuItems = listMenuItems;
(window as any).GetMenuItem = getMenuItem;
(window as any).CompleteOrder = completeOrder;

