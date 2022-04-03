import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-authors-section',
  templateUrl: './authors-section.component.html',
  styleUrls: ['./authors-section.component.scss']
})
export class AuthorsSectionComponent implements OnInit {

  public users: any;

  constructor(
    public router: Router,
    private userService: UserService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
  
    
    //Call getUsers
    this.getUsers();
  }


  //Get All Authors/Artists
  getUsers() {
    this.userService.getUsers().subscribe(
      (res) => {
        let temp: any = res
        this.users = temp['users']
        console.log('users',this.users)    
      },
      (error) => {
        console.log(error, "Error");
      }
    );
  }
}
