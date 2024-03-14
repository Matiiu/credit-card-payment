const url = import.meta.env;

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