import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GithubService } from '../../services/github.service';
import { Repository } from '../../models/repository.model';
import { RepoCardComponent } from '../repo-card/repo-card.component';
import { CommonModule } from '@angular/common';
import { BookmarkService } from '../../services/bookmark.service';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RepoCardComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})

export class SearchComponent {
  searchControl = new FormControl('');
  repositories: Repository[] = [];
  isLoading = false;
  hasSearched = false;

  constructor(private githubService: GithubService, private bookmarkService: BookmarkService) {}

  onSearch() {
    const query = this.searchControl.value;
    if (!query) return;

    this.isLoading = true;
    this.hasSearched = true;
    
    
    this.githubService.searchRepositories(query!).subscribe(result => {
            this.repositories = result.items;
            this.isLoading = false;
        });
    
  }
}