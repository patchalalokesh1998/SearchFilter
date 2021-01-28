import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import{FormGroup, FormControl, FormBuilder,ValidatorFn, Validators} from '@angular/forms';
import {InventorymanagmentService} from '../../services/inventorymanagment.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-selleraddproduct',
  templateUrl: './selleraddproduct.component.html',
  styleUrls: ['./selleraddproduct.component.css']
})
export class SelleraddproductComponent implements OnInit {
  modalRef: BsModalRef;
  additemsform:any;
  category:any;
  infotodisplay:any;
  foodinfo:any;
  electronicsinfo:any;
  clothinginfo:any;
  editedforminfo:any;
  foodbuttonactive=false;
  electronicsbuttonactive=true;
  clothingbuttonactive=false;
  sucessmessage=false;
  datatochange:any;
  failuremessage=false;
  deleteforminfo:any;
  // checktoconfirm=false;
  // grant=false;
 
  constructor(private modalService: BsModalService, private fb: FormBuilder, private service: InventorymanagmentService, private router:Router) { }

  ngOnInit(): void {
   this.category="electronics";
   this.service.getproduct(this.category).subscribe((data)=>{this.infotodisplay=data;this.electronicsinfo=data});
  }
  formconstructor()
  {
    let date=new Date();
    
let curr_date = date.getDate();
let curr_month = date.getMonth() + 1; //Months are zero based
let curr_year = date.getFullYear();
let finaldate=`${curr_month}/${curr_date}/${curr_year}`;
    this.additemsform=this.fb.group(
      {
        productname:['',[Validators.required]],
        date:[finaldate,[Validators.required]],
       totalquantity:['',Validators.required],
       quantityconsumed:[0]
      }
    )
  }
  editformconstructor()
  {
    this.editedforminfo=this.fb.group(
      {
        productname:[this.datatochange.productname],
        totalquantity:[this.datatochange.totalquantity]
      }
    )
  }
  deleteformconstructor()
  {
    this.deleteforminfo=this.fb.group(
      {
        checktoconfirm:['',Validators.required]
      },
      {validators:[this.checkvalidator]}
    )
  }

  checkvalidator(Form: FormGroup): ValidatorFn {
  
    const check=Form.get('checktoconfirm');
    if(check.value==true)
    {
     check.setErrors(null);
    }
    else
    {
      check.setErrors({'checkerror':true});
    }
    return null;
  }

  openModel(template: TemplateRef<any>) {
    this.sucessmessage=false;
    this.failuremessage=false;
    this.modalRef = this.modalService.show(template);
    this.formconstructor();
  }
  openModeleditproduct(template: TemplateRef<any>,data)
  {
    this.datatochange=data;
    this.sucessmessage=false;
    this.failuremessage=false;
    this.modalRef = this.modalService.show(template);
    this.editformconstructor();
  }
  openModeldeleteproduct(template: TemplateRef<any>,data)
  {
    this.datatochange=data;
    this.sucessmessage=false;
    this.failuremessage=false;
    this.modalRef = this.modalService.show(template);
    this.deleteformconstructor();
  }
  
  fooditems()
  {
   this.foodbuttonactive=true;
   this.clothingbuttonactive=false;
   this.electronicsbuttonactive=false;
   this.category='fooditem';
   this.service.getproduct(this.category).subscribe((data)=>{this.infotodisplay=data; console.log(data); this.foodinfo=data;})
   
  }
  Electronics()
  {
    this.electronicsbuttonactive=true;
    this.foodbuttonactive=false;
    this.clothingbuttonactive=false;
    this.category='electronics';
    this.service.getproduct(this.category).subscribe((data)=>{this.infotodisplay=data; console.log(data); this.electronicsinfo=data})
  }
  clothing()
  {
    this.clothingbuttonactive=true;
    this.foodbuttonactive=false;
    this.category='clothing';
   this.electronicsbuttonactive=false;
   this.service.getproduct(this.category).subscribe((data)=>{this.clothinginfo=data; console.log(data); this.infotodisplay=data})
  }
  
  additemssubmit()
  {
     console.log(this.additemsform.value);
    // this.category=="fooditems"?this.service.
    this.service.postaddproduct(this.additemsform.value,this.category).subscribe((data)=>{console.log(data);data?this.sucessmessage=true:this.failuremessage=true; if(this.sucessmessage)this.infotodisplay.push(data); setTimeout(()=>{this.modalRef.hide()},2000)});
    this.additemsform.reset();
  }
  editproductsubmit()
  {
    this.service.patchproduct( this.category,this.datatochange.id,this.editedforminfo.value).subscribe((data)=>{console.log(data);data?this.sucessmessage=true:this.failuremessage=true;
      var index= this.infotodisplay.findIndex(obj => obj.id ===this.datatochange.id);
      this.infotodisplay[index].id=data.id;
      this.infotodisplay[index].productname=data.productname;
      this.infotodisplay[index].date=data.date;
      this.infotodisplay[index].totalquantity=data.totalquantity;
      this.infotodisplay[index].quantityconsumed=data.quantityconsumed;

      setTimeout(()=>{this.modalRef.hide()},2000)});
   
    //this.infotodisplay=[...this.infotodisplay.slice(0,index),...this.infotodisplay.slice(index+1)];
    
    this.editedforminfo.reset();
  }
  deleteproductsubmit()
  {
    console.log(this.deleteforminfo.value);
    if(this.deleteforminfo.value.checktoconfirm==true)
    {
      this.service.deleteproduct(this.datatochange.id,this.category).subscribe((data)=>{console.log(data);data?this.sucessmessage=true:this.failuremessage=true; setTimeout(()=>{this.modalRef.hide()},2000)});
      var index= this.infotodisplay.findIndex(obj => obj.id ===this.datatochange.id);
        this.infotodisplay=[...this.infotodisplay.slice(0,index),...this.infotodisplay.slice(index+1)];
      this.deleteforminfo.reset();
    }
   
}
analysis()
{
  this.router.navigate(['/analysis']);
}
}

// }
// {btn:electronicsbuttonactive,'btn-primary':electronicsbuttonactive,'ml-2':electronicsbuttonactive,'mt-2':electronicsbuttonactive, 'btn btn-dark mt-2 ml-2':electronicsbuttonactive==false