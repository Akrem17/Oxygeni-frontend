import { Component, OnInit } from '@angular/core';
import { OxygenService } from '../shared/service/oxygen.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from './dialog-overview-example-dialog/dialog-overview-example-dialog.component';
export interface DialogData {
  animal: string;
  user: string;
}
@Component({
  selector: 'app-oxygen-list',
  templateUrl: './oxygen-list.component.html',
  styleUrls: ['./oxygen-list.component.css']
})
export class OxygenListComponent implements OnInit {
  region:string;
  ville:string;
   sub: any;
   capacite:string;
   quantite:string;
   model:string;
   contact:string;
   data:any[];

   totalRecords:number=50
   page:number=1;
   itemPerPage:number=5

   animal: string;
   name: string;
 
  constructor(private router :Router,private route: ActivatedRoute,
    private oxygenservice : OxygenService,public dialog: MatDialog) { }
    openDialog(user): void {
      console.log(user)
      const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
        width: '250px',
        
        data: {user: user }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
       
        this.animal = result;
        
      });
    }
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.region = params['region'];
      this.ville = params['ville'];
      if(this.region=="إختار الولاية" && this.ville=="إختار المعتمدية"){
        Swal.fire({
          title: 'خطأ!',
          text: 'أختار بلاصة ',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
  
      }
      else if(this.region!="إختار الولاية" && this.ville=="إختار المعتمدية"){
  
      
        this.oxygenservice.getOxygenByRegion(this.region,this.page,this.itemPerPage).subscribe(res=>{
      
          this.data=res.data
              },(err=>{
              
                console.log(err);
                      Swal.fire({
                        title: 'خطأ!',
                        text: err,
                        icon: 'error',
                        confirmButtonText: 'Cool'
                      })
              }))
      }
      else{
  
        this.oxygenservice.getOxygenByRegionAndVille(this.region,this.ville,this.page,this.itemPerPage).subscribe(res=>{
          this.data=res.data
          
          console.log(this.data)
  
        })
    }
      
   });
  
  }
  onChangePage(event:PageEvent){
    console.log(event)
    
    if(event.previousPageIndex==1){
      console.log("hi")
      this.page = event.pageIndex
    }else{
      this.page = event.pageIndex+1
    }
   
    this.itemPerPage= event.pageSize
    if(this.region=="إختار الولاية" && this.ville=="إختار المعتمدية"){
      Swal.fire({
        title: 'خطأ!',
        text: 'أختار بلاصة ',
        icon: 'error',
        confirmButtonText: 'Cool'
      })

    }
    else if(this.region!="إختار الولاية" && this.ville=="إختار المعتمدية"){

    
      this.oxygenservice.getOxygenByRegion(this.region,this.page,this.itemPerPage).subscribe(res=>{
    
        this.data=res.data.docs
        this.totalRecords=res.total
        console.log(this.data)
            },(err=>{
            
              console.log(err);
                    Swal.fire({
                      title: 'خطأ!',
                      text: err,
                      icon: 'error',
                      confirmButtonText: 'Cool'
                    })
            }))
    }
    else{

      this.oxygenservice.getOxygenByRegionAndVille(this.region,this.ville,this.page,this.itemPerPage).subscribe(res=>{
        this.data=res.data.docs
        this.totalRecords=res.total
        console.log(this.data)

      })
  }
  
       
    
  }
  
   
}
