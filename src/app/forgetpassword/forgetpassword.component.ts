import { Component, OnInit } from '@angular/core';
import { AthService } from '../shared/service/ath.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  email: string;

  constructor(private authService:AthService) { }

  ngOnInit(): void {
  }
   emailValidate = (email) => {
    const regexp= /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
    return regexp.test(email);
  }

  emailnonvalide:boolean=false;
  emailnexistepas:boolean=false;

  showSpinner:boolean=false;

    reset(){
    console.log(this.email)
      if(this.emailValidate(this.email)){
        this.emailnonvalide=false
        this.emailnexistepas=false
        this.showSpinner=true;

        this.authService.forgetpassword(this.email).subscribe(res=>{
          this.showSpinner=false;

          Swal.fire({
            title: 'Le lien est envoyé à '+this.email,
            text: 'Le lien est envoyé à votre email ( verifier spam )!',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          this.email=""
          console.log("Le lien est envoyé ( verifier spam )")
        },(err)=>{
          this.showSpinner=false;


            if(err.error.msg="Email n existe pas "){
              this.emailnexistepas=true
              console.log("email n'exsite pas veillez signup")
            }
        })
      }else{
        this.emailnonvalide=true
        this.emailnexistepas=false

        console.log("email not valid")
      }
    


    }
}
