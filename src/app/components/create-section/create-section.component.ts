import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ContractService } from 'src/app/services/contract.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss']
})
export class CreateSectionComponent implements OnInit {
  
  //Test
  public image: File | undefined;
  public selectedFile: any;
  public resData: any;


  
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private contractService: ContractService
  ) { }


  public accountID = localStorage.getItem('AccountId');

  public userDetails = JSON.parse(sessionStorage.getItem("user") || '')

  public signupForm!: FormGroup;
  public formData = new FormData();



  ngOnInit(): void {
    // this.userdetails = sessionStorage.getItem("user")
    console.log('user', this.userDetails)
    console.log('account Id', this.accountID);
    this.initializeForm()
    console.log('heyy')
    this.getSample()
  }

  initializeForm(){    
    this.signupForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    desc: ['', [Validators.required]],
    price: ['', [Validators.required]],
    royalty: ['', [Validators.required]],
    account_id: this.accountID,
  });}


  onFileSelected(event: any) {
    console.log('inside selected')
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
  onSubmit() {
    console.log('why is submitting coming twice')
    console.log('submitin', this.userDetails)
    const payload = new FormData();
    payload.append('image', this.selectedFile);
    payload.append('artwork_name', this.signupForm?.value.name);
    payload.append('artwork_desc', this.signupForm?.value.desc);
    payload.append('price', this.signupForm?.value.price);
    payload.append('royalty', this.signupForm?.value.royalty);
    payload.append('userid', this.userDetails!._id);
    payload.append('file', this.selectedFile);
    payload.append('walletID', this.accountID!)

    for (let data in this.signupForm.value) {
      payload.set(data.toString(),this.signupForm.value[data])
    }
    payload.set('file', this.selectedFile)


    this.http
      .post(`http://localhost:3000/api/v1/files`,payload).subscribe((data: any) => {

        this.toastr.success('Great', 'Artwork Submitted');
        this.resData = data;
        console.log('data',this.resData.metahash);
        let tokenuri = `https://ipfs.io/ipfs/${this.resData?.metahash}`
        console.log('ttttoken', tokenuri)
        let tokenID = this.contractService.createToken(tokenuri)
      });
      
      // async MintAndBuy(metahash: any){
      //   let tokenuri = `ipfs.io/ipfs/${metahash}`
      //   console.log('tokenuri', tokenuri)
      //   this.contractService.createToken(tokenuri,this.artworkData.walletID)
      // }
    
  }


  getSample(){
    console.log('hey')
    this.contractService.test()
    // this.http.get('https://ipfs.io/ipfs/QmNTF3UGbVVXjqnUxLEcRwzzJiqGupx2AM9JVZwF5D9y34').subscribe((data:any)=>{
    //   console.log(data.image)
    // });
  }
  removeFile(){
    this.selectedFile= ""
  }

}
