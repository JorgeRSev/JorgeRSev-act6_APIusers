import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { IUser } from '../../../interfaces/iuser.interface';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  userServices = inject(UsersService)
  miUsuario!: IUser
  @Input() idUser: string = ""
  title: string = "Nuevo"
  userForm: FormGroup = new FormGroup({},[]);
  router = inject(Router)

  async ngOnInit() {
    if (this.idUser){
      try{
      this.miUsuario = await this.userServices.getById(this.idUser)
      // console.log('Estoy en el ngOnInit del formulario de usuario',this.miUsuario)
      this.title = "Actualizar"
      } catch(msg: any){
        toast.error(msg.error)
        console.log(msg)
      }
    }

    this.userForm = new FormGroup({
    _id: new FormControl(this.idUser || null, []),
    id: new FormControl(this.miUsuario?.id || 0, []),
    first_name: new FormControl(this.miUsuario?.first_name || "", []),
    last_name: new FormControl(this.miUsuario?.last_name || "", []),
    email: new FormControl(this.miUsuario?.email || "", []),
    image: new FormControl(this.miUsuario?.image || "", []),
    username: new FormControl(this.miUsuario?.username || "", []),
    password: new FormControl(this.miUsuario?.password || Math.random().toString().slice(2, 10), [])
    });
  }


  async getDataUser(){
    let res: IUser | any
    try{
      if(this.userForm.value._id){
        console.log('Estoy en el getDataUser del formulario de usuario',this.userForm.value)
        res = await this.userServices.update(this.userForm.value)
      } else{
        console.log('Estoy en el getDataUser del formulario de usuario')
        res = await this.userServices.create(this.userForm.value)    
      }
      // this.router.navigate(['/home', 'users'])
    }catch(msg: any){
      toast.error(msg.error)
      console.log(msg)
    }
  }
}

