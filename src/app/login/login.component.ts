import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { AthService } from '../shared/service/ath.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  addOxygenForm: FormGroup;
  errormsg: string=null;

  constructor(private fb: FormBuilder,private authService:AthService,private router:Router) { 
  
    if(this.router.getCurrentNavigation().extras.state){
      this.errormsg=this.router.getCurrentNavigation().extras.state.msg; 

    }
    this.createForm();
  }

  ngOnInit(): void {
 // should log out 'bar'

  }
  createForm() {
    this.addOxygenForm = this.fb.group({
      email:  new FormControl('',  [Validators.required]),
      password: new FormControl('',  [Validators.required]),
      
    });
  }


  onSubmit() {
    
    console.log(this.addOxygenForm.value);
    this.authService.login(this.addOxygenForm.value.email,this.addOxygenForm.value.password).subscribe(res=>{


      console.log(res)
      //@ts-ignore
      localStorage.setItem('token',res.token);
      //@ts-ignore
      localStorage.setItem('userId',res.user._id);
     
      this.router.navigate(['/']).then(()=>{

        location.reload()
      });

    },err=>{

      console.log(err)
      console.log(err)
      if (err instanceof HttpErrorResponse){
        if(err.status===403){
          this.errormsg=err.error.msg
        }
      }
    })
  }

}
