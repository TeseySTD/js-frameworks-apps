import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleStore } from '@/core/state/article.store';
import { Article, ArticleData } from '@/shared/models/article.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin.html'
})
export class Admin implements OnInit {
  public store = inject(ArticleStore);
  private fb = inject(FormBuilder);

  public editMode = signal(false);
  public currentId = signal<number | null>(null);

  public form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    category: ['', Validators.required],
    snippet: ['', Validators.required],
    readTime: [5, [Validators.required, Validators.min(1)]],
    authorName: ['', Validators.required],
    authorAvatar: [''],
    content: ['', Validators.required]
  });

  ngOnInit() {
    this.store.loadArticles();
  }

  public onSubmit() {
    if (this.form.invalid) return;

    const val = this.form.getRawValue();

    const articleData = {
      title: val.title,
      category: val.category,
      snippet: val.snippet,
      readTime: val.readTime,
      author: { name: val.authorName, avatar: val.authorAvatar },
      content: val.content.split('\n').filter(p => p.trim() !== '')
    };

    if (this.editMode() && this.currentId()) {
      this.store.updateArticle(this.currentId()!, articleData);
    } else {
      this.store.addArticle(articleData);
    }

    this.resetForm();
  }

  public edit(article: ArticleData) {
    this.editMode.set(true);
    this.currentId.set(article.id);

    this.form.patchValue({
      title: article.title,
      category: article.category,
      snippet: article.snippet,
      readTime: article.readTime,
      authorName: article.author.name,
      authorAvatar: article.author.avatar ?? undefined,
      content: article.content.join('\n\n') 
    });
  }

  public delete(id: number) {
    if (confirm('Are you sure you want to delete this article?')) {
      this.store.deleteArticle(id);
      if (this.currentId() === id) this.resetForm();
    }
  }

  public resetForm() {
    this.form.reset({ readTime: 5 });
    this.editMode.set(false);
    this.currentId.set(null);
  }
}