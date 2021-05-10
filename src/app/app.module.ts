import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddOxygenComponent } from './add-oxygen/add-oxygen.component';
import { AppRoutingModule, routes } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CherherOxygenComponent } from './cherher-oxygen/cherher-oxygen.component';
import { OxygenListComponent } from './oxygen-list/oxygen-list.component';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ContactUsComponent } from './contact-us/contact-us.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from './oxygen-list/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { UserService } from './shared/service/user.service';
import { AthService } from './shared/service/ath.service';
import { OxygenService } from './shared/service/oxygen.service';
import { AuthInterceptor } from './shared/service/auth-interceptor';
import { RouterModule } from '@angular/router';
import { SingupComponent } from './singup/singup.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UpdatePostComponent } from './user-posts/update-post/update-post.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    AddOxygenComponent,
    HomeComponent,
    CherherOxygenComponent,
    OxygenListComponent,
    ContactUsComponent,
    DialogOverviewExampleDialogComponent,
    LoginComponent,
    SingupComponent,
    UserPostsComponent,
    UpdatePostComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule ,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule ,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatDialogModule,
    RouterModule,
    FormsModule        ],
  providers: [AuthGuard,UserService,AthService,OxygenService,
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},

  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
