import { Component,ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-author-section',
  templateUrl: './author-section.component.html',
  styleUrls: ['./author-section.component.scss']
})
export class AuthorSectionComponent implements OnInit {

  public userArtwork: any;
  public artwork: any;
  public userdetails: any;
  public user: any;

  constructor(
    public router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {

    this.userdetails = sessionStorage.getItem("user")
    this.user = JSON.parse(this.userdetails)
    console.log(this.user)
    let userid = this.route.snapshot.paramMap.get("userid")
    console.log(userid)
    this.getUserArtwork(userid);
    this.counter(5)
    // console.log(user)

  }

  getUserArtwork(userid: any) {
    this.userService.getUserArtwork(userid).subscribe(
      (res) => {
        this.userArtwork = res
        this.artwork = this.userArtwork['artwork']
        console.log('artwork',this.artwork)    
      },
      (error) => {
        console.log(error, "Error");
      }
    );
  }
  
  counter(i: number) {
    return new Array(i);
}

}
