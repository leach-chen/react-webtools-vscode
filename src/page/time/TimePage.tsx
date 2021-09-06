import React from 'react';
import {IBaseProps} from "../root/MainPage";
import './TimePage.css';
import App from "../../App";
import {Button, Card, Input, Switch} from "element-react";
import {TimeUtil} from "../../utils/TimeUtil";


interface ITimePageState{
    isTimeRepeat:boolean; //是否停止计时
    timeNowMs:any; //当前时间毫秒数
    timeNowStr:any; //当前时间
    isSwitchOpen:number|string|boolean; //switch开关值
    inputValueMS:any; //输入框值ms
    inputValueS:any; //输入框值s
    inputValueTimeMs:any; //输入框当前时间值1
    inputValueTimeS:any; //输入框当前时间值2
    tranValueMs:any; //毫秒转时间
    tranValueS:any; //秒转时间
    tranValueStrMs:any; //时间转毫秒
    tranValueStrS:any; //时间转秒
}


export default class TimePage extends React.Component<IBaseProps,ITimePageState>
{
    private timeId:any
    constructor(props:IBaseProps) {
        super(props);
        this.state = {
            isTimeRepeat:true,
            timeNowMs:TimeUtil.getNowTimeMS(),
            timeNowStr:TimeUtil.timemsToTimestr(TimeUtil.getNowTimeMS()),
            isSwitchOpen:true,
            inputValueMS:"",
            inputValueS:"",
            inputValueTimeMs:"",
            inputValueTimeS:"",
            tranValueMs:"",
            tranValueS:"",
            tranValueStrMs:"",
            tranValueStrS:"",
        }
        this.repeatTime()
    }

    /**
     * 定时获取时间
     */
    repeatTime = ()=> {
        this.timeId = setInterval(()=>{
            if(this.state.isTimeRepeat)
            {
                this.setState({timeNowMs:TimeUtil.getNowTimeMS()})
                this.setState({timeNowStr:TimeUtil.timemsToTimestr(TimeUtil.getNowTimeMS())})
            }
        },1000)
    }

    /**
     * switch开关函数
     * @param isOpen
     */
    controlTimeUpdate = (isOpen:number|string|boolean)=>{
        if(isOpen)
        {
            this.setState({isTimeRepeat:true})
        }else{
            this.setState({isTimeRepeat:false})
        }
    }

    /**
     * 更新当前时间到输入框
     */
    updateTimeMS = ()=>{
        this.setState({inputValueMS:this.state.timeNowMs})
        this.setState({inputValueS:parseInt(""+(this.state.timeNowMs / 1000))})
        this.setState({inputValueTimeMs:TimeUtil.timemsToTimestr(this.state.timeNowMs)})
        this.setState({inputValueTimeS:TimeUtil.timemsToTimestr(this.state.timeNowMs)})
        
        //1630664355946
        //1630664355000
        //2021-09-03 18:19:15
        //console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa:"+TimeUtil.timestrToTimems("2021-09-03 18:19:15"))
    }

    /**
     * 转换时间
     */
    tranTime = ()=> {
        if(this.state.inputValueMS)
        {
            this.setState({tranValueMs:TimeUtil.timemsToTimestr(Number(this.state.inputValueMS))})
        }else{
            this.setState({tranValueMs:""})
        }
        if(this.state.inputValueS)
        {
            this.setState({tranValueS:TimeUtil.timemsToTimestr(Number(this.state.inputValueS * 1000))})
        }else{
            this.setState({tranValueS:""})
        }
        if(this.state.inputValueTimeMs)
        {
            this.setState({tranValueStrMs:TimeUtil.timestrToTimems(this.state.inputValueTimeMs)})
        }else{
            this.setState({tranValueS:""})
        }
        if(this.state.inputValueTimeS)
        {
            this.setState({tranValueStrS:parseInt(""+(TimeUtil.timestrToTimems(this.state.inputValueTimeMs) / 1000))})
        }else{
            this.setState({tranValueStrS:""})
        }
    }
    
    componentWillUnmount() {
        clearInterval(this.timeId)
    }

    render() {
        return (
            <div className="TimePage">
                <div className="content">
                    <div style={{fontSize:"20px",margin:"10px"}}>时间戳转换</div>
                    <hr/>
                    <div style={{display:"flex",flexDirection:"row",alignItems:"center",margin:"20px"}}>
                        <div style={{fontSize:"16px",width:"100px",textAlign:"right"}}>当前时间：</div>
                        <div  style={{fontSize:"16px",marginRight:"20px",color:"#20A0FF", textDecoration:"underline",cursor:"pointer"}} onClick={this.updateTimeMS}>{this.state.timeNowMs}</div>
                        <div  style={{fontSize:"16px",marginRight:"20px",color:"#20A0FF", textDecoration:"underline",cursor:"pointer"}} onClick={this.updateTimeMS}>{this.state.timeNowStr}</div>
                        <Switch
                            value={this.state.isSwitchOpen}
                            onColor="#13ce66"
                            offColor="#ff4949"
                            onChange = {(value:number|string|boolean)=>{
                                this.setState({isSwitchOpen:value})
                                this.controlTimeUpdate(value)
                            }}
                        >
                        </Switch>
                    </div>
                    
                    <div style={{display:"flex",flexDirection:"row",alignItems:"center",margin:"20px"}}>
                        <div style={{fontSize:"14px",width:"100px",textAlign:"right"}}>时间戳(毫秒)：</div>
                        <Input placeholder="" value={this.state.inputValueMS} onChange={(value)=>{
                            this.setState({inputValueMS:value})
                        }}/>
                        <div style={{fontSize:"14px",marginLeft:"10px"}}>》》</div>
                        <div style={{fontSize:"16px",marginLeft:"10px"}}>{this.state.tranValueMs}</div>
                    </div>

                    <div style={{display:"flex",flexDirection:"row",alignItems:"center",margin:"20px"}}>
                        <div style={{fontSize:"14px",width:"100px",textAlign:"right"}}>时间(秒)：</div>
                        <Input placeholder=""  value={this.state.inputValueS}  onChange={(value)=>{
                            this.setState({inputValueS:value})
                        }}/>
                        <div style={{fontSize:"14px",marginLeft:"10px"}}>》》</div>
                        <div  style={{fontSize:"16px",marginLeft:"10px"}}>{this.state.tranValueS}</div>
                    </div>

                    <div style={{display:"flex",flexDirection:"row",alignItems:"center",margin:"20px"}}>
                        <div style={{fontSize:"14px",width:"100px",textAlign:"right"}}>时间：</div>
                        <Input placeholder=""  value={this.state.inputValueTimeMs}  onChange={(value)=>{
                            this.setState({inputValueTimeMs:value})
                        }}/>
                        <div style={{fontSize:"14px",marginLeft:"10px"}}>》》</div>
                        <div  style={{fontSize:"16px",marginLeft:"10px"}}>{this.state.tranValueStrMs?(this.state.tranValueStrMs+"（毫秒）"):""}</div>
                    </div>

                    <div style={{display:"flex",flexDirection:"row",alignItems:"center",margin:"20px"}}>
                        <div style={{fontSize:"14px",width:"100px",textAlign:"right"}}>时间：</div>
                        <Input placeholder=""  value={this.state.inputValueTimeS}  onChange={(value)=>{
                            this.setState({inputValueTimeS:value})
                        }}/>
                        <div style={{fontSize:"14px",marginLeft:"10px"}}>》》</div>
                        <div  style={{fontSize:"16px",marginLeft:"10px"}}>{this.state.tranValueStrS?(this.state.tranValueStrS+"（秒）"):""}</div>
                    </div>
                    <div style={{textAlign:"center"}}>
                        <Button type="primary" style={{width:"100px",marginTop:"30px"}} onClick={this.tranTime}>转换</Button>
                    </div>
                </div>
            </div>
            /*<App/>*/
        )
    }
}
