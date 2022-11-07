import { createContext, useEffect, useReducer } from "react";

var userAuth = null;

if (localStorage.getItem('user') === 'null' && localStorage.getItem('user') === null) {
  userAuth = null;
} else {
  userAuth = JSON.parse(localStorage.getItem('user'));
}

const INITIAL_STATE = {
  user:  userAuth,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
      case "INCORRECT_ROLE":
      return {
        user: null,
        loading: false,
        error: {success: false, message: "Quyền không phù hợp để đăng nhập vào trang admin."},
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};