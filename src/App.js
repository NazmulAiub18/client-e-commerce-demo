import React from "react";
import axios from "axios";

//Mui Staff
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeObject from "./utils/theme";

//context provider
import { CartProvider } from "./context/cart";

//components
import Navbar from "./components/layout/Navbar";

//pages
import Home from "./pages/Home";

const theme = createMuiTheme(themeObject);

axios.defaults.baseURL =
  "https://shrouded-scrubland-02815.herokuapp.com/api/v1/";

function App() {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <CartProvider>
          <Navbar />
          <Home />
        </CartProvider>
      </MuiThemeProvider>
    </>
  );
}

export default App;
