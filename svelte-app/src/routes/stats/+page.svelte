<script lang="ts">
	import { statsService } from '$lib/services/stats.svelte';
	import { fly } from 'svelte/transition';
</script>

<div class="mx-auto max-w-4xl px-6 py-12">
	<header class="mb-12">
		<a
			href="/"
			class="text-xs font-bold tracking-[0.2em] text-[#ff3e00] uppercase transition hover:opacity-70"
		>
			← Back to Game
		</a>
		<h1 class="mt-4 text-5xl font-black tracking-tighter">Hall of Fame.</h1>
	</header>

	<div class="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
		<div class="rounded-2xl border border-white/5 bg-[#1a1a1a] p-6">
			<span class="text-[10px] font-bold tracking-widest text-gray-500 uppercase"
				>Personal Best</span
			>
			<p class="mt-2 font-mono text-3xl font-bold text-[#ff3e00]">
				{statsService.bestScore.toLocaleString()}
			</p>
		</div>

		<div class="rounded-2xl border border-white/5 bg-[#1a1a1a] p-6">
			<span class="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Games Played</span
			>
			<p class="mt-2 font-mono text-3xl font-bold text-white">
				{statsService.records.length}
			</p>
		</div>
	</div>

	<div class="overflow-hidden rounded-2xl border border-white/5 bg-[#1a1a1a]/30 backdrop-blur-sm">
		<table class="w-full border-collapse text-left">
			<thead>
				<tr
					class="border-b border-white/5 text-[10px] font-bold tracking-widest text-gray-500 uppercase"
				>
					<th class="p-6">Date</th>
					<th class="p-6">Score</th>
					<th class="p-6 text-right">Lines</th>
				</tr>
			</thead>
			<tbody>
				{#each statsService.sortedRecords as record, i (record.id)}
					<tr
						in:fly={{ y: 20, delay: i * 50 }}
						class="border-b border-white/5 transition-colors hover:bg-white/2"
					>
						<td class="p-6 font-mono text-xs text-gray-400">
							{new Date(record.date).toLocaleDateString()}
						</td>
						<td class="p-6 font-bold tracking-tight text-white uppercase">
							{record.score.toLocaleString()}
						</td>
						<td class="p-6 text-right font-mono text-[#ff3e00]">
							{record.lines}
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="3" class="p-12 text-center text-gray-500 text-sm italic">
							No records yet. Go clear some lines!
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
