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
  signup (nom,prenom,email,password,passwordConfirm):Observable<any[]>{return this.http.post<any[]>(this.url+"/signup",{nom,prenom,email,password,passwordConfirm})}

 
  loggedIn(){
    return !!localStorage.getItem('token');
    
  }
  logout(){
     localStorage.clear();
      this.router.navigate(['/login']).then(()=>{
        location.reload()

      })
  }
  getToken(){
    return localStorage.getItem('token');
  }
  getUser(){
    return localStorage.getItem('userId');
  }

  IsThereUser(){
    return !!localStorage.getItem('userId');

  }

  forgetpassword(email):Observable<any[]>{return this.http.post<any[]>(this.url+"/forgetpassword",{email})}
  //resetpassword(id,token):Observable<any[]>{return this.http.get<any[]>(this.url+"/resetpassword/"+id+"/"+token)}
  changepassword(id,token,password,passwordConfirm):Observable<any[]>{return this.http.post<any[]>(this.url+"/forgetpassword/"+id+"/"+token,{password,passwordConfirm})}

}

