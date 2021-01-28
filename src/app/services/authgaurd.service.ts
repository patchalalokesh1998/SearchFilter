import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdService {
  private authenticate=false;

  constructor() { }
  get_authentication()
  {
    if(this.authenticate)
    {
      this.authenticate=false;
      console.log('iin',this.authenticate);
      return this.authenticate;
    }
    else
    {
      this.authenticate=true;
      console.log("in false",this.authenticate);
      return this.authenticate;
    }
   
  }
  getinauth()
  {
    return this.authenticate;
  }
}
