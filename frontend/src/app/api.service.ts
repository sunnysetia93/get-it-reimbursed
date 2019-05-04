import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BaseURL = 'http://localhost:8080/api/'

  constructor(private http:HttpClient) { }

  getExpenseType(){
    return this.http.get(this.BaseURL+'expense/types');
  }
  getAllExpense(){
    return this.http.get(this.BaseURL+'expense/all');
  }

  getStatusTypes(){
    return this.http.get(this.BaseURL+'expense/reimburseTypes')
  }

  postData(body){
    let data = JSON.stringify(body);

    return this.http.post(this.BaseURL+"expense",body,httpOptions)
  }

  updateExpense(body){
    let token = localStorage.getItem('token');
    httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    })
    return this.http.post(this.BaseURL+"reimburse",JSON.stringify(body),httpOptions)
  }

  login(body){
    let token = localStorage.getItem('token');
    httpOptions.headers.set('Authorization',`Bearer ${token}`);
    return this.http.post(this.BaseURL+"login",JSON.stringify(body),httpOptions)
    
  }

  isAuthenticated(){
    let token = localStorage.getItem('token');

    return token?true:false;
  }


  logout(){
    let token = localStorage.getItem('token');
    httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    })
    return this.http.get(this.BaseURL+'logout',httpOptions);
  }
}
