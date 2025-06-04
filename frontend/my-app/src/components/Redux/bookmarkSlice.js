import { createSlice } from "@reduxjs/toolkit";

const bookmarkSlice=createSlice({
    name:"bookmarks",
    initialState:{
        bookmarks:[],
    },
    reducers:{
        setBookmarks:(state,action)=>{
            state.bookmarks=action.payload;
        }
    }
})

export const {setBookmarks}= bookmarkSlice.actions;
export default bookmarkSlice.reducer;