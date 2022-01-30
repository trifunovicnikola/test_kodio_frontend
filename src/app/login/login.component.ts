import { Router } from '@angular/router';
import { ServisService } from './../servis.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private http:HttpClient, private servis:ServisService, private router:Router) { }

  login_register= this.servis.login_register;
  dataLogged:any;
  user:any;

  ngOnInit(): void {
  }

  input_login = this.fb.group({
    email:'',
    password:''
  })


  login()
  {
    this.http.post(environment.baseUrl+'login', this.input_login.getRawValue())
    .subscribe(res=>
      {
        this.user= res;
        console.log(this.user.user.id);

        localStorage.setItem('name', this.user.user.name);
        localStorage.setItem('id', this.user.user.id);
        localStorage.setItem('role', this.user.user.role);
        if(this.user.user.role==1)
        {
          this.router.navigate(['../admin'])
        }else{
          this.router.navigate(['../client/'+ this.user.user.id]);
        }

        console.log('..client/' + this.user.user.id);


      })

  }

  register()
  {
    this.login_register=1;
    this.servis.login_register = this.login_register;
  }

}
