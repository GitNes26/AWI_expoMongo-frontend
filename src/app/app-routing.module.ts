import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { MainComponent } from './Components/main/main.component';
import { PageNoFoundComponent } from './Components/page-no-found/page-no-found.component';
import { ProductComponent } from './Components/product/product.component';
import { MyProductsComponent } from './Components/my-products/my-products.component';
import { MyCommentsComponent } from './Components/my-comments/my-comments.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'main', component: MainComponent},
  {path:'product/:id', component:ProductComponent},
  {path:'myProducts', component:MyProductsComponent},
  {path:'myComments', component:MyCommentsComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full' }, // redireccion por default a INDEX
  {path: '**', component: PageNoFoundComponent }, // pagina que se muestra si no encuentra ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
