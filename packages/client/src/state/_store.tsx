import { configureStore } from '@reduxjs/toolkit';

import user from './user';
import chat from './chat';
import game from './game';
import lobby from './lobby';
import SocketHandler from './_sockets';

export const store = configureStore({
    reducer: {
        user: user.reducer,
        chat: chat.reducer,
        game: game.reducer,
        lobby: lobby.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(SocketHandler)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;