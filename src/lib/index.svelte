<script>
    import { onMount } from 'svelte';
    import { addData, getAllData } from './js/indexeddb.js';
  
    /**
	 * @type {any[]}
	 */
    let data = [];
  
    onMount(async () => {
      // Add some data to the object store.
      await addData({ name: 'John Doe', age: 30 });
      await addData({ name: 'Jane Doe', age: 35 });
  
      // Retrieve all data from the object store.
      data = await getAllData('my-store');
    });
  
    function handleAddData() {
      const newData = {
        name: 'New User',
        age: 25,
      };
  
      // Add new data to the object store.
      addData(newData);
  
      // Update the `data` array with the new data.
      data = [...data, newData];
    }
  </script>
  
  <h1>My Svelte App</h1>
  
  <button on:click={handleAddData}>Add Data</button>
  
  <ul>
    {#each data as item}
      <li>{item.name} - {item.age}</li>
    {/each}
  </ul>