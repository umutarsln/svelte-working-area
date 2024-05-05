<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import dayjs from 'dayjs';

  const currentDate = writable(dayjs());

  const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

  onMount(() => {
    currentDate.subscribe(() => {
      updateCalendar();
    });
  });

  function updateCalendar() {
    const currentMonth = currentDate.value.month();
    const currentYear = currentDate.value.year();
    const firstDayOfMonth = dayjs().year(currentYear).month(currentMonth).date(1);
    const firstDayWeek = firstDayOfMonth.day();
    const daysInMonth = dayjs().year(currentYear).month(currentMonth).daysInMonth();

    const calendar = [];
    let row = [];

    for (let i = 0; i < daysInMonth + firstDayWeek; i++) {
      const day = i - firstDayWeek + 1;

      if (day > 0 && day <= daysInMonth) {
        row.push({ day, isCurrentMonth: true });
      } else {
        row.push({ day: null, isCurrentMonth: false });
      }

      if (row.length === 7) {
        calendar.push(row);
        row = [];
      }
    }

    return calendar;
  }
</script>

<div class="calendar">
  <div class="month-header">
    <button on:click={() => currentDate.update((d) => d.subtract(1, 'month'))}>
      <i class="fas fa-arrow-left"></i>
    </button>
    <span>{months[currentDate.value.month()] + ' ' + currentDate.value.year()}</span>
    <button on:click={() => currentDate.update((d) => d.add(1, 'month'))}>
      <i class="fas fa-arrow-right"></i>
    </button>
  </div>

  <div class="calendar-grid">
    {#each updateCalendar() as week}
      <div class="week">
        {#each week as day}
          <div class="day" class:is-current-month="{day.isCurrentMonth}">
            {#if day.day}{day.day}{/if}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .calendar {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    margin: 0 auto;
  }

  .month-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 5px;
    padding: 10px;
  }

  .week {
    display: flex;
  }

  .day {
    text-align: center;
    padding: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  .is-current-month {
    background-color: #f0f0f0;
  }
</style>
