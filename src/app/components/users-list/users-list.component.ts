import { Component, OnInit } from '@angular/core';
import { User, Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  constructor(private _UsersService: UsersService, public dialog: MatDialog) {}
  ngOnInit() {
    this.onGetAllUsers();
  }
  searchValue: number | undefined;
  userList: Users[] = [];
  userResponse: User | any;
  userData: any;
  pageSize: number = 6;
  pageNumber: number = 1;
  onGetAllUsers() {
    let params = {};
    if (this.searchValue) {
      params = {
        page: this.pageNumber,
        per_page: this.pageSize,
        id: this.searchValue,
      };
    } else {
      params = {
        page: this.pageNumber,
        per_page: this.pageSize,
      };
    }
    this._UsersService.getAllUsers(params).subscribe({
      next: (res) => {
        this.userResponse = res;
        this.userList = this.userResponse.data;
      },
      error: (err) => {},
      complete: () => {
        if(this.searchValue){
          this.userList=[this.userResponse.data]
        }
      },
    });
  }

  openDialog(id: number): void {
    this._UsersService.getUserById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.userData = res.data;
      },
      error: () => {},
      complete: () => {
        const dialogRef = this.dialog.open(UserDetailsComponent, {
          data: this.userData,
          width: '60%',
        });
      },
    });

    // dialogRef.afterClosed().subscribe(() => {
    //   // if(result){
    //   //   this.onRequestRestPassword(result)
    //   // }
    // });
  }

  handlePageEvent(e: PageEvent) {
    // console.log(e);
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
    this.onGetAllUsers();
  }

  // search(term:string){
  //   console.log(term);

  
}
