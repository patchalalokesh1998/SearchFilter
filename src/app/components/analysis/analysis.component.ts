import { Component, OnInit } from '@angular/core';
import {InventorymanagmentService} from '../../services/inventorymanagment.service';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  category:string;
  maininfo:any;
 foodbuttonactive=false;
   clothingbuttonactive=false;
   electronicsbuttonactive=true;
   totalanalysisbutton=false;
   allproducts=false;
   analysisinfo:any=[];
   piechartdata:any=[];
   allproductsanalysis:any=[];
   initalize:any=true;
   initalizecategory:any=[{
    label:"Electronics",
    color:"red"
  },
  {
   label:"Food items",
   color:"green"
 },
 {
   label:"Clothing",
   color:"blue"
 }];
   
  constructor(private service:InventorymanagmentService) { }

  ngOnInit(): void {
    this.category='electronics';
      this.service.getproduct(this.category).subscribe((data)=>{console.log(data);this.maininfo=data; this.analysisinfo=[]; this.totalanalysis()});
      this.piechartdata=[];
      this.analysisinfo=[];
      
    // this.pieChartLegend=!this.pieChartLegend
  }




  fooditems()
  {
    this.allproducts=false;
    this.piechartdata=[];
    this.analysisinfo=[];
    this.pieChartLabels=[];
      this.pieChartData=[];
      this.pieChartColors[0].backgroundColor=[];
   this.foodbuttonactive=true;
   this.clothingbuttonactive=false;
   this.electronicsbuttonactive=false;
   this.totalanalysisbutton=false;
   this.category='fooditem';
   this.service.getproduct(this.category).subscribe((data)=>{this.maininfo=data; console.log(data);this.analysisinfo=[]; this.totalanalysis()})
   
  }
  Electronics()
  {
    this.allproducts=false;
    this.piechartdata=[];
    this.analysisinfo=[];
    this.pieChartLabels=[];
    this.pieChartData=[];
    this.pieChartColors[0].backgroundColor=[];
    this.electronicsbuttonactive=true;
    this.foodbuttonactive=false;
    this.clothingbuttonactive=false;
    this.totalanalysisbutton=false;
    this.category='electronics';
    this.service.getproduct(this.category).subscribe((data)=>{this.maininfo=data; console.log(data);this.analysisinfo=[]; this.totalanalysis()})
  }
  clothing()
  {
    this.allproducts=false;
    this.piechartdata=[];
    this.analysisinfo=[];
    this.pieChartLabels=[];
      this.pieChartData=[];
      this.pieChartColors[0].backgroundColor=[];
    this.clothingbuttonactive=true;
    this.foodbuttonactive=false;
    this.totalanalysisbutton=false;
    this.category='clothing';
   this.electronicsbuttonactive=false;
   this.service.getproduct(this.category).subscribe((data)=>{this.maininfo=data; console.log(data);this.analysisinfo=[]; this.totalanalysis()})
  }

  // visulation


  totalanalysis()
  {
    let date=new Date();
    let curr_date = date.getDate();
    let curr_month = date.getMonth() + 1; //Months are zero based
    let curr_year = date.getFullYear();
    let finaldate=new Date(`${curr_month}/${curr_date}/${curr_year}`);
   // console.log(this.maininfo.length);
    let j=0;
    for(let i=0;i<this.maininfo.length; i++)
    {
      
      let date2 = new Date(this.maininfo[i].date);
      let Difference_In_Time = finaldate.getTime() - date2.getTime();
      let days= Difference_In_Time/(1000 * 3600 * 24)+1;
      let percentage=(this.maininfo[i].quantityconsumed/this.maininfo[i].totalquantity)*100/days;
     // console.log(percentage);
      let obj={"label":this.maininfo[i].productname, "salesratio":percentage.toFixed(2), "color":this.getRandomColor()};
     // console.log(this.piechartdata); 
      this.piechartdata.push(obj);
      let quantityremaing=this.maininfo[i].quantityconsumed;
     // console.log(days,quantityremaing);
      if(quantityremaing!=0)
      {
        let eachdaysales= quantityremaing/days;
        let daysleft= this.maininfo[i].totalquantity/eachdaysales-days;
       // console.log(daysleft);
        if(daysleft<6 && daysleft!=0)
        {
         // console.log(daysleft);
         // this.analysisinfo[j].productname=this.maininfo[i].productname;
         let obj={"daysleft": daysleft, "quantityremaing": this.maininfo.totalquantity-quantityremaing, "productname": this.maininfo[i].productname};
         this.analysisinfo.push(obj);
         j++;
          } 
         
        }
        
      }

    // this.piechartdatainitialize();
    if(this.initalize)
    this.piechartdatainitalize();
     // console.log(this.analysisinfo,this.piechartdata);
    }
    analysis()
    {
     this.initalize=false;
     this.piechartdata=[];
     this.analysisinfo=[];
     this.pieChartLabels=[];
       this.pieChartData=[];
       this.pieChartColors[0].backgroundColor=[];
     this.allproductsanalysis=[];
    
     setTimeout(()=>{this.Electronics();this.allproductsanalysis.push(this.piechartdata)},1000);
     setTimeout(()=>{this.fooditems();this.allproductsanalysis.push(this.piechartdata)},1500);
     setTimeout(()=>{this.clothing();this.allproductsanalysis.push(this.piechartdata);console.log(this.allproductsanalysis)},2000)
     setTimeout(()=>{console.log(this.allproductsanalysis); this.clothingbuttonactive=false;
      this.foodbuttonactive=false;
      this.totalanalysisbutton=true;this.settingdata();},2100)
     
     //  this.fooditems()

    //  this.allproductsanalysis=[...this.piechartdata];
    //   this.allproductsanalysis.concat(this.piechartdata);
    //  this.Electronics();
    //  this.allproductsanalysis=[...this.piechartdata];  
    //  this.clothing();
    //  this.allproductsanalysis=[...this.piechartdata];
    //  console.log(this.allproductsanalysis);
    //   this.initalize=true;
    //   setTimeout(() => {console.log(this.allproductsanalysis)
        
    //   }, 4000); 
    }
    getRandomColor() {
      var color = Math.floor(0x1000000 * Math.random()).toString(16);
      return '#' + ('000000' + color).slice(-6);
    }
    settingdata()
    {
     
      let totalsalesratio=0;
      this.piechartdata=[];
      this.allproducts=true;
      console.log(this.piechartdata);
    // console.log(this.allproductsanalysis, this.piechartdata);
      for(let i=0; i<this.allproductsanalysis.length;i++)
      {
        for(let j=0; j<this.allproductsanalysis[i].length;j++)
        {
          // console.log(this.allproductsanalysis[i][j].salesratio);
          totalsalesratio= parseInt(this.allproductsanalysis[i][j].salesratio)+totalsalesratio;
         // console.log(totalsalesratio);
        }
        //console.log(totalsalesratio);
        console.log(this.initalizecategory[i].label);
        
        let obj={"label":this.initalizecategory[i].label, 
          "color":this.initalizecategory[i].color,
          "salesratio":totalsalesratio};
          //this.piechartdata=[];
          console.log(this.piechartdata);
          this.piechartdata.push(obj);
       // console.log(this.initalizecategory[0].label);
         totalsalesratio=0;
      }
      this.piechartdatainitalize();
      this.initalize=true;
     // console.log(this.piechartdata);
      //this.piechartdatainitalize();
    }


  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: { display: true, labels: { fontColor: 'black' }},
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
     pieChartLabels:Label[]=[];
      pieChartData: number[]=[];
     pieChartType: ChartType = 'pie';
     public pieChartColors = [
      {
        backgroundColor: [],
      },
    ];
  piechartdatainitalize()
  {
    
    for(let i=0; i<this.piechartdata.length;i++)
    {
     this.pieChartLabels.push(this.piechartdata[i].label);
     this.pieChartData.push(this.piechartdata[i].salesratio);
     this.pieChartColors[0].backgroundColor.push(this.piechartdata[i].color);
    }
    console.log(this.pieChartLabels);
   
   // public pieChartLegend = true;
    //public pieChartPlugins = [pluginDataLabels];

  }

 // = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales']
 
 

 

  // events
  // public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

}



