import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthgaurdService} from './services/authgaurd.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
 // router: any;
  constructor(public auth:AuthgaurdService,public router:Router)
  {

  }
  canActivate(
    route: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.auth.getinauth())
      {
        return  this.router.navigateByUrl("/profile");
      }
      return this.auth.getinauth();
  }
  
}
