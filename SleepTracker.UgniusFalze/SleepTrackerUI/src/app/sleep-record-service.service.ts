import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SleepRecord } from './sleep-table/sleep-record';

@Injectable({
  providedIn: 'root'
})
export class SleepRecordService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private apiUrl:string = 'https://localhost:7277/api/SleepRecord'

 constructor(private http:HttpClient) { }

 getSleepRecords(page: number, limit:number, date?:Date) : Observable<SleepRecord[]>{
  let url = `${this.apiUrl}/${limit}/${page}`
  if(date !== undefined){
    url += `?date=${new Date(date).toLocaleDateString('sv')}`;
  }
  return this.http.get<SleepRecord[]>(url).pipe(
    map((data: SleepRecord[]) => {
      data.map((record) => {
        record.sleepRecordStart = new Date(record.sleepRecordStart);
        return record;
      })
      return data;
    })
  );
 }

 getSleepRecordCount(date?:Date) : Observable<number>{
  let url = `${this.apiUrl}/getCount`;
  if(date !== undefined){
    url += `?date=${new Date(date).toLocaleDateString('sv')}`;
  }
  return this.http.get<number>(url).pipe(
    map((data: any) => {
      return parseInt(data);
    })
  );
 }

 getSleepRecordDates() : Observable<Date[]> {
  const url = `${this.apiUrl}/getDates`;
  return this.http.get<Date[]>(url).pipe(
    map((data:any[]) => {
      map((record:any) => {
        return new Date(record);
      })
      return data;
    })
  )
 }
}
