import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; //localstorage
import authReducer from "./auth/authSlice";
import barberProfileReducer from "./profile/barberSlice";

const rootReducer = combineReducers({
  // ... your other reducers here ...
  auth: authReducer,
  barberProfile: barberProfileReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "barberProfile"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
