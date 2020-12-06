
import React from 'react';
import {BrowserRouter, Link, Redirect, Route} from "react-router-dom";
import JsonPage from "./JsonPage";
import TimePage from "./TimePage";
import Page1 from "./Page1";
import Page2 from "./Page2";

export interface IBaseProps {
    history?:any;
}

export default class MainPage extends React.Component<IBaseProps>
{
    render() {
        return (
            <BrowserRouter>
                <ul>
                    <li><Link to="/jsonpage">json页面</Link></li>
                    <li><Link to="/timepage">时间页面</Link></li>
                </ul>
                <div>
                    {/*<Route exact path="/jsonpage" component={JsonPage} render={() =>
                        <JsonPage>
                            <Route exact path="/jsonpage/page1" component={Page1} />
                            <Route path="/jsonpage/page2" component={Page2} />
                        </JsonPage>
                    }/>*/}
                    <Route exact path="/jsonpage" component={JsonPage} />
                    <Route exact path="/timepage" component={TimePage} />
                    <Redirect exact to="/jsonpage" from='/' />
                </div>
            </BrowserRouter>
        )
    }
}
