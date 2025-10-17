import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationformComponent } from './registrationform/registrationform.component';
import { ProfileCompanyComponent } from './profile-company/profile-company.component';
import { AboutusComponent } from './profile-company/aboutus/aboutus.component';
import { MainpageComponent } from './profile-company/mainpage/mainpage.component';
import { KomentarComponent } from './profile-company/komentar/komentar.component';
import { AlamatComponent } from './profile-company/alamat/alamat.component';
import { ProductComponent } from './profile-company/product/product.component';
import { VisimisiComponent } from './profile-company/visimisi/visimisi.component';
import { RectangleCalculatorComponent } from './rectangle-calculator/rectangle-calculator.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { TemperatureConverterComponent } from './temperature-converter/temperature-converter.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationformComponent,
    ProfileCompanyComponent,
    AboutusComponent,
    MainpageComponent,
    KomentarComponent,
    AlamatComponent,
    ProductComponent,
    VisimisiComponent,
    RectangleCalculatorComponent,
    ContactListComponent,
    TemperatureConverterComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
