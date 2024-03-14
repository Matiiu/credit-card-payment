const url = import.meta.env.VITE_API_URL;

export async function getProdructs() {
    try {
        const response = await url;
        if (!response.ok) {
            throw new Error('Error Obteniendo los datos')
        }

        return response.json();
    } catch (error) {
        console.error(error.message)
    }
} 