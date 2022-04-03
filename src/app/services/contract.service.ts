import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import Web3 from 'web3'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { Subject } from 'rxjs'
import Authereum from 'authereum'
import  Fortmatic  from 'fortmatic'
import Portis from '@portis/web3'
import Torus from '@toruslabs/torus-embed'
// import DcentProvider from 'dcent-provider'
import { nftMarketContract, nftMarketabi } from '../../nftmarket'
import { NFTContract, NFTabi } from '../../NFT'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContractService {

  BASE_API_URL = environment.BASE_API_URL + '/auths'

  private web3js: any
  private web3: any
  private provider: any
  private accounts: any
  private nftmarket: any
  private NFT: any
  web3Modal

  private accountStatusSource = new Subject<any>()
  accountStatus$ = this.accountStatusSource.asObservable()

  constructor( private _HTTP: HttpClient) {
    const providerOptions = {
      walletconnect: {
        // display: {
        //     name: "Mobile"
        //   },
        package: WalletConnectProvider, // required
        options: {
          infuraId: 'INFURA_ID', // required
        },
      },
      fortmatic: {
        package: Fortmatic,
        options: {
            key: 'FORMATIC_KEY'
        }
      },
      authereum: {
        package: Authereum // required
      },
      // portis: {
      //   package: Portis, // required
      //   options: {
      //     id: "PORTIS_ID" // required
      //   }
      // },
      // torus: {
      //   package: Torus, // required
      // }
    }

    this.web3Modal = new Web3Modal({
      network: 'mainnet', // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: 'rgb(0, 0, 0)',
        main: 'rgb(199, 199, 199)',
        secondary: 'rgb(136, 136, 136)',
        border: 'rgba(195, 195, 195, 0.14)',
        hover: 'rgb(7, 7, 22)',
      },
    })
  }

  async connectAccount() {
    this.web3Modal.clearCachedProvider()
    this.provider = await this.web3Modal.connect() // set provider
    this.web3js = new Web3(this.provider) // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts()
    console.log(this.accounts, 'accounts')
    this.accountStatusSource.next(this.accounts)

    //Check User if it exists
    let checkUser: any = await this._HTTP.post(this.BASE_API_URL + '/start-up', { accountId: this.accounts[0] }).toPromise()
    let user = {
      accountId : this.accounts[0],
      status: checkUser.status
    }

    localStorage.setItem('AccountId', this.accounts[0])
    console.log(user, 'return object')
    return user
  }
  
  async getAccount() {
    this.provider = await this.web3Modal.connect() // set provider
    this.web3js = new Web3(this.provider)
    this.accounts = this.web3js.eth.getAccounts()
    console.log('aa', this.accounts)
    return this.accounts
  }

  //List Token on The MarketPlace -2
  async createMarketItem(nftContract: any, tokenId: any, price: any) {
    this.provider = await this.web3Modal.connect() // set provider
    this.web3js = new Web3(this.provider) // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts()

    this.nftmarket = new this.web3js.eth.Contract(
      nftMarketabi,
      nftMarketContract
    )
    // price = this.web3js.utils.toWei('0.025', 'ether'); 
    price = this.web3js.utils.toWei(price, 'ether')

    const createMarketItem = await this.nftmarket.methods
      .createMarketItem(nftContract, tokenId, price)
      .send({ from: this.accounts[0], value: price})
    return createMarketItem
  }

  async createMarketSale(nftContract: any, itemId: any) {
    this.provider = await this.web3Modal.connect() // set provider
    this.web3js = new Web3(this.provider) // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts()

    this.nftmarket = new this.web3js.eth.contract(
      nftMarketContract,
      nftMarketabi
    )

    const createMarketSale = await this.nftmarket.methods
      .createMarketSale()
      .send({ from: this.accounts[0] })
    return createMarketSale
  }

  //Fetch my NFTs on the marketplace
  async fetchMyNFTs() {
    this.provider = await this.web3Modal.connect() // set provider
    this.web3js = new Web3(this.provider) // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts()

    this.nftmarket = new this.web3js.eth.Contract(
      nftMarketabi,
      nftMarketContract
      
    )

    // let try1 = await this.nftmarket.methods.userOwnedTokens(this.accounts[0])

    // this.NFT = new this.web3js.eth.Contract(NFTabi,NFTContract)
    // let try2 = await this.nftmarket.methods.fetchMyNFTs().call();

    // console.log('this shit',try2)

    const fetchMyNFTs = await this.nftmarket.methods
      .fetchMyNFTs()
      .call()
    return fetchMyNFTs
  }

  async fetchMarketItems() {
    this.provider = await this.web3Modal.connect() // set provider
    this.web3js = new Web3(this.provider) // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts()

    this.nftmarket = new this.web3js.eth.Contract(
      nftMarketabi,
      nftMarketContract
    )

    const fetchMarketItems = await this.nftmarket.methods
      .fetchMarketItems()
      .call({ from: this.accounts[0] })
    return fetchMarketItems
  }

  //Create Token -1
  async createToken(tokenURI: any) {
    console.log('create token', tokenURI)
    this.provider = await this.web3Modal.connect() // set provider
    this.web3js = new Web3(this.provider) // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts()

    this.NFT = new this.web3js.eth.Contract(NFTabi,NFTContract)

    const mintNFT = await this.NFT.methods
      .createToken(tokenURI)
      .send({ from: this.accounts[0] })
    console.log('mingnt', mintNFT)

    const receipt = await this.web3js.eth.getTransactionReceipt(mintNFT.transactionHash)
    console.log('rec', receipt)
    const tokenId = Web3.utils.hexToNumber(receipt.logs[0].topics[3])
    console.log(tokenId)
    return tokenId
  }

  async getTokenURI(tokenId: any) {
    this.provider = await this.web3Modal.connect()
    this.web3js = new Web3(this.provider)

    this.accounts = await this.web3js.eth.getAccounts()

    this.NFT = new this.web3js.eth.Contract(NFTabi, NFTContract);

   
    const tokenURI= await this.NFT.methods
     .tokenURI(tokenId)
     .call({ from: this.accounts[0] })
    const tokenData = await fetch(tokenURI)

    return tokenData
  }

  async test(){
    this.web3js = new Web3(this.provider)
    const receipt = await this.web3js.eth.getTransactionReceipt('0x33b6e3697c76adf5f136f5fe9f4d0df4751213f6d2beb5b71e266e7d829d2b64')
    console.log(receipt, 'recc')
  }

  async balanceOf(ownerAddress: any) {
    this.provider = await this.web3Modal.connect()
    this.web3js = new Web3(this.provider)

    this.accounts = await this.web3js.eth.getAccounts()

    this.NFT = new this.web3js.eth.Contract(NFTabi, NFTContract);

    // console.log('oA',ownerAddress)
    const balance = await this.NFT.methods
      .balanceOf(this.accounts[0])
      .call({ from: this.accounts[0] })
    return balance
  }

  async approve(toAddress: any, tokenId: any) {
    console.log('inside approve')
    this.provider = await this.web3Modal.connect()
    this.web3js = new Web3(this.provider)
    this.accounts = await this.web3js.eth.getAccounts()

    this.NFT = new this.web3js.eth.Contract(NFTabi,NFTContract)

    const approveFunction = await this.NFT.methods
      .approve(toAddress, tokenId)
      .send({ from: this.accounts[0] })
    return approveFunction
  }
}
