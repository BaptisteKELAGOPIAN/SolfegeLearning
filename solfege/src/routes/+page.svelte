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
    let dist = 10;
    let color = "black";
    let svg_hw = {height : 150, width: 700};
    let center_svg = (svg_hw.height - (dist * portee.length))/2;
    let mooveit = svg_hw.width;

    let note = {x: 700, y: center_svg, name : "fa"};
    let notes = [];
    notes.push(note);
    pos = length_line - 1;

    function rand() {
        return Math.floor(Math.random() * portee.length);
    }

    /**
	 * @param {string} [note_click]
	 */
    function click_note(note_click) {
        if (note.name === note_click){
            score += 1;
            reset();
        }
    }

    function reset() {
        let my_rand = rand();
        note.name= portee[my_rand].name;
        note.y = center_svg + (my_rand * dist);
        note.x = svg_hw.width;
    }

    onMount(() => {
		const interval = setInterval(() => {
            note.x -= 1;
            if(note.x === 0){
                reset();
            }
		}, 1);
        return () => {
			clearInterval(interval);
		};
	});
</script>

<section>
</section>
<section>
    <div class = "svg_div">
        <svg version="1.1"
            baseProfile="full"
            width={svg_hw.width} height={svg_hw.height}
            xmlns="http://www.w3.org/2000/svg">
            {#each portee as line}
            {#if (line.empty === true)}
                {color = "black"};
            {:else}
                {color = "white"};
            {/if}
            <line x1 = "0" y1 = {line.pos * dist + center_svg} x2={svg_hw.width} y2 = {line.pos * dist + center_svg} stroke = {color} stroke-width = {dist} style ="width: 100%"/>
            <circle cx={note.x} cy={note.y} r=8  fill = "blue"/>
            {/each}
        </svg>
    </div>
    <p>SCORE = {score}</p>
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

    .svg_div {
        display:flex;
        min-width: 700px;
        width: 700px;
        height: 150px;
        margin-left: auto;
        margin-right: auto;
        background-color: beige;
    }
    .row_note {
        display: flex;
        flex-direction: row;
        width : 100%;
    }
</style>