import { Component, OnInit, Output, EventEmitter, Renderer2,ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { ContractService } from 'src/app/services/contract.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalFormComponent } from '../modal/modal-form/modal-form.component';
import { ModalBoxComponent } from "../modal-box/modal-box.component";
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wallet-section',
  templateUrl: './wallet-section.component.html',
  styleUrls: ['./wallet-section.component.scss']
})
export class WalletSectionComponent implements OnInit {

  constructor(
    private contractService: ContractService,
    private router: Router,
    private renderer: Renderer2,
    public toastr: ToastrService
  ) { 
    this.renderer.listen('window', 'click',(e:Event)=>{
      console.log('randomclick')
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
    if( e.target === document.getElementById('modal-close') || e.target === document.getElementById('modalform') || e.target === document.getElementById('close-button') ){
      console.log('target')
    document.getElementById('modalform')?.classList.remove('show')
    }
 });
  }

  ngOnInit(): void {
  }



  async connectAccount() {
    let user: any = await this.contractService.connectAccount()
    console.log(user.status)
    if(user.status === 'exists'){
      console.log('user already exists')
      let temp: any = document.getElementById('modalform')
      console.log(temp)
      temp?.classList.add('show')
       
    }
    else{
      console.log('not exists....new')
      let temp: any = document.getElementById('modalform')
      console.log(temp)
      temp?.classList.add('show')
    }
      

  }

  getAccount() {
    this.contractService.getAccount()
    let accountId = this.contractService.getAccount();
    console.log('account id', accountId)

    console.log('get account',this.contractService.getAccount().then(data => console.log(data)))
  }

  getBalance(){
    this.contractService.balanceOf(this.contractService.getAccount())
    console.log('balance of account is',this.contractService.balanceOf(this.contractService.getAccount()).then(data => console.log(data)) )
  }

  fetchMyNFTs(){
    this.contractService.fetchMyNFTs()
    console.log('nfts in account is',this.contractService.fetchMyNFTs().then(data => console.log(data)) )
  }

  createMarketItem(){
    let price = '0.025'
    this.contractService.approve('0x6CaEFbE1150688fc02b1b9EaC179146265Fa5CEE','8')
    this.contractService.createMarketItem('0xE883BA3D5c631f3F5827D7568fe0f3351c89229d','8', price) 
  }

  async getTokenURI(tokenid: any){
    console.log(tokenid)
    let url: any = await this.contractService.getTokenURI(tokenid).then((data) =>{
      return data.url
      } )
    let tokendata = await fetch(url).then(response => response.json()).then(data =>
      {
    return data
      });
      console.log(tokendata)
    return tokendata
  }


}
