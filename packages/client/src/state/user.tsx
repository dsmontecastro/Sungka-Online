import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// #region : State Creation ----------------------------------------------------------------------------------

export interface UserState {
    id: string
    user: string
    connected: boolean
}

const initialState: UserState = {
    id: "",
    user: "",
    connected: false,
};

// #endregion ------------------------------------------------------------------------------------------------


// #region : Slice & Actions ---------------------------------------------------------------------------------

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        _debug: () => { },

        disconnect: () => initialState,
        connect: () => { },

        connected: (
            (state, action: PayloadAction<{ id: string, success: boolean }>) => {
                state.connected = action.payload.success;
                state.id = action.payload.id;
            }
        ),

        logout: (state => { state.user = initialState.user; }),
        login: (
            (state, action: PayloadAction<string>) => {
                state.user = action.payload;
            }
        ),

    },
});

// #endregion ------------------------------------------------------------------------------------------------


// #region : Slice & Actions ---------------------------------------------------------------------------------

export const userActions = userSlice.actions;

export default userSlice;

// #endregion ------------------------------------------------------------------------------------------------