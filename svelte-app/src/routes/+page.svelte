<script lang="ts">
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';
    import { COLS, ROWS, SHAPES, type Piece, type Point } from '$lib/types';

    // Game State
    let board = $state(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
    let score = $state(0);
    let gameOver = $state(false);
    
    const displayScore = spring(0);
    $effect(() => { displayScore.set(score); });

    let currentPiece: Piece = $state(spawnPiece());

    function spawnPiece(): Piece {
        const type = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        return {
            shape: type.shape,
            color: type.color,
            pos: { x: Math.floor(COLS / 2) - 1, y: 0 }
        };
    }

    function collide(p: Piece, b: number[][]): boolean {
        return p.shape.some((row, dy) => {
            return row.some((value, dx) => {
                let x = p.pos.x + dx;
                let y = p.pos.y + dy;
                return value !== 0 && (x < 0 || x >= COLS || y >= ROWS || (y >= 0 && b[y][x] !== 0));
            });
        });
    }

    function merge() {
        currentPiece.shape.forEach((row, dy) => {
            row.forEach((value, dx) => {
                if (value !== 0) {
                    board[currentPiece.pos.y + dy][currentPiece.pos.x + dx] = 1;
                }
            });
        });
        clearLines();
        currentPiece = spawnPiece();
        if (collide(currentPiece, board)) {
            gameOver = true;
        }
    }

    function clearLines() {
        let linesCleared = 0;
        board = board.filter(row => {
            const isFull = row.every(cell => cell !== 0);
            if (isFull) linesCleared++;
            return !isFull;
        });
        while (board.length < ROWS) {
            board.unshift(Array(COLS).fill(0));
        }
        if (linesCleared > 0) score += linesCleared * 100;
    }

    function move(dir: Point) {
        const next = { ...currentPiece, pos: { x: currentPiece.pos.x + dir.x, y: currentPiece.pos.y + dir.y } };
        if (!collide(next, board)) {
            currentPiece.pos = next.pos;
        } else if (dir.y > 0) {
            merge();
        }
    }

    function rotate() {
        const nextShape = currentPiece.shape[0].map((_, i) => currentPiece.shape.map(row => row[i]).reverse());
        const next = { ...currentPiece, shape: nextShape };
        if (!collide(next, board)) currentPiece.shape = nextShape;
    }

    onMount(() => {
        const interval = setInterval(() => {
            if (!gameOver) move({ x: 0, y: 1 });
        }, 500);
        return () => clearInterval(interval);
    });

    function handleKeydown(e: KeyboardEvent) {
        if (gameOver) return;
        if (e.key === 'ArrowLeft') move({ x: -1, y: 0 });
        if (e.key === 'ArrowRight') move({ x: 1, y: 0 });
        if (e.key === 'ArrowDown') move({ x: 0, y: 1 });
        if (e.key === 'ArrowUp') rotate();
    }
</script>

<svelte:window onkeydown={handleKeydown} />

<main class="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 font-sans">
    
    <div class="mb-8 text-center">
        <h1 class="text-4xl font-black tracking-tighter text-[#dd0031] uppercase">Svelte Tetris</h1>
        <p class="text-gray-500 text-sm tracking-[0.2em]">PURE DOM ENGINE</p>
    </div>

    <div class="flex gap-12 items-start">
        <div class="relative bg-gray-900 border-4 border-gray-800 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(221,0,49,0.1)]"
             style="width: {COLS * 30}px; height: {ROWS * 30}px;">
            
            {#each board as row, y}
                {#each row as cell, x}
                    {#if cell !== 0}
                        <div class="absolute border border-black/20 bg-gray-600" 
                             style="width: 30px; height: 30px; left: {x * 30}px; top: {y * 30}px;"></div>
                    {/if}
                {/each}
            {/each}

            {#each currentPiece.shape as row, dy}
                {#each row as value, dx}
                    {#if value !== 0}
                        <div class="absolute border border-black/20 transition-all duration-75"
                             style="width: 30px; height: 30px; 
                                    left: {(currentPiece.pos.x + dx) * 30}px; 
                                    top: {(currentPiece.pos.y + dy) * 30}px; 
                                    background-color: {currentPiece.color};
                                    box-shadow: inset 0 0 10px rgba(0,0,0,0.3);"></div>
                    {/if}
                {/each}
            {/each}

            {#if gameOver}
                <div class="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm">
                    <h2 class="text-3xl font-bold text-[#dd0031] mb-4">GAME OVER</h2>
                    <button onclick={() => location.reload()} 
                            class="px-6 py-2 bg-[#dd0031] text-white font-bold rounded hover:scale-105 transition">
                        RESTART
                    </button>
                </div>
            {/if}
        </div>

        <div class="flex flex-col gap-6">
            <div class="bg-gray-900 border border-white/10 p-6 rounded-xl min-w-[200px]">
                <span class="text-gray-500 text-xs uppercase font-bold tracking-widest">Score</span>
                <div class="text-4xl font-mono font-bold mt-1">
                    {Math.round($displayScore)}
                </div>
            </div>

            <div class="bg-gray-900/50 border border-white/5 p-6 rounded-xl">
                <span class="text-gray-500 text-xs uppercase font-bold mb-4 block">Controls</span>
                <ul class="text-sm space-y-2 text-gray-300">
                    <li><span class="text-white font-mono">↑</span> Rotate</li>
                    <li><span class="text-white font-mono">← →</span> Move</li>
                    <li><span class="text-white font-mono">↓</span> Soft Drop</li>
                </ul>
            </div>
        </div>
    </div>
</main>

<style>
    :global(body) {
        overflow: hidden;
    }
</style>