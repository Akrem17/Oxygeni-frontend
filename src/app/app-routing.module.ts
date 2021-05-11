import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddOxygenComponent } from './add-oxygen/add-oxygen.component';
import { HomeComponent } from './home/home.component';
import { CherherOxygenComponent } from './cherher-oxygen/cherher-oxygen.component';
import { OxygenListComponent } from './oxygen-list/oxygen-list.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { SingupComponent } from './singup/singup.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UpdatePostComponent } from './user-posts/update-post/update-post.component';
import { LogoutComponent } from './logout/logout.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
export const routes: Routes = [
  { path: 'ajouter',  component: AddOxygenComponent,canActivate:[AuthGuard] },
  { path: 'chercher',  component:CherherOxygenComponent },
  { path: 'contactus',  component:ContactUsComponent },
  { path: 'login',  component:LoginComponent },
  { path: 'signup',  component:SingupComponent },
  { path: 'myposts',  component:UserPostsComponent },
  { path: 'logout',  component:LogoutComponent },
  { path: 'forgetpassword',  component:ForgetpasswordComponent },
  { path: 'forgetpassword/:id/:token',  component:ResetpasswordComponent },

  { path: 'modifier/:id',  component:UpdatePostComponent },

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
