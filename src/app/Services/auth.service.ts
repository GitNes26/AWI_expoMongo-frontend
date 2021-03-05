import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.apiURL
  header = new HttpHeaders({'Type-content':'aplication/json', 'Authorization':'Bearer '+localStorage.getItem('myToken')})

  constructor(private http:HttpClient) {
    console.log('Servicio auth')
    this.header.append('Authorization', 'Bearer '+ localStorage.getItem('myToken'))
    console.log(this.header, localStorage)
  }

  register(user:User): Observable<any>{
    return this.http.post(`${this.apiURL}register`, user)
  }

  login(user:User): Observable<any>{
    const token = this.http.post(`${this.apiURL}login`, user)
    
    return token
  }

  update(user:User): Observable<any>{
    return this.http.put(`${this.apiURL}api/users/`+user.id, user.email, {headers: this.header})
  }

  delete(id:number|string): Observable<any>{
    return this.http.delete(`${this.apiURL}api/users/` + id, {headers: this.header})
  }

  getUser() {
    return this.http.get(`${this.apiURL}perfil`, {headers: this.header})
  }
}