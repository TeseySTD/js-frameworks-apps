import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Avatar } from '@/shared/ui/avatar/avatar';
import { ArticleStore } from '@/core/state/article.store';
import { Article as ArticleModel } from '@/shared/models/article.model';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [RouterLink, Avatar],
  templateUrl: './article.html'
})
export class Article implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(ArticleStore);
  article: Signal<ArticleModel | null> = signal(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.store.loadArticles();

    if (id) {
      this.article = this.store.getArticleById(+id);
    }
  }
}