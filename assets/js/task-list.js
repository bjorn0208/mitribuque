/* flatpickr: localização pt-BR */
if (window.flatpickr && flatpickr.localize) {
    flatpickr.localize({
        weekdays: { shorthand: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'], longhand: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'] },
        months: { shorthand: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], longhand: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'] },
        rangeSeparator: ' até ',
        weekAbbreviation: 'Sem',
        scrollTitle: 'Role para alterar',
        toggleTitle: 'Clique para alternar',
        time_24hr: true
    });
}
(function () {
  "use strict"

  let checkAll = document.querySelector('.check-all');
  if(checkAll) {

    checkAll.addEventListener('click', checkAllFn)

    function checkAllFn() {
      if (checkAll.checked) {
        document.querySelectorAll('.task-checkbox input').forEach(function (e) {
          e.closest('.task-list').classList.add('selected');
          e.checked = true;
        });
      }
      else {
        document.querySelectorAll('.task-checkbox input').forEach(function (e) {
          e.closest('.task-list').classList.remove('selected');
          e.checked = false;
        });
      }
    }
  }

  //delete Btn
  let taskbtn = document.querySelectorAll(".task-delete-btn");
  if(taskbtn) {

    taskbtn.forEach((eleBtn) => {
      eleBtn.onclick = () => {
        let task = eleBtn.closest(".task-list")
        task.remove();
      }
    })
  }

  /* multi select with remove button */
  const multipleCancelButton = new Choices(
    '#choices-multiple-remove-button1',
    {
      allowHTML: true,
      removeItemButton: true,
    }
  );

  /* AssignedDate Picker */
  flatpickr("#assignedDate", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
  });

  /* DueDate Picker */
  flatpickr("#dueDate", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
  });

  const myElement = document.getElementById('task-comments-area');
  if(myElement) {
      new SimpleBar(myElement, { autoHide: true });
  }

})();
