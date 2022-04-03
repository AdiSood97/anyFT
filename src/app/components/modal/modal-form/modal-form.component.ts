import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthService,
    public router: Router,
    private toastr: ToastrService
  ) { }

  public stage: number = 0;
  signupForm!: FormGroup;
  public formData = new FormData();
  public accountID: any;

  ngOnInit(): void {
    console.log('iiii')
    this.accountID = localStorage.getItem('AccountId')
    console.log('in modal-form', this.accountID)
    this.initializeForm()
  }

  stageNext(){
    console.log('stage', this.stage)
    this.stage = this.stage + 1
  }

  initializeForm(){    
    this.signupForm = this.formBuilder.group({
    user_name: ['', [Validators.required]],
    email: ['', [Validators.email]],
    account_id: this.accountID,
  });}

  submit(){
    console.log('sign',this.signupForm.value)
    for (let data in this.signupForm.value) {
      this.formData.set(data.toString(),this.signupForm.value[data])
    }
    
    return new Promise((resolve, reject) => {
      this.authService.signUp(this.signupForm.value).then((res: any) => {
        sessionStorage.setItem('user', JSON.stringify(res.user))
        resolve(res)
        this.toastr.success('Great', 'Welcome Onboard');
        this.router.navigate(['/'])
      })
      .catch((err) => {
        reject({})
      })
    })
  }

}
