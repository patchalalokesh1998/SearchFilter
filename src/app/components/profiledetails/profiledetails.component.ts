import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import{TaskserviceService} from '../../services/taskservice.service';
import {  TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import{FormGroup, FormControl, FormBuilder,ValidatorFn, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.css']
})
export class ProfiledetailsComponent implements OnInit {
   maininfo:any;
   modalRef: BsModalRef;
   editform:any;
   id:any;
   mapsurl:string="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=";
   cmapsurl:any;
   cleanedurl:any;
   sucess=false;
   constructor(
    private service: TaskserviceService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: BsModalService,
    private fb:FormBuilder,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.service.getprofile(this.id).subscribe((data)=>{console.log(data);this.maininfo=data;this.settingmaps();console.log(this.cmapsurl);this.transformdate()});
    
  }
  openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
      this.sucess=false;
      this.editformconstructor();

     }
  editformconstructor()
  {
    console.log(this.maininfo);
    this.editform=this.fb.group(
      {
        name:[this.maininfo.name,[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
        age:[this.maininfo.age],
        date:[this.transformdate(),[Validators.required]],
       // email:[this.maininfo.email,[Validators.required,Validators.email]],
        image:[this.maininfo.image],
        address:[this.maininfo.address]
       // totalquantity:[this.datatochange.totalquantity]
      }
    )
  }
  transformdate()
  {
   let result= this.maininfo.dob.split("-");
   // console.log(result);
    return `${result[2]}-${result[0]}-${result[1]}`
   // return `${result[3]}-${result[0]}-${result[1]}`;

  }
  editdetailssubmit()
  {
    this.editform.value.image
    console.log(this.editform.value);
    this.service.patchprofile(this.editform.value, this.id).subscribe((data)=>{console.log(data);
    if(data)
    {
      this.sucess=true;
      setTimeout(()=>{this.modalRef.hide()},2000);
    }  
    this.maininfo=data});
    this.settingmaps();
  }
  convertimage(event)
  {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
       // console.log(reader.result);
        this.editform.value.image=reader.result;
    };
  }
  settingmaps()
  {
   this.cmapsurl=this.mapsurl.concat(this.maininfo.address)
   this.cleanedurl = this.sanitizer.bypassSecurityTrustResourceUrl(this.cmapsurl);
   console.log(this.cleanedurl.changingThisBreaksApplicationSecurity);
  }
  public ageFromDateOfBirthday() {
    const dateOfBirth=this.editform.value.date;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
     this.editform.value.age=age;
     console.log(this.editform.value)
  }
//   var fileInput = document.getElementById('#myInputID');

// var reader = new FileReader();
// reader.readAsDataURL(fileInput.files[0]);

// reader.onload = function () {
// 	console.log(reader.result);//base64encoded string
// };
// reader.onerror = function (error) {
// 	console.log('Error: ', error);
// };

}


