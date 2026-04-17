export interface Author {
    name: string;
    avatar: string | null;
}

export class Article {
    id: number;
    title: string;
    category: string;
    private _readTime: number;
    get readTime() {
        return this._readTime + ' min';
    }
    private _date: Date;
    get date () {
        return `${this._date.getFullYear()}-${this._date.getMonth().toString().padStart(2, '0')}-${this._date.getDate().toString().padStart(2, '0')}`
    };
    snippet?: string;
    content: string[];
    author: Author;

    constructor(
        {
            id,
            title,
            category,
            readTime,
            date,
            snippet,
            content,
            author
        }: {
            id: number,
            title: string,
            category: string,
            readTime: number,
            date: Date,
            snippet: string,
            content: string[],
            author: Author
        }
    ) {
        this.id = id;
        this.title = title;
        this.category = category;
        this._readTime = readTime;
        this._date = date;
        this.snippet = snippet;
        this.content = content;
        this.author = author;

    }
}