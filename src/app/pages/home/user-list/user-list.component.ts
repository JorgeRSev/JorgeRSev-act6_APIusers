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


  ngOnInit(){
    this.getUsers()
  }

  async getUsers(){
    try{  
      this.res = await this.usersServices.getAll()
      this.arrUsers = this.res.results;
    }catch (msg: any) {
        console.log(msg) 
    }
  }
}