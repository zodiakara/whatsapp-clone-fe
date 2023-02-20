import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "../reducer";

export const store = configureStore({ reducer: { user: mainReducer } });
