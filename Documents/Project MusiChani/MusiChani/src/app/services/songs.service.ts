import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, map, Observable, switchMap } from 'rxjs';
import { favoriteSongs } from '../classes/favoriteSongs';
import { followListeningSongs } from '../classes/followListeningSongs';
import { songs } from '../classes/songs';
import { songsToPlaylist } from '../classes/songsToPlaylist';
import { songToSinger } from '../classes/songToSinger';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  url = 'http://localhost:55940/api';

  constructor(private http: HttpClient, private storage: AngularFireStorage) { }
  

  // רשימת השירים
  getSongs():Observable<Array<songs>> {
    return this.http.get<Array<songs>>(this.url + '/songs');
  }

  // URL שיר
  getSongUrl(songId:number):Observable<string> {
    return this.http.get(this.url +'/songs/PlaySong/' + songId,  { responseType: 'text' });
  }

  // הוספת שיר
  addSong(song: songs):Observable<Array<songs>> {
    return this.http.put<Array<songs>>(this.url + '/songs/AddSong', song);
  }

  // הוספת שיר לזמר
  addSongToSinger(songToSinger: songToSinger):Observable<Array<songToSinger>> {
    console.log(songToSinger);
    return this.http.put<Array<songToSinger>>(this.url + '/SongToSinger/AddSongToSinger', songToSinger);
  }

  // הצגת שירים לזמר
  getSongToSinger():Observable<Array<songToSinger>>{
    return this.http.get<Array<songToSinger>>(this.url + '/songToSinger/');
  }

  // הוספת מעקב שמיעת שיר
  addFollower(follower: followListeningSongs):Observable<Array<followListeningSongs>> {
    return this.http.put<Array<followListeningSongs>>(this.url + '/followListeningSongs/AddFollowListeningSongs', follower);
  }

  // הוספת שיר למועדפים
  addFavoriteSong(favoriteSong: favoriteSongs):Observable<Array<favoriteSongs>> {
    return this.http.put<Array<favoriteSongs>>(this.url + '/favoriteSongs/AddFavoriteSongs', favoriteSong);
  }

  // הוספת שיר לרשימת השמעה
  addSongToPlaylist(songToPlaylist: songsToPlaylist):Observable<Array<songsToPlaylist>> {
    return this.http.put<Array<songsToPlaylist>>(this.url + '/songsToPlaylist/addSongToPlaylist', songToPlaylist);
  }

  // רשימת שירים חדשים
  getSongsByTag(tagId: number):Observable<Array<songs>> {
    return this.http.get<Array<songs>>(this.url + '/songs/getSongsByTag' + tagId);
  }

  // מחיקת שיר
  deleteSong(id: number):Observable<Array<songs>> {
    return this.http.delete<Array<songs>>(this.url + '/songs/deleteSong' +id);
  }

}
