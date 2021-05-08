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
     ,private router: Router) { 
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
      firstname: '',
      lastname: '',
      telnum:  new FormControl('',  [Validators.required,Validators.minLength(8)]),
      email: '',
      villa: new FormControl('إختار المعتمدية',[this.ValidatePhone]),
      region: new FormControl('إختار الولاية',[Validators.required]),
      capacite: new FormControl('',  [Validators.required]),
      qte:'',
      modele:'',
      prix:'',
      password:'',
      passwordconfirm:''
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

    this.user.nom=this.addOxygenForm.value.firstname;
    this.user.prenom=this.addOxygenForm.value.lastname;
    this.user.region=this.addOxygenForm.value.region;
    this.user.tel=this.addOxygenForm.value.telnum;
    this.user.ville=this.addOxygenForm.value.villa;
    this.user.email=this.addOxygenForm.value.email;
    this.user.password=this.addOxygenForm.value.password;
    this.user.passwordConfirm=this.addOxygenForm.value.passwordconfirm;

    this.showSpinner=true;

    console.log(this.user)
    this.userService.addUser(this.user).subscribe(res=>{
      this.showSpinner=true;
      //@ts-ignore
      this.oxygen.user=res.data.newDoc._id;
      this.oxygen.capacite=this.addOxygenForm.value.capacite;
      this.oxygen.modele=this.addOxygenForm.value.modele;
      this.oxygen.quantite=this.addOxygenForm.value.qte;
      this.oxygen.fabriquant=null;
      this.oxygen.prix=this.addOxygenForm.value.prix;

      this.oxygenservice.addOxygen(this.oxygen).subscribe(res=>{
        console.log(res)
        this.router.navigate(['/list', this.user.region, this.user.ville]);

      },(err)=>{

        this.showSpinner=false;
        if (err instanceof HttpErrorResponse){
          if(err.status===403){
            this.router.navigate(['/login']);
          }
        }
        console.log(err)
      })
    },(err=>{
      this.showSpinner=false;
 if (err instanceof HttpErrorResponse){
          if(err.status===403){
            this.router.navigate(['/login']);
          }
        }
      console.log(err);
      Swal.fire({
        title: 'خطأ!',
       
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }))
  }
}
