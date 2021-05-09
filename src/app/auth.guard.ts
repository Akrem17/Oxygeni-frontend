import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AthService } from './shared/service/ath.service';

@Injectable({
  providedIn: 'root'
}) 
export class AuthGuard implements CanActivate {

  constructor(private _ath: AthService,private _router:Router){}

  canActivate():boolean{
      if(this._ath.loggedIn()){
        return true;

      }else{
        this._router.navigate(['login'], { state: { msg: "Veuillez connecter d'abord" }} );
        return false;
      }
  }
}
