import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'NumberFormatter', pure: false })
export class NumberFormatterPipe implements PipeTransform {
  transform(value: any): any {
    if (typeof value != "undefined" && typeof value != null) {
      if (localStorage.getItem('countryId') == "1") {
        let x = value;
        if(x !="" && x !=" " && x.length>0){
          x = x.toString();
          var afterPoint = '';
          if (x.indexOf('.') > 0)
            afterPoint = x.substring(x.indexOf('.'), x.length);
          x = x.replace(/,/g, '');
          x = Math.floor(x);
          x = x.toString();
          var lastThree = x.substring(x.length - 3);
          var otherNumbers = x.substring(0, x.length - 3);
          if (otherNumbers != '')
            lastThree = ',' + lastThree;
          var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
          return res;
        }
        else{
          return x;
        }
      
      }
      else {
        debugger;
        let y = value;
        if(y !="" && y !=" " && y.length>0){
          y = y.replace(/,/g, '')
          let x = parseInt(y);
          let z = x.toLocaleString();
          return z.toString();
        }
        else{
          return y;
        }
       
      }
    }
  }
}