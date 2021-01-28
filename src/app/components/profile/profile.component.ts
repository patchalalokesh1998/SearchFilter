import { Component, OnInit } from '@angular/core';
import {TaskserviceService} from '../../services/taskservice.service';
import {AuthgaurdService} from '../../services/authgaurd.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap,map} from 'rxjs/operators';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  maininfo:any;
  searchresult:any;
  inputsearch:any;
  searchdisplay=true;
  searchpro=false;
  searchinfodis:any;
  errormess:string;
searchTerm = new Subject<string>();
public searchResults: any;
  constructor(private service:TaskserviceService, private auth:AuthgaurdService) { }

  ngOnInit(): void {
    this.search();
    this.service.getprofile(0).subscribe((data)=>{this.maininfo=data; console.log(data)},(err)=>{console.log(err);this.errormess=err;});
  }
  public search(){
    //console.log("entered", this.inputsearch);
    this.searchTerm.pipe(
      map((e: any) => {
        return e;
      }),
      debounceTime(1000),
       distinctUntilChanged(),
      switchMap(term => {
       // this.loading = true;
        return this.service._searchEntries(term)
      })
    ).subscribe(v => {
        //this.loading = false;
        //return the results and pass the to the paginate module
        //this.searchResults = v;
        this.searchResults=[];
       if(v)
       {
         this.cal(v); 
       }
      
         //console.log(this.searchResults)
    })
  }
  cal(searchResults)
  {
   if(searchResults.length>3)
   {
     this.searchResults=searchResults.slice(0,3)
   }else
   this.searchResults=searchResults;
   this.searchpro=false;
  }
  hidesearch(searchinfo)
  {
   this.searchdisplay=false;
    this.searchinfodis=searchinfo;
    this.searchpro=true;

  }
  getauth()
  {
   this.auth.get_authentication();  
   
  }
 
}
