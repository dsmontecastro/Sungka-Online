import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Rooms } from '@shared/types';


// #region : Utils -------------------------------------------------------------------------------------------

const dev = import.meta.env.DEV;

// #endregion ------------------------------------------------------------------------------------------------


// #region : State Creation ----------------------------------------------------------------------------------

export interface LobbyState {

    rooms: Rooms
    roomID: string

    host: boolean
    ready: boolean

}

const initialState: LobbyState = {

    rooms: {},
    roomID: "",

    host: false,
    ready: false,

};

// #endregion ------------------------------------------------------------------------------------------------


// #region : Slice & Actions ---------------------------------------------------------------------------------

const lobbySlice = createSlice({
    name: 'lobby',
    initialState,
    reducers: {

        reset: () => initialState,

        updateRooms: () => { },
        roomsUpdated: ((
            state, action: PayloadAction<Rooms>) => {
            state.rooms = action.payload;
        }),

        exitRoom: ((
            state, action: PayloadAction<string>) => {
            if (dev) {
                console.log(`Exiting ROOM (${action.payload})...`);
                console.log(`Host State: ${state.host}...`);
            }
        }),
        roomExited: (state => {
            state.roomID = initialState.roomID;
            state.ready = initialState.ready;
            state.host = initialState.host;
        }),

        makeRoom: ((
            state, action: PayloadAction<{ name: string, pass: string }>) => {
            if (dev) {
                console.log(`Making ROOM (${action.payload.name})...`);
                console.log(`Host State: ${state.host}...`);
            }
        }),
        joinRoom: ((
            state, action: PayloadAction<{ id: string, pass: string }>) => {
            if (dev) {
                console.log(`Joining ROOM (${action.payload.id})...`);
                console.log(`Host State: ${state.host}...`);
            }
        }),
        roomJoined: ((
            state, action: PayloadAction<{ id: string, host: boolean }>) => {
            state.roomID = action.payload.id;
            state.host = action.payload.host;
        }),

        ready: ((
            state, action: PayloadAction<boolean>) => {
            if (dev) {
                console.log(`SENDING STATE: ${action.payload}`);
                console.log(`CURRENT STATE: ${state.ready}`);
            }
        }),
        readied: ((
            state, action: PayloadAction<boolean>) => {
            state.ready = action.payload;
        }),

    },
});

// #endregion ------------------------------------------------------------------------------------------------


// #region : Slice & Actions ---------------------------------------------------------------------------------

export const lobbyActions = lobbySlice.actions;

export default lobbySlice;

// #endregion ------------------------------------------------------------------------------------------------