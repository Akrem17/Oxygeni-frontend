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
               //@ts-ignore
        this.totalRecords=res.total
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
            //@ts-ignore
        this.totalRecords=res.total 
          
  
        })
    }
      
   });
  
  }

  
  handlePageEvent(event: PageEvent) {
    /*  this.length = event.length;
     this.pageSize = event.pageSize;
     this.pageIndex = event.pageIndex; */
     this.totalRecords=event.length
     this.itemPerPage=event.pageSize;
     this.page=event.pageIndex
     if(this.region=="إختار الولاية" && this.ville=="إختار المعتمدية"){
      Swal.fire({
        title: 'خطأ!',
        text: 'أختار بلاصة ',
        icon: 'error',
        confirmButtonText: 'Cool'
      })

    }
    else if(this.region!="إختار الولاية" && this.ville=="إختار المعتمدية"){

    
      this.oxygenservice.getOxygenByRegion(this.region,this.page+1,this.itemPerPage).subscribe(res=>{
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

      this.oxygenservice.getOxygenByRegionAndVille(this.region,this.ville,this.page+1,this.itemPerPage).subscribe(res=>{
        this.data=res.data


      })
  }
  
    
  }
  
   
}
