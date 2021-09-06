
export class TimeUtil {

    /**
     * 获取当前时间毫秒数
     */
    public static getNowTimeMS(){
        return new Date().getTime();
    }

    /**
     * 根据时间戳获取格式化时间
     * @param timeMS
     */
    public static timemsToTimestr(timeMS:any) {
        var date = new Date(timeMS);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD +" "+hh + mm + ss;
    }

    /**
     * 字符串时间转时间戳
     * @param timeStr
     */
    public static timestrToTimems(timeStr:string){
        var date = timeStr;
        date = date.replace(/-/g,'/'); //必须把日期'-'转为'/'
        var timestamp = new Date(date).getTime();
        return timestamp
    }
    
}
