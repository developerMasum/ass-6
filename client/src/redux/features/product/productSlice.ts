import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TProduct = {
  id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
};

type TInitialState = {
  product: TProduct[];
};

const initialState: TInitialState = {
    product: [],
};
const productSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TProduct>) => {
      state.product.push({ ...action.payload });
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.product = state.product.filter((item) => item.id !== action.payload);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const task = state.product.find((item) => item.id === action.payload);
      task!.isCompleted = !task?.isCompleted;
    },
  },
});

export const { addTodo, removeTodo, toggleComplete } = productSlice.actions;

export default productSlice.reducer;








