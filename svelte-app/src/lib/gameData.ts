export const COLS = 10;
export const ROWS = 20;

export const SHAPES = [
    // I-Piece
    { shape: [[1, 1, 1, 1]], color: '#ff3e00' },
    // O-Piece
    { shape: [[1, 1], [1, 1]], color: '#ffffff' },
    // T-Piece
    { shape: [[0, 1, 0], [1, 1, 1]], color: '#e0234e' },
    // L-Piece
    { shape: [[1, 0, 0], [1, 1, 1]], color: '#ff8a65' },
    // J-Piece
    { shape: [[0, 0, 1], [1, 1, 1]], color: '#a1a1aa' },
];

export const keyMap = {
    Left: [{ label: 'a', codeKey: 'a' }, { label: '←', codeKey: 'ArrowLeft' }],
    Right: [{ label: 'w', codeKey: 'd' }, { label: '→', codeKey: 'ArrowRight' }],
    Rotate: [{ label: 'w', codeKey: 'w' }, { label: '↑', codeKey: 'ArrowUp' }],
    Down: [{ label: 's', codeKey: 's' }, { label: '↓', codeKey: 'ArrowDown' }],
    Pause: [{ label: 'p', codeKey: 'p' }, { label: 'Escape', codeKey: 'Escape' }, { label: 'Space', codeKey: ' ' }]
};