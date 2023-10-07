import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Message } from '@shared/types';


// #region : Utils -------------------------------------------------------------------------------------------

const dev = import.meta.env.DEV;

// #endregion ------------------------------------------------------------------------------------------------


// #region : State Creation ----------------------------------------------------------------------------------

export interface ChatState { messages: Message[] }

const initialState: ChatState = { messages: [] };

// #endregion ------------------------------------------------------------------------------------------------


// #region : Slice & Actions ---------------------------------------------------------------------------------

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {

        reset: () => initialState,
        clear: () => initialState,

        send: ((
            state, action: PayloadAction<string>) => {
            if (dev) {
                console.log(`MSG CONTENT: ${action.payload}`);
                console.log(`MSGS TOTAL: ${state.messages.length}`);
            }
        }),

        receive: ((
            state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        }),

    },
});

// #endregion ------------------------------------------------------------------------------------------------


// #region : Exports ------------------------------------------------------------------------------------------

export const chatActions = chatSlice.actions;

export default chatSlice;

// #endregion ------------------------------------------------------------------------------------------------