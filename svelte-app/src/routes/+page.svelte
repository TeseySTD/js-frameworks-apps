<script lang="ts">
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { COLS, keyMap, ROWS, SHAPES } from '$lib/gameData';
	import GameHeader from '$lib/components/GameHeader.svelte';
	import GameBoard from '$lib/components/GameBoard.svelte';
	import ScoreCard from '$lib/components/ScoreCard.svelte';
	import GameGuide from '$lib/components/GameGuide.svelte';
	import type { Piece, Point } from '$lib/types';

	// Game State
	let board = $state(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
	let score = $state(0);
	let gameOver = $state(false);
	let isPaused = $state(false);

	const displayScore = spring(0);
	$effect(() => {
		displayScore.set(score);
	});

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
		board = board.filter((row) => {
			const isFull = row.every((cell) => cell !== 0);
			if (isFull) linesCleared++;
			return !isFull;
		});
		while (board.length < ROWS) {
			board.unshift(Array(COLS).fill(0));
		}
		if (linesCleared > 0) score += linesCleared * 100;
	}

	function move(dir: Point) {
		if (isPaused || gameOver) return;
		const next = {
			...currentPiece,
			pos: { x: currentPiece.pos.x + dir.x, y: currentPiece.pos.y + dir.y }
		};
		if (!collide(next, board)) {
			currentPiece.pos = next.pos;
		} else if (dir.y > 0) {
			merge();
		}
	}

	function rotate() {
		if (isPaused || gameOver) return;
		const nextShape = currentPiece.shape[0].map((_, i) =>
			currentPiece.shape.map((row) => row[i]).reverse()
		);
		const next = { ...currentPiece, shape: nextShape };
		if (!collide(next, board)) currentPiece.shape = nextShape;
	}

	function togglePause() {
		if (!gameOver) isPaused = !isPaused;
	}

	onMount(() => {
		const interval = setInterval(() => {
			if (!gameOver && !isPaused) move({ x: 0, y: 1 });
		}, 500);
		return () => clearInterval(interval);
	});

	function handleKeydown(e: KeyboardEvent) {
		if (keyMap.Pause.some((k) => k.codeKey === e.key)) {
			togglePause();
			return;
		}
		if (gameOver || isPaused) return;

		if (keyMap.Left.some((k) => k.codeKey === e.key)) move({ x: -1, y: 0 });
		if (keyMap.Right.some((k) => k.codeKey === e.key)) move({ x: 1, y: 0 });
		if (keyMap.Down.some((k) => k.codeKey === e.key)) move({ x: 0, y: 1 });
		if (keyMap.Rotate.some((k) => k.codeKey === e.key)) rotate();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<main
	class="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] p-4 font-sans text-white selection:bg-[#ff3e00]/30"
>
	<div
		class="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#ff3e0015,transparent_50%)]"
	></div>

	<GameHeader />

	<div class="relative z-10 flex h-[75vh] items-start gap-8 lg:gap-16">
		<GameBoard {board} {currentPiece} {isPaused} {gameOver} {score} onTogglePause={togglePause} />

		<div class="flex h-full w-64 flex-col gap-6">
			<ScoreCard {score} />
			<GameGuide />

			<button
				onclick={togglePause}
				class="group flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-4 text-xs font-bold tracking-[0.2em] text-gray-400 uppercase transition-all hover:border-[#ff3e00]/50 hover:text-[#ff3e00]"
			>
				<span
					class="h-1.5 w-1.5 rounded-full {isPaused ? 'animate-pulse bg-[#ff3e00]' : 'bg-gray-600'}"
				></span>
				{isPaused ? 'Resume Game' : 'Pause Game'}
			</button>
		</div>
	</div>
</main>

<style>
	:global(body) {
		background-color: #0a0a0a;
		color: white;
		overflow: hidden;
	}

	/* Smooth transition for theme colors */
	:global(*) {
		transition:
			border-color 0.2s ease,
			background-color 0.2s ease;
	}
</style>
