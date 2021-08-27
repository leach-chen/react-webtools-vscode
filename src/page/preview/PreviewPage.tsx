import React from 'react';
import {IBaseProps} from "../root/MainPage";
import './PreviewPage.css';
import App from "../../App";


export interface IPreviewPage extends IBaseProps{
    previewObject:any;
    location:any;
}

export interface IPreviewState{
}

export default class PreviewPage extends React.Component<IPreviewPage,IPreviewState>
{

    constructor(props:IPreviewPage,state:IPreviewState)
    {
        super(props,state)
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbb")
        console.log(this.props.location.state)
    }

    render() {
        return (
            /*<div className="TimePage">
                Time Page
            </div>*/
            <App/>
        )
    }
}
