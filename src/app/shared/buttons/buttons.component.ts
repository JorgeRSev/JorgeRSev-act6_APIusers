import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { toast } from 'ngx-sonner';
import Swal from 'sweetalert2';

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

  deleteUser(id: string) {
    Swal.fire({
      title: `¿Deseas eliminar a ${this.miUsuario.first_name} ${this.miUsuario.last_name}?`,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#000',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await this.userServices.delete(id);
          this.router.navigate(['/home', 'users']);
          Swal.fire(
            'El usuario ha sido eliminado.'
          );
        } catch (error) {
          Swal.fire(
            'Hubo un problema al eliminar al usuario.'
          );
        }
      }
    });
  }
}
