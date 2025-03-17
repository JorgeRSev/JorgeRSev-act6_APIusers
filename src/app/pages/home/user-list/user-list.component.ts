import { Component, inject } from '@angular/core';
import { IRes, IUser } from '../../../interfaces/iuser.interface';
import { UsersService } from '../../../services/users.service';
import { UserCardComponent } from '../../../components/user-card/user-card.component';

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


  ngOnInit(){
    this.getUsers()
  }

  async getUsers(){
    this.res = await this.usersServices.getAll()
    console.log(this.res)
    this.arrUsers = this.res.results;
    console.log('Estoy en la funcion obtener usuarios en users-list', this.arrUsers)
  }
}
