import { ServisService } from './../servis.service';
import { environment } from './../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder, private http:HttpClient, private servis:ServisService) { }

  login_register=this.servis.login_register;
  ngOnInit(): void {
  }

  input_register = this.fb.group({
    email:'',
    name:'',
    password:'',
    role:1
  })

  register()
  {
    this.http.post(environment.baseUrl+'register', this.input_register.value ).subscribe(res=>
      {
        alert('registrovan');
      })
  }

  login()
  {
    this.login_register=0;
    this.servis.login_register= this.login_register;
  }

}
