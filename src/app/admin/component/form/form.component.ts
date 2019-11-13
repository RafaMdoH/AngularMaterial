import { Component, OnInit , Inject} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PostsService } from 'src/app/service/posts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post.interface';
import { MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  addressForm: FormGroup;
  post: Post;
  id: number;
  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
   this.construirForm();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      if (this.id) {
        this.postsService.getPost(this.id).subscribe( post => {
          console.log(post);
          this.addressForm.patchValue(post[0]);
          console.log(this.addressForm.value);
        } );
      } else if (this.data) {
        this.id = this.data.id;
        this.postsService.getPost(this.id).subscribe( post => {
          console.log(post);
          this.addressForm.patchValue(post[0]);
          console.log(this.addressForm.value);
        } );
      }
    });
  }

  onSubmit() {
    if (this.addressForm.valid) {
      if (this.id) {
        this.postsService.updatePost(this.id, this.addressForm.value).subscribe( mensaje => {
          console.log(mensaje);
          this.router.navigate(['/admin/posts']);
        } );
      } else {
        this.postsService.addPost(this.addressForm.value).subscribe( mensaje => {
          console.log(mensaje);
          this.router.navigate(['/admin/posts']);
        } );
      }
    }
  }
  private construirForm() {
    this.addressForm = this.fb.group({
      titulo: [null, Validators.required],
      contenido: [null, Validators.required],
      estatus: ['activo', Validators.required]
    });
  }
}
