import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DialogOverviewExampleDialogComponent } from '../oxygen-list/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { AthService } from '../shared/service/ath.service';
import { OxygenService } from '../shared/service/oxygen.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
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
  
   delete(itemId){
    console.log(itemId)

    this.oxygenservice.deleteOxygen(itemId).subscribe(res=>{
      this.data = this.data.filter(item => item._id != itemId);
      console.log(this.data)
      Swal.fire({
        title: 'success!',
        text: 'item a éte supprimer avec success ',
        icon: 'success',
        confirmButtonText: 'Cool'
      })

    },err=>{
      console.log(err);
      Swal.fire({
        title: 'erreur!',
        text: 'on peut pas supprmier maintenant, try later ',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    })

   }
  constructor(private router :Router,private route: ActivatedRoute,
    private oxygenservice : OxygenService,public dialog: MatDialog,
    private auth:AthService
    ) { }
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
    if(this.auth.IsThereUser){

      this.oxygenservice.getAllOxygenByUser(this.auth.getUser()).subscribe(res=>{
        console.log(this.auth.getUser())
        console.log(res)
        //@ts-ignore
        this.data=res.data.doc
        console.log(this.data)
      },err=>{

        console.log(err)

      })

    }else{
      alert("you are not authenticated")
      this.auth.logout();
    }
  
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
  
    
  }
  
   
}
