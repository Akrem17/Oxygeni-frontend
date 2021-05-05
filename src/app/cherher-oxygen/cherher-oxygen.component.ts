import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OxygenService } from '../shared/service/oxygen.service';
import { SubdivisionService } from '../shared/service/subdivision.service';

@Component({
  selector: 'app-cherher-oxygen',
  templateUrl: './cherher-oxygen.component.html',
  styleUrls: ['./cherher-oxygen.component.css']
})
export class CherherOxygenComponent implements OnInit {
  OxygenForm: FormGroup;
  regions:string[];
  ville:string[];
  constructor(private fb: FormBuilder,private sub :SubdivisionService,
    private oxygenservice:OxygenService,private router: Router) { 
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
    
    this.oxygenservice.getOxygenByRegionAndVille(this.OxygenForm.value.region,this.OxygenForm.value.villa).subscribe(res=>{
      console.log(res)
      this.router.navigate(['/list',this.OxygenForm.value.region,this.OxygenForm.value.villa]);
    })
  }

  onChange(e){
    console.log(e)

      this.ville=this.sub.ville_tunisie[e];
    }
  
}
