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

  postData(body){
    let data = JSON.stringify(body);

    return this.http.post(this.BaseURL+"expense",body,httpOptions)
  }
}
