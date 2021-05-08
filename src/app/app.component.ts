import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AthService } from './shared/service/ath.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'oxygenCharity';
  constructor(public  auth:AthService,private router:Router){

  }

 
}
