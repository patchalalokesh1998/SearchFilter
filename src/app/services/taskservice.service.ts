import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Form} from './taskform';
import {ErrorhandlingService}from './errorhandling.service';
import { map, catchError, filter,debounceTime, distinctUntilChanged,switchMap } from 'rxjs/operators';
import { of, pipe} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {
url:string="http://localhost:3000/taskdetails";
compurl:string="http://localhost:3000/completedtaskes";
profile:string="http://localhost:3000/profile11";
queryUrl: String = '?q=';
  constructor(private http:HttpClient, private errohandlingservice:ErrorhandlingService) {
    
   }

  gettaskdetails():Observable<any>
  {
   return this.http.get<any>(this.url).pipe(catchError(this.errohandlingservice.handleError))
  }
  deletetaskdetails(id):Observable<any>
  {
   return this.http.delete<any>(this.url+'/'+id).pipe(catchError(this.errohandlingservice.handleError))
  };


  posttaskdetails(data):Observable<any>
  {
   return this.http.post<any>(this.url,data).pipe(catchError(this.errohandlingservice.handleError))
  };
  puttaskdetails(data,id):Observable<any>
  {
   return this.http.put<any>(this.url+'/'+id,data).pipe(catchError(this.errohandlingservice.handleError))
  }
  posttocompletedtaskes(data):Observable<any>
  {
   return this.http.post<any>(this.compurl,data).pipe(catchError(this.errohandlingservice.handleError))
  }
  getcompletedtaskes():Observable<any>
  {
    return this.http.get<any>(this.compurl).pipe(catchError(this.errohandlingservice.handleError));
  }
  getprofile(id):Observable<any>
  {
    
    if(id!=0)
    {
      return this.http.get<any>(this.profile+"/"+id).pipe(catchError(this.errohandlingservice.handleError));
    }
    return this.http.get<any>(this.profile).pipe(catchError(this.errohandlingservice.handleError));
    
  }
  patchprofile(data,id):Observable<any>
  {
    return this.http.patch<any>(this.profile+"/"+id,data).pipe(catchError(this.errohandlingservice.handleError));
  }

  // search(terms: Observable<string>) {
  //   console.log('entered');
  //   return terms.pipe(debounceTime(400),distinctUntilChanged(),
  //   switchMap(term => this.searchEntries(term)));
  // }
  // searchEntries(term) {
  //   return this.http
  //       .get(this.compurl + this.queryUrl + term)
  // }
  // search(term) {  
  //   return of(term).pipe(
  //      switchMap(() => this.searchEntries(term) // <--- Notice that, this function has no parameter
  //    ))
  // }

  public searchEntries(term): Observable<any>{
    
    const params = new HttpParams()
    .set('q', term);
    if (term === "" ){
      console.log("Not defined");
      return of(null);
      //return empty();
    }else{
      return this.http.get( this.profile,{params}).pipe(
        map(response => {
          console.log(response);
          return response;
         })
      );
    }
    
  }

  //returns the response for the first method
  public _searchEntries(term){
    return this.searchEntries(term);
  }


}
