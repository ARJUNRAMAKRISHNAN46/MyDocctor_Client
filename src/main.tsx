import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="263439428108-avotk62vmf6mr2qoerrtunlrri85ioeo.apps.googleusercontent.com">
      <Provider store={store}>
        <Router>
          <Toaster position="top-center"/>
          <App />
        </Router>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
