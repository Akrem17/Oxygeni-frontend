import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AthService } from '../shared/service/ath.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  sub: any;
  id: string;
  token: string;
  password:string;
  passwordConfirm:string;
  passwordnotconfirmed:boolean=false;
  constructor( private auth : AthService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.token = params['token'];
      console.log(this.id,this.token)

  
        })
  }


  updatePassword(){
    if(this.password!=this.passwordConfirm){
      this.passwordnotconfirmed=true
    }else{
      this.passwordnotconfirmed=false

      this.auth.changepassword(this.id,this.token,this.password,this.passwordConfirm).subscribe(res=>{

        console.log(res)
        Swal.fire({
          title: 'Votre mot de passe a été changer avec success',
          
          icon: 'success',
          confirmButtonText: 'Cool'
        })
         
            this.router.navigate(['/login'])

      },(err)=>{
        console.log(err)
        this.router.navigate(['/login'])
      })
    }
 
  }
}
