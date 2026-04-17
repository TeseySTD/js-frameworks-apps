import { Injectable, signal, computed } from '@angular/core';
import { Article, ArticleData } from '@/shared/models/article.model';
import { getArticles, saveArticlesToStorage } from '../data/articles.data';

@Injectable({
    providedIn: 'root'
})
export class ArticleStore {
    // Private state to prevent direct external mutation
    private state = signal<Article[]>([]);

    // Public readonly signals
    public readonly articles = this.state.asReadonly();
    public readonly topArticles = computed(() => this.state().slice(0, 3));
    public readonly isLoading = signal(false);

    /**
     * Loads all articles from the mock database.
     * Prevents re-fetching if data is already present.
     */
    public async loadArticles() {
        if (this.state().length > 0) return;

        this.isLoading.set(true);
        try {
            const data = await getArticles();
            this.state.set(data);
        } catch (error) {
            console.error('Failed to load articles:', error);
        } finally {
            this.isLoading.set(false);
        }
    }

    /**
     * Returns a computed signal for a single article.
     * Useful for detail pages.
     */
    public getArticleById(id: number | string) {
        // If id comes from route, it's a string, we ensure it's a number for comparison
        const numericId = typeof id === 'string' ? parseInt(id, 10) : id;

        return computed(() =>
            this.state().find(a => a.id === numericId) || null
        );
    } 
    
    public addArticle(data: Partial<ArticleData>) {
        const newArticle = new Article({
            ...data,
            id: Date.now(),
            date: new Date()
        } as any);

        const updated = [newArticle, ...this.state()];
        this.state.set(updated);
        saveArticlesToStorage(updated);
    }

    public updateArticle(id: number, data: Partial<ArticleData>) {
        const updated = this.state().map(a =>
            a.id === id ? new Article({ ...a.toData(), ...data }) : a
        );
        this.state.set(updated);
        saveArticlesToStorage(updated);
    }

    public deleteArticle(id: number) {
        const updated = this.state().filter(a => a.id !== id);
        this.state.set(updated);
        saveArticlesToStorage(updated);
    }
}