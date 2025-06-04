import { createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
    name: "auth",
    initialState: {
         loading: false ,
         user:false
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser:(state,action)=>{
            state.user=action.payload;
        }
    }
})
export const { setLoading ,setUser} = authslice.actions;
export default authslice.reducer;