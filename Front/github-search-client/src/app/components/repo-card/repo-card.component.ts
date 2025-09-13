import { Component, Input, OnInit } from '@angular/core';
import { Repository } from '../../models/repository.model';
import { BookmarkService } from '../../services/bookmark.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-repo-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './repo-card.component.html',
  styleUrl: './repo-card.component.scss'
})
export class RepoCardComponent implements OnInit {
  @Input({ required: true }) repository!: Repository;
  
  bookmarks$: Observable<Repository[]>;
  isBookmarked = false;

  constructor(private bookmarkService: BookmarkService) {
    this.bookmarks$ = this.bookmarkService.bookmarks$;
  }

  ngOnInit(): void {
    this.bookmarks$.subscribe(bookmarks => {
      this.isBookmarked = bookmarks.some(b => b.id === this.repository.id);
    });
  }


  onBookmarkClick(): void {
    if (this.isBookmarked) {
      this.bookmarkService.removeBookmark(this.repository.id).subscribe();
    } else {
      this.bookmarkService.addBookmark(this.repository).subscribe();
    }
  }
}