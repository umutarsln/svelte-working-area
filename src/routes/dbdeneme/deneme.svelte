<script>
	import { getAllData } from "$lib/js/indexeddb";
	import { onMount } from "svelte";
	import { da } from "svelty-picker/i18n";
/**
	 * @type {any[]}
	 */
     let data = [];
    onMount(async () => {

        data = await getAllData('my-store');
    });

    console.log('data: ',data)
</script>