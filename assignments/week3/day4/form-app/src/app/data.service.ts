import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
    private BASE_URL: string = 'https://jsonplaceholder.typicode.com';
    constructor(private http: HttpClient) { }

    getUserById(id: number) {
        const url: string = `${this.BASE_URL}/users/${id}`;
        return this.http.get(url);
    }

    getPostById(id: number) {
        const url: string = `${this.BASE_URL}/posts?userId=${id}`;
        return this.http.get(url);
    }
}
