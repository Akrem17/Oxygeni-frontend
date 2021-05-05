import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddOxygenComponent } from './add-oxygen/add-oxygen.component';
import { HomeComponent } from './home/home.component';
import { CherherOxygenComponent } from './cherher-oxygen/cherher-oxygen.component';
import { OxygenListComponent } from './oxygen-list/oxygen-list.component';
export const routes: Routes = [
  { path: 'ajouter',  component: AddOxygenComponent },
  { path: 'chercher',  component:CherherOxygenComponent },
  { path: 'list/:region/:ville',  component:OxygenListComponent },
  { path: '',  component: HomeComponent }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)

  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }
