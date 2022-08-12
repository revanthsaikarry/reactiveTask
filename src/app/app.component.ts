import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reactiveTask';
  registartionForm!: FormGroup;
  idNumber:number = 0;
  usersArray:any[] = [];
  notify: boolean = false;
  editData: boolean = false;
  userToEdit: any;

  constructor(){
    console.log('constructor works');
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.registartionForm = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      DOB: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    })
    this.userToEdit = {};
    this.getUserData();
  }

  getUserData(){
    if(localStorage.getItem("userData")){
      this.usersArray = JSON.parse(localStorage.getItem("userData")!);
    }
  }

  changeDateFormatForUi(date:any){
    console.log(date);  
    const dateSendingToServer = new DatePipe('en-US').transform(date, 'yyyy-MM-dd');
    console.log(dateSendingToServer);
    return String(dateSendingToServer);
  }

  clearForm(){
    this.editData = false;
    this.ngOnInit();
  }

  showMsg(){
    this.notify = true;
    setTimeout(() => {
      this.notify = false;
    }, 5000)
  }

  setGender(event:any){
    console.log(event.target.value);
    this.registartionForm.controls["gender"].setValue(event.target.value);
  }

  editUser(user:any){
    console.log(user);
    this.editData = true;
    this.userToEdit = user;
    this.registartionForm.controls["firstName"].setValue(user.firstName);
    this.registartionForm.controls["lastName"].setValue(user.lastName);
    this.registartionForm.controls["email"].setValue(user.email);
    this.registartionForm.controls["phone"].setValue(user.phone);
    this.registartionForm.controls["gender"].setValue(user.gender);
    this.registartionForm.controls["company"].setValue(user.company);
    this.registartionForm.controls["DOB"].setValue(user.DOB);
    this.registartionForm.controls["password"].setValue(user.password);
    this.registartionForm.controls["confirmPassword"].setValue(user.confirmPassword);
  }

  updateUser(){
    var ind:number;
    this.usersArray.forEach((element:any, i:number) => {
      if(this.userToEdit.id == element.id){
        ind = i;
        this.usersArray[i] = this.registartionForm.value;
        alert("User updated...")
      }
    });
    localStorage.setItem("userData", JSON.stringify(this.usersArray))
    this.clearForm();
  }

  deleteUser(user:any){
    console.log(user);
    var ind:number;
    this.usersArray.forEach((element:any, i:number) => {
      if(user.id == element.id){
        ind = i;
        this.usersArray.splice(ind, 1);
        alert("User deleted...")
      }
    });
    localStorage.setItem("userData", JSON.stringify(this.usersArray))
    this.clearForm();
  }

  addUser(){
    this.registartionForm.markAllAsTouched();
    if(this.registartionForm.valid){
    if(localStorage.getItem("userData")){
      this.usersArray = JSON.parse(localStorage.getItem("userData")!);
      let count = 0;
      this.usersArray.forEach((element:any) => {
        if(element.id === this.registartionForm.value.id){
          this.registartionForm.value.id = JSON.parse(this.registartionForm.value.id) + 1;
        }
      });
      console.log(this.registartionForm.value);
      this.usersArray.push(this.registartionForm.value);
      localStorage.setItem("userData", JSON.stringify(this.usersArray));
      this.showMsg();
      this.clearForm();
    }else{
      this.usersArray.push(this.registartionForm.value);
      localStorage.setItem("userData", JSON.stringify(this.usersArray));
      this.showMsg();
      this.clearForm();
    }
  }
  }
}
