import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private httpClient = inject(HttpClient);
  private endPoint: string = "https://peticiones.online/api/users";

  getAll(): Promise<IUser[]> {
    return lastValueFrom(this.httpClient.get<IUser[]>(this.endPoint))
  }

  getById(id: string): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.endPoint}/${id}`))
  }


}
