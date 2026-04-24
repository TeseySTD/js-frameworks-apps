<script>
	import { keyMap } from '$lib/gameData';
</script>

<div class="flex-1 rounded-2xl border border-white/5 bg-gray-900/30 p-6 backdrop-blur-sm">
	<span class="mb-4 block text-[10px] font-bold tracking-widest text-gray-500 uppercase">
		Guide
	</span>

	<ul class="space-y-4 text-xs text-gray-400">
		<li class="flex items-center justify-between gap-4">
			<span class="font-medium">Rotate</span>
			<div class="flex gap-1.5">
				{#each keyMap.Rotate as key}
					<kbd
						class="min-w-6 rounded bg-white/10 px-2 py-1 text-center font-mono text-[10px] text-white ring-1 ring-white/10"
					>
						{key.label}
					</kbd>
				{/each}
			</div>
		</li>

		<li class="flex items-center justify-between gap-4">
			<span class="font-medium">Left</span>
			<div class="flex gap-1.5">
				{#each keyMap.Left as key}
					<kbd
						class="min-w-6 rounded bg-white/10 px-2 py-1 text-center font-mono text-[10px] text-white ring-1 ring-white/10"
					>
						{key.label}
					</kbd>
				{/each}
			</div>
		</li>

		<li class="flex items-center justify-between gap-4">
			<span class="font-medium">Right</span>
			<div class="flex gap-1.5">
				{#each keyMap.Right as key}
					<kbd
						class="min-w-6 rounded bg-white/10 px-2 py-1 text-center font-mono text-[10px] text-white ring-1 ring-white/10"
					>
						{key.label}
					</kbd>
				{/each}
			</div>
		</li>

		<li class="flex items-center justify-between gap-4">
			<span class="font-medium">Drop</span>
			<div class="flex gap-1.5">
				{#each keyMap.Down as key}
					<kbd
						class="min-w-6 rounded bg-white/10 px-2 py-1 text-center font-mono text-[10px] text-white ring-1 ring-white/10"
					>
						{key.label}
					</kbd>
				{/each}
			</div>
		</li>

		<li class="flex items-center justify-between gap-4">
			<span class="font-medium">Pause</span>
			<div class="flex gap-1.5">
				{#each keyMap.Pause as key}
					<kbd
						class="min-w-6 rounded bg-white/10 px-2 py-1 text-center font-mono text-[10px] text-white ring-1 ring-white/10"
					>
						{key.label}
					</kbd>
				{/each}
			</div>
		</li>
	</ul>
</div>

<style>
	kbd {
		font-family: ui-monospace, monospace;
	}
</style>
