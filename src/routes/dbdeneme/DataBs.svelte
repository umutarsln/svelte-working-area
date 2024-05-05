<script>
    import { onMount } from 'svelte';
    import { addData, getAllData, initDB } from '../../lib/js/indexeddb.js';
  
    /**
	 * @type {any[]}
	 */
    let data = [];

    onMount(async () => {
        await initDB();
        await addData({ name: 'John Doe', age: 30 });
        await addData({ name: 'Jane Doe', age: 35 });
        data = await getAllData('my-store');
    });

    function handleAddData() {
        const newData = {
            name: 'New User',
            age: 25,
        };
        addData(newData);
        data = [...data, newData];
    }

    console.log('data1',data)
</script>
  
<h1>My Svelte App</h1>
  
<button on:click={handleAddData}>Add Data</button>
  
<ul>
    {#each data as item}
        <li>{item.name} - {item.age}</li>
    {/each}
</ul>
