import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;
  token!: string;
  // tokenParam!: Token;
  // isLoading: boolean = false;
  // constructor(private authService: AuthService, private router: Router) {}

  // ngOnInit() {
  //   this.formData = new FormGroup({
  //     userName: new FormControl('admin'),
  //     password: new FormControl('admin'),
  //   });
  //   this.isLoading = false;
  // }

  // onClickSubmit(data: any) {
  //   this.isLoading = false;
  //   this.userName = data.userName;
  //   this.password = data.password;

  //   console.log('Login page: ' + this.userName);
  //   console.log('Login page: ' + this.password);

  //   this.authService
  //     .login(this.userName, this.password)
  //     .subscribe((data: any) => {
  //       // this.isLoading = true;
  //       console.log('Is Login Success: ' + data);

  //       if (data){
  //          this.router.navigate(['/Dashboard']);
  //         }
  //         else{
  //           this.simpleAlert();
  //         }
  //     });
  // }

  formData: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {

    this.formData = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  onClickSubmit() {
    const val = this.formData.value;

    if (val.email && val.password) {

      this.authService.login(val.email, val.password, val.token)
        .subscribe(
          (data: any) => {
            // console.log("User is logged in" + this.email + this.password + this.token);
            // localStorage.setItem("Token", this.token);

            if (data) {
              this.email = data.email;
              this.password = data.password;
              this.token = data.token;
              this.router.navigate(['/Dashboard']);
            }
            else {
              this.simpleAlert();
            }
          }
        );
    }
    if (val.email == '' || val.password == '') {
      this.simpleAlert();
    }
  }

  simpleAlert() {
    console.log("entered simple alert");
    console.log("entered condition simple alert");
    Swal.fire({
      title: 'Invalid Credential',
      text: 'Please, Login with valid Credential !!',
      icon: 'error',
      showCancelButton: false,
      confirmButtonText: 'Okay',
    }).then((data: any) => {
      console.log("entered simple end");
      this.router.navigate(['/login']);
    })
  }
}
