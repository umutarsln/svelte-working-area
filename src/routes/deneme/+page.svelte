<svelte:head>
    <title>Deneme</title>
    <meta name="description" content="deneme" />
</svelte:head>

<script lang="ts">
    import { createCalendar, melt } from '@melt-ui/svelte';
    import { CalendarDate, isSameDay } from '@internationalized/date'

    const halloween = new CalendarDate(2023, 10, 31)

    const {
      elements: { calendar, heading, grid, cell, prevButton, nextButton },
      states: { months, headingValue, weekdays, value },
      helpers: { isDateDisabled, isDateUnavailable },
      options: { locale },
    } = createCalendar({
        defaultValue: new CalendarDate(2024, 1, 11),
        fixedWeeks: true
    });

    $: if ($value && isSameDay($value, halloween)) {
    alert('Happy Halloween! 🎃')
  }
</script>

<section class="container">
    <header class="calendar-header">
        <button class="nav-button" {...$prevButton} use:prevButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-chevron-left"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="15 6 9 12 15 18" />
            </svg>
        </button>
        <div class="month-heading">{$headingValue}</div>
        <button class="nav-button" {...$nextButton} use:nextButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-chevron-right"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="9 6 15 12 9 18" />
            </svg>
        </button>
    </header>

    <div class="calendar-table">
        {#each $months as month}
            <table {...$grid} use:grid class="month-table">
                <thead aria-hidden="true">
                    <tr>
                        {#each $weekdays as day}
                            <th class="weekday">{day}</th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each month.weeks as weekDates}
                        <tr>
                            {#each weekDates as date}
                                <td
                                    role="gridcell"
                                    aria-disabled={$isDateDisabled(date) || $isDateUnavailable(date)}
                                    class="day-cell"
                                >
                                    <div {...$cell(date, month.value)} use:cell class="day-button">
                                        {date.day}
                                    </div>
                                </td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/each}
    </div>
</section>

<style lang="postcss">
  [data-melt-calendar] {
    @apply w-full rounded-lg bg-neutral-800/90 p-3 text-white shadow-sm;
  }

  header {
    @apply flex items-center justify-between pb-2;
  }

  header + div {
    @apply flex items-center gap-6;
  }

  [data-melt-calendar-prevbutton] {
    @apply rounded-lg p-1 transition-all hover:bg-magnum-500/20;
  }

  [data-melt-calendar-nextbutton] {
    @apply rounded-lg p-1 transition-all hover:bg-magnum-500/20;
  }

  [data-melt-calendar-prevbutton][data-disabled] {
    @apply pointer-events-none rounded-lg p-1 opacity-40;
  }

  [data-melt-calendar-nextbutton][data-disabled] {
    @apply pointer-events-none rounded-lg p-1 opacity-40;
  }

  [data-melt-calendar-heading] {
    @apply font-semibold;
  }

  th {
    @apply text-sm font-semibold;

    & div {
      @apply flex h-6 w-6 items-center justify-center p-4;
    }
  }

  [data-melt-calendar-grid] {
    @apply w-full;
  }

  [data-melt-calendar-cell] {
    @apply flex h-6 w-6 cursor-pointer select-none items-center justify-center rounded-lg p-4 hover:bg-magnum-500/20  focus:ring focus:ring-magnum-400;
  }

  [data-melt-calendar-cell][data-disabled] {
    @apply pointer-events-none opacity-40;
  }

  [data-melt-calendar-cell][data-unavailable] {
    @apply pointer-events-none text-red-400 line-through;
  }

  [data-melt-calendar-cell][data-selected] {
    @apply bg-magnum-400 text-neutral-950;
  }

  [data-melt-calendar-cell][data-outside-visible-months] {
    @apply pointer-events-none cursor-default opacity-40 hover:bg-transparent;
  }

  [data-melt-calendar-cell][data-outside-month] {
    @apply pointer-events-none cursor-default opacity-0 hover:bg-transparent;
  }

  .container {
        display: flex;
        align-items: flex-start; /* Align items to the top */
    }

  .calendar-header {
        flex: 0 0 auto; /* Don't allow header to grow or shrink */
        margin-right: 20px; /* Add margin between header and calendar */
    }

  .calendar-table {
        flex: 0; /* Allow calendar content to grow to fill available space */
    }
</style>

