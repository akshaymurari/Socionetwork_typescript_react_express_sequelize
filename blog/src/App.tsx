import React from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Main from "./Components/Main/Main";
import { Provider } from "react-redux";
import Store from "./redux/store";
import SearchResults from "./Components/SearchResults/SearchResults";
import Getuser from "./Components/Getuser/Getuser";
import ChatInterface from "./Components/ChatInterface/ChatInterface";

export const Baseurl = "http://localhost:8000";

function App() {
  return (
    <Provider store={Store}>
      <Switch>
        <Route exact path="/main" component={Main}></Route>
        <Route exact path="/getprofile" component={SearchResults}></Route>
        <Route exact path="/getuser/:username" component={Getuser}></Route>
        <Route exact path="/chat/:user" component={ChatInterface}/>
        <Route exact path="" component={Home} />
      </Switch>
    </Provider>
  );
}

export default App;
