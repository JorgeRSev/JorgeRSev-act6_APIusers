import { Component, inject, Input} from '@angular/core';
import { IRes, IUser } from '../../../interfaces/iuser.interface';
import { UsersService } from '../../../services/users.service';
import { UserCardComponent } from '../../../components/user-card/user-card.component';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-user-list',
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
res!: IRes
usersServices = inject(UsersService)
arrUsers: IUser[] = []
@Input() miUsuario!: IUser
arrPage: number[] = [];
currentPage: number = 1;


ngOnInit() {
  this.getUsers(this.currentPage);
}

async getUsers(page: number = 1) {
  try {
    this.res = await this.usersServices.getAll(page);
    this.arrUsers = this.res.results;
    this.currentPage = this.res.page;
    this.arrPage = [];
    
    for (let i = 1; i <= this.res.total_pages; i++) {
      this.arrPage.push(i);
    }
  } catch (error) {
    toast.error('No se pudieron cargar los usuarios');
  }
}

changePage(page: number) {
  if (page !== this.currentPage) {
    this.getUsers(page);
  }
}
}
