import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { User } from '../../../Models/user';
import { AuthService } from '../../../Services/auth.service';
import { timeMessage, successDialog, errorMessage } from '../../../Functions/Alerts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formG:FormGroup;
  user:User;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router:Router) {
    this.buildForm()
   }

  ngOnInit(): void {
  }

  private buildForm() {
    this.formG = this.formBuilder.group({
      // name: ['', [Validators.required]],
      // lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      pwd: ['', [Validators.required, Validators.minLength(3)]],
      pwd2: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  register(event: Event) {
    event.preventDefault()
    if (this.formG.valid){ // verifica las validaciones de los campos
      // const data = this.formG.value; // console.log(data);
      this.setData()
      this.authService.register(this.user).subscribe((data:any) => {
        timeMessage('Registrando...',1500).then(() => {
          successDialog('Registro Completado')
          this.router.navigate(['/login'])
        })
      }, error => {
        errorMessage('Ha ocurrido un error')
      })
      
    } else { // si no ha sido tocado ningun campo, marcar como tocado para arrojar errores
      this.formG.markAllAsTouched()
    }
  }

  setData() {
    this.user = {
      id: 0,
      username: this.formG.get('username').value,
      password: this.formG.get('pwd').value,
      email: this.formG.get('email').value
    }
  }

  ValidateErrorTextField(tf:string){
    return (this.formG.get(tf).errors && this.formG.get(tf).touched)
  }

  ValidateTextField(tf:string){
    return (this.formG.get(tf).invalid && this.formG.get(tf).touched)
  }
  get password2Validate(){
    const pass = this.formG.get('pwd').value
    const pass2 = this.formG.get('pwd2').value

    return pass === pass2 ? false : true
  }

}
