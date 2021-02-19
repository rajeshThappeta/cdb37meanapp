import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../user.service"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



    file:File;

    incomingfile(event)
      {
      this.file= event.target.files[0];
      }






  //inject user srvice
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(formRef){
    
        let userObj=formRef.value;
    
       let formData=new FormData();

       //adding image and other data to FormData object
       formData.append('photo',this.file,this.file.name);
 
       formData.append("userObj",JSON.stringify(userObj))
     
 

    this.us.createUser(formData).subscribe(
      res=>{
          if(res["message"]=="user existed"){
            alert("Username is already taken.. choose another")

            //clear the fields
            formRef.clear()
          }
          if(res["message"]=="user created"){

            alert("Regsitration success");

            //navigate to login component
            this.router.navigateByUrl("/login")
          }

      },
      err=>{
        alert("Something went wrong in user creation");
        console.log(err)
      }
    )
  }

}
