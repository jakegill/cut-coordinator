import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; //localstorage
import authReducer from "./auth/authSlice";
import barberProfileReducer from "./profile/barberSlice";
import clientProfileReducer from "./profile/clientSlice";

const rootReducer = combineReducers({
	auth: authReducer,
	barberProfile: barberProfileReducer,
	clientProfile: clientProfileReducer,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth", "barberProfile", "clientProfile"],
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
