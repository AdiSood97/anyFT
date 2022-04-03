import { Component, OnInit, Inject } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-box',
  templateUrl: './modal-box.component.html',
  styleUrls: ['./modal-box.component.css']
})
export class ModalBoxComponent implements OnInit {
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  
  }
  
  // clodeDialog() {
  //   this.dialog.closeAll();
  // }


}
