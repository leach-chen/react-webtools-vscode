import React from 'react';
import {IBaseProps} from "./MainPage";

export default class TimePage extends React.Component<IBaseProps>
{
    render() {
        return (
            <div>
                <a href={"/jsonpage/page1"}>去JsonPage</a>
                <button onClick={() => this.props.history.push('jsonpage/page1')}>函数跳转</button>
            </div>
        )
    }
}
