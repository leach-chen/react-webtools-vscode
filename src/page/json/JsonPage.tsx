import React from 'react';
import './JsonPage.css';
import {IBaseProps} from "../root/MainPage";

import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.js'
import 'codemirror/lib/codemirror.css';
// 主题风格
import 'codemirror/theme/solarized.css';
import "codemirror/theme/rubyblue.css";
// 代码模式，clike是包含java,c++等模式的
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/css/css';
//ctrl+空格代码提示补全
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/anyword-hint.js';
//代码高亮
import 'codemirror/addon/selection/active-line';
//折叠代码
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/edit/closebrackets';

import "codemirror/mode/javascript/javascript";//for json
import "codemirror/addon/lint/lint";//for json
import "codemirror/addon/lint/json-lint"; //for json
import "codemirror/addon/lint/lint.css"; //for json
import {Message, Switch} from "element-react";


declare global {
    interface Window {
        jsonlint: any
    }
}

const jsonlint = require("jsonlint-mod");
window.jsonlint = jsonlint



export interface IJsonPage extends IBaseProps{
}

export default class JsonPage extends React.Component<IJsonPage>
{
    private instance:any
    private timeObj:any
    
    constructor(props:IJsonPage) {
        super(props);
        this.instance = null;
       
    }
    state = {
        data:'{ \n      "1":"Json will auto format",\n\n      "2":"You can click switch button close auto format",\n\n      "3":"You can use (Shift+T) format by yourself" \n}',
        shortcutData:'{ \n      "1":"Json will auto format",\n\n      "2":"You can click switch button close auto format",\n\n      "3":"You can use (Shift+T) format by yourself" \n}',
        isAutoFormat:true
    }

    updateData(value: string){
        try {
            let obj = JSON.parse(value)
            this.setState({"data":JSON.stringify(obj, null, 6)})
        }catch (e) {
            
        }
    }

    updateDataHandle(value: any){
        try {
            this.setState({"data":value})  //此处需要设置一次，否则连续粘贴两次异常数据，数据不会更新
            let obj = JSON.parse(value)
            this.setState({"data":JSON.stringify(obj, null, 6)})
        }catch (e) {
            try {
                value = value.replace(new RegExp(",", "gm"), ",\r\n");
                this.setState({"data":value})
                this.setState({"shortcutData":value})
                jsonlint.parse(value);
            } catch (e) {
                Message.error(e.toString());
            }
        }
    }
    
    //{ "sites": [ { "name":"菜鸟教程" , "url":"www.runoob.com" }, { "name":"google" , "url":"www.google.com" },{ "name":"微博" , "url":"www.weibo.com" } ] } 正常测试数据，连续粘贴两次
    //{ "sites": [ { "name":"菜鸟教程" , "url":"www.runoob.com" }, { "name":"google" , "url":"www.google.com" }{ "name":"微博" , "url":"www.weibo.com" } ] }  异常测试数据，连续粘贴两次
    
    render() {
        const {data}=this.state
        let that=this
        return (
            <div className="JsonPage">
                {/*<Button type="primary" style={{zIndex:1,position:"absolute",right:50,top:100}}>主要按钮</Button>*/}
                <Switch
                    value={this.state.isAutoFormat}
                    onText="Auto"
                    offText=""
                    style={{zIndex:10,position:"absolute",right:50,top:80}}
                    onChange={(value)=>{
                        this.setState({isAutoFormat:value})
                        if(!value)
                        {
                            Message.info("use (Shift+T) format");
                        }
                    }}
                >
                </Switch>
                <CodeMirror
                    className = "code-mirror"
                    editorDidMount={editor => { this.instance = editor }}
                    value={data}
                    options={{
                        mode: "application/json", //for json
                        gutters:["CodeMirror-lint-markers",'CodeMirror-linenumbers','CodeMirror-foldgutter'],//CodeMirror-lint-markers for json
                        theme: 'rubyblue',
                        autofocus:true,//自动获取焦点
                        styleActiveLine:true,//光标代码高亮
                        lineNumbers: true, //显示行号
                        smartIndent:true,  //自动缩进
                        //start-设置支持代码折叠
                        lineWrapping:true,
                        foldGutter:true,
                        lint: true,
                        extraKeys:{
                            //"Ctrl":"autocomplete",
                            "Ctrl-S": function (editor:any) {
                                //that.codeSave(editor)
                            },
                            "Ctrl-Z":function (editor:any) {
                                editor.undo();
                            },//undo
                            "F8":function (editor:any) {
                                editor.redo();
                            },//Redo
                            "Shift-T":(editor:any,data:any) => {
                                this.updateDataHandle(this.state.shortcutData)
                            },//Redo
                        },
                        matchBrackets: true,  //括号匹配，光标旁边的括号都高亮显示
                        autoCloseBrackets: true //键入时将自动关闭()[]{}''""
                    }}
                    onChange={(editor, data, value) => {
                        this.setState({shortcutData:value}) //更新变量的值，否则下次粘贴相同数据不会刷新,主要用于快捷键格式化
                        try {
                            let obj = JSON.parse(value)
                            let str = JSON.stringify(obj, null, 6)
                            if(str == this.state.data)//如果当前state data里面的值和要格式化的值一致，则更新state里面的值，否则复制相同数据进入不会更新
                            {
                                this.setState({"data":value}) //不能每次都设置该值，否则数据变化的时候会导致光标变到最后
                            }
                        }catch (e) {
                            
                        }
                        if(this.state.isAutoFormat) {
                            if (this.timeObj) {
                                clearTimeout(this.timeObj)
                            }
                            this.timeObj = setTimeout(() => {
                                this.updateData(value)
                            }, 1000);
                        }
                    }}
                    // 在失去焦点的时候触发，这个时候放数据最好
                    // onBlur={this.codeOnBlur}

                    // // 这个必须加上，否则在一些情况下，第二次打开就会有问题
                    // //     onBeforeChange={(editor, data, value) => {
                    // //       console.log("onBeforeChange fresh")
                    // //       console.log(JSON.stringify(data));
                    // //     }}
                    //     /* HERE: pick out only the value. and might as well get name. */
                />
            </div>
        )
    }
}
