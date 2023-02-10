<script>
    import { onMount } from 'svelte';
	import { empty } from 'svelte/internal';
    import { portee } from '../routes/portee';

    let list_note = ["do", "re", "mi", "fa", "sol", "la", "si"];
    let curr_note = "";
    export let length_line = 500;
    let pos = 0;
    let wch_line = 0;
    let score = 0; 

    pos = length_line - 1;

    function rand() {
        return Math.floor(Math.random() * portee.length);
    }

    function reset() {
        portee[wch_line].main = Array(length_line).fill(0);
        pos = length_line - 1;
        wch_line = rand();
    }

    /**
	 * @param {string} [note]
	 */
    function click_note(note) {
        if (portee[wch_line].name === note){
            score += 1;
            reset();
        }
    }

    onMount(() => {
		const interval = setInterval(() => {
            rand();
            portee[wch_line].main[pos] = 1;
            portee[wch_line].main[pos + 1] = 0;
            if (pos === 0) {
                reset();
            }
            pos -= 1;
		}, 10);
        return () => {
			clearInterval(interval);
		};
	});
</script>

<section>
    <!-- <p>portee[line 0 =] {portee[0]}</p>
    <p>portee[line 1 =] {portee[1]}</p>
    <p>portee[line 2 =] {portee[2]}</p> -->
</section>

<section>
    <p>SCORE = {score}</p>
    <div class ="main_portee">
        {#each portee as line}
        <div class = "portee">
            {#each line.main as note}
                <div class="line">
                    {#if line.empty === true}
                        <div class = "tiret">-</div>
                    {/if}
                    {#if line.empty === false}
                        <div class = "tiret white">-</div>
                    {/if}
                    {#if note === 1}
                        <div class="round"></div>
                    {/if}
                </div>
            {/each}
        </div>
        {/each}
    </div>
    <div class ="row_note">
        {#each list_note as note}
            <div class="note">
                <!-- call function click_note() -->
                <button on:click={() => click_note(note)}>{note}</button>
            </div>
        {/each}
    </div>
</section>

<!-- css section -->
<style>
    .main_portee {
        display: flex;
        flex-direction: column;
        width : 100%;
    }
    .portee {
        display: flex;
        flex-direction: row;
        width : 100%;
    }
    .white{
        color: white;
        z-index: -2;
    }
    .line{
        display: flex;
        align-items: center;
        height: 8px;
    }
    .tiret {
        font-size: 3px;
        text-decoration-line: line-through;
        text-decoration-thickness: 0.25rem;
    }
    .row_note {
        display: flex;
        flex-direction: row;
        width : 100%;
    }
    .round {
        position:relative;
        background-image: url("src/media/note.png");
        background-size: contain;
        height: 80px;
        width: 17px;
        z-index: -1;
    }

</style>