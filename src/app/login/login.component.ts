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

  constructor(private fb: FormBuilder,private authService:AthService,private router:Router) { 

    this.createForm();
  }

  ngOnInit(): void {
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
      this.router.navigate(['/']);

    },err=>{

      console.log(err)
    })
  }

}
