import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../../interfaces/iuser.interface';
import { UsersService } from '../../../services/users.service';
import { ButtonsComponent } from '../../../shared/buttons/buttons.component';
import { toast } from 'ngx-sonner';

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
        if(this.miUsuario.error){
          toast.error('El usuario no existe')        
      }
    } catch (error) {
    console.log('Estoy en el error:',error)
    }
  }
}