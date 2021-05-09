import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Oxygen } from 'src/app/shared/models/oxygen';
import { OxygenService } from 'src/app/shared/service/oxygen.service';
import { SubdivisionService } from 'src/app/shared/service/subdivision.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  data:Oxygen;
  constructor(private route: ActivatedRoute,private oxygenService:OxygenService,
    private fb: FormBuilder,private sub :SubdivisionService,private router:Router
    ) { }
  idOxygen:string;
  addOxygenForm: FormGroup;
  regions:string[];
  ville:string[];
  finalOxygen:Oxygen;
  createForm() {
    this.addOxygenForm = this.fb.group({
    
      telnum:  new FormControl(this.data.tel,[Validators.required]),
     
      villa: new FormControl(),
      region: new FormControl([Validators.required]),
      capacite: new FormControl(this.data.capacite,  [Validators.required]),
      qte:this.data.quantite,
      modele:this.data.modele,
      prix:this.data.prix
    
    });
  }

  ngOnInit(): void {
    this.finalOxygen=new Oxygen();
    this.regions=this.sub.region;

    this.idOxygen = this.route.snapshot.paramMap.get("id")
    console.log(this.idOxygen)
    this.oxygenService.getOneOxygen(this.idOxygen).subscribe(res=>{

      console.log(res)
      //@ts-ignore
      this.data=res.doc
  
      this.ville=this.sub.ville_tunisie[this.data.region];
      console.log(this.data.region)
      this.createForm();

    },err=>{

      console.log(err)
    })

  }


  onChange(e){
    console.log(e)

      this.ville=this.sub.ville_tunisie[e];
      this.addOxygenForm.value.villa=null;
    }
    onSubmit() {
      
      if(typeof(this.addOxygenForm.value.region)=="object"){
        this.addOxygenForm.value.region=this.data.region
      }
      if(typeof(this.addOxygenForm.value.villa)=="object"){
        if(  this.addOxygenForm.value.region==this.data.region){
          this.addOxygenForm.value.villa=this.data.ville

        }else{
          this.addOxygenForm.value.villa=this.sub.ville_tunisie[this.addOxygenForm.value.region][0]

        }

    
      }


      console.log(this.addOxygenForm.value);

      this.finalOxygen.capacite=this.addOxygenForm.value.capacite
      this.finalOxygen.modele=this.addOxygenForm.value.modele
      this.finalOxygen.prix=this.addOxygenForm.value.prix
      this.finalOxygen.quantite=this.addOxygenForm.value.qte  
      this.finalOxygen.region=this.addOxygenForm.value.region
      this.finalOxygen.tel=this.addOxygenForm.value.telnum
      this.finalOxygen.ville=this.addOxygenForm.value.villa

      this.oxygenService.updateOxygen(this.idOxygen,this.finalOxygen).subscribe(res=>{

        console.log(res)
        this.router.navigate(['/myposts']);
        
      },err=>{
        console.log(err)
      })
      
    }

}

