import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { playlist } from '../classes/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  url = 'http://localhost:55940/api/playlist';


  constructor(private http:HttpClient) { }

  // רשימת רשימות השמעה
  getPlaylist():Observable<Array<playlist>> {
    return this.http.get<Array<playlist>>(this.url);
  }
}
