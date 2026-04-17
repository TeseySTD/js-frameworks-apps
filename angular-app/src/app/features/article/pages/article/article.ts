import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Avatar } from '@/shared/ui/avatar/avatar';
import { ArticleStore } from '@/core/state/article.store';
import { Loader } from "@/shared/ui/loader/loader";

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [RouterLink, Avatar, Loader],
  templateUrl: './article.html'
})
export class Article implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(ArticleStore);
  
  isLoading = this.store.isLoading;

  article = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return null;
    
    return this.store.getArticleById(+id)();
  });

  ngOnInit() {
    this.store.loadArticles();
  }
}