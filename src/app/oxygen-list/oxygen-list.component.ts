import { Component, OnInit } from '@angular/core';
import { OxygenService } from '../shared/service/oxygen.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-oxygen-list',
  templateUrl: './oxygen-list.component.html',
  styleUrls: ['./oxygen-list.component.css']
})
export class OxygenListComponent implements OnInit {
  region:string;
  ville:string;
   sub: any;
   capacite:string;
   quantite:string;
   model:string;
   contact:string;
   data:any[];
  constructor(private router :Router,private route: ActivatedRoute,private oxygenservice : OxygenService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.region = params['region'];
      this.ville = params['ville'];

      this.oxygenservice.getOxygenByRegionAndVille(this.region,this.ville).subscribe(res=>{
        this.data=res.data.docs
        console.log(this.data)

      })
   });
  
  }

}
