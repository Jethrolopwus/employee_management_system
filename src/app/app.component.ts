import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'management_system';
  constructor(private dialog : MatDialog){

  }
  openDialog() {
    this.dialog.open(DialogComponent, {
     width: '30%'
    });
  }
}

