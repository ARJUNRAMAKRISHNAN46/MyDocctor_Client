import { createStore, Action } from "redux";

export interface UserData {
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
  role: string;
  profile: {
    avatar: {
      type: string;
    };
    dob: {
      type: string;
    };
    gender: {
      type: string;
      enum: ["male", "female", "other"];
    };
  };
  isBlocked: boolean;
  otp: string;
  favouriteDoctor: string[];
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  }[];
  appointments: string[];
}

// Define action type and action creator
interface SetUserDataAction extends Action {
  type: typeof SET_USER_DATA;
  payload: UserData;
}

const SET_USER_DATA = "SET_USER_DATA";

export const setUserData = (userData: UserData): SetUserDataAction => ({
  type: SET_USER_DATA,
  payload: userData,
});

// Define initial state
interface InitialState {
  userData: UserData | null;
}

const initialState: InitialState = {
  userData: null,
};

export interface RootState {
  userData: UserData | null;
}

// Define reducer
const rootReducer = (
  state: InitialState = initialState,
  action: SetUserDataAction
): InitialState => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(rootReducer);

export default store;
