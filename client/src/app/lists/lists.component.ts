import { Component, inject, NgModule, OnDestroy, OnInit } from '@angular/core';
import { LikesService } from '../_services/likes.service';

import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { MemberCardComponent } from "../members/member-card/member-card.component";
import { PaginatedResult } from '../_models/pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
    selector: 'app-lists',
    standalone: true,
    templateUrl: './lists.component.html',
    styleUrl: './lists.component.css',
    imports: [ButtonsModule, FormsModule, MemberCardComponent,PaginationModule,FormsModule]
})
export class ListsComponent implements OnInit, OnDestroy{
  

  likesService = inject(LikesService);
  
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadLikes();
  }

  getTitle(){
    switch (this.predicate){
      case 'liked':return 'Me gustan'
      case 'likedBy': return 'Les gustas'
      default: return 'Se gustan'
    }
  }

  loadLikes(){
    this.likesService.getLikes(this.predicate, this.pageNumber, this.pageSize);
  }

  pageChanged(event: any) {
    if(this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadLikes();
    }
  }

  ngOnDestroy(): void {
    this.likesService.paginatedResult.set(null);
  }
  
}
