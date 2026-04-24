<script lang="ts">
    import { spring } from 'svelte/motion';
    
    let { score }: { score: number } = $props();
    
    const displayScore = spring(0);
    $effect(() => {
        displayScore.set(score);
    });
</script>

<div class="rounded-2xl border border-white/5 bg-[#1a1a1a]/50 p-6 backdrop-blur-xl shadow-2xl">
    <span class="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">Points</span>
    <div class="mt-1 font-mono text-5xl font-medium tracking-tighter text-[#ff3e00]">
        {Math.round($displayScore).toLocaleString()}
    </div>
</div>