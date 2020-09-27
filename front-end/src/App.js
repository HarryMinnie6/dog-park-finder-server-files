import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { ParksContextProvider } from "./context/ParksContext";
import Home from "./routes/Home";
import ParkDetailsPage from "./routes/ParkDetailsPage";
import Updatepage from "./routes/Updatepage";

const App =() => {
  return (
    <ParksContextProvider>
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/parks/:id/update" component={Updatepage} />
            <Route exact path="/parks/:id" component={ParkDetailsPage} />
          </Switch>
        </Router>
      </div>
    </ParksContextProvider>
  );
}

export default App;
