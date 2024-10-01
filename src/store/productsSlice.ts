import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// Определите ваш интерфейс Product и состояние
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  rating?: {
    rate: number;
    count: number;
  };
  liked: boolean; // Добавляем поле liked для отслеживания состояния лайков
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

// Асинхронный thunk для загрузки продуктов
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products"); // Пример API
      const data = await response.json();

      // Добавляем свойство liked для каждого продукта
      const productsWithLike = data.map((product: Product) => ({
        ...product,
        liked: false, // Изначально все продукты не лайкнуты
      }));

      return productsWithLike;
    } catch (error) {
      return rejectWithValue("Ошибка загрузки продуктов");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<number>) {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.liked = !product.liked; // Переключаем состояние лайка
      }
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    updateProduct(
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        description: string;
        price: number;
      }>
    ) {
      const { id, title, description, price } = action.payload;
      const product = state.products.find((p) => p.id === id);
      if (product) {
        product.title = title;
        product.description = description;
        product.price = price;
      }
    },
    // Добавление нового продукта
    addProduct(state, action: PayloadAction<Omit<Product, "id">>) {
      const newProduct = {
        ...action.payload,
        id: state.products.length
          ? state.products[state.products.length - 1].id + 1
          : 1,
        liked: false, // По умолчанию новый продукт не лайкнут
      };
      state.products.push(newProduct);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { toggleLike, deleteProduct, updateProduct, addProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
