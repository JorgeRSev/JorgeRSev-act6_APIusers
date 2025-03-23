import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IRes, IUser} from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private httpClient = inject(HttpClient);
  private endPoint: string = "https://peticiones.online/api/users";

  getAll(page: number = 1): Promise<IRes> {
    return lastValueFrom(this.httpClient.get<IRes>(`${this.endPoint}?page=${page}`));
  }

  getById(id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>(`${this.endPoint}/${id}`));
  }

  create(user: IUser): Promise<IUser>{
    return lastValueFrom(this.httpClient.post<IUser>(this.endPoint, user))
  //   .then(createUser => {
  //     console.log('Usuario añadido: ', createUser);
  //     return createUser;
  // })
  }

  delete(id: string): Promise<IUser>{
    return lastValueFrom(this.httpClient.delete<IUser>(`${this.endPoint}/${id}`))

    // Prueba para visualizar el usuario eliminado
    // .then(deleteUser => {
    //   console.log('Usuario eliminado: ', deleteUser);
    //   return deleteUser;
    // })
  }

  update(user: IUser): Promise<IUser> {
    let { _id, id, ...userData } = user;
    return lastValueFrom(this.httpClient.put<IUser>(`${this.endPoint}/${_id}`, userData))
  //   .then(updatedUser => {
  //     console.log('Nuevos datos del usuario: ', updatedUser);
  //     return updatedUser;
  // })
  }

}
