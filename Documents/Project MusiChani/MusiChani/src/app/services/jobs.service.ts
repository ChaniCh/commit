import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jobs } from '../classes/jobs';
import { jobToUser } from '../classes/jobToUser';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  url='http://localhost:55940/api'

  constructor(private http: HttpClient) { }

  // הצגת תפקידים
  getJobs():Observable<Array<jobs>> {
    return this.http.get<Array<jobs>>(this.url + '/jobs');
  }

  // הוספת תפקיד
  addJob(job: jobs):Observable<Array<jobs>> {
    return this.http.put<Array<jobs>>(this.url + '/jobs/addJob', job);
  }

  // מחיקת תפקיד
  deleteJob(jobId: number):Observable<Array<jobs>> {
    return this.http.delete<Array<jobs>>(this.url + '/jobs/deleteJob/' + jobId);
  }

  // הוספת תפקיד למשתמש
  addJobToUser(jobToUser: jobToUser):Observable<Array<jobToUser>> {
    return this.http.put<Array<jobToUser>>(this.url +'/jobToUser/addJobToUser', jobToUser);
  }

}
