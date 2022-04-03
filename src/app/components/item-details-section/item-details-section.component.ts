import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ArtworkService } from '../../services/artwork.service';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-item-details-section',
  templateUrl: './item-details-section.component.html',
  styleUrls: ['./item-details-section.component.scss']
})
export class ItemDetailsSectionComponent implements OnInit {

  public artworkData: any

  @Input()
  artworkId: any

  constructor(
    public router: Router,
    private artworkService: ArtworkService,
    private contractService: ContractService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getArtworkById(this.artworkId);

  }

  async getArtworkById(artworkId: any) {
    this.artworkService.getArtworkById(artworkId).subscribe(
      (res) => {
        let temp: any = res
        this.artworkData = temp?.artwork
        console.log('artwork data',this.artworkData)    
      },
      (error) => {
        console.log(error, "Error");
      }
    );
  }

  async MintAndBuy(metahash: any){
    let tokenuri = `ipfs.io/ipfs/${metahash}`
    console.log('tokenuri', tokenuri)
    // this.contractService.createToken(tokenuri,this.artworkData.walletID)
    this.contractService.createToken(tokenuri)
  }
  // createMarketItem(){
  //   let price = '0.025'
  //   this.contractService.approve('0x6CaEFbE1150688fc02b1b9EaC179146265Fa5CEE','8')
  //   this.contractService.createMarketItem('0xE883BA3D5c631f3F5827D7568fe0f3351c89229d','8', price) 
  // }

}
