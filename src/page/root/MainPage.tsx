import React from 'react';
import {Menu} from "element-react";

export interface IBaseProps {
    history?:any;
}

export interface IMainPagePageProps extends IBaseProps{
}

export interface IMainPageState{
    previewObject:any;
}

export default class MainPage extends React.Component<IMainPagePageProps>
{
    state = {
        previewObject:{}
    }

    constructor(props:IMainPagePageProps)
    {
        super(props)
        window.addEventListener('message', event => {
            /*var iframe = document.getElementById('previewUrl');
            let htmlStr = ""
            for (var key in event.data.content)
            {
              htmlStr = event.data.content[key]
            }
            iframe.contentWindow.document.body.innerHTML+= htmlStr*/
            /* this.setState({"previewObject":event.data.content}) */
        });
        setTimeout(()=>{
            this.setState({ "previewObject":{"aa":"123"}})
        },1000)
    }

  
    onSelect(position:any){
        if(position == 1)
        {
            this.props.history?.push({pathname:"jsonpage"})
        }else if (position == 2)
        {
            this.props.history?.push({pathname:"previewpage",state:{previewObject:this.state.previewObject}})
        }else if (position == 3)
        {
            this.props.history?.push({pathname:"timepage"})
        }else if (position == 4)
        {
            this.props.history?.push({pathname:"codepage"})
        }
        console.log(this.props.history)
    }
    
    render() {
        return (
            <div>
                <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
                    <Menu.Item index="1">Json</Menu.Item>
                    <Menu.Item index="2">Preview</Menu.Item>
                    <Menu.Item index="3">Time</Menu.Item>
                    <Menu.Item index="4">Code</Menu.Item>
                </Menu>
                {this.props.children}
                {/*<Route exact path="/" component={JsonPage}/>
                <Route exact path="/jsonpage" component={JsonPage}/>
                <Route path="/timepage" component={TimePage}/>*/}
            </div>
        )
    }
}

