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
        window.addEventListener('message', event => { //监听来自vscode插件的消息数据
            if(event?.data?.content) {
                this.setState({"previewObject": event.data.content})
            }
        });
        /*setTimeout(()=>{
            this.setState(
                { "previewObject":
                    [
                        {"网址导航": '<html>\r\n<head>\r\n  \r\n</head>\r\n<body>\r\n<div>\r\n   aaaaaaaaa\r\n</div>\r\n</body>\r\n\r\n</html>\r\n',"type":"html"},
                        {"开发摘记": '# 开发摘记\n' +
                                '\n' +
                                '### 相关命令\n' +
                                '\n' +
                                '**日志推送**\n' +
                                '\n' +
                                '```\n' +
                                '标题：logUpload\n' +
                                '\n' +
                                '内容：{"startTime":"2021-03-12 00:00:00","endTime":"2021-03-12 23:59:59","tag":"test"}\n' +
                                '```\n' +
                                '\n' +
                                '**项目启动**\n' +
                                '\n' +
                                '```\n' +
                                '命令：adb reverse tcp:8081 tcp:8089 && react-native start --port 8089 --reset-cache\n' +
                                '\n' +
                                'MUMU命令：adb -s 127.0.0.1:7555 reverse tcp:8081 tcp:8089 && react-native start --port 8089 --reset-cache\n' +
                                '\n' +
                                '```\n' +
                                '\n' +
                                '**数据库端口映射**\n' +
                                '\n' +
                                '```\n' +
                                '命令：adb forward tcp:8585 tcp:8585\n' +
                                '\n' +
                                '地址：http://127.0.0.1:8585\n' +
                                '```\n' +
                                '\n' +
                                '**Android Console 日志**\n' +
                                '\n' +
                                '```\n' +
                                '命令：react-native log-android\n' +
                                '\n' +
                                '多设备命令：adb -s xxx logcat *:S ReactNative:V ReactNativeJS:V\n' +
                                'xxx为adb devices获取到的手机识别码\n' +
                                '```\n' +
                                '\n' +
                                '**根据详情本地插入任务**\n' +
                                '\n' +
                                '```\n' +
                                '1：获取详情json数据（数组部分的），替换以下代码中任务详情数据\n' +
                                '2：将以下代码贴入项目中并触发运行（测试代码，运行完成记得删除）\n' +
                                '\n' +
                                'let str = \'[任务详情数据]\'\n' +
                                'let result = JSON.parse(str);\n' +
                                'PickupTaskDetailSyncByParseTool.handleTaskDetails(\n' +
                                '   UserInfoManager.getInstance().getUserInfo().id,\n' +
                                '   result\n' +
                                ');\n' +
                                '```\n' +
                                '\n' +
                                '**VsCode Develop Tools 工具**\n' +
                                '\n' +
                                '```\n' +
                                'VsCode 搜索安装 Develop Tools工具，可快捷执行：\n' +
                                '1：启动项目(运行package.json scripts里面的命令)\n' +
                                '2：数据库端口映射\n' +
                                '3：日志解密（将要解密的日志放到项目根目录tlog目录下，通过快捷按钮进行解密）\n' +
                                '4：Json格式化\n' +
                                '5：Android、IOS Console日志查看\n' +
                                '6：可自定义添加快捷运行命令\n' +
                                '```\n',"type":"md"}
                    ]
                })
        },1000)*/
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
    
    render() {
        return (
            <div>
                <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect}>
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

