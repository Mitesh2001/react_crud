import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../../requests/_requests";
import { User } from "../../models/User";

export type Users = {
    data: User[],
    loading: boolean;
    error?: string | null;
}

type initialStateType = {
    users: Users
}

const initialState: initialStateType = {
    users: {
        data: [],
        loading: false,
        error: null,
    }
}

export const fetchUsers = createAsyncThunk("users/fetchUsers",
    async (_, thunkAPI) => {
        try {
            const response = await getAllUsers();
            return response.data;
        } catch (error) {
            throw error;
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.pending, (state) => {
            state.users.loading = true;
            state.users.error = null;
        }).addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.users.data = action.payload;
            state.users.loading = false;
            state.users.error = null;
        }).addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
            state.users.loading = false;
            state.users.error = action.payload;
        })
    }
})

export default userSlice.reducer;