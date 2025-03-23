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
      this.title = "Actualizar"
      } catch(msg: any){
        toast.error(msg.error)
      }
    }

    this.userForm = new FormGroup({
    _id: new FormControl(this.idUser || null, []),
    id: new FormControl(this.miUsuario?.id || 0, []),
    first_name: new FormControl(this.miUsuario?.first_name || "", [Validators.required]),
    last_name: new FormControl(this.miUsuario?.last_name || "", [Validators.required]),
    email: new FormControl(this.miUsuario?.email || "", [Validators.required]),
    image: new FormControl(this.miUsuario?.image || "", [Validators.required]),
    username: new FormControl(this.miUsuario?.username || "", [Validators.required]),
    password: new FormControl(this.miUsuario?.password || Math.random().toString().slice(2, 10), [])
    });
  }


  async getDataUser(){
    if (this.userForm.invalid) {
      toast.error("Por favor, completa todos los campos obligatorios.");
      return;
    }
    let res: IUser | any
      try{
        if(this.userForm.value._id){
          res = await this.userServices.update(this.userForm.value)
        } else{
          res = await this.userServices.create(this.userForm.value)    
        }
        this.router.navigate(['/home', 'users'])

      }catch(msg: any){
        toast.error(msg.error)
      }
  }
}

