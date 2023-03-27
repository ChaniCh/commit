import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { albums } from '../classes/albums';
import { albumToSinger } from '../classes/albumToSinger';
import { songs } from '../classes/songs';
import { users } from '../classes/users';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  url='http://localhost:55940/api'

  constructor(private http: HttpClient) { }

  // הצגת אלבומים
  getAlbums():Observable<Array<albums>> {
    return this.http.get<Array<albums>>(`${this.url}/albums`);
  }

  // הוספת אלבום
  addAlbum(album:albums):Observable<Array<albums>> {
    return this.http.put<Array<albums>>(`${this.url}/albums/addAlbum`, album);
  }

  // הוספת אלבום לזמר
  // addAlbumToSinger(albumToSinger: albumToSinger):Observable<Array<albumToSinger>> {
  //   console.log(albumToSinger);
  //   return this.http.put<Array<albumToSinger>>(`${this.url}/albumToSinger/addAlbumToSinger`, albumToSinger);
  // }

  addAlbumToSinger(albumToSinger: albumToSinger):Observable<Array<albumToSinger>> {
    console.log(albumToSinger);
    return this.http.put<Array<albumToSinger>>(this.url + '/albumToSinger/addAlbumToSinger', albumToSinger);
  }


  // הצגת אלבום לזמר
  getAlbumToSinger():Observable<Array<albumToSinger>> {
    return this.http.get<Array<albumToSinger>>(`${this.url}/albumToSinger`);
  }

  // מחיקת אלבום
  deleteAlbum(id:number): Observable<Array<albums>> {
    return this.http.delete<Array<albums>>(`${this.url}/albums/deleteAlbum` + id);
  }

  // הצגת אלבום לפי קוד
  getAlbumById(id:number): Observable<albums> {
    return this.http.get<albums>(`${this.url}/albums/GetById/` + id);
  }

  // הצגת שירי אלבום
  getSongs(albumId: number): Observable<Array<songs>> {
    return this.http.get<Array<songs>>(`${this.url}/albums/getSongs/${albumId}/`);
  }

  // הצגת אלבומים לפי קוד זמר
  getAlbumsBySingerId(singerId: number):Observable<Array<albums>> {
    return this.http.get<Array<albums>>(this.url + '/albums/GetAlbumsBySingerId/' + singerId);
  }
}
