import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartSlice from "./slices/cartSlice";
import getAllBooksSlice from "./slices/getAllBooksSlice";
import getAllUserSlice from "./slices/getAllUserSlice";
import authSlice from "./slices/authSlice";
import bookReviewSlice from "./slices/bookReviewSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const rootReducer = combineReducers({
  cart: cartSlice,
  getAllBooks: getAllBooksSlice,
  getAllUser: getAllUserSlice,
  auth: authSlice,
  bookReview: bookReviewSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
