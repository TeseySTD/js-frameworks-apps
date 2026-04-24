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
	class="relative aspect-10/20 h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f] shadow-[0_0_100px_rgba(255,62,0,0.07)]"
>
	<div class="pointer-events-none absolute inset-0 grid grid-cols-10 grid-rows-20 opacity-10">
		{#each Array(200) as _}
			<div class="border-[0.5px] border-white/20"></div>
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
		<div class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0a0a0ab0] backdrop-blur-sm">
			<h2 class="mb-6 text-2xl font-bold tracking-[0.2em] text-white uppercase">Paused</h2>
			<button
				onclick={onTogglePause}
				class="group relative flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-3 font-bold text-black transition-all hover:scale-105"
			>
				<span class="relative z-10">RESUME</span>
			</button>
		</div>
	{/if}

	{#if gameOver}
		<div class="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/95 text-center backdrop-blur-2xl">
			<h2 class="mb-2 text-4xl font-black text-white">FINISH.</h2>
			<p class="mb-8 font-mono text-xl text-[#ff3e00]">{score}</p>
			<button
				onclick={() => location.reload()}
				class="rounded-full bg-linear-to-r from-[#ff3e00] to-[#e0234e] px-10 py-3 text-sm font-bold text-white shadow-lg shadow-[#ff3e00]/20 transition-all hover:scale-105 active:scale-95"
			>
				TRY AGAIN
			</button>
		</div>
	{/if}
</div>
