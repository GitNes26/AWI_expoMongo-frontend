import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Comment } from '../../Models/comment';
import { User } from "../../Models/user";
import { Product } from '../../Models/product';
import { timeMessage, successDialog, errorMessage, warningMessage, deleteMessage } from '../../Functions/Alerts';
import { CommentService } from '../../Services/comment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  formG: FormGroup
  formAddProduct = true
  public user:User

  productsArray:Product[] = []

  constructor(private formBuilder:FormBuilder, private service:ProductService, private authService:AuthService, private router:Router) {
    this.buildForm()
    this.show()
    this.getUser()
   }

  ngOnInit(): void {
  }

  private buildForm() {
    this.formG = this.formBuilder.group({
      title: ['',[Validators.required]],
      description: ['',[Validators.required]],
    })
  }

  ValidateErrorTextField(tf:string){
    return (this.formG.get(tf).errors && this.formG.get(tf).touched)
  }

  ValidateTextField(tf:string){
    return (this.formG.get(tf).invalid && this.formG.get(tf).touched)
  }

  selected: Product = new Product()

  createOrUpdate(){
    console.log(localStorage)
    if (this.formG.valid){ // verifica las validaciones de los campos      
      console.log('Campos validados');
      // this.selected.user_id = 1
        this.service.add(this.selected).subscribe(() => {
          timeMessage('Registrando Producto...',500).then(() => {
            successDialog('Producto registrado')
            this.show()
          })
        })        
      // else { // editar producto seleccionado
      //   this.service.update(this.selected).subscribe((o:any) => {
      //     successDialog('Producto actualizado')
      //   }, error => {
      //     console.log(error)
      //     errorMessage('Producto ya existente')
      //   })
      //   errorMessage('Producto ya existente')
      // }
      this.buildForm()
      this.selected = new Product()
    } else { // si no ha sido tocado ningun campo, marcar como tocado para arrojar errores
      this.formG.markAllAsTouched()
    }
  }

  show(){
    console.log("en el sjow");

    this.service.show().subscribe((o:any) => {
      this.productsArray = o
    })
  }

  update(product:Product){
    this.selected = product
  }

  delete(product:Product){
    successDialog('El producto "'+product.title+'" ha sido eliminado').then(() => {
      this.service.delete(product.id).subscribe(() => {
        this.show()
      })
    })
    // deleteMessage(product.product).then(() => {
    //   if (Swal.clickConfirm){
    //     this.service.delete(product.id).subscribe(() => {
    //       this.show()
    //     })
    //   }
    // })
  }

  getUser(){
    this.authService.getUser().subscribe((o:any) => {
      this.user = o
    })
  }
}
