import { Injectable, signal, computed } from '@angular/core';
import { Article } from '../../shared/models/article.model';

@Injectable({
    providedIn: 'root'
})
export class ArticleStore {
    private state = signal<Article[]>([]);

    public readonly articles = this.state.asReadonly();
    public readonly topArticles = computed(() => this.state().slice(0, 3));
    public readonly isLoading = signal(false);

    public loadArticles() {
        if (this.state().length > 0) return;

        this.isLoading.set(true);

        setTimeout(() => {
            const mockData: Article[] = [
                new Article({
                    id: 1,
                    title: 'What does .NET 10 mean for developers?',
                    category: 'Architecture',
                    date: new Date(2026, 1, 1),
                    readTime: 8,
                    snippet: 'We will explore the key changes in the .NET ecosystem and how they affect the performance of microservices.',
                    author: {
                        name: 'Nick Chapsas',
                        avatar: 'https://avatars.githubusercontent.com/u/8199968?v=4'
                    },
                    content: [
                        "The microservices architecture continues to evolve. In the new version of the .NET platform, Microsoft has made significant changes to improve the performance of microservices.",
                        "One of the key features is the Ahead-of-Time (AOT) compilation, which allows to reduce the memory footprint and speed up cold startups of containers. This is critical for serverless architectures."
                    ]
                }),
                new Article({
                    id: 2,
                    title: 'Should I switch to Angular in 2026?',
                    category: 'Frontend',
                    date: new Date(2026, 1, 1),
                    readTime: 5,
                    snippet: 'Analyzing new features: Signals, Zoneless change detection and why they are important for large projects.',
                    author: {
                        name: 'Some Developer',
                        avatar: ''
                    },
                    content: [
                        "Angular 16 introduces new functional possibilities, such as Signals, Zoneless change detection and more.",
                    ]
                }),
                new Article({
                    id: 3,
                    title: 'Clean Architecture in Microservices',
                    category: 'Backend',
                    date: new Date(2026, 1, 1),
                    readTime: 12,
                    snippet: 'How to properly organize organizeize ports and adapters, so that your code does not turn into a "big ball of mud".',
                    author: {
                        name: 'Nick Chapsas',
                        avatar: 'https://avatars.githubusercontent.com/u/8199968?v=4'
                    },
                    content: [
                        "We will explore the key changes in the .NET ecosystem and how they affect the performance of microservices.",
                    ]
                })
            ];
            this.state.set(mockData);
            this.isLoading.set(false);
        }, 500);
    }

    public getArticleById(id: number) {
        return computed(() => this.state().find(a => a.id === id) || null);
    }
}