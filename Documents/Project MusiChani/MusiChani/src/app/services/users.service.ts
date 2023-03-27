import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { requests } from '../classes/requests';
import { users } from '../classes/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'http://localhost:55940/api';

  constructor(private http: HttpClient) { }

  // הצגת המשתמשים
  getUsers():Observable<Array<users>> {
    return this.http.get<Array<users>>(this.url + '/users');
  }

  // הצגת זמרים
  getArtists(): Observable<Array<users>> {
    return this.http.get<Array<users>>(this.url + '/users/getArtists');
  }

  // הצגת בקשות זמרים
  getRequests():Observable<Array<requests>> {
    return this.http.get<Array<requests>>(this.url + '/requests');
  }

  // הוספת אמן
  addArtist(artist: users):Observable<Array<users>> {
    return this.http.put<Array<users>>(this.url + '/users/addUser', artist);
  }

  // התחברות
  // לא נבדק
  login(email: string, password: string):Observable<users> {
    return this.http.get<users>(this.url + `/connection/login?email=${email}&password=${password}`)
  }

  // הרשמה
  signUp(user: users):Observable<Array<users>> {
    return this.http.put<Array<users>>(this.url + '/users/addUser', user);
  }

  // artistRequest בקשת זמר
  AddRequest(request: requests):Observable<Array<requests>> {
    return this.http.put<Array<requests>>(this.url + '/requests/AddRequest', request);
  }

  // מחיקת הרשמה זמר
  deleteRequest(id: number):Observable<Array<requests>> {
    return this.http.delete<Array<requests>>(this.url + '/requests/deleteRequest/' + id);
  }

  // מספר משתמשים
  getNumberOfUsers():Observable<number> {
    return this.http.get<number>(this.url + 'users/getNumberOfUsers');
  }

  // מספר משתמשים מחוברים

  // מספר זמרים

  // מספר זמרים מחוברים

  // עדכון משתמש - פרופיל משתמש, אזור מנהל

  // מחיקת משתמש
  deleteUser(id: number): Observable<Array<users>> {
    return this.http.delete<Array<users>>(`${this.url}/users/deleteUser/` + id);
  }

  // בדיקת אימייל 
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/users/checkEmailExists?email=${email}`);
  }

  // עדכון פרופיל
  updateUser(id: number, user: users):Observable<Array<users>> {
    return this.http.put<Array<users>>(`${this.url}/users/updateUser/` + id, user);
  }

  // עדכון סטטוס לבקשה
  updateStatusRequest(requestId: number):Observable<Array<requests>> {
    return this.http.get<Array<requests>>(this.url + '/requests/updateStatus/' + requestId);
  }

  // עדכון סטטוס משתמש
  
}
