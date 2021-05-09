import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Oxygen } from '../shared/models/oxygen';
import { Users } from '../shared/models/user';
import { OxygenService } from '../shared/service/oxygen.service';
import { SubdivisionService } from '../shared/service/subdivision.service';
import { UserService } from '../shared/service/user.service';
import Swal from 'sweetalert2'
import { HttpErrorResponse } from '@angular/common/http';
import { AthService } from '../shared/service/ath.service';

@Component({
  selector: 'app-add-oxygen',
  templateUrl: './add-oxygen.component.html',
  styleUrls: ['./add-oxygen.component.css']
})
export class AddOxygenComponent implements OnInit {
  addOxygenForm: FormGroup;
  oxygen: Oxygen;
  user:Users;
  regions:string[];
  ville:string[];
  showSpinner:boolean=false;
  constructor(private fb: FormBuilder, private userService :UserService,
     private oxygenservice:OxygenService,private sub :SubdivisionService
     ,private router: Router,private auth:AthService) { 
    this.createForm();
    this.user=new Users();
    this.oxygen=new Oxygen();
    
  }
  
 ValidatePhone(control: AbstractControl): {[key: string]: any} | null  {
  if (control.value && control.value == 'إختار المعتمدية' ||control.value == 'إختار الولاية' ) {
    return { 'ZoneInvalid': true };
  }
  return null;
}
  createForm() {
    this.addOxygenForm = this.fb.group({
    
      telnum:  new FormControl('',  [Validators.required,Validators.minLength(8)]),
     
      villa: new FormControl('إختار المعتمدية',[this.ValidatePhone]),
      region: new FormControl('إختار الولاية',[Validators.required]),
      capacite: new FormControl('',  [Validators.required]),
      qte:'',
      modele:'',
      prix:''
    
    });
  }

  ngOnInit(): void {
    
    this.regions=this.sub.region;
    console.log(this.regions)

    
  }
  onChange(e){
    console.log(e)

      this.ville=this.sub.ville_tunisie[e];
    }

  
  onSubmit() {

    console.log(this.addOxygenForm.value);

    


    this.showSpinner=true;
    if(this.auth.loggedIn() && this.auth.IsThereUser()){
      //traitement
     var  userid=localStorage.getItem('userId');

      this.userService.getOneUser(userid).subscribe(res=>{
        //traitement
        console.log(res);

        this.oxygen.user=userid;
        this.oxygen.capacite=this.addOxygenForm.value.capacite;
        this.oxygen.modele=this.addOxygenForm.value.modele;

        this.oxygen.prix=this.addOxygenForm.value.prix;
        this.oxygen.quantite=this.addOxygenForm.value.qte;
        this.oxygen.region=this.addOxygenForm.value.region;

        this.oxygen.tel=this.addOxygenForm.value.telnum;
        this.oxygen.ville=this.addOxygenForm.value.villa;

          /* this.oxygenservice.getByAll(this.oxygen.capacite,this.oxygen.modele,this.oxygen.region,this.oxygen.tel,this.oxygen.ville).subscribe(res=>{

            this.showSpinner=false;
            console.log(res)
              console.log("cette info de l'oxygen deja existe");
              alert("cette info de l'oxygen deja existe");
            throw "cette info de l'oxygen deja existe"

          },(err)=>{ */

            this.oxygenservice.addOxygen(this.oxygen).subscribe(res=>{
              console.log(res)
              Swal.fire({
                title: 'Ajouter avec scccess!',
               
                icon: 'success',
                confirmButtonText: 'Cool'
              })
              this.router.navigate(['/myposts']);
    
    
            },err=>{
              this.showSpinner=false;
              if (err instanceof HttpErrorResponse){
                if(err.status===403){
                  this.auth.logout();
                          }
              }
              console.log(err)
    
            })

/* 
          })
 */
       
     
      },(err)=>{
        this.showSpinner=false;
        if (err instanceof HttpErrorResponse){
          if(err.status===403){
            this.auth.logout();
                    }
        }
        console.log(err)
      
      })
    }else{

      this.auth.logout();
    }
    
  }
}
