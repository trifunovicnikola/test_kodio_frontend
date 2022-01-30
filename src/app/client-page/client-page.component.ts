import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment'
import { ServisService } from '../servis.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css']
})
export class ClientPageComponent implements OnInit {

  constructor(private http:HttpClient, private fb:FormBuilder, private route: ActivatedRoute, private router:Router) { }

  change_status:any = 0;
  projects:any;
  user_name = localStorage.getItem('name');
  user_role = localStorage.getItem('role');
  input_project = this.fb.group({
    title:'',
    description:'',
    deadline:'',
    status:'',
    user:localStorage.getItem('id')
  })

  changeStatus=this.fb.group({
    status:''
  })



  ngOnInit(): void {
    if(localStorage.getItem('id')!= this.route.snapshot.params['id'])
    {
      this.router.navigate(['../../login']);
    }
    this.http.get(environment.baseUrl+'userProjects/' + localStorage.getItem('id'))
    .subscribe(res=>
      {
        console.log(res);
        this.projects = res;

      })

  }


  add()
  {
    this.http.post(environment.baseUrl + "addProject", this.input_project.getRawValue())
    .subscribe(res=>{
      this.projects = res;
    })
  }

  change()
  {

    this.change_status= 1;
  }

  save(id:any)
  {
    this.http.post(environment.baseUrl+'editProject/'+ id, this.changeStatus.getRawValue()).subscribe(res=>
      {
        console.log("uspjesno ");

      })

  }

  delete(id:any)
  {
    this.http.get(environment.baseUrl+'deleteProject/'+id).subscribe(res=>
      {
        console.log('obrisan');

      })
  }

  logout()
  {
    localStorage.clear();

  }

}
