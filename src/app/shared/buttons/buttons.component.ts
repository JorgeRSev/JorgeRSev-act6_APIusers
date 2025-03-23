import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-buttons',
  imports: [RouterLink],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  @Input() miUsuario: IUser | any;
  userServices = inject(UsersService)
  router = inject(Router)
  @Input() volver: Boolean = false;

  deleteUser(id: string){
    toast(`Vas a borrar al empleado ${this.miUsuario.first_name} ${this.miUsuario.last_name} `, {
      position: "top-center",
      action: {
        label: 'Aceptar',
        onClick: async () => {
          await this.userServices.delete(id)
          this.router.navigate(['/home', 'users'])
        }
      }
    });
  }

}
