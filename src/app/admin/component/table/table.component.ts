import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { TableDataSource, TableItem } from './table-datasource';
import { Post } from 'src/app/interfaces/post.interface';
import { PostsService } from 'src/app/service/posts.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<TableItem>;
  dataSource;
  id: number;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'titulo', 'Acciones'];

  constructor(private postsService: PostsService,  private router: Router, public modal: MatDialog) {}
  ngOnInit() {
    this.fetchPosts();
  }
  ngAfterViewInit() {}

  fetchPosts() {
    this.postsService.getAllPost().subscribe(posts => {
      this.dataSource = new MatTableDataSource<Post>(posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editPost(id: number) {
    // this.router.navigate([`/admin/post/${id}`]);
    this.id = id;
    this.openModal();
    this.id = null;
  }

  deletePost(id: number) {
    this.postsService.deletePost(id).subscribe( m => {
      this.fetchPosts();
      console.log(m);
    } );
  }

  openModal() {
    const modalConfig = new MatDialogConfig();
    modalConfig.disableClose = true;
    modalConfig.autoFocus = true;
    modalConfig.width = '50%';
    if (this.id) {
      modalConfig.data = {id: this.id};
    }
    let modal: MatDialogRef<FormComponent, any>;
    modal = this.modal.open(FormComponent, modalConfig);
    modal.afterClosed().subscribe( respuesta => {
      if (respuesta === true) {
        this.fetchPosts();
      } else {
        console.log(respuesta);
      }
    } );
  }
}
