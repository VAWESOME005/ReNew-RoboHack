import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateSellerRoute = ({ ...rest }) => {
  const { auth } = useSelector((state) => ({ ...state }));

  return auth &&
    auth.token &&
    auth.user.stripe_account_id &&
    auth.user.stripe_seller &&
    auth.user.stripe_seller.charges_enabled ? (
    <Route {...rest} />
  ) : (
    <Redirect to="/seller/dashboard" />
  );
};

export default PrivateSellerRoute;
