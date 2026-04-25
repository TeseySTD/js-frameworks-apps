<script lang="ts">
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { COLS, keyMap, ROWS, SHAPES } from '$lib/gameData';
	import GameHeader from '$lib/components/GameHeader.svelte';
	import GameBoard from '$lib/components/GameBoard.svelte';
	import ScoreCard from '$lib/components/ScoreCard.svelte';
	import GameGuide from '$lib/components/GameGuide.svelte';
	import type { Piece, Point } from '$lib/types';
	import { statsService } from '$lib/services/stats.svelte';
	import { resolve } from '$app/paths';

	// Game State
	let board = $state(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
	let score = $state(0);
	let totalLines = $state(0);
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
			statsService.addRecord(score, totalLines);
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
		if (linesCleared > 0) {
			score += linesCleared * 100;
			totalLines += linesCleared;
		}
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
	class="flex h-screen w-full flex-col items-center justify-between bg-[#0a0a0a] p-4 py-6 font-sans text-white selection:bg-[#ff3e00]/30 lg:justify-center lg:py-4"
>
	<div
		class="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#ff3e0015,transparent_50%)]"
	></div>

	<div class="mb-2 shrink-0 lg:mb-4">
		<GameHeader />
	</div>

	<div
		class="relative z-10 flex min-h-0 w-full max-w-5xl flex-1 flex-col items-center gap-6 lg:h-[80vh] lg:flex-none lg:flex-row lg:items-start lg:justify-center lg:gap-16"
	>
		<div class="flex min-h-0 w-full flex-1 justify-center lg:h-full lg:w-auto lg:flex-none">
			<GameBoard {board} {currentPiece} {isPaused} {gameOver} {score} onTogglePause={togglePause} />
		</div>

		<div
			class="flex w-full max-w-[320px] shrink-0 flex-col gap-4 lg:h-full lg:w-64 lg:max-w-none lg:gap-2"
		>
			<ScoreCard {score} />

			<div class="hidden min-h-0 shrink lg:flex lg:flex-col lg:justify-center">
				<GameGuide />
			</div>

			<div class="mt-auto flex w-full gap-3 lg:flex-col lg:gap-2">
				<button
					onclick={togglePause}
					class="group flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 py-3.5 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase transition-all hover:border-[#ff3e00]/50 hover:text-[#ff3e00] sm:text-xs lg:w-full lg:py-3"
				>
					<span
						class="h-1.5 w-1.5 rounded-full {isPaused
							? 'animate-pulse bg-[#ff3e00]'
							: 'bg-gray-600'}"
					></span>
					{isPaused ? 'Resume Game' : 'Pause Game'}
				</button>

				<a
					aria-label="Statistics page link"
					href={resolve('/stats')}
					class="group flex flex-1 items-center justify-center gap-2 rounded-xl border border-transparent bg-white/2 py-3.5 text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase transition-all hover:border-white/5 hover:bg-white/4 hover:text-white sm:text-xs lg:w-full lg:py-3"
				>
					Hall of Fame
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-3.5 w-3.5 text-gray transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#ff3e00] sm:h-4 sm:w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2.5"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
					</svg>
				</a>
			</div>
		</div>
	</div>
</main>
