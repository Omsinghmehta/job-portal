import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicantSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookmarkSlice from "./bookmarkSlice"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// import companySlice from "./companySlice";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["auth"],
};
const rootReducer=combineReducers({
     auth:authSlice,
     job:jobSlice,
     company:companySlice,
     application:applicationSlice,
     bookmarks:bookmarkSlice

})
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,]
            }
        })   
})
export default store;