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
   pageEvent: PageEvent;
   animal: string;
   name: string;
  userId: string;
  
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
      this.userId=this.auth.getUser();
      this.oxygenservice.getAllOxygenByUser(this.auth.getUser(),this.page,this.itemPerPage).subscribe(res=>{
        //@ts-ignore
        this.totalRecords=res.total
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
  
  handlePageEvent(event: PageEvent) {
   /*  this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex; */
    this.totalRecords=event.length
    this.itemPerPage=event.pageSize;
    this.page=event.pageIndex
    this.oxygenservice.getAllOxygenByUser(this.userId,this.page+1,this.itemPerPage).subscribe(res=>{
      //@ts-ignore
      this.data=res.data.doc

    })
  }
   
}
