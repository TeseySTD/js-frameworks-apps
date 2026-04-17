import { Component, inject, OnInit } from '@angular/core';
import { ArticleStore } from '@/core/state/article.store';
import { ArticleCard } from "@/shared/ui/article-card/article-card";
import { Loader } from "@/shared/ui/loader/loader";

@Component({
  selector: 'app-article-list',
  imports: [ArticleCard, Loader],
  templateUrl: './article-list.html',
})
export class ArticleList implements OnInit {
  private store = inject(ArticleStore);

  articles = this.store.articles;
  isLoading = this.store.isLoading;

  ngOnInit() {
    this.store.loadArticles();
  }
}
