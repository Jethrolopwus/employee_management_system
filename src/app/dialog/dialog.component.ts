import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{
  usersform !: FormGroup;
  actionBtn: string ="save";
  constructor(private formBuilder:FormBuilder, private api : ApiService,
     @Inject(MAT_DIALOG_DATA) public editData : any, private dialogRef: 
     MatDialogRef<DialogComponent>){}
  ngOnInit():void{
    this.usersform = this.formBuilder.group({
      firstName:['', Validators.required],
      gender:['', Validators.required],
      lastName:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
    });
    // console.log(this.editData);
    if(this.editData){
      this.actionBtn = "update";
      this.usersform.controls['firstName'].setValue(this.editData.firstName);
      this.usersform.controls['gender'].setValue(this.editData.gender);
      this.usersform.controls['lastName'].setValue(this.editData.lastName);
      this.usersform.controls['email'].setValue(this.editData.email);
      this.usersform.controls['password'].setValue(this.editData.password);
    }
  }
  addUser(){
    // console.log(this.usersform.value);
    if(!this.editData){
      if(this.usersform.valid){
        this.api.postUsers(this.usersform.value)
        .subscribe({
          next:(res)=>{
            alert("User Added Successfully!")
            this.usersform.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error While Adding User")
          }
        })
      }
    }else{
      this.updateUser()
    }
  }
  updateUser() {
    this.api.updateUser(this.usersform.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert('User updated successfy!');
        this.usersform.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert('error while updating the records')
      }

    })
  }

}
