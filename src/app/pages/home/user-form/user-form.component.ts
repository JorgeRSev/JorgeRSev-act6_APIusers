import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { IUser } from '../../../interfaces/iuser.interface';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  miUsuario!: IUser
  @Input() idUser: string = ""
  userServices = inject(UsersService)
  title: string = "Nuevo"
  userForm: FormGroup = new FormGroup({},[]);

  async ngOnInit() {
    if (this.idUser){
      this.miUsuario = await this.userServices.getById(this.idUser)
      console.log('Estoy en el ngOnInit del formulario de usuario',this.miUsuario)
      this.title = "Actualizar"
    }

    this.userForm = new FormGroup({
    _id: new FormControl(this.idUser || null, []),
    first_name: new FormControl(this.miUsuario.first_name || "", []),
    last_name: new FormControl(this.miUsuario.last_name || "", []),
    email: new FormControl(this.miUsuario.email || "", []),
    image: new FormControl(this.miUsuario.image || "", [])
    });
    
  }


  updateUser(){}




}

