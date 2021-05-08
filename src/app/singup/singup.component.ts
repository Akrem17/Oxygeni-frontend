import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  createForm() {
    this.addOxygenForm = this.fb.group({
      nom:new FormControl('',  [Validators.required]),
      prenom:new FormControl('',  [Validators.required]),
      email:  new FormControl('',  [Validators.required]),
      password: new FormControl('',  [Validators.required]),
      passwordConfirm: new FormControl('',  [Validators.required]),

    });
  }


  onSubmit() {
    
    console.log(this.addOxygenForm.value);

      this.authService.signup(this.addOxygenForm.value.nom,this.addOxygenForm.value.prenom,this.addOxygenForm.value.email
        
      ,this.addOxygenForm.value.password,this.addOxygenForm.value.passwordConfirm).subscribe(res=>{

        console.log(res);
            //@ts-ignore
      localStorage.setItem('token',res.token);
      //@ts-ignore
      localStorage.setItem('userId',res.user._id);
      this.router.navigate(['/']);

      },(err)=>{
        console.log(err)

        if (err instanceof HttpErrorResponse){
          if(err.status===403){
            this.errormsg=err.error.msg
          }
        }
      })
  }

}
