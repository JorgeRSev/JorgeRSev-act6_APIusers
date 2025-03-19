import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../../interfaces/iuser.interface';
import { UsersService } from '../../../services/users.service';
import { ButtonsComponent } from '../../../shared/buttons/buttons.component';

@Component({
  selector: 'app-user-view',
  imports: [ButtonsComponent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  miUsuario: IUser | any;
  @Input() idUser: string = ""
  userServices = inject(UsersService)


  async ngOnInit() {
    try{
    this.miUsuario = await this.userServices.getById(this.idUser)
    console.log('Estoy en el ngOnInit de la vista usuario',this.miUsuario)
    } catch (error) {
    console.log(error)
    }
  }
}