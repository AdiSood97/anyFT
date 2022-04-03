import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';
import { local } from 'web3modal';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.scss']
})
export class HeaderSectionComponent implements OnInit {

  constructor(
    private contractService: ContractService,
    ) { }
  public connected: any;
  public accountId: any;

  ngOnInit(): void {
    this.getAccount()
    this.connected = localStorage.getItem('WalletConnected')
  }


  connectAccount() {
    this.contractService.connectAccount()
    console.log('emmit')
    localStorage.setItem('WalletConnected', 'true')
  }

  async getAccount() {
    this.accountId = await this.contractService.getAccount().then(data =>{
      console.log(data)
      return data
    } )

    if(this.accountId){
      console.log('true')
      this.connected = true;
    }
  }
}
