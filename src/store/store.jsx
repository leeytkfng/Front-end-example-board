import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user", // state이름
  initialState: {
    email: "sally03915@gmail.com",
    nickname: "sally03915",
  },
  //1. state초기값
  //2. let [user, ?] = useState({email : ..., nickname:...})
  reducers: {},
});
export default configureStore({
  reducer: {
    user: user.reducer, // 변수명.reducer
  },
});
