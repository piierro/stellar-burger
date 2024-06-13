import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../utils/burger-api';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  getIngredientsApi
);

type TIngredientState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  ingredientsError: string | null;
};

export const initialState: TIngredientState = {
  ingredients: [],
  isIngredientsLoading: false,
  ingredientsError: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIsIngredientsLoading: (state) => state.isIngredientsLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.ingredientsError = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredientsError = action.error.message!;
      });
  }
});

export const { getIngredients, getIsIngredientsLoading } =
  ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
