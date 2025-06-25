import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:0
}


export  const  slice = createSlice({
    // uska sabse phle naam dege jispar kaam karna haa 
    name: "counter",
    //then initial state dege
    initialState,
    // then we apply reducer function 
  reducers:{
      increment: (state) => {
        state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
  }

  

})

export const { increment, decrement } = slice.actions;
export default slice.reducer;