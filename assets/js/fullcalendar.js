(function () {
  "use strict";

  // Initialize the FullCalendar with updated events
  const curYear = moment().format('YYYY');
  const curMonth = moment().format('MM');
  const calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    defaultView: 'month',
    locale: {
      code: 'pt-br',
      week: { dow: 0, doy: 6 },
      buttonText: { prev: 'Anterior', next: 'Próximo', today: 'Hoje', year: 'Ano', month: 'Mês', week: 'Semana', day: 'Dia', list: 'Lista' },
      weekText: 'Sm',
      allDayText: 'Dia inteiro',
      moreLinkText: function (n) { return '+ mais ' + n; },
      noEventsText: 'Não há eventos para mostrar'
    },
    navLinks: true, // can click day/week names to navigate views
    businessHours: true, // display business hours
    editable: true,
    selectable: true,
    selectMirror: true,
    droppable: true, // this allows things to be dropped onto the calendar
    events: [{
      title: 'Dia Anual da Escola',
      start: moment(curYear + '-' + curMonth + '-02').format('YYYY-MM-DD'),
      end: moment(curYear + '-' + curMonth + '-03').format('YYYY-MM-DD'),
      className: "bg-secondary",
      description: 'Uma celebração do ano letivo com diversos eventos e atividades para alunos e equipe.',
    },
    {
      title: 'Feira de Ciências',
      start: moment(curYear + '-' + curMonth + '-17').format('YYYY-MM-DD'),
      end: moment(curYear + '-' + curMonth + '-17').format('YYYY-MM-DD'),
      className: "bg-info",
      description: 'Os alunos apresentarão seus projetos de ciências. Aberto a todos os pais e alunos.',
    },
    {
      title: 'Reunião de Pais e Mestres',
      start: '2025-03-15',
      end: '2025-03-15',
      className: "bg-primary",
      description: 'Um evento importante em que os pais conversam com os professores sobre o progresso dos filhos.',
    },
    {
      title: 'Recesso de Primavera',
      start: moment(curYear + '-' + curMonth + '-13').format('YYYY-MM-DD'),
      end: moment(curYear + '-' + curMonth + '-13').format('YYYY-MM-DD'),
      className: "bg-warning",
      description: 'Os alunos têm recesso no feriado de primavera. Sem aulas neste período.',
    },
    {
      title: 'Dia do Esporte',
      start: moment(curYear + '-' + curMonth + '-21').format('YYYY-MM-DD'),
      end: moment(curYear + '-' + curMonth + '-21').format('YYYY-MM-DD'),
      className: "bg-success",
      description: 'Um dia cheio de atividades esportivas e competições. Pais e professores podem participar.',
    },
    {
      title: 'Semana de Provas',
      start: '2025-04-10',
      end: '2025-04-14',
      className: "bg-success",
      description: 'Uma semana em que os alunos farão as provas finais.',
    },
    {
      title: 'Comemorações do Feriado',
      start: moment(curYear + '-' + curMonth + '-04T10:00:00').format('YYYY-MM-DD'),
      end: moment(curYear + '-' + curMonth + '-06T15:00:00').format('YYYY-MM-DD'),
      className: "bg-info",
      description: 'Comemoração do próximo feriado nacional com diversas atividades culturais e festividades.',
    },
    {
      title: 'Peça Escolar: Romeu e Julieta',
      start: moment(curYear + '-' + curMonth + '-23T13:00:00').format('YYYY-MM-DD'),
      end: moment(curYear + '-' + curMonth + '-25T18:30:00').format('YYYY-MM-DD'),
      className: "bg-danger",
      description: 'Uma apresentação especial do grupo de teatro da escola. Todos os alunos e famílias estão convidados.',
    },
    {
      title: 'Dia das Profissões',
      start: moment(curYear + '-' + curMonth + '-04').format('YYYY-MM-DD'),
      end: moment(curYear + '-' + curMonth + '-04').format('YYYY-MM-DD'),
      className: "bg-success",
      description: 'Os alunos conhecerão diversas carreiras com palestrantes convidados de várias profissões.',
    },
    {
      title: 'Dia do Professor',
      start: moment(curYear + '-' + curMonth + '-28').format('YYYY-MM-DD'),
      end: moment(curYear + '-' + curMonth + '-28').format('YYYY-MM-DD'),
      className: "bg-teal",
      description: 'Um dia para reconhecer o trabalho e a dedicação dos professores da escola.',
    },
    {
      title: 'Piquenique Escolar',
      start: moment(curYear + '-' + curMonth + '-31').format('YYYY-MM-DD'),
      end: moment(curYear + '-' + curMonth + '-31').format('YYYY-MM-DD'),
      className: "bg-pink",
      description: 'Um piquenique ao ar livre para alunos, professores e famílias aproveitarem juntos.',
    },
    {
      title: 'Início das Férias de Verão',
      start: moment(curYear + '-' + '11' + '-11').format('YYYY-MM-DD'),
      end: moment(curYear + '-' + '11' + '-11').format('YYYY-MM-DD'),
      className: "bg-warning",
      description: 'O último dia de aula antes do início das férias de verão.',
    }
    ],
    eventRender: function (info) {
      // Modify the event's title or description with formatted start and end dates
      const event = info.event;

      // Format the start and end dates as "DD MMMM, YYYY" (e.g., "02 March, 2025")
      const formattedStart = moment(event.start).format('DD MMMM, YYYY');
      const formattedEnd = moment(event.end).format('DD MMMM, YYYY');

      // Add the formatted start and end dates into the event's title or description
      const eventElement = info.el.querySelector('.fc-title');
      if (eventElement) {
        eventElement.innerHTML += `<br><small>De: ${formattedStart} Até: ${formattedEnd}</small>`;
      }
    },
    // Handle click on a date in the calendar
    dateClick: function (info) {
      // Trigger the Add Event modal
      const addEventModal = new bootstrap.Modal(document.getElementById('addEvent'));
      addEventModal.show();

      // Clear the date pickers to avoid auto-selection of the clicked date
      document.getElementById('fromDate').value = ''; // Clear the value
      document.getElementById('toDate').value = ''; // Clear the value

      // Optional: Focus on the first input field (event name) for convenience
      document.getElementById('eventName').focus();
    },
    eventClick: function (info) {
      const event = info.event;
      const eventId = event.id;

      // Set data in the Event Details modal (for viewing)
      document.getElementById('modalEventName').textContent = event.title;
      document.getElementById('modalEventDescription').textContent = event.extendedProps.description;

      // Use moment to format the date
      document.getElementById('modalEventStart').textContent = moment(event.start).format("DD MMM, YYYY");
      document.getElementById('modalEventEnd').textContent = event.end ? moment(event.end).format("DD MMM, YYYY") : 'N/D';

      // Show Event Details modal
      const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
      eventModal.show();

      // Add the click event for the Delete button
      document.getElementById('deleteEventButton').onclick = function () {
        // Delete the event from the calendar
        event.remove();
        // Close the modal
        const eventModal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
        eventModal.hide();
        alert('Evento excluído com sucesso!');
      };
    }
  });

  // Render the calendar
  calendar.render();

  // External Events
  const containerEl = document.getElementById('external-events');
  new FullCalendar.Draggable(containerEl, {
    itemSelector: '.fc-event',
    eventData: function (eventEl) {
      return {
        title: eventEl.innerText.trim(),
        className: eventEl.className + ' overflow-hidden '
      };
    }
  });

  // Handle Add Event Button Click
  document.getElementById('addEventButton').addEventListener('click', function () {
    const eventName = document.getElementById('eventName').value.trim();
    const fromDateStr = document.getElementById('fromDate').value.trim();
    const toDateStr = document.getElementById('toDate').value.trim();
    const eventDescription = document.getElementById('event-description').value.trim();
    const eventType = document.getElementById('eventType').value.trim();

    // Check if all required fields are filled (non-empty)
    if (!eventName || !fromDateStr || !toDateStr || !eventType) {
      alert('Preencha todos os campos antes de adicionar o evento.');
      return; // Exit the function to prevent form submission
    }

    // Convert date strings to YYYY-MM-DD format
    const fromDate = moment(fromDateStr, "DD MMMM, YYYY").format("YYYY-MM-DD");
    const toDate = moment(toDateStr, "DD MMMM, YYYY").format("YYYY-MM-DD");

    const eventClass = eventType;

    // Create a new event
    const newEvent = {
      title: eventName,
      start: fromDate,
      end: toDate,
      description: eventDescription,
      className: eventClass, // Event class for styling
      id: Date.now() // Unique ID for the new event
    };

    calendar.addEvent(newEvent);
    alert('Evento adicionado com sucesso!');

    // Clear the input fields after submitting
    document.getElementById('eventName').value = '';
    document.getElementById('fromDate').value = '';
    document.getElementById('toDate').value = '';
    document.getElementById('event-description').value = '';
    document.getElementById('eventType').value = '';

    // Close the modal
    const addEventModal = bootstrap.Modal.getInstance(document.getElementById('addEvent'));
    addEventModal.hide(); // Correctly hide the modal
  });

  // Date Picker (From Date)
  flatpickr("#fromDate", {
    disableMobile: true,
    minDate: "today",
    defaultDate: null, // Prevent default date selection
    dateFormat: "d F, Y",
    disable: [
      function (date) {
        return date < new Date(); // Disable past dates
      }
    ],
    onOpen: function (selectedDates, dateStr, instance) {
      // Reset the date manually if needed
      instance.clear();
    }
  });

  // Date Picker (To Date)
  flatpickr("#toDate", {
    disableMobile: true,
    minDate: "today",
    defaultDate: null, // Prevent default date selection
    dateFormat: "d F, Y",
    disable: [
      function (date) {
        return date < new Date(); // Disable past dates
      }
    ],
    onOpen: function (selectedDates, dateStr, instance) {
      // Reset the date manually if needed
      instance.clear();
    }
  });


  const myElement1 = document.getElementById('full-calendar-activity');
  new SimpleBar(myElement1, { autoHide: true });

})();
