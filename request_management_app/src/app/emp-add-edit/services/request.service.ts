import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
}) 
export class RequestService {
    constructor(private _http: HttpClient) {}

    addRequest(data: any): Observable<any> {
        return this._http.post('http://localhost:8300/Create', data);
    }

    updateRequest(id: number, data: any): Observable<any> {
        return this._http.put(`http://localhost:8300/Update/${id}`, data);
    }

    getRequestList(): Observable<any> {
        return this._http.get('http://localhost:8300/List');
    }

    getLastRequisition(): Observable<any> {
        return this._http.get('http://localhost:8300/LastCreated');
    }
}