<script>
	import { keyMap } from '$lib/gameData';
</script>

<div class="flex w-full flex-col rounded-2xl border border-white/5 bg-[#1a1a1a]/30 p-4 backdrop-blur-sm lg:p-4">
	<span class="mb-4 block text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase lg:mb-3">
		Controls
	</span>

	<ul class="space-y-3 text-[11px] text-gray-400 lg:space-y-2">
		{#each Object.entries(keyMap) as [action, keys]}
			<li class="flex items-center justify-between">
				<span class="font-medium tracking-wide">{action}</span>
				<div class="flex gap-1.5">
					{#each keys as key}
						<kbd class="min-w-7 rounded-md bg-[#2a2a2a] px-2 py-1.5 text-center font-mono text-[10px] text-gray-200 shadow-sm ring-1 ring-white/10 lg:py-1">
							{key.label}
						</kbd>
					{/each}
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	kbd {
		font-family: ui-monospace, monospace;
	}
</style>
