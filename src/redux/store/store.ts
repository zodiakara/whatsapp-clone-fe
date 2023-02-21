import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "../reducer";

export const store = configureStore({ reducer: { user: mainReducer } });
export type RootState = ReturnType<typeof store.getState>;
