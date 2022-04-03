import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ArtworkService } from '../../services/artwork.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  public artworkId : any;
  public artworkData: any;

  constructor(
    public router: Router,
    private artworkService: ArtworkService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.artworkId = this.route.snapshot.paramMap.get("itemid")
    console.log('artwork id', this.artworkId)
  }

  

}
