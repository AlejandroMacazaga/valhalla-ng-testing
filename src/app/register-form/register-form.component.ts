import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RegisterUser } from '../models/register-user';
import { tap } from 'rxjs';
import { ComparePassword } from '../utils/comparepassword';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  

  registerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', Validators.required]
    },
    {
      validator: ComparePassword('password', 'confirmPassword')
    });

  samePassword = true;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder) { }


  onSubmit() {
    console.log(this.registerForm.get('username')!.errors);
    if(this.registerForm.invalid) {
      return;
    }

    let response = this.userService.registerUser(this.registerForm.value as RegisterUser).subscribe(() => {});
    console.log("Response: " + response)
  }
}
