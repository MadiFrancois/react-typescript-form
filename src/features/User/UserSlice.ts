import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { User } from './type';

export interface UserState {
  users: Array<User>;
}

const initialState: UserState = {
  users: new Array<User>()
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addUser: (state, action: PayloadAction<User>) => {
      let _users = new Array<User>();
      state.users.map((u) => {
          _users.push(u);
      });
      _users.push(action.payload);
      state.users = _users;
    },
    updateUser: (state, action: PayloadAction<{index:number,user:User}>) => {
      let _users = new Array<User>();
      state.users.map((u,index) => {
        if(index !== action.payload.index){
          _users.push(u);
        }else{
          _users.push(action.payload.user);
        }
      });
      state.users = _users;
    },
    deleteUser: (state, action: PayloadAction<number>) => {
        let _users = new Array<User>();
        state.users.map((u,index) => {
          if(index !== action.payload) _users.push(u);
        });
        state.users = _users;
    },
  }
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const listUsers = (state: RootState) => state.user.users;



export default userSlice.reducer;
