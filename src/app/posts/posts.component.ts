import { Component, OnInit } from '@angular/core';
import { PostsService } from '../service/posts.service';
import { Post } from '../interfaces/post.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  numeroId: number = 0;
  newPost: Post = {
    titulo: 'Este es un otro nuevo posts',
    fecha_publicacion: "2030-04-05",
    contenido: 'SW1213',
    estatus: 'activo',
    usuario_id: 1,
    categoria_id: 2
  };

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postsService.getAllPost().subscribe(posts => {
      this.posts = posts;
    });
  }

  getPost(id: number) {
    this.numeroId += 1;
    this.postsService.getPost(id).subscribe(post => {
      console.log(post);
    });
  }

  addPost(post: Post) {
    this.postsService.addPost(post).subscribe( message => {
      console.log(message);
    });
    this.fetchPosts();
  }

}

// * Graficación
// Semana del 11-15
// Lunes 9:00 am a 1:30 pm y 4:00 pm a 8:30 pm
// martes 4:00pm - 6:00pm 6:00pm-8:00pm
// Miércoles 9:00 am a 1:30 pm y 4:00 pm a 8:30 pm
// jueves 4:00pm - 6:00pm Rafa - 6:00pm - 8:00pm - Alfredo
// Viernes 9:00 am a 1:30 pm y 5:00 pm a 8:30 pm

// * Minería y IA
// Semana del 18-22
// Lunes 9:00 am a 1:30 pm y 4:00 pm a 8:30 pm
// martes 4:00pm - 6:00pm 6:00pm-8:00pm
// Miércoles 9:00 am a 1:30 pm y 4:00 pm a 8:30 pm
// jueves 4:00pm - 6:00pm
// Viernes 9:00 am a 1:30 pm y 5:00 pm a 8:30 pm
