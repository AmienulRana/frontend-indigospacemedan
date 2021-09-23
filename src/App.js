import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { checkExpireTime, deleteToken, getToken } from "./utils/storage";
import pages from "./components/pages";
async function _checkAuth() {
  const { pathname } = window.location;
  const isLoggedIn = getToken();
  if (!isLoggedIn && pathname !== "/login") {
    window.location.pathname = "/login";
  } else if (checkExpireTime() && pathname !== "/login") {
    deleteToken();
    window.location.pathname = "/login";
  } else if (checkExpireTime()) {
    deleteToken();
  } else if (isLoggedIn && pathname === "/login") {
    window.location.pathname = "/";
  }
  return isLoggedIn;
}
function App() {
  const isLogged = _checkAuth();
  return (
    <Router>
      <Switch>
        (!isLogged ? <Route exact path="/login" component={pages.Login} /> :
        <Route exact path="/" component={pages.Home} />
        <Route exact path="/add-event" component={pages.AddEvent} />
        <Route exact path="/detail/:id" component={pages.DetailEvent} />
        <Route
          exact
          path="/detail/:id/investor"
          component={pages.DetailEvent}
        />
        <Route exact path="/:eventId/startup" component={pages.AddStartUp} />
        <Route exact path="/startup/:id" component={pages.DetailStartUp} />
        <Route exact path="/:eventId/investor" component={pages.AddInves} />
        <Route exact path="/investor/:id" component={pages.DetailInves} />
        <Route exact path="/scan/:eventId" component={pages.Scan} />
        )
        <Route exact path="/login" component={pages.Login} />
        <Route path="/" component={pages.NotFound} />
      </Switch>
    </Router>
  );
}
export default App;
