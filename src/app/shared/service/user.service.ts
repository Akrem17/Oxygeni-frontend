import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/user'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string = environment.url

  constructor(private http:HttpClient) { }
  getAllUsers(page?,limit?):Observable<Users[]>{return this.http.get<Users[]>(this.url+"/users?page="+page+"&"+"limit="+limit)}
  getOneUser(id):Observable<Users[]>{return this.http.get<Users[]>(this.url+"/users/"+id)}
  addUser(user: Users): Observable<Users> {return this.http.post<Users>(this.url+"/users/",user)}

}
;






/* 
  deletePermission(codePermission: string): Observable<{}> {return this.http.delete(this.url+"/permissions/"+codePermission)}
  updatePermission(code:string ,permission: PERMISSION): Observable<PERMISSION> {return this.http.patch<PERMISSION>(this.url+"/permissions/"+code, permission);}
  getPermissionByTitre(titre,page?,limit?):Observable<PERMISSION[]>{return this.http.get<PERMISSION[]>(this.url+"/permissions/titre/"+titre+"?page="+page+"&"+"limit="+limit)}
  getPermissionByTitreAndType(titre,type):Observable<PERMISSION>{return this.http.get<PERMISSION>(this.url+"/permissions/titre/"+titre+"/"+type)}
  getMultPermissionByTitre(titre,page?,limit?):Observable<PERMISSION[]>{return this.http.get<PERMISSION[]>(this.url+"/permissions/titre/mult/"+titre+"?page="+page+"&"+"limit="+limit)}

}
 */