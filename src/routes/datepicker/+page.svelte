<svelte:head>
	<title>Date Picker</title>
	<meta name="description" content="date picker" />
</svelte:head>

<script>
	import DatePicker from './DatePicker.svelte'
	let cmpDatePicker
	
	/**
	 * @param {{ detail: { datepicked: any; }; }} e
	 */
	function datepicked (e) {
		console.log(e.detail.datepicked)
	}
</script>

<DatePicker bind:this={cmpDatePicker} on:datepicked={datepicked} />



