import { configureStore, combineReducers } from '@reduxjs/toolkit'
import   userReducer from './user/userSlice.js';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import themeReducer from './theme/themeSlice.js'

const rootReducer=combineReducers({
    user:  userReducer,
    theme: themeReducer
});

const persistConfig={
    key: 'mohin',
    storage,
    version: 1,
}

const persistReducerr= persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer: persistReducerr,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck: false})
  })


  export const persistor =persistStore(store)