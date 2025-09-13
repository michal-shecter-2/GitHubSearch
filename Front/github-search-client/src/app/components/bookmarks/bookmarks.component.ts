import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../../services/bookmark.service';
import { Repository } from '../../models/repository.model';
import { Observable } from 'rxjs';
import { RepoCardComponent } from '../repo-card/repo-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [CommonModule, RepoCardComponent],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss',
})
export class BookmarksComponent implements OnInit {
  bookmarks$!: Observable<Repository[]>;
  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.bookmarks$ = this.bookmarkService.bookmarks$;
    this.bookmarkService.getBookmarks().subscribe(); 
  }
}