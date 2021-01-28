import { Component,TemplateRef, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import{FormGroup, FormControl, FormBuilder,ValidatorFn, Validators} from '@angular/forms';
import {Form} from '../../services/taskform';
import {TaskserviceService} from '../../services/taskservice.service';
import {CustomdatepipePipe} from '../../pipes/customdatepipe.pipe';
@Component({
  selector: 'app-todocomponent',
  templateUrl: './todocomponent.component.html',
  styleUrls: ['./todocomponent.component.css']
})
export class TodocomponentComponent implements OnInit {
  form:any;
  modalRef: BsModalRef;
  formsdata:any;
  datatochange:any;
  changedform:any;
  deletemessage=false;
  insertmessage=false;
  updatemessage=false;
  completedtasks:any;
  completedsucessmess=false;
  timer:any;
  time:any;
  date:any;
  month:number;
  year:number;
  day:number;
  currdate:string;
  errmess:string;
  


  constructor(private modalService: BsModalService, private fb: FormBuilder, private service: TaskserviceService, private pipe: CustomdatepipePipe) {

  }
 
  openModal(template: TemplateRef<any>) {
    this.errmess='';
    this.insertmessage=false;
    this.modalRef = this.modalService.show(template);
    this.formConstructor();
    
  }
  openModaldelete(template: TemplateRef<any>,data) {
    this.errmess='';
    this.deletemessage=false;
    this.modalRef = this.modalService.show(template);
    this.datatochange=data;
  
    
  }
  openModalcompleted(template: TemplateRef<any>) {
     this.errmess='';
    // this.deletemessage=false;
    this.modalRef = this.modalService.show(template);
    // this.datatochange=data;
  }
  openModalupdate(template: TemplateRef<any>,data) {
    this.errmess='';
    this.updatemessage=false;
    this.completedsucessmess=false;
    this.modalRef = this.modalService.show(template);
    this.datatochange=data;
    this.formConstructor2();
    //console.log(this.datatochange)

    
  }
  ngOnInit(): void {
    
    this.timer = setInterval(() => {
      this.date=new Date();
      this.time = new Date();
      this.month=this.date.getMonth()+1;
      this.year= this.date.getFullYear();
      this.day=this.date.getDate();
      
    }, 1000);
  
   
   // console.log(this.year,this.date,this.currdate);
    
    this.service.gettaskdetails().subscribe((data)=>{console.log(data.length);this.formsdata=data},errmess => this.errmess = <any>errmess);
    console.log(this.errmess);
    this.service.getcompletedtaskes().subscribe((data)=>{console.log(data); this.completedtasks=data;console.log(this.completedtasks)},errmess => this.errmess = <any>errmess);
    setTimeout(()=>{console.log(this.time)},2000);
  }
  livedeadline(dateofcom)
  {
    // console.log("infunction",dateofcom);
    return this.pipe.transform(dateofcom);
  }
  formConstructor()
  {
    this.form=this.fb.group(
      {
        taskname: ['',[Validators.required]],
        dateofcom: ['',[Validators.required]],
        percentage: 20,
        startdate: `${(new Date()).getFullYear()}-${(new Date()).getMonth()+1}-${(new Date()).getDate()}`
  },
  {validators:[this.datevalidator.bind(this)]}
  // {
  //   validators:[this.datevalidator]
  // }
  // {
  //   Validators:[this.checkdate]
  // }
  )}
  formConstructor2()
  {
    this.changedform=this.fb.group(
      {
        taskname:'',
        dateofcom:[this.datatochange.dateofcom,[Validators.required]],
        percentage: this.datatochange.percentage,
        startdate: this.datatochange.startdate

      },
      {validators:[this.datevalidator.bind(this)]} 
    )
  }
  tasksubmit()
  {
    console.log(this.form);
    console.log(this.form.value);
    this.service.posttaskdetails(this.form.value).subscribe((data)=>{console.log(data);this.formsdata.push(data);
    if(Object.keys(data).length>1)
    {
      this.insertmessage=true;
    }
    },(errmess) =>{this.errmess = <any>errmess;
      setTimeout(()=>{this.modalRef.hide();this.errmess=''},3000)
    });

    this.form.reset();
  }
  deletetask()
  {
    this.deletemessage=false;
    console.log('delete');
    this.service.deletetaskdetails(this.datatochange.id).subscribe((data)=>{console.log(data);
      var index= this.formsdata.findIndex(obj => obj.id ===this.datatochange.id);
      this.formsdata=[...this.formsdata.slice(0,index),...this.formsdata.slice(index+1)];
      if(Object.keys(data).length==0)
      {
        this.deletemessage=true;
        console.log('enterd');
        setTimeout(()=>{this.modalRef.hide();},3000);
      }
    },(errmess) =>{this.errmess = <any>errmess;
      setTimeout(()=>{this.modalRef.hide();this.errmess=''},3000);
    } 
    
      );
      
}
    
  updatetask()
  {
    this.updatemessage=false;
    this.changedform.value.taskname=this.datatochange.taskname;
    if(this.changedform.value.percentage==100)
    {
      
      this.service.deletetaskdetails(this.datatochange.id).subscribe((data)=>{console.log(data);
        var index= this.formsdata.findIndex(obj => obj.id ===this.datatochange.id);
        this.formsdata=[...this.formsdata.slice(0,index),...this.formsdata.slice(index+1)];
        // this.formsdata.length==0? 
      
      
      },(errmess) =>{this.errmess = <any>errmess;
        setTimeout(()=>{this.modalRef.hide();this.errmess=''},3000)
      }
      );
      this.changedform.value['completeddate']=`${(new Date()).getFullYear()}-${(new Date()).getMonth()+1}-${(new Date()).getDate()}`;
      this.service.posttocompletedtaskes(this.changedform.value).subscribe((data)=>{console.log(data);this.completedtasks.push(data);
        this.completedsucessmess=true;
        setTimeout(()=>{this.modalRef.hide()},3000);
    },errmess => this.errmess = <any>errmess);
     }
    else
    {

      this.service.puttaskdetails(this.changedform.value,this.datatochange.id).subscribe((data)=>{console.log(data);
        if(Object.keys(data).length>0)
        {
          this.updatemessage=true;
          setTimeout(()=>{this.modalRef.hide()},3000);
          const index = this.formsdata.findIndex(obj=>obj.id === this.datatochange.id);
          this.formsdata[index].percentage=data.percentage;
          this.formsdata[index].dateofcom=data.dateofcom;
          console.log(this.formsdata);
        }
    
        },(errmess) =>{this.errmess = <any>errmess;
          setTimeout(()=>{this.modalRef.hide();this.errmess=''},3000)
        });
        this.changedform.reset();
        console.log(this.changedform);
    
    }
        // this.datatochange=null
  }
checkdeadline(data)
{
  // console.log(data);
//console.log(data.dateofcom,"incheckdead line");
// console.log(data,typeof(data));
const index= data.lastIndexOf('-');
const date=parseInt(data.substr(index+1));
const index1= data.indexOf('-');
const year=parseInt(data.substr(0,index1));
const month=parseInt(data.substr(index1+1,2));
//console.log(year);
if(year<this.year)
{
  return false;
}

if(month<this.month)
{
  return false;}

if(date<this.day)
{
  return false;
}

  
  return true;

}

datevalidator(Form: FormGroup): ValidatorFn {
  
  const data=Form.get('dateofcom');
  if(data.value)
  {
   if(this.checkdeadline(data.value)) 
   {
     data.setErrors(null);
   }
   else
   {
     data.setErrors({'dateerror':true});
   }
   
  }
 
  
   // console.log('true');
    return null;
}
}
//console.log(this.checkdeadline(date.value));
//  if(this.checkdeadline(date.value))
//  {
//    date.setErrors(null);
//  }
//  else
//  {
//    date.setErrors({'dateerror':true});
//  }

//   if(password.value === confirmpassword.value)
//   {
//     confirmpassword.setErrors(null);
//   }
//   else{
//     confirmpassword.setErrors({'passwordmatch':true})
//   }
//   return null;
//  }

// const index = data.findIndex(obj => obj.id === id);
// const newData = [
//     ...data.slice(0, index),
//     ...data.slice(index + 1)
// ]
//   if(this.checkdeadline(date.value))
//  {
//    date.setErrors(null);
//  }
//  else
//  {
//    date.setErrors({'dateerror':true});
//  }
// const date1=new Date();
// const month1=date1.getMonth()+1;
// const year1= date1.getFullYear();
// const day1=date1.getDate();
// // data.dateofcom
// const index= data.value.lastIndexOf('-');
// const date=parseInt(data.value.substr(index+1));
// const index1= data.value.indexOf('-');
// const year=parseInt(data.value.substr(0,index1));
// const month=parseInt(data.value.substr(index1+1,2));
// // console.log(year, month);
// if(year<year1)
// {
 
//  data.setErrors({'dateerror':true});
// }
// else
// if(month<month1)
// {
  
//  data.setErrors({'dateerror':true});}
// else
// if(date<day1)
// {
//   data.setErrors({'dateerror':true});
// }
// else
// {
//   data.setErrors(null);
// }