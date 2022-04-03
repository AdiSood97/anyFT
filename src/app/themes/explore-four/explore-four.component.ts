import { Component,Injector, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ArtworkService } from '../../services/artwork.service';

@Component({
  selector: 'app-explore-four',
  templateUrl: './explore-four.component.html',
  styleUrls: ['./explore-four.component.scss']
})
export class ExploreFourComponent implements OnInit {
  
  public artwork: any

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    // private authService: AuthService,
    private _Injector: Injector,
    ) { }

  ngOnInit(): void {
    console.log('heyart')
    this.getArtwork()
  }

  getArtwork(){
    return new Promise((resolve, reject) => {
      let artworkService = this._Injector.get(ArtworkService)
      artworkService.getArtwork()
        .then((res: any) => {
          console.log('res',res)
          this.artwork = res.artwork
          resolve(res)
        })
        .catch((err) => {
          reject({})
        })
    })
  }

}
