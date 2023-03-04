<script lang="ts">
	import { onMount } from 'svelte';
	import { empty } from 'svelte/internal';
    import { portee } from './portee';
    import Cookies from 'js-cookie';
	import type { PageData } from './$types';
	export let data: PageData;
	
	let list_note = ["do", "ré", "mi", "fa", "sol", "la", "si"];
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
	let piano = false;
    let timer = 60;
    
    let note = {x: 700, y: center_svg, name : "fa"};
    let notes = [note];
	$: notes;
    // notes.push(note);
    pos = length_line - 1;
	let mybool = true;
    const identifiantUtilisateur = getIdentifiantUtilisateur();

    function caca() {
        alert("caca");
    }

    function getIdentifiantUtilisateur() {
        const identifiant = Cookies.get('utilisateur');
        if (identifiant) {
            return identifiant;
        } else {
            const nouvelIdentifiant = Date.now().toString() + Math.random().toString();
            Cookies.set('utilisateur', nouvelIdentifiant, { expires: 15}); // le cookie expire après 7 jours
            return nouvelIdentifiant;
        }
    }

    function rand() {
        return Math.floor(Math.random() * portee.length);
    }

    function click_note(note_click: string) {
        if (notes[0].name === note_click){
            score += 1;
			if(notes[0].x > 500){
				new_note();
			}
            destory_note();
        }
    }

    function reset() {
        let my_rand = rand();
        notes[0].name= portee[my_rand].name;
        notes[0].y = center_svg + (my_rand * dist);
        notes[0].x = svg_hw.width;
    }

	function destory_note() {
		notes.shift();
		mybool = true;
	}

	function new_note() {
		let my_rand = rand();
		let new_note = {name: portee[my_rand].name, y: center_svg + (my_rand * dist), x: svg_hw.width};
		notes.push(new_note);
	}

    function reload() {
        score = 0;
        timer = 60;
    }

	function calculateSpeed(position:number) {
	const distance = position - 0;
	return (0.000613411*distance - 0.0128571)
	}

    function start() {
        console.log("test start");
		let lastTime = 0;
		// MOOVE THE NOTES AS NOTE WITH requestAnimationFram
		function animate(currentTime:number) {
			if (!lastTime) {
				lastTime = currentTime;
			}
			const timeDiff = currentTime - lastTime;
			lastTime = currentTime;
			console.log("timeDiff = " + timeDiff);
			const distance = timeDiff * calculateSpeed(notes[0].x);
			console.log("distance =" + distance);
			notes.forEach(not => {
				not.x -= distance;
			});
			notes = [...notes];
			if (notes[0].x < 500 && mybool){
				new_note();
				mybool = false;
			}
			requestAnimationFrame(animate);
		}
		requestAnimationFrame(animate);

        const interval2 = setInterval(() => {
            timer -= 1;
            if (timer === 0){
                alert("score = " + score);
                const data = [
                    {
                        username: identifiantUtilisateur,
                        score: score,
                    }
                ]
                reload();
                clearInterval(interval2);
            }
        }, 1000);
    }

</script>

<section class ="main_sec">
	<div class = "tab_score">
		<ol>
		{#each data.body.data as dat}
			<li>{dat.score}</li>
		{/each}
		</ol>
	</div>
	<p>utilisateur = {identifiantUtilisateur}</p>
    <p>SCORE = {score}</p>
    <p>Timer = {timer}</p>
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
            {/each}
			{#each notes as note}
				<circle cx={note.x} cy={note.y} r=8  fill = "blue"/>
				<p>caca= {note.x}</p>
			{/each}
        </svg>
	</div>
	<label class="switch">
		<input type="checkbox" on:change={() => piano = !piano}>
	</label>
	<!-- if piano == true then drawn row note -->
	{#if piano}
		<div class ="row_note">
			{#each list_note as note}
				<div class="note">
					<!-- call function click_note() -->
					<button on:click={() => click_note(note)}>{note}</button>
				</div>
			{/each}
		</div>
	<!-- else  -->
	{:else}
	<ul class="set">
		<li class="white b"></li>
		<li class="black as"></li>
		<li class="white a"></li>
		<li class="black gs"></li>
		<li class="white g"></li>
		<li class="black fs"></li>
		<li class="white f"></li>
		<li class="white e"></li>
		<li class="black ds"></li>
		<li class="white d"></li>
		<li class="black cs"></li>
		<li class="white c"></li>
	  </ul>
	{/if}
    <!-- button who call start function -->
    <button on:click={() => caca()}>Start caca</button>
    <button on:click={() => start()}>Start</button>
</section>

<!-- css section -->
<style>
    .main_sec{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
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
        /* align-items: center; */
        justify-content: center;
        flex-direction: row;
        width : 100%;
    }
</style>