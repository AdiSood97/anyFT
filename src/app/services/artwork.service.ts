import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {

  private httpWithoutInterceptor: HttpClient

  constructor(private _HTTP: HttpClient, private _HTTP_BACKEND: HttpBackend) { 
    this.httpWithoutInterceptor = new HttpClient(this._HTTP_BACKEND)
  }

  BASE_API_URL = environment.BASE_API_URL + '/artwork'


  getArtwork() {
    return this._HTTP.get(this.BASE_API_URL).toPromise()
  }

  getArtworkById(artworkId: any){
    return this._HTTP.get<any>(`${this.BASE_API_URL}/artwork/${artworkId}`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  
}
