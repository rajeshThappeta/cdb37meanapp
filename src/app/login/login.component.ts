import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(formRef){

    let userCredObj=formRef.value;
    
    //if user
    if(userCredObj.usertype=="user"){
      this.us.loginUser(userCredObj).subscribe(
        res=>{
         
          if(res["message"]=="success"){

              //store token and username in local storage
              localStorage.setItem("token",res["signedToken"])
              localStorage.setItem("username",res["username"])

              //navigate to user dashboard
              this.router.navigateByUrl("/userdashboard")

          }
          else{
            alert(res["message"])
          }

        },
        err=>{
          alert("Something went wrong in user login")
          console.log(err)
        }
      )

    }

       //if admin
       if(userCredObj.usertype=="admin"){}

  }
}
