import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Oxygen } from '../models/oxygen';

@Injectable({
  providedIn: 'root'
})
export class OxygenService {
  url:string = environment.url

  constructor(private http:HttpClient) { 
    console.log(this.url)
  }
  getAllOxygen(page?,limit?):Observable<Oxygen[]>{return this.http.get<Oxygen[]>(this.url+"/oxygenes?page="+page+"&"+"limit="+limit)}
  getOneOxygen(id):Observable<Oxygen[]>{return this.http.get<Oxygen[]>(this.url+"/oxygenes/"+id)}
  addOxygen(oxygen: Oxygen): Observable<Oxygen> {return this.http.post<Oxygen>(this.url+"/oxygenes/",oxygen)}
  getOxygenByRegionAndVille(region,ville,page?,limit?):Observable<any>{return this.http.get(this.url+"/oxygenes/"+region+"/"+ville+"?page="+page+"&"+"limit="+limit)}
  getOxygenByRegion(region,page?,limit?):Observable<any>{return this.http.get(this.url+"/oxygenes/"+region+"?page="+page+"&"+"limit="+limit)}
  getByAll(capacite,modele,region,tel,ville):Observable<any>{return this.http.get(this.url+"/oxygenes?capacite="+capacite+"&modele="+modele+"&region="+region+"&tel="+tel+"&ville="+ville)}

}

/* 
  deletePermission(codePermission: string): Observable<{}> {return this.http.delete(this.url+"/permissions/"+codePermission)}
  updatePermission(code:string ,permission: PERMISSION): Observable<PERMISSION> {return this.http.patch<PERMISSION>(this.url+"/permissions/"+code, permission);}
  getPermissionByTitre(titre,page?,limit?):Observable<PERMISSION[]>{return this.http.get<PERMISSION[]>(this.url+"/permissions/titre/"+titre+"?page="+page+"&"+"limit="+limit)}
  getPermissionByTitreAndType(titre,type):Observable<PERMISSION>{return this.http.get<PERMISSION>(this.url+"/permissions/titre/"+titre+"/"+type)}
  getMultPermissionByTitre(titre,page?,limit?):Observable<PERMISSION[]>{return this.http.get<PERMISSION[]>(this.url+"/permissions/titre/mult/"+titre+"?page="+page+"&"+"limit="+limit)}

}
 */