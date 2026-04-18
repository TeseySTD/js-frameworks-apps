<script lang="ts">
	import type { Piece } from '$lib/types';

	let { board, currentPiece, isPaused, gameOver, score, onTogglePause } = $props<{
		board: number[][];
		currentPiece: Piece;
		isPaused: boolean;
		gameOver: boolean;
		score: number;
		onTogglePause: () => void;
	}>();
</script>

<div
	class="relative aspect-10/20 h-full overflow-hidden rounded-xl border-4 border-gray-800 bg-gray-950 shadow-[0_0_80px_rgba(221,0,49,0.15)]"
>
	<div class="pointer-events-none absolute inset-0 grid grid-cols-10 grid-rows-20 opacity-20">
		{#each Array(200) as _}
			<div class="border-[0.5px] border-gray-700"></div>
		{/each}
	</div>

	{#each board as row, y}
		{#each row as cell, x}
			{#if cell !== 0}
				<div
					class="absolute border border-black/30 bg-gray-500 shadow-inner"
					style="width: 10%; height: 5%; left: {x * 10}%; top: {y * 5}%;"
				></div>
			{/if}
		{/each}
	{/each}

	{#each currentPiece.shape as row, dy}
		{#each row as value, dx}
			{#if value !== 0}
				<div
					class="absolute border border-black/20 shadow-lg transition-all duration-75"
					style="width: 10%; height: 5%; 
                            left: {(currentPiece.pos.x + dx) * 10}%; 
                            top: {(currentPiece.pos.y + dy) * 5}%; 
                            background-color: {currentPiece.color};"
				></div>
			{/if}
		{/each}
	{/each}

	{#if isPaused}
		<div
			class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md"
		>
			<h2 class="mb-4 text-4xl font-black tracking-widest text-white uppercase">Paused</h2>
			<button
				onclick={onTogglePause}
				class="rounded-full border border-white/20 bg-white/10 px-8 py-3 font-bold text-white transition hover:bg-white/20"
			>
				RESUME
			</button>
		</div>
	{/if}

	{#if gameOver}
		<div
			class="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/90 text-center backdrop-blur-xl"
		>
			<h2 class="mb-4 text-3xl font-bold text-[#dd0031]">GAME OVER</h2>
			<p class="text-sm text-gray-400">Final Score</p>
			<p class="mb-6 font-mono text-4xl font-bold">{score}</p>
			<button
				onclick={() => location.reload()}
				class="rounded-lg bg-linear-to-r from-[#dd0031] to-[#ff3e00] px-10 py-3 font-bold text-white transition hover:scale-105 active:scale-95"
			>
				RESTART
			</button>
		</div>
	{/if}
</div>
