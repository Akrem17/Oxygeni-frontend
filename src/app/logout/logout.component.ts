import { Component, OnInit } from '@angular/core';
import { AthService } from '../shared/service/ath.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private auth:AthService) {
this.auth.logout();

   }

  ngOnInit(): void {
  }

}
