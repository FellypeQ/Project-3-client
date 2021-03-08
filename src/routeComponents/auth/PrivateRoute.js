import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../../contexts/authContext";

function PrivateRoute({ component: Component, ...rest }) {
  const authContext = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return <Component {...routeProps} {...rest} />;
      }}
    />
  );
}

export default PrivateRoute;
