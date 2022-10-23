import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import PrivateSellerRoute from "./components/PrivateSellerRoute";
import SellerDashboard from "./pages/seller/SellerDashboard";
import StripeCallback from "./pages/seller/StripeCallback";
import ViewProduct from "./pages/products/ViewProduct";
import Buy from "./pages/buyer/Buy";
import Weather from "./pages/Weather";
import Donate from "./pages/buyer/Donate";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Other from "./pages/Other";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        {/* <PrivateRoute exact path="/buyer/dashboard" component={BuyerDashboard} /> */}
        <PrivateRoute
          exact
          path="/seller/dashboard"
          component={SellerDashboard}
        />
        <PrivateRoute
          exact
          path="/stripe/callback"
          component={StripeCallback}
        />
        <Route exact path="/product/:productId" component={ViewProduct} />
        <Route exact path="/buy" component={Buy} />
        <Route exact path="/donate" component={Donate} />
        <Route exact path="/suggestions" component={Weather} />
        <Route exact path="/suggestions/men" component={Men} />
        <Route exact path="/suggestions/women" component={Women} />
        <Route exact path="/suggestions/other" component={Other} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
