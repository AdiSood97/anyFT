import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class UserService {
  public readonly apiUrl = environment.BASE_API_URL + '/user';

  constructor(private _HTTP: HttpClient, public sanitizer: DomSanitizer) {
    // set token if saved in local storage
}

  getUserArtwork(userid: String) {
    console.log('inside user.service')
    return this._HTTP.get<any>(`${this.apiUrl}/get-artwork/${userid}`).pipe(
        map((response: Response) => {
          return response;
        })
      );
  }
  
  getUsers(){
    return this._HTTP.get<any>(`${this.apiUrl}/get-users`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  

}


