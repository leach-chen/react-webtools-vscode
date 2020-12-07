import React from 'react';
import {Menu} from "element-react";

export interface IBaseProps {
    history?:any;
}

export default class MainPage extends React.Component<IBaseProps>
{
  
    onSelect(position:any){
        if(position == 1)
        {
            this.props.history?.push({pathname:"jsonpage"})
        }else if (position == 2)
        {
            this.props.history?.push("timepage")
        }else if (position == 2)
        {
            this.props.history?.push("codepage")
        }
        console.log(this.props.history)
    }
    
    render() {
        return (
            <div>
                <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
                    <Menu.Item index="1">Json</Menu.Item>
                    <Menu.Item index="2">Time</Menu.Item>
                    <Menu.Item index="3">Code</Menu.Item>
                </Menu>
                {this.props.children}
                {/*<Route exact path="/" component={JsonPage}/>
                <Route exact path="/jsonpage" component={JsonPage}/>
                <Route path="/timepage" component={TimePage}/>*/}
            </div>
        )
    }
}

