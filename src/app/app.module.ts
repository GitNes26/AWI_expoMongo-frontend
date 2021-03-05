import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './Components/menu/menu.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { MainComponent } from './Components/main/main.component';
import { ProductComponent } from './Components/product/product.component';
import { PageNoFoundComponent } from './Components/page-no-found/page-no-found.component';
import { MyProductsComponent } from './Components/my-products/my-products.component';
import { MyCommentsComponent } from './Components/my-comments/my-comments.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    ProductComponent,
    PageNoFoundComponent,
    MyProductsComponent,
    MyCommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
