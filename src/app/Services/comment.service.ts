import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '../Models/Comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  apiURL = environment.apiURL
  header = new HttpHeaders({'Type-content': 'aplication/json', 'Authorization': 'Bearer '+localStorage.getItem('myToken')})

  constructor(private http:HttpClient) {
    console.log('servicio comment')
    this.header.append('Authorization', 'Bearer '+ localStorage.getItem('myToken'));
    console.log(this.header, localStorage)
   }

  add(comment:Comment): Observable<any>{
    return this.http.post(`${this.apiURL}comments`, comment, {headers: this.header})
  }

  update(comment:Comment): Observable<any>{
    return this.http.put(`${this.apiURL}comments/`+comment.id, comment, {headers: this.header})
  }

  delete(id:number|string): Observable<any>{
    return this.http.delete(`${this.apiURL}comments/` + id, {headers: this.header})
  }

  show() {
    return this.http.get(`${this.apiURL}comments`, {headers: this.header})
  }

  myComments() {
    return this.http.get(`${this.apiURL}myComments`, {headers: this.header})
  }

  showCommentsByProduct(id:number|string): Observable<any> {
    console.log(id);
    
    return this.http.get(`${this.apiURL}comments/`+ id, {headers: this.header})
  }
}
