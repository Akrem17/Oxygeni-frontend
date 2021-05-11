import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AthService } from '../shared/service/ath.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {


  addOxygenForm: FormGroup;
  errormsg: string=null;

  constructor(private fb: FormBuilder,private authService:AthService,private router:Router) { 

    this.createForm();
  }

  ngOnInit(): void {
  }
  Validateemail(control: AbstractControl): {[key: string]: any} | null  {
    if (control.value && (control.value) ) {
      return { 'ZoneInvalid': true };
    }
    return null;
  }
  createForm() {
    this.addOxygenForm = this.fb.group({
      nom:new FormControl('',  [Validators.required]),
      prenom:new FormControl('',  [Validators.required]),
      email:  new FormControl('',  [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$")]),
      password: new FormControl('',  [Validators.required,Validators.minLength(6)]),
      passwordConfirm: new FormControl('',  [Validators.required]),

    });
  }

  //verification email
  emailValidate = (email) => {
    const regexp= /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
    return regexp.test(email);
  }
  emailerror:boolean=false;
  verifemail(e){

    if(!this.emailValidate(e.target.value)){
      this.emailerror=true;

    }
  }
  verifemail2(e){
    if(this.emailValidate(e.target.value)){
      this.emailerror=false;

    }
    
  }

  //verifier mot de passe
  motdepasseerror:boolean=false;
  verifmotdepasse(e){

    if(e.target.value.length<6){
      this.motdepasseerror=true;

    }
  }
  verifmotdepasse2(e){
    if(e.target.value.length>5){
      this.motdepasseerror=false;

    }
    
  }
//loading 
showSpinner:boolean=false;
  onSubmit() {
      this.showSpinner=true;
    console.log(this.addOxygenForm.value);

      this.authService.signup(this.addOxygenForm.value.nom,this.addOxygenForm.value.prenom,this.addOxygenForm.value.email
        
      ,this.addOxygenForm.value.password,this.addOxygenForm.value.passwordConfirm).subscribe(res=>{
        this.showSpinner=false;

        console.log(res);
            //@ts-ignore
      localStorage.setItem('token',res.token);
      //@ts-ignore
      localStorage.setItem('userId',res.user._id);
      this.router.navigate(['/myposts']).then(()=>{
        location.reload()
      });

      },(err)=>{
        this.showSpinner=false;

        console.log(err)

        if (err instanceof HttpErrorResponse){
          if(err.status===403){
            this.errormsg=err.error.msg
          }
        }
      })
  }

}
