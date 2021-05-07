import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Oxygen } from '../shared/models/oxygen';
import { Users } from '../shared/models/user';
import { OxygenService } from '../shared/service/oxygen.service';
import { SubdivisionService } from '../shared/service/subdivision.service';
import { UserService } from '../shared/service/user.service';

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
  constructor(private fb: FormBuilder, private userService :UserService,
     private oxygenservice:OxygenService,private sub :SubdivisionService
     ,private router: Router) { 
    this.createForm();
    this.user=new Users();
    this.oxygen=new Oxygen();
  }
  createForm() {
    this.addOxygenForm = this.fb.group({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      villa: new FormControl('إختار المعتمدية'),
      region: new FormControl('إختار الولاية'),
      capacite: '',
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

    this.user.nom=this.addOxygenForm.value.firstname;
    this.user.prenom=this.addOxygenForm.value.lastname;
    this.user.region=this.addOxygenForm.value.region;
    this.user.tel=this.addOxygenForm.value.telnum;
    this.user.ville=this.addOxygenForm.value.villa;
    console.log(this.user)
    this.userService.addUser(this.user).subscribe(res=>{
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

      })
    })
  }
}
