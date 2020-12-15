import React from "react";
import { Route, Switch } from "react-router-dom";

import Signup from "./Signup";
import Login from "./Login";
import Home from "../../components/Home";

function AuthRouter(props) {
  return (
    // <> é um alias (apelido) para React.Fragment
    <React.Fragment>
      <Switch>
        <Route exact path={`${props.match.path}/`} component={Home} />
        <Route path={`${props.match.path}/signup`} component={Signup} />
        <Route path={`${props.match.path}/login`} component={Login} />
      </Switch>
    </React.Fragment>
  );
}

export default AuthRouter;
