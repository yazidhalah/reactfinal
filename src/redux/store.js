import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import tokenSlice from './features/Auth/AuthSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { MoviesAPI } from './services/MoviesAPI'

const persistTokenConfig = {
    key: 'token-persiit',
    storage,
}

const persistedTokenReducer = persistReducer(persistTokenConfig, tokenSlice)



export const store = configureStore({
    reducer: {
        token: persistedTokenReducer,
        MoviesAPI: MoviesAPI.reducer
    },
    middleware: () => getDefaultMiddleware({ serializableCheck: false })
        .concat([MoviesAPI.middleware])
})


export const persistToken = persistStore(store)