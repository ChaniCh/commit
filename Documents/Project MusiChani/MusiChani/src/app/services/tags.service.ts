import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tags } from '../classes/tags';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  url = 'http://localhost:55940/api/tags';

  constructor(private http: HttpClient) { }

  // הוספת תגית
  addTag(tag: tags):Observable<Array<tags>> {
    return this.http.put<Array<tags>>(this.url + '/addTag', tag);
  }

  // בדיקה האם תגית קיימת במערכת
  checkTagExists(tag: string):Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/checkTagExists?tag=${tag}`)
  }
}
