import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['',Validators.compose([Validators.required, Validators.email])],
    password: ['',Validators.required]
  });
  errors:any={
    message:""
  }

  constructor(private fb: FormBuilder,private api:ApiService, private _router: Router) { }

  ngOnInit() {
  }

  private onSubmit(){
    
    let body = {
      username:this.loginForm.value.email,
      password:this.loginForm.value.password
    }
    console.log(body);

      this.api.login(body).subscribe((result:any)=>{
        console.log(result.data);
        localStorage.setItem('token',result.data.token)
        this._router.navigate(['/reimburse']);

      })
      // this.errors.message="Incorrect Username & Password !"
  }

}
