
// This file contains the data used in the app, it mocks real db

import { Article } from "@/shared/models/article.model";

const STORAGE_KEY = 'angular_blog_articles';
const DEFAULT_ARTICLES: Article[] = [
    new Article({
        id: 1,
        title: 'What does .NET 10 mean for developers?',
        category: 'Architecture',
        date: new Date(2026, 0, 15),
        readTime: 8,
        snippet: 'Exploring key changes in .NET 10 ecosystem: Native AOT, performance boosts, and cloud-native features.',
        author: { name: 'Nick Chapsas', avatar: 'https://avatars.githubusercontent.com/u/8199968?v=4' },
        content: [
            "# .NET 10 Evolution\nNative AOT is no longer an edge case. It's the default for high-performance microservices.",
            "## Key Highlights:\n- **Reduced Memory Footprint:** Up to 40% less RAM.\n- **Instant Startups:** Zero JIT overhead at runtime.\n- **Enhanced Interop:** Better integration with Rust and C++ libraries."
        ]
    }),
    new Article({
        id: 2,
        title: 'Should I switch to Angular in 2026?',
        category: 'Frontend',
        date: new Date(2026, 1, 5),
        readTime: 5,
        snippet: 'Signals, Zoneless change detection, and the death of Zone.js. Is it time to return?',
        author: { name: 'Angular Expert', avatar: '' },
        content: [
            "# Angular in 2026\nThe framework has moved away from the complex RxJS-only approach to a more intuitive **Signals-based** reactivity.",
            "### Why it matters:\n1. **Zoneless:** No more `Zone.js` overhead.\n2. **Local Updates:** Only the component that changed is re-rendered.\n3. **Simplified API:** Faster learning curve for .NET devs."
        ]
    }),
    new Article({
        id: 3,
        title: 'Clean Architecture: Ports and Adapters',
        category: 'Backend',
        date: new Date(2026, 1, 10),
        readTime: 12,
        snippet: 'Stop your code from turning into a big ball of mud. Practical Domain-Driven Design.',
        author: { name: 'Nick Chapsas', avatar: 'https://avatars.githubusercontent.com/u/8199968?v=4' },
        content: [
            "# Architecture Patterns\nDependency inversion is your best friend when scaling backend systems.",
            "Keep your **Domain Layer** free of dependencies. Use interfaces (Ports) and implement them in the **Infrastructure Layer** (Adapters)."
        ]
    }),
    new Article({
        id: 4,
        title: 'EF Core 10: Performance at Scale',
        category: 'Database',
        date: new Date(2026, 1, 20),
        readTime: 7,
        snippet: 'Optimizing LINQ queries and using the new Compiled Models for massive performance gains.',
        author: { name: 'Entity Framework Guru', avatar: null },
        content: [
            "# EF Core 10\nCompiled models are now generated automatically, reducing startup time by 50%.",
            "```csharp\n// New performance feature\nvar blog = await context.Blogs\n    .AsNoTrackingWithIdentityResolution()\n    .SingleAsync(b => b.Id == id);\n```"
        ]
    }),
    new Article({
        id: 5,
        title: 'Building "Orchid": MAUI Blazor Hybrid',
        category: 'Mobile',
        date: new Date(2026, 2, 1),
        readTime: 10,
        snippet: 'Lessons learned from building a cross-platform book reader using .NET MAUI and Blazor.',
        author: { name: 'Rout', avatar: 'https://avatars.githubusercontent.com/u/1?v=4' },
        content: [
            "# Project Orchid\nUsing Blazor inside MAUI allows for 95% code reuse between Web and Desktop/Mobile.",
            "The challenge was pagination logic for large EPUB files, which was solved via a custom JS Interop layer for high-speed text rendering."
        ]
    }),
    new Article({
        id: 6,
        title: 'TUI: The Beauty of Command Line',
        category: 'CLI',
        date: new Date(2026, 2, 5),
        readTime: 6,
        snippet: 'Why Terminal User Interfaces are gaining popularity and how RazorConsole helps building them.',
        author: { name: 'Rout', avatar: 'https://avatars.githubusercontent.com/u/1?v=4' },
        content: [
            "# RazorConsole & TUI\nWho needs a heavy Electron app when you can have a lightning-fast terminal UI?",
            "By using Razor-like syntax for the console, we can build complex layouts with minimal effort."
        ]
    }),
    new Article({
        id: 7,
        title: 'Mastering xUnit and FluentAssertions',
        category: 'Testing',
        date: new Date(2026, 2, 12),
        readTime: 9,
        snippet: 'Writing unit tests that actually describe your business requirements, not just coverage.',
        author: { name: 'Quality Lead', avatar: null },
        content: [
            "# Unit Testing in .NET\n```csharp\nresult.Should().BeEquivalentTo(expected, options => \n    options.Excluding(x => x.Id));\n```\nMake your tests readable and maintainable."
        ]
    }),
    new Article({
        id: 8,
        title: 'Dockerizing .NET Apps in 2026',
        category: 'DevOps',
        date: new Date(2026, 2, 18),
        readTime: 5,
        snippet: 'The ultimate guide to multi-stage builds and reducing image size for .NET 10.',
        author: { name: 'Cloud Ops', avatar: '' },
        content: [
            "# DevOps Best Practices\nUse Chiseled Ubuntu images for the smallest and most secure production containers."
        ]
    }),
    new Article({
        id: 9,
        title: 'C# 15: The Future is Here',
        category: 'C#',
        date: new Date(2026, 2, 25),
        readTime: 8,
        snippet: 'Checking out new pattern matching improvements and the long-awaited Discriminated Unions.',
        author: { name: 'Mads Torgersen', avatar: null },
        content: [
            "# C# 15 Preview\nDiscriminated Unions are finally changing how we handle domain errors without throwing exceptions."
        ]
    }),
    new Article({
        id: 10,
        title: 'Distributed Caching with Redis',
        category: 'Backend',
        date: new Date(2026, 3, 2),
        readTime: 11,
        snippet: 'Scaling your .NET API to handle millions of requests with intelligent caching strategies.',
        author: { name: 'Nick Chapsas', avatar: 'https://avatars.githubusercontent.com/u/8199968?v=4' },
        content: [
            "# Advanced Caching\nHybridCache in .NET 10 combines L1 (In-memory) and L2 (Redis) out of the box."
        ]
    })
];

export const saveArticlesToStorage = (articles: Article[]): void => {
    if (typeof localStorage === 'undefined') {
        return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
};

const loadArticlesFromStorage = (): Article[] => {
    if (typeof localStorage === 'undefined') {
        return DEFAULT_ARTICLES;
    }
    const storedData = localStorage.getItem(STORAGE_KEY);
    
    if (!storedData) {
        saveArticlesToStorage(DEFAULT_ARTICLES);
        return DEFAULT_ARTICLES;
    }

    try {
        const parsed = JSON.parse(storedData);
        return parsed.map((item: any) => new Article({
            ...item,
            date: new Date(item.date) 
        }));
    } catch (e) {
        console.error("Failed to parse articles from storage", e);
        return DEFAULT_ARTICLES;
    }
};

let articlesCache: Article[] = loadArticlesFromStorage();

export const getArticles = (): Promise<Article[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            articlesCache = loadArticlesFromStorage();
            resolve(articlesCache);
        }, 500);
    });
};

export const getTopArticles = (): Promise<Article[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            articlesCache = loadArticlesFromStorage();
            resolve(articlesCache.slice(0, 3));
        }, 500);
    });
};

export const addArticle = async (newArticleData: any): Promise<Article> => {
    const current = loadArticlesFromStorage();
    const article = new Article({
        ...newArticleData,
        id: current.length + 1,
        date: new Date()
    });
    
    const updated = [article, ...current];
    saveArticlesToStorage(updated);
    return article;
};