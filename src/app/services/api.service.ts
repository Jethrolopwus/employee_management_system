import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  postUsers(data:any){
    // console.log('data',data)
    return this.http.post<any>("http://localhost:3000/usersList/",data);
    
  }
  getUsers(){
    return this.http.get<any>("http://localhost:3000/usersList/");
  }
}
