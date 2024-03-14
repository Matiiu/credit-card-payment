const url = import.meta.env.VITE_URL_API;

export async function getProdructs() {
    try {
        console.log({url})
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error Obteniendo los datos')
        }

        return await response.json();
    } catch (error) {
        console.error(error.message)
    }
}

export async function getProdruct(idProduct) {
    try {
        console.log({url})
        const response = await fetch(`${url}/${idProduct}`);
        if (!response.ok) {
            throw new Error('Error Obteniendo los datos')
        }

        return await response.json();
    } catch (error) {
        console.error(error.message)
    }
}