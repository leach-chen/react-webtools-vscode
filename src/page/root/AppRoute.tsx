import React from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import JsonPage from "../json/JsonPage";
import TimePage from "../time/TimePage";
import MainPage from "./MainPage";

const BasicRouter = () => (
    <HashRouter>
        <Switch>
            <Route path="/" component={(props:any)=>(
                    <MainPage {...props}>
                        <Route exact path="/" component={JsonPage}/>
                        <Route exact path="/jsonpage" component={JsonPage}/>
                        <Route path="/timepage" component={TimePage}/>
                    </MainPage>
                )
            }/>
        </Switch>
    </HashRouter>
);


export default BasicRouter;
