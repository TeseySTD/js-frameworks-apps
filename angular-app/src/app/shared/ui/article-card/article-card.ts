import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '@/shared/models/article.model';
import { Avatar } from '@/shared/ui/avatar/avatar';

@Component({
  selector: 'ui-article-card',
  imports: [RouterLink, Avatar],
  templateUrl: './article-card.html',
})
export class ArticleCard {
  article = input.required<Article>();
}
