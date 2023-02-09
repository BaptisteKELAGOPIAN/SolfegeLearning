<script>
    import { onMount } from 'svelte';

    let list_note = ["do", "re", "mi", "fa", "sol", "la", "si"];
    let curr_note = "";
    let time = 0;
    let line = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let portee = [line, line, line, line, line];

    onMount(() => {
		const interval = setInterval(() => {
			time += 1;
		}, 1000);
        return () => {
			clearInterval(interval);
		};
	});
</script>

<section>
    <p>{time}</p>
    <p>{curr_note}</p>
    <div class ="row_portee">
        {#each portee as p}
            <div class="line">
                {#each p as l}
                        <!-- if statement -->
                        {#if l === 0}
                            -
                        {:else}
                            o
                        {/if}
                {/each}
            </div>
        {/each}
    </div>
    <div class ="row_note">
        {#each list_note as note}
            <div class="note">
                <!-- change "note"  if click on n-->
                <button on:click={() => curr_note = note}>{note}</button>
            </div>
        {/each}
    </div>
</section>

<!-- css section -->
<style>
    .row_note {
        display: flex;
        flex-direction: row;
    }
    .line {
        display: flex;
        flex-direction: row;
        height: 50px;
        font-size: 50px;
    }
    .row_portee {
        display: flex;
        flex-direction: column;
        width : 800px;
    }
</style>