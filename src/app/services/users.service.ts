import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IRes} from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private httpClient = inject(HttpClient);
  private endPoint: string = "https://peticiones.online/api/users";

  getAll(): Promise<IRes> {
    return lastValueFrom(this.httpClient.get<IRes>(this.endPoint));
  }

  getById(id: string): Promise<IRes> {
    return lastValueFrom(this.httpClient.get<IRes>(`${this.endPoint}/${id}`));
  }


}
