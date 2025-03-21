import { Component, inject, Input} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { ButtonsComponent } from "../../shared/buttons/buttons.component";

@Component({
  selector: 'app-user-card',
  imports: [ButtonsComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  @Input() miUsuario!: IUser;
  userService = inject(UsersService)
}
