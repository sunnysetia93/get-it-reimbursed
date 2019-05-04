import { Component, OnInit } from '@angular/core';
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

  constructor(private fb: FormBuilder,private api:ApiService) { }

  ngOnInit() {
  }

  private onSubmit(){
      console.log(this.loginForm.value);

      let body = {
        username:this.loginForm.value.email,
        password:this.loginForm.value.password
      }

      this.api.login(body).subscribe(data=>{
        console.log(data);
      })
      // this.errors.message="Incorrect Username & Password !"
  }

}
