import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpRef = new FormGroup({
    emailid:new FormControl(),
    password:new FormControl(),
    typeOfUser:new FormControl()
  });
  msg:string=""
  constructor(public ls:LoginService,public router:Router,private location: Location) { }
  user:string ="";
  ngOnInit(): void {

  }

  signUp(){
    let signup = this.signUpRef.value;
    console.log(signup);    
    this.ls.signUp(signup).subscribe({
      next:(result:any)=>{
        if(result=="Account created successfully"){
            this.user="Account created successfully! Redirecting to Login Page...";
            timer(5000).subscribe(x => { this.router.navigate(["login"]) })
            
        }
        else {
            this.msg=result;
        }
      },
      error:(error:any)=>console.log(error),
      complete:()=>console.log("completed")
    })
  }
  goBack() {
    // window.history.back();
    this.location.back();

    console.log( 'goBack()...' );
  }

}
