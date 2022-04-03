import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-section',
  templateUrl: './login-section.component.html',
  styleUrls: ['./login-section.component.scss']
})
export class LoginSectionComponent implements OnInit {

  constructor(
    private _FormBuilder: FormBuilder,
    private _Injector: Injector,
    private _Router: Router,
    private _Route: ActivatedRoute
  ) { }

  form: any

  // Redirect URL
  redirectURL: any

  ngOnInit(): void {
    // Initialise the form 
    this.form = this._FormBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  async login() {
    console.log('inside login')
    if (!this.form.valid) {
      return;
    }
    let user = await this.signIn(this.form.value)
    .then((res: any) => {
      let user = res['user']
      let token = res['token']
      // storageService.setLocalData('authToken', JSON.stringify(res['token']))
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('user', JSON.stringify(user))
      console.log('logged in', user, token)
      this.redirectUser()
    })
    
  }

  signIn(userData: any) {
    return new Promise((resolve, reject) => {
      let authService = this._Injector.get(AuthService)
      authService.signIn(userData)
        .then((res: any) => {
          resolve(res)
        })
        .catch((err) => {
          reject({})
        })
    })
  }

  redirectUser() {
    let params = this._Route.snapshot.queryParams
    if (params['redirectURL']) {
      this.redirectURL = params['redirectURL']
    }
    if (this.redirectURL) {
      this._Router.navigateByUrl(this.redirectURL)
        .catch(() => this._Router.navigate(['/authors']))
    } else {
      this._Router.navigate(['/authors'])
    }
  }

}
