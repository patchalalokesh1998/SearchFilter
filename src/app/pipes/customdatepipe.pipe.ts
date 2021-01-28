import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customdatepipe'
})
export class CustomdatepipePipe implements PipeTransform {
time:any;
month:any;
date:any;
year:any;
day:any;
value:any;
date1:any;
date2:any;
Difference_In_Days;
Difference_In_Time;
hoursremaining;
minutes:any;

  transform(dateofcom:string): unknown {

    // setInterval(()=>{this.date=new Date();
    //   this.month=parseInt(this.date.getMonth()+1);
    //   this.year= parseInt(this.date.getFullYear());
    //   this.day=parseInt(this.date.getDate())},1000*60);
   // console.log("here");
  //  let date1;
  //  let date2;
    this.date=new Date();
    this.month=(this.date.getMonth()+1).toString();
     this.year= (this.date.getFullYear()).toString();
       this.day=(this.date.getDate()).toString()
      const index= dateofcom.lastIndexOf('-');
      const day1=(dateofcom.substr(index+1));
      const index1= dateofcom.indexOf('-');
      const year1=(dateofcom.substr(0,index1));
      const month1=(dateofcom.substr(index1+1,2));
      console.log(this.month,this.year,this.day)
     // console.log("year"+this.year,year1+"month"+this.month,month1+"day"+this.day,day1);
      // return year1-this.year>0?value=`years left: ${year1-this.year}`:month1-this.month>0?value=`${month1-this.month} Months Left`:day1-this.day>0?value=`${day1-this.day} days Left hurry up`:value=`error`;
      this.date1=new Date(`${month1}/${day1}/${year1}`);
      this.month.length==1? this.month='0'+this.month:this.month=this.month;
      this.day.length==1? this.day='0'+this.day:this.day=this.day;
      this.date2=new Date(`${this.month}/${this.day}/${this.year}`);
      console.log(this.date1, this.date2);
      this.Difference_In_Time = this.date1.getTime() - this.date2.getTime();
      //console.log(this.Difference_In_Time);
      this.Difference_In_Days = this.Difference_In_Time/(1000 * 3600 * 24);
      this.minutes=60-this.date.getMinutes();
     // console.log(this.Difference_In_Time);
     // console.log(this.Difference_In_Days);
     //this.Difference_In_Days=this.Difference_In_Days-1;
     this.hoursremaining=24-this.date.getHours();
       return `${this.Difference_In_Days} days ${this.hoursremaining-1} hours ${this.minutes} minutes remaining`;

}
}


// document.write("Days in July: "+days(7, 2012)); // July month
// document.write("<br>Days in September: "+days(9, 2012)); // September Month