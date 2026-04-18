import { Article, ArticleData } from '@/shared/models/article.model';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'admin-article-item',
  imports: [],
  templateUrl: './article-item.html',
})
export class ArticleItem {
  article = input.required<Article>();
  onEdit = output<ArticleData>();
  onDelete = output<number>();
}
