import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationformComponent } from './registrationform/registrationform.component';
import { ProfileCompanyComponent } from './profile-company/profile-company.component';
import { MainpageComponent } from './profile-company/mainpage/mainpage.component';
import { VisimisiComponent } from './profile-company/visimisi/visimisi.component';
import { AlamatComponent } from './profile-company/alamat/alamat.component';
import { ProductComponent } from './profile-company/product/product.component';
import { KomentarComponent } from './profile-company/komentar/komentar.component';
import { AboutusComponent } from './profile-company/aboutus/aboutus.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationformComponent },
  { path: 'profile-company',
    component:ProfileCompanyComponent,
    children:[
      {path: 'mainpage', component:MainpageComponent},
      {path: 'visimisi', component:VisimisiComponent},
      {path: 'alamat', component:AlamatComponent},
      {path: 'product', component:ProductComponent},
      {path: 'komentar', component:KomentarComponent},
      {path: 'aboutus', component:AboutusComponent},
      {path: '', redirectTo: 'mainpage', pathMatch:'full'},

    ]
  },
  
  { path: '', redirectTo: '/registration', pathMatch: 'full' },
  { path:'**', redirectTo: '/profile-company'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
