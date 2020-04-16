import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
    name: 'dateFormatDT'
})
export class DateFormatDTPipe implements PipeTransform {
    transform(value: any): any {
        let date :any;
        debugger;
        if (value) {
            debugger;
            if(localStorage.getItem('countryId')=="2"){
                date=moment(value).format("DD-MM-YYYY HH:mm:ss");
                date =  moment(date,'DD-MM-YYYY HH:mm:ss').add(7, 'hours');
                var formattedDate = moment(date, 'DD/MM/YYYY HH:mm:ss').format("DD-MM-YYYY HH:mm:ss");
            }
           else if(localStorage.getItem('countryId')=="1"){
               date=moment(value).format("DD-MM-YYYY HH:mm:ss");
            date =  moment(date,'DD-MM-YYYY HH:mm:ss').add(5.50, 'hours');
            var formattedDate = moment(date, 'DD/MM/YYYY HH:mm:ss').format("DD-MM-YYYY HH:mm:ss");
           }
           else if(localStorage.getItem('countryId')=="3"){
            date=moment(value).format("DD-MM-YYYY HH:mm:ss");
         date =  moment(date,'DD-MM-YYYY HH:mm:ss').add(8, 'hours');
         var formattedDate = moment(date, 'DD/MM/YYYY HH:mm:ss').format("DD-MM-YYYY HH:mm:ss");
        }
        }
        return formattedDate;
    }
}