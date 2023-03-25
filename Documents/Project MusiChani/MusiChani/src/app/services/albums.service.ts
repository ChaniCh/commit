import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { albums } from '../classes/albums';
import { songs } from '../classes/songs';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  url='http://localhost:55940/api/Albums'

  constructor(private http: HttpClient) { }

  // הצגת אלבומים
  getAlbums():Observable<Array<albums>> {
    return this.http.get<Array<albums>>(this.url);
  }

  // הוספת אלבום
  addAlbum(album:albums):Observable<Array<albums>> {
    return this.http.put<Array<albums>>(this.url + '/addAlbum', album);
  }

  // מחיקת אלבום
  deleteAlbum(id:number): Observable<Array<albums>> {
    return this.http.delete<Array<albums>>(this.url + '/DeleteAlbum' + id);
  }

  // הצגת אלבום לפי קוד
  getAlbumById(id:number): Observable<albums> {
    return this.http.get<albums>(this.url + '/GetById/' + id);
  }

  // הצגת שירי אלבום
  getSongs(albumId: number): Observable<Array<songs>> {
    return this.http.get<Array<songs>>(`${this.url}/GetSongs/${albumId}/`);
  }

  // הצגת אלבומים לפי קוד זמר
  getAlbumsBySingerId(singerId: number):Observable<Array<albums>> {
    return this.http.get<Array<albums>>(`${this.url}/${singerId}`);
  }
}
