import { Component, OnInit } from '@angular/core';
import {Observable,of, throwError,Subject,forkJoin,concat} from 'rxjs';
import {TaskserviceService} from '../../services/taskservice.service';
import {filter,map,debounceTime,distinctUntilChanged,switchMap,tap,share, mergeMap} from 'rxjs/operators';
import { doesNotReject } from 'assert';
@Component({
  selector: 'app-practicerxjs',
  templateUrl: './practicerxjs.component.html',
  styleUrls: ['./practicerxjs.component.css']
})
export class PracticerxjsComponent implements OnInit {
undo:any;
val=4;
searchresult:any;
searchTerm = new Subject<string>();
public searchResults: any;
//simpleObservable
  constructor(private service:TaskserviceService) {
   
  }
 

  ngOnInit(): void {
   // this.function().subscribe((data)=>{console.log(data)});
  //  this.search();
    console.log('data');
    this.rxjsoperators();
    
    // console.log(this.asynchronous((data)=>{this.async2(data)}));
    // console.log("out of async function");
    //this.service.getcompletedtaskes().pipe(map(res=>res.filter(res=>res.id%2==0))).subscribe((data)=>{console.log(data)});
    // subscribe to the observable
    let observer={
      next: data => console.log( 'Data received: ', data)
      // complete: data => console.log('Completed'),
    }
this.undo=this.simpleObservable.subscribe(observer);
this.function1(
  ()=>{this.function2(()=>{this.function3()})});
console.log('after call back');
//this.undo.unsubscribe();
//this.promise();
// dispose the observable
//this.simpleObservable.unsubscribe();
  }
  async2(data)
  {
  console.log(data,"async2");
  }
  asynchronous(callback)
  {
    // this.service.getcompletedtaskes().pipe(map((data)=>{return data})).subscribe((data)=>{console.log(data);callback(data)});
  }

  
   public simpleObservable = new Observable((observer) => {
  
      // observable execution
      observer.next(this.callbackfunction(0));
      
      // observer.next(console.log(1));
      //  observer.error("Error Message");
      observer.next(this.function());
      // observer.complete()
  })



  // public search(){
  //   this.searchTerm.pipe(
  //     map((e: any) => {
  //       console.log(e.target.value);
  //       return e.target.value
  //     }),
  //     debounceTime(400),
  //     distinctUntilChanged(),
  //     switchMap(term => {
  //      // this.loading = true;
  //       return this.service._searchEntries(term)
  //     })
  //   ).subscribe(v => {
  //       //this.loading = false;
  //       //return the results and pass the to the paginate module
  //       this.searchResults = v;
  //        console.log(this.searchResults)
  //   })
  // }

// promise()
// {
//   let data1;
//   console.log('entered');
//   let promise1 = new Promise(function(resolve){this.service.gettaskdetails().subscribe().toPromise().then(res=>{console.log(res);resolve('completed')})})
//   promise1.then(result=>{console.log(result)})
//   .then(result=>{console.log(result)})
// }
 
 
callbackfunction(i)
{
 // let data1
  i=i+1;
   //console.log(i);
  // return setTimeout(()=>{return i},2000);
 // this.service.gettaskdetails().subscribe((data)=>{console.log(data);data1=data});
}

function()
{
  // if(this.val>3)
  // {
  //   throw new Error('value is greater than 3');
  // }
 //return this.service.getcompletedtaskes().pipe(map((data)=>{return data})).subscribe((data)=>{console.log(data)});
 return 0;
  //console.log(i);
}
 function1(callback){
  //do stuff
  console.log("function1");
  callback();
  console.log('after call back1 called');
}
function2(callback){
  //do stuff
  console.log("function2");
  callback();
  console.log('after call back2 called');  
} 
function3(){
  //do stuff
  console.log("function3");
}


rxjsoperators()
{
  // rjxs operators
this.service.getprofile(0).pipe(map((data)=>{console.log(data);return data.filter((data1)=>{return data1.age>22})})).subscribe((data)=>console.log(data));
//of rxjs operator
 let arr=[1,2,3,4];
 let arr2=[5,6,7,8];
 let ofop=of(arr);
 let ofop2=of(arr2);
//  ofop.subscribe((data)=>console.log(data));
// //map operator
 //ofop.pipe(map((data)=>{return data.filter(r=>r<2)})).subscribe((data)=>{console.log(data)});
//tap operator
// ofop.pipe(tap((data)=>{return data.filter(r=>r<2)})).subscribe((data)=>{console.log(data)});
//share operator
// let request=this.service.getcompletedtaskes().pipe(share());
// this.servicecall(request);
// request.subscribe((data)=>{console.log(data)});
//switchmap
// const combined= ofop.pipe(switchMap((data)=>{console.log(data); return ofop2}));
// combined.subscribe((data)=>{console.log(data)});
//mergemap
 //const merge=ofop.pipe(map(arr1=>{console.log(arr1);return arr1.filter((arr)=>{arr%2==0})}),mergeMap(arr1=>{return ofop.pipe(map((data)=>{console.log(arr1)}))}));
// merge.subscribe((data)=>{console.log(data)});
 //const merge=ofop.pipe(map((data)=>{return data}),mergeMap((data)=>{return ofop2.pipe(map(data2=>{ return data2=data.concat(data2)})) }))
//forkjoin
 //merge.subscribe((data)=>{console.log(data)});
// const forkj=forkJoin([ofop,ofop2]);
// forkj.subscribe((data)=>{console.log(data)});
//concat
// const concatop=concat(ofop2,ofop);
// concatop.subscribe((data)=>{console.log(data)})
}
servicecall(request)
{
 request.subscribe((data)=>{console.log(data)});
// data.filter(r=>r%2==0)
}



}
// let ob$ = Observable.create((observer) => {
//   observer.next("A new value!");
// });
// let observer = {
//   next: data => console.log( 'Data received: ', data),
//   complete: data => console.log('Completed'),
// };
// let subscription = ob$.subscribe(observer);





