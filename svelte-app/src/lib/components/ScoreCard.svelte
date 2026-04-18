<script lang="ts">
    import { spring } from 'svelte/motion';
    
    let { score }: { score: number } = $props();
    
    const displayScore = spring(0);
    $effect(() => {
        displayScore.set(score);
    });
</script>

<div class="rounded-2xl border border-white/10 bg-gray-900/80 p-6 backdrop-blur-sm">
    <span class="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">Current Score</span>
    <div class="mt-1 font-mono text-5xl font-black text-white">
        {Math.round($displayScore)}
    </div>
</div>