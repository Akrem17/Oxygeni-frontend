import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AthService {
  url:string = environment.url

  constructor(private http:HttpClient,private router:Router) { 
    console.log(this.url)
  }
  login(email,password):Observable<any[]>{return this.http.post<any[]>(this.url+"/login",{email,password})}
  
  loggedIn(){
    return !!localStorage.getItem('token');
    
  }
  logout(){
     localStorage.clear();
      this.router.navigate(['/']);
  }
  getToken(){
    return localStorage.getItem('token');
  }
}

