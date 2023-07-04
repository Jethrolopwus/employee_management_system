import { Component, ViewChild, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'management_system';
  displayedColumns: string[] = ['firstName', 'gender', 'lastName', 'email', 'password', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog : MatDialog, private api: ApiService){

  }
  ngOnInit(): void {
    this.getAllUsers();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
     width: '30%'
    }).afterClosed().subscribe(value=>{
      if(value ==='save'){
        this.getAllUsers();
      }
    })
  }
  getAllUsers(){
    this.api.getUsers()
    .subscribe({
      next:(res)=>{
        // console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:()=>{
        alert('error while fetching the users')
      }
    })
  }
  editUsers(row: any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(value=>{
      if(value=== 'update'){
        this.getAllUsers();
      }
    })
  }
  deleteUser(id:number){
    this.api.deleteUser(id)
    .subscribe({
      next:(res)=>{
        alert('User deleted successfully!');
        this.getAllUsers();
      },
      error:()=>{

        alert('error while deleting user')
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

