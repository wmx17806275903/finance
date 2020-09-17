import * as d from "date-fns"
import * as datefns from 'date-fns'
export class DateTimes{
    public static format(date:Date,format:string):string{
        try{
            return datefns.format(date,format);      
        }catch(error){return "";}
    }
}