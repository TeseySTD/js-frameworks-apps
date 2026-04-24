import { browser } from '$app/environment';

export interface GameRecord {
    id: string;
    score: number;
    lines: number;
    date: string;
}

const statStorageKey = 'tetris-stats';

let _records = $state<GameRecord[]>(
    browser ? JSON.parse(localStorage.getItem(statStorageKey) || '[]') : []
);

export const statsService = {
    get records() { return _records; },

    get bestScore() {
        return _records.length > 0 ? Math.max(..._records.map(r => r.score)) : 0;
    },
    get sortedRecords() {
        return [..._records].sort((a, b) => b.score - a.score);
    },
    addRecord(score: number, lines: number) {
        const newRecord = {
            id: crypto.randomUUID(),
            score,
            lines,
            date: new Date().toISOString()
        };
        _records.push(newRecord);
        if (browser) {
            localStorage.setItem(statStorageKey, JSON.stringify(_records));
        }
    }
};