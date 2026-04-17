import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCard } from '@/shared/ui/article-card/article-card';
import { ArticleStore } from '@/core/state/article.store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ArticleCard],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private store = inject(ArticleStore);

  isLoading = this.store.isLoading;
  protected readonly articles = this.store.topArticles;

  ngOnInit() {
    this.store.loadArticles();
  }
}