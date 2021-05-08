import { HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable,Injector } from '@angular/core';
import { AthService } from './ath.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    constructor(private injector:Injector){
        
    }
    intercept(req:HttpRequest<any>,next){
       let authservice=this.injector.get(AthService)
        
        const authRequest = req.clone({
            headers:req.headers.set('Authorization',`Bearer ${authservice.getToken()}`)
        })
        
        return next.handle(authRequest);
    }
}