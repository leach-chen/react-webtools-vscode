import React from 'react';
import {Menu, Tabs} from "element-react";
import './MainPage.css';

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
        window.addEventListener('message', event => { //监听来自vscode插件的消息数据
            if(event?.data?.content) {
                this.setState({"previewObject": event.data.content})
            }
        });
    }

    onSelect = (position:any) =>{
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

  
    /*onSelect = (position:any) =>{
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
    }*/
    
    render() {
        return (
            <div>

                <Tabs activeName="1" onTabClick={ (tab) => this.onSelect(tab.props.name) }>
                    <Tabs.Pane label="Json" name="1"></Tabs.Pane>
                    <Tabs.Pane label="Preview" name="2"></Tabs.Pane>
                    <Tabs.Pane label="Time" name="3"></Tabs.Pane>
                    <Tabs.Pane label="Code" name="4"></Tabs.Pane>
                </Tabs>
                
                {/*<Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect}>
                    <Menu.Item index="1">Json</Menu.Item>
                    <Menu.Item index="2">Preview</Menu.Item>
                    <Menu.Item index="3">Time</Menu.Item>
                    <Menu.Item index="4">Code</Menu.Item>
                </Menu>*/}
                {this.props.children}
                {/*<Route exact path="/" component={JsonPage}/>
                <Route exact path="/jsonpage" component={JsonPage}/>
                <Route path="/timepage" component={TimePage}/>*/}
            </div>
        )
    }
}

