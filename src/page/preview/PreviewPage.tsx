import React from 'react';
import ReactMarkdown from 'react-markdown';
import {IBaseProps} from "../root/MainPage";
import './PreviewPage.css';
import './github-markdown.css';
import {Layout, Menu} from 'element-react';

//https://jingyan.baidu.com/article/6b18230972c3e6fb59e15929.html
//https://www.bootcdn.cn/github-markdown-css
//https://github.com/remarkjs/react-markdown
//https://www.npmjs.com/package/react-markdown

export interface IPreviewPage extends IBaseProps{
    previewObject:any;
    location:any;
}

export interface IPreviewState{
    isEmptyContent:boolean;
    isHtmlContent:boolean;
    isMDContent:boolean;
    htmlContent:string;
    mdContent:string;
    previewObject:any;
    menuIndex:string;
}

export default class PreviewPage extends React.Component<IPreviewPage,IPreviewState>
{
    private lastTime = 0
    constructor(props:IPreviewPage,state:IPreviewState)
    {
        super(props)
        this.state = {
            isEmptyContent:false, //是否是空内容
            isHtmlContent:false, //是否是html内容
            isMDContent:false, //是否是markdown内容
            htmlContent:"",//html 内容
            mdContent:"",//markdown 内容
            previewObject:undefined, //渲染数据
            menuIndex:"0" //侧边菜单索引
        }

    }

    componentDidMount(){
        let previewPageObj = this.props?.location?.state?.previewObject
        if(Array.isArray(previewPageObj))
        {
            this.setState({previewObject:previewPageObj},()=>{
                this.onSelect(0)
            })
        }else{
            //this.setState({isEmptyContent:true,previewObject:undefined})
            this.setState(
                { previewObject:
                        [
                            /*{"网址导航": '<html>\r\n<head>\r\n  \r\n</head>\r\n<body>\r\n<div>\r\n   aaaaaaaaa\r\n</div>\r\n</body>\r\n\r\n</html>\r\n',"type":"html"},*/
                            {"页面配置": '# html & markdown文件预览配置\n' +
                                    '\n' +
                                    '## 说明\n' +
                                    '\n' +
                                    '本页面提供本地html、markdown类型文件的批量预览管理功能，\n' +
                                    '当你看到本页面时，说明还未进行配置\n' +
                                    '\n' +
                                    '## 配置步骤\n' +
                                    '```\n' +
                                    '1:在项目根目录下创建dtconfig.json文件\n' +
                                    '\n' +
                                    '2：在里面配置类似如下内容：\n' +
                                    '{\n' +
                                    '  "previewPage": [\n' +
                                    '    {"TestTitle1": "testFolder1/a.html"},\n' +
                                    '    {"TestTitle2": "testFolder2/b.md"},\n' +
                                    '  ]\n' +
                                    '}\n' +
                                    '\n' +
                                    '3:文件预览只支持".html"、".md"后缀类型的文件\n' +
                                    '\n' +
                                    '4：在项目根目录下创建testFolder1、testFolder2文件夹，并且分别在对应目录下创建a.html,b.md文件。\n' +
                                    '（文件夹及文件名称可任意，要与步骤2配置中的对应）\n' +
                                    '\n' +
                                    '按照上述步骤配置，则可对指定目录下的文件进行预览管理\n' +
                                    '\n' +
                                    '```\n',"type":"md"}
                      ],
                      isEmptyContent:false
                },
                ()=>{
                    this.onSelect(0)
                }
             )
        }
    }

    onSelect = (index:any)=>{
        var nowTime = Date.now();
        if((nowTime - this.lastTime)<100){
            return
        }
        this.lastTime = nowTime;
        let obj = this.state.previewObject[index]
        if(obj.type == "html")
        {
            this.setState({isHtmlContent:true,isMDContent:false})
            for(let key in obj)
            {
                if(key != "type")
                {
                    const htmlStr = obj[key]
                    this.setState({htmlContent:htmlStr})
                }
            }
        }else
        {
            this.setState({isHtmlContent:false,isMDContent:true})
            for(let key in obj)
            {
                if(key != "type")
                {
                    const mdStr = obj[key]
                    this.setState({mdContent:mdStr})
                }
            }
        }
        this.setState({menuIndex:index})
    }
    
    _renderLeftMenu = ()=> {
        return (
            /*<Layout.Row style={{display:"flex",justifyContent:"center"}}>*/
            <Layout.Row>
                <Layout.Col span="3" className="cl-col1">
                    <div className="grid-content bg-purple">
                        <Menu mode="vertical" defaultActive={this.state.menuIndex} className="el-menu-vertical-demo" onSelect = {this.onSelect}>
                            <Menu.ItemGroup title="">
                               {
                                    this.state.previewObject?.map((obj: any, position: number)=>{
                                        let showStr = ""
                                        for(let key in obj)
                                        {
                                            {
                                                if(key != "type")
                                                {
                                                    showStr = key
                                                    break;
                                                }
                                            }
                                        }
                                        return <Menu.Item index={""+position} key={""+position}><i className="el-icon-message"></i>{showStr}</Menu.Item>
                                    })
                                }
                            </Menu.ItemGroup>
                        </Menu>
                    </div>
                </Layout.Col>
                {
                    !this.state.isEmptyContent && this.state.isHtmlContent && this._renderHtml()
                }
                {
                    !this.state.isEmptyContent && this.state.isMDContent && this._renderMD()
                }
            </Layout.Row>
        )
    }
    
    //Layout.Col100%是24
    _renderHtml = ()=> {
        return (
            <Layout.Col span="21">
                <div className="htmlContent">
                     <div dangerouslySetInnerHTML={{__html:this.state.htmlContent}}></div>
                </div>    
            </Layout.Col>
        )
    }

    _renderMD = ()=> {
        return (
            <Layout.Col span="21">
                <div className="mdContent">
                    <ReactMarkdown children={this.state.mdContent} className = "markdown-body"/>
                </div>
            </Layout.Col>
        )
    }
    
    _renderEmptyContent(){
        return (
            <div>please config content</div>
        )
    }

    render() {
        return (
            <div className="PreviewPage">
                {
                  this.state.isEmptyContent && this._renderEmptyContent()
                }
                { !this.state.isEmptyContent && this._renderLeftMenu()}
            </div>
        )
    }
}
