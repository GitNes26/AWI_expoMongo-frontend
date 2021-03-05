import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { Product } from '../../Models/product';
import { ProductService } from '../../Services/product.service';
import { timeMessage, successDialog, errorMessage, warningMessage, deleteMessage } from '../../Functions/Alerts';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  formG: FormGroup
  formAddProduct = true

  productsArray:Product[] = []

  constructor(private formBuilder:FormBuilder, private service:ProductService, private router:Router) {
    this.buildForm()
    this.show()
   }

  ngOnInit(): void {
  }

  private buildForm() {
    this.formG = this.formBuilder.group({
      product: ['',[Validators.required]],
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
      if (this.selected.id == 0) { // agregar producto Nuevo
        // this.selected.user = 1
        this.service.add(this.selected).subscribe(() => {
          timeMessage('Registrando Producto...',500).then(() => {
            successDialog('Producto registrado')
            this.show()
          })
        })        
      }else { // editar producto seleccionado
        this.service.update(this.selected).subscribe((o:any) => {
          successDialog('Producto actualizado')
        }, error => {
          console.log(error)
          errorMessage('Producto ya existente')
        })
        errorMessage('Producto ya existente')
      }
      this.buildForm()
      this.selected = new Product()
    } else { // si no ha sido tocado ningun campo, marcar como tocado para arrojar errores
      this.formG.markAllAsTouched()
    }
  }

  show(){    
    this.service.myProducts().subscribe((o:any) => {
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
  }

}
