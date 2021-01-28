import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventorymanagmentService {
fooditemsurl="http://localhost:3000/fooditems";
 electronicsurl="http://localhost:3000/electronics";
 clothingurl="http://localhost:3000/clothing"; 

 
  
  
  constructor(private http:HttpClient) { }
  postaddproduct(data,category):Observable<any>
  {
    if(category=="fooditem")
    {
      return this.http.post<any>(this.fooditemsurl,data);
    }
    else
    if(category=="electronics")
    {
      return this.http.post<any>(this.electronicsurl,data);
    }
    else
    if(category=="clothing")
    {
      return this.http.post<any>(this.clothingurl,data);
    }
  }
  getproduct(category):Observable<any>
  {
    if(category=="fooditem")
    {
      return this.http.get<any>(this.fooditemsurl);
    }
    else
    if(category=="electronics")
    {
      return this.http.get<any>(this.electronicsurl);
    }
    else
    if(category=="clothing")
    {
      return this.http.get<any>(this.clothingurl);
    }
  }
  patchproduct(category,id,data):Observable<any>
  {
    if(category=="fooditem")
    {
      return this.http.patch<any>(this.fooditemsurl+'/'+id, data);
    }
    else
    if(category=="electronics")
    {
      return this.http.patch<any>(this.electronicsurl+'/'+id, data);
    }
    else
    if(category=="clothing")
    {
      return this.http.patch<any>(this.clothingurl+'/'+id, data);
    }
  }

  deleteproduct(id,category):Observable<any>
  {
    if(category=="fooditem")
    {
      return this.http.delete<any>(this.fooditemsurl+'/'+id);
    }
    else
    if(category=="electronics")
    {
      return this.http.delete<any>(this.electronicsurl+'/'+id);
    }
    else
    if(category=="clothing")
    {
      return this.http.delete<any>(this.clothingurl+'/'+id);
    }
  }
  

}
