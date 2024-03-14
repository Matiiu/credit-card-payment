const url = import.meta.env.VITE_URL_API;

export async function getProdructs() {
    try {
        console.log({url})
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error getting the products')
        }

        return await response.json();
    } catch (error) {
        console.error(error.message)
    }
}

export async function getProdruct(productId) {
    try {
        console.log({url})
        const response = await fetch(`${url}/${productId}`);
        if (!response.ok) {
            throw new Error('Error getting the product')
        }

        return await response.json();
    } catch (error) {
        console.error(error.message)
    }
}