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

  getAll(): Promise<IRes> {
    return lastValueFrom(this.httpClient.get<IRes>(this.endPoint));
  }

  getById(id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>(`${this.endPoint}/${id}`));
  }


  update(user: IUser): Promise<IUser> {
    let { _id, id, ...userData } = user;
    console.log('Estoy en el update USerDAta: ',userData)
    return lastValueFrom(this.httpClient.put<IUser>(`${this.endPoint}/${_id}`, userData))
  }

  create(user: IUser): Promise<IUser>{
    console.log('Estoy en el create USerDAta: ',user)
    return lastValueFrom(this.httpClient.post<IUser>(this.endPoint, user))
  }

  delete(id: string): Promise<IUser>{
    return lastValueFrom(this.httpClient.delete<IUser>(`${this.endPoint}/${id}`))
  }


}
