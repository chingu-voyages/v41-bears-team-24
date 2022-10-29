/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:" + 5001;

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
        console.log(payload);
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
    const url = new URL(`${API_BASE_URL}/menuItem`);
    const result = await fetchJson(url, { headers, signal }, { data: [] });
    return result.data;
}

/**
 * Retrieves an existing menu item.
 * @returns {Promise<MenuItem>}
 *  a promise that resolves to a Menu Item object
 */
export async function getMenuItemn(menuItemId: Number, signal?: AbortSignal) {
    const url = new URL(`${API_BASE_URL}/menuItem/${menuItemId}`);
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
 *  a promise that resolves to a new Menu Item object
 */
export async function createReservation(menuItem: MenuItem, signal?: AbortSignal) {
    const url = new URL(`${API_BASE_URL}/menuItem`);
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify({ data: menuItem }),
        signal,
    };
    return await fetchJson(url, options);
}

/**
 *
 * @param {number} menuItemId
 * menuItemId of the reservation to be modified.
 * @param {AbortSignal} signal
 * AbortSignal to abort fetching.
 * @returns {object} `MenuItem`
 * Object representing the modified reservation.
 */
export async function editMenuItem(menuItem: MenuItem, signal?: AbortSignal) {
    const url = new URL(`${API_BASE_URL}/menuItem/${menuItem.id}`);
    const options = {
        method: "PUT",
        headers,
        body: JSON.stringify({ data: menuItem }),
        signal,
    };
    const menuItemReturned = await fetchJson(url, options);
    return menuItemReturned;
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