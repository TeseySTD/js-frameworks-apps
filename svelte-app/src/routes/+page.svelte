<script lang="ts">
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { COLS, ROWS, SHAPES, type Piece, type Point } from '$lib/types';
	import GameHeader from '$lib/components/GameHeader.svelte';
	import GameBoard from '$lib/components/GameBoard.svelte';
	import ScoreCard from '$lib/components/ScoreCard.svelte';
	import GameGuide from '$lib/components/GameGuide.svelte';

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
		if (e.key === 'p' || e.key === 'Escape') {
			togglePause();
			return;
		}
		if (gameOver || isPaused) return;

		if (e.key === 'ArrowLeft') move({ x: -1, y: 0 });
		if (e.key === 'ArrowRight') move({ x: 1, y: 0 });
		if (e.key === 'ArrowDown') move({ x: 0, y: 1 });
		if (e.key === 'ArrowUp') rotate();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<main
	class="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-gray-900 to-black p-4 font-sans text-white"
>
	<GameHeader />

	<div class="flex h-[80vh] items-start gap-8 lg:gap-12">
		<GameBoard {board} {currentPiece} {isPaused} {gameOver} {score} onTogglePause={togglePause} />

		<div class="flex h-full flex-col gap-4">
			<ScoreCard {score} />
			<GameGuide />

			<button
				onclick={togglePause}
				class="w-full rounded-xl border border-[#dd0031]/30 py-4 font-bold tracking-widest text-[#dd0031] uppercase transition hover:bg-[#dd0031]/10"
			>
				{isPaused ? 'Resume' : 'Pause'}
			</button>
		</div>
	</div>
</main>

<style>
	:global(body) {
		overflow: hidden;
		background: black;
	}
</style>
