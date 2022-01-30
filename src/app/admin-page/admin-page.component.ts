import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment'

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private http:HttpClient, private router: Router) { }
  users:any;

  ngOnInit(): void {
    this.http.get(environment.baseUrl+'users')
    .subscribe(res=>
      {
        this.users= res;
        console.log(res);

      })
  }

  projects(id:any)
  {
    this.router.navigate(['../client/'+id]);

  }

  changeRole(id:any)
  {
    console.log(id)
    this.http.get(environment.baseUrl+"edit-user/"+ id).subscribe(res=>
      {
        this.users= res;

      })
  }

  logout()
  {
    localStorage.clear();
    this.router.navigate(['../login']);
  }

}
