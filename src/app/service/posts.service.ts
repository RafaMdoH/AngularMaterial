import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../interfaces/post.interface';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class PostsService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': 'QWERTY'
    })
  };

  constructor(private http: HttpClient) {}

  getAllPost() {
    return this.http.get<Post[]>(`${environment.url_Api}/posts`, this.httpOptions);
  }

  getPost(id: number) {
    return this.http.get<Post>(`${environment.url_Api}/posts/${id}`);
  }

  addPost(newPost: Post) {
    return this.http.post(`${environment.url_Api}/posts/`, newPost);
  }

  updatePost(id: number, updatePost: Partial<Post> ) {
    return this.http.put<Post>(`${environment.url_Api}/posts/${id}`, updatePost, this.httpOptions);
  }

  deletePost(id: number) {
    return this.http.delete<Post>(`${environment.url_Api}/posts/${id}`, this.httpOptions);
  }
}
