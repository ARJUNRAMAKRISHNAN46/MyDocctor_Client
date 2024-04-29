import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "./components/common/theme-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="263439428108-avotk62vmf6mr2qoerrtunlrri85ioeo.apps.googleusercontent.com">
      <Provider store={store}>
        <Router>
          <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <App />
          </ThemeProvider>
        </Router>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
