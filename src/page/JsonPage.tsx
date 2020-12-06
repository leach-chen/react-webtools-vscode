
import React from 'react';
import {IBaseProps} from "./MainPage";
import {BrowserRouter, Link, Redirect, Route} from "react-router-dom";
import Page1 from "./Page1";
import Page2 from "./Page2";

export interface IJsonPage extends IBaseProps{
}

export default class JsonPage extends React.Component<IJsonPage>
{
    render() {
        return (
            <BrowserRouter>
            <div>
               {/* <a  href={"/timepage"}>去TimePage</a>
                <button onClick={() => this.props.history.push('timepage')}>函数跳转</button>*/}
                <div>
                    <Link to="/jsonpage/page1">嵌套路由1</Link>
                    <Link to="/jsonpage/page2">嵌套路由2</Link>
                    <div>
                        <Route exact path="/jsonpage/page1" component={Page1} />
                        <Route path="/jsonpage/page2" component={Page2} />
                        <Redirect exact to="/jsonpage/page1" from='/jsonpage' />
                    </div>
                </div>

            </div>
            </BrowserRouter>
        )
    }
}
