export type Point = { x: number; y: number };

export interface Piece {
    shape: number[][];
    color: string;
    pos: Point;
}