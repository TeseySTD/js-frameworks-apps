export type Point = { x: number; y: number };

export interface Piece {
    shape: number[][];
    color: string;
    pos: Point;
}

export const COLS = 10;
export const ROWS = 20;

export const SHAPES = [
    { shape: [[1, 1, 1, 1]], color: '#dd0031' }, // I (Red)
    { shape: [[1, 1], [1, 1]], color: '#ffffff' }, // O (White)
    { shape: [[0, 1, 0], [1, 1, 1]], color: '#fb7185' }, // T (Light Red)
    { shape: [[1, 0, 0], [1, 1, 1]], color: '#9ca3af' }, // L (Gray)
    { shape: [[0, 0, 1], [1, 1, 1]], color: '#4b5563' }, // J (Dark Gray)
];