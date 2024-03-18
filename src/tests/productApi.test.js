import { getProducts, getProduct } from '../api/productos';

const url = 'https://fakestoreapi.com/products';

// Mock para simular la respuesta de fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('API Functions', () => {
  beforeEach(() => {
    // Reinicia el mock de fetch antes de cada prueba
    mockFetch.mockClear();
  });

  test('getProducts function', async () => {
    // Simula la respuesta exitosa de fetch
    const mockProducts = [
      {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
      }
    ];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts
    });

    // Llama a la función getProducts
    const products = await getProducts();

    // Verifica que fetch haya sido llamado con la URL correcta
    expect(mockFetch).toHaveBeenCalledWith(url);

    // Verifica que la función retorne los productos correctamente
    expect(products).toEqual(mockProducts);
  });

  test('getProduct function', async () => {
    const productId = 1;
    // Simula la respuesta exitosa de fetch
    const mockProduct = {
      id: productId,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct
    });

    // Llama a la función getProduct con el ID del producto
    const product = await getProduct(productId);

    // Verifica que fetch haya sido llamado con la URL correcta
    expect(mockFetch).toHaveBeenCalledWith(`${url}/${productId}`);

    // Verifica que la función retorne el producto correctamente
    expect(product).toEqual(mockProduct);
  });
});
