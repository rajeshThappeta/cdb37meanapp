import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //inject HttpClient obj
  constructor(private hc:HttpClient) { }


  //user registration
  createUser(formData):Observable<any>{

   return   this.hc.post("/user/register",formData)
  }
  
  loginUser(userCredObj):Observable<any>{
    return   this.hc.post("/user/login",userCredObj)
 
  }

  getUser(username):Observable<any>{
    return this.hc.get("/user/getuser/"+username)
  }
}
