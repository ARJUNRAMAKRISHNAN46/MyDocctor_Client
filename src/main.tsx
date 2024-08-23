import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { SocketProvider } from "./contexts/SocketContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="678751824155-u5o87lalbm4dmica8t72hrd63j062oiv.apps.googleusercontent.com">
      <Provider store={store}>
        <Toaster position="top-center" />
        <Router>
          <SocketProvider>
            <AuthContextProvider>
              <App />
            </AuthContextProvider>
          </SocketProvider>
        </Router>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
