import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Form, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators'
import { User } from '../../../Models/user';
import { AuthService } from '../../../Services/auth.service';
import { errorMessage, timeMessage, successDialog } from '../../../Functions/Alerts';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formG:FormGroup
  user:User
  // public token:string

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router:Router) {
    this.buildForm()
    if (localStorage.getItem('myToken') != null){
      console.log('sesion iniciada | Login')
      console.log(localStorage)
      router.initialNavigation()
    }
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.formG = this.formBuilder.group({
      // username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required]],
    });
  }

  ValidateErrorTextField(tf:string){
    return (this.formG.get(tf).errors && this.formG.get(tf).touched)
  }

  ValidateTextField(tf:string){
    return (this.formG.get(tf).invalid && this.formG.get(tf).touched)
  }

  login() {
    // event.preventDefault(); console.log('si entra a save')
    if (this.formG.valid){ // verifica las validaciones de los campos
      // const value = this.formG.value;  console.log(value);
      this.setData()
      this.authService.login(this.user).subscribe((data:any) => {
        timeMessage('Iniciando...', 1500).then(() => {
          successDialog('Bienvenido').then(() => {
            localStorage.setItem("myToken",data.token)
            // localStorage.setItem("username",this.user.username)
            // localStorage.setItem("email",this.user.email)
            console.log('dentro del metodo login de login', localStorage)
            this.router.navigate(['/main'])
          })
        })
      }, error => {
        console.log(error)
        errorMessage('Credenciales incorrectas')
      })
    } else { // si no ha sido tocado ningun campo, marcar como tocado para arrojar errores
      this.formG.markAllAsTouched()
    }
  }

  setData() {
    this.user = {
      id: 0,
      username: '',
      email: this.formG.get('email').value,
      password: this.formG.get('pwd').value,
    }
  }

}
