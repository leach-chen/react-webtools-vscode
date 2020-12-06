import React from 'react';
import './JsonPage.css';
import {IBaseProps} from "../root/MainPage";

export interface IJsonPage extends IBaseProps{
}

export default class JsonPage extends React.Component<IJsonPage>
{
    render() {
        return (
            <div className="JsonPage">
                JSON Page
            </div>
        )
    }
}
