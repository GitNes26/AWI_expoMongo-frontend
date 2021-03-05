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
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  formG: FormGroup
  productsArray:Product[] = []
  commentsArray:Comment[] = []
  usersArray:User[] = []
  array = []
  product:Product

  constructor(private formBuilder:FormBuilder, private commentService:CommentService, private productService:ProductService,
    private userService:AuthService, private activatedRoute:ActivatedRoute) {
    this.buildForm()
    this.show()
    this.getProduct()
   }

  ngOnInit(): void {
  }

  private buildForm() {
    this.formG = this.formBuilder.group({
      comment: ['',[Validators.required, Validators.maxLength(100)]],
      // product: ['',[Validators.required]],
      // user: ['',[Validators.required]],
    })
  }

  ValidateErrorTextField(tf:string){
    return (this.formG.get(tf).errors && this.formG.get(tf).touched)
  }

  ValidateTextField(tf:string){
    return (this.formG.get(tf).invalid && this.formG.get(tf).touched)
  }

  userSelected: User = new User()
  productSelected: Product = new Product()
  commentSelected: Comment = new Comment()

  createOrUpdate(){
    if (this.formG.valid){ // verifica las validaciones de los campos
      // if (this.commentSelected.id == 0) { // agregar commento Nuevo
        // this.commentSelected.user = 3
        this.commentSelected.product_id = this.activatedRoute.snapshot.params.id
        console.log('aqui estoy',this.commentSelected);
         //this.formG.get('product').value //this.productSelected.id
        this.commentSelected.comment = this.formG.get('comment').value
        this.commentService.add(this.commentSelected).subscribe(() => {
          timeMessage('Registrando Commento...',500).then(() => {
            successDialog('Commento registrado')
            // this.showComments(this.productSelected)
            // this.showCo()
            this.commentsArray
            this.show()

          })
        })        
      // }else { // editar comment seleccionado
      //   this.commentService.update(this.commentSelected).subscribe((o:any) => {
      //     successDialog('Comentario Actualizado')
      //   }, error => {
      //     console.log(error)
      //     errorMessage('Ocurrio algun problema, intenta de nuevo')
      //   })
      //   errorMessage('Ocurrio algun problema, intenta de nuevo')
      // }
      this.buildForm()
      this.commentSelected = new Comment()
    } else { // si no ha sido tocado ningun campo, marcar como tocado para arrojar errores
      this.formG.markAllAsTouched()
    }
  }

  show(){
    this.commentService.showCommentsByProduct(this.activatedRoute.snapshot.params.id).subscribe((o:any) => {
      this.commentsArray = o
    })
  }

  getProduct(){
    this.productService.getProduct(this.activatedRoute.snapshot.params.id).subscribe((o:any) => {
      this.product = o
      console.log(this.product);

    })
  }

}
