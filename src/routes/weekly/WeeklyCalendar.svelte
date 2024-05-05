<script>
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']; // Adjust as needed
    let events = [
      { id: 1, title: 'Event 1', day: 'Monday', startTime: '10:00', endTime: '12:00' },
      { id: 2, title: 'Event 2', day: 'Tuesday', startTime: '14:00', endTime: '16:00' }
    ];
  
    /**
	 * @param {DragEvent & { currentTarget: EventTarget & HTMLDivElement; }} event
	 * @param {number} id
	 */
    function handleDragStart(event, id) {
      // @ts-ignore
      event.dataTransfer.setData('text/plain', id.toString());
    }
  
    /**
	 * @param {{ preventDefault: () => void; }} event
	 */
    function handleDragOver(event) {
      event.preventDefault();
    }
  
    /**
	 * @param {DragEvent & { currentTarget: EventTarget & HTMLDivElement; }} event
	 * @param {string} day
	 * @param {string} time
	 */
    function handleDrop(event, day, time) {
      // @ts-ignore
      const id = parseInt(event.dataTransfer.getData('text/plain'));
      const movedEvent = events.find(e => e.id === id);
      // @ts-ignore
      if (movedEvent.day !== day || movedEvent.startTime !== time) {
        // @ts-ignore
        movedEvent.day = day;
        // @ts-ignore
        movedEvent.startTime = time;
        // @ts-ignore
        movedEvent.endTime = addHours(time, 2); // Default duration: 2 hours
        events = [...events];
      }
    }
  
    /**
	 * @param {{ split: (arg0: string) => { (): any; new (): any; map: { (arg0: NumberConstructor): [any, any]; new (): any; }; }; }} time
	 * @param {number} hours
	 */
    function addHours(time, hours) {
      const [hour, minute] = time.split(':').map(Number);
      const newHour = (hour + hours) % 24;
      return `${newHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    }
  </script>
  
  <style>
    .calendar {
      display: grid;
      grid-template-columns: auto repeat(7, 1fr);
      border: 1px solid #ccc;
    }
    .day {
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 10px;
      display: flex;
      flex-direction: column;
    }
    .time-slot {
      border-bottom: 1px solid #ccc;
      padding: 5px;
    }
    .event {
      margin-bottom: 5px;
      padding: 5px;
      background-color: #eaf7ff;
      border: 1px solid #007bff;
      cursor: pointer;
    }
  </style>
  
  <div class="calendar">
    <div></div> <!-- Placeholder for time slots -->
    {#each days as day}
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="day" on:drop={(e) => handleDrop(e, day, time)} on:dragover={handleDragOver}>
        {#each timeSlots as time}
          <div class="time-slot" on:drop={(e) => handleDrop(e, day, time)} on:dragover={handleDragOver}>
            {time}
            {#each events.filter(event => event.day === day && event.startTime === time) as event}
              <div class="event" draggable="true" on:dragstart={(e) => handleDragStart(e, event.id)}>
                {event.title} ({event.startTime} - {event.endTime})
              </div>
            {/each}
          </div>
        {/each}
      </div>
    {/each}
  </div>
  