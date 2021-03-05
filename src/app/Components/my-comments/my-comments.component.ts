import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Comment } from "../../Models/comment";
import { User } from "../../Models/user";
import { Product } from '../../Models/product';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { timeMessage, successDialog, errorMessage, warningMessage, deleteMessage } from '../../Functions/Alerts';
import { CommentService } from '../../Services/comment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-my-comments',
  templateUrl: './my-comments.component.html',
  styleUrls: ['./my-comments.component.css']
})
export class MyCommentsComponent implements OnInit {

  formG: FormGroup
  formAddComment = true

  commentsArray:Comment[] = []

  constructor(private formBuilder:FormBuilder, private service:CommentService, private authService:AuthService, 
    private activeRouter:ActivatedRoute) {
    this.buildForm()
    this.show()
   }

  ngOnInit(): void {
  }

  private buildForm() {
    this.formG = this.formBuilder.group({
      comment: ['',[Validators.required, Validators.maxLength(100)]],
      // user: ['',[Validators.required]],
      // product: ['',[Validators.required]],
    })
  }

  ValidateErrorTextField(tf:string){
    return (this.formG.get(tf).errors && this.formG.get(tf).touched)
  }

  ValidateTextField(tf:string){
    return (this.formG.get(tf).invalid && this.formG.get(tf).touched)
  }

  selected: Comment = new Comment()

  createOrUpdate(){
    if (this.formG.valid){ // verifica las validaciones de los campos
      // if (this.selected.id == 0) { // agregar commento Nuevo
        this.selected.product_id = this.activeRouter.snapshot.params.id
        console.log('metodo crear comentario | '+this.selected.comment,+this.selected.product_id,+this.selected.user_id)
        this.service.add(this.selected).subscribe(() => {
          timeMessage('Registrando Commento...',500).then(() => {
            successDialog('Commento registrado')
            console.log('comentario creado | '+localStorage)
            this.show()
          })
        })
        
      // }else { // editar comment seleccionado
      //   this.service.update(this.selected).subscribe((o:any) => {
      //     successDialog('Commento actualizado')
      //   }, error => {
      //     console.log(error)
      //     errorMessage('Commento ya existente')
      //   })
      // }
      this.buildForm()
      this.selected = new Comment()
    } else { // si no ha sido tocado ningun campo, marcar como tocado para arrojar errores
      this.formG.markAllAsTouched()
    }
  }

  show(){
    this.service.myComments().subscribe((o:any) => {
      this.commentsArray = o
    })
  }

  update(comment:Comment){
    this.selected = comment
  }

  delete(comment:Comment){
    successDialog('Comentario Eliminado').then(() => {
      this.service.delete(comment.id).subscribe(() => {
        this.show()
      })
    })
  }

}
