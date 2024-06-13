import { TConstructorIngredient, TIngredient } from '@utils-types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeIngredient(state, action) {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    },
    moveConstructorItem(state, action: PayloadAction<number>) {
      const index = action.payload;

      if (index > 0) {
        [state.ingredients[index], state.ingredients[index - 1]] = [
          state.ingredients[index - 1],
          state.ingredients[index]
        ];
      } else if (index < state.ingredients.length - 1) {
        [state.ingredients[index], state.ingredients[index + 1]] = [
          state.ingredients[index + 1],
          state.ingredients[index]
        ];
      }
    }
  }
});

export const {
  addItem,
  removeIngredient,
  clearConstructor,
  moveConstructorItem
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
