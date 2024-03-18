const url = 'https://fakestoreapi.com/products';

export async function getProducts() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error getting the products')
        }

        return await response.json();
    } catch (error) {
        console.error(error.message)
    }
}

export async function getProduct(productId) {
    try {
        const response = await fetch(`${url}/${productId}`);
        if (!response.ok) {
            throw new Error('Error getting the product')
        }

        return await response.json();
    } catch (error) {
        console.error(error.message)
    }
}