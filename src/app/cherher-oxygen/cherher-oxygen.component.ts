import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OxygenService } from '../shared/service/oxygen.service';
import { SubdivisionService } from '../shared/service/subdivision.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cherher-oxygen',
  templateUrl: './cherher-oxygen.component.html',
  styleUrls: ['./cherher-oxygen.component.css']
})
export class CherherOxygenComponent implements OnInit {
  OxygenForm: FormGroup;
  regions:string[];
  ville:string[];
  showSpinner:boolean;
  constructor(private fb: FormBuilder,private sub :SubdivisionService,
    private oxygenservice:OxygenService,private router: Router,
  ) { 
    this.createForm();

  }

  ngOnInit(): void {
    this.regions=this.sub.region;
    console.log(this.regions)
  }

  createForm() {
    this.OxygenForm = this.fb.group({
      villa: new FormControl('إختار المعتمدية'),
      region: new FormControl('إختار الولاية'),
     
    });
  }
  onSubmit() {console.log(this.OxygenForm.value)
    if(this.OxygenForm.value.region=="إختار الولاية" && this.OxygenForm.value.villa=="إختار المعتمدية"){
      Swal.fire({
        title: 'خطأ!',
        text: 'أختار بلاصة ',
        icon: 'error',
        confirmButtonText: 'Cool'
      })

    }
    else if(this.OxygenForm.value.region!="إختار الولاية" && this.OxygenForm.value.villa=="إختار المعتمدية"){

      this.showSpinner = true;
      this.oxygenservice.getOxygenByRegion(this.OxygenForm.value.region).subscribe(res=>{
        console.log(res)
        this.router.navigate(['/list',this.OxygenForm.value.region,this.OxygenForm.value.villa]);
            },(err=>{
              this.showSpinner = false;
              console.log(err);
                    Swal.fire({
                      title: 'خطأ!',
                      text: err,
                      icon: 'error',
                      confirmButtonText: 'Cool'
                    })
            }))
    }
    else{

      this.showSpinner = true;
    this.oxygenservice.getOxygenByRegionAndVille(this.OxygenForm.value.region,this.OxygenForm.value.villa).subscribe(res=>{
      console.log(res)
      this.router.navigate(['/list',this.OxygenForm.value.region,this.OxygenForm.value.villa]);
    },(err=>{
      this.showSpinner = false;
      console.log(err);
      Swal.fire({
        title: 'خطأ!',
        text: err,
        icon: 'error',
        confirmButtonText: 'Cool'
      })

    }))
  }
  }

  onChange(e){
    console.log(e)

      this.ville=this.sub.ville_tunisie[e];
    }
  
}
