import React from "react";
import { Route, Switch } from "react-router-dom";

import ListaUpdate from "./ListaUpdate";
import ListaDelete from "./ListaDelete";
import MarketList from "../../components/MarketList";
import HistoryMarketList from "../../components/HistoryMarketList";
import Navbarmain from "../../components/Navbar";
import About from "../../components/About";
import PrivateRoute from "../../routeComponents/auth/PrivateRoute";

function ListaRouter(props) {
  return (
    // <> é um alias (apelido) para React.Fragment
    <React.Fragment>
      <Navbarmain />
      <div className="container-fluid">
        <Switch>
          <PrivateRoute
            exact
            path={`${props.match.path}/`}
            component={MarketList}
          />
          <Route exact path={`${props.match.path}/about`} component={About} />
          <PrivateRoute
            path={`${props.match.path}/lista`}
            component={MarketList}
          />
          <PrivateRoute
            path={`${props.match.path}/listas-salvas`}
            component={HistoryMarketList}
          />
          <PrivateRoute
            path={`${props.match.path}/:id`}
            component={ListaUpdate}
          />
          <PrivateRoute
            exact
            path={`${props.match.path}/delete/:id`}
            component={ListaDelete}
          />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default ListaRouter;