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
/* Image upload */
let loadFile = function (event) {
  const reader = new FileReader();
  reader.onload = function () {
    const output = document.getElementById("profile-img");
    if (event.target.files[0].type.match("image.*")) {
      if(output) {
        output.src = reader.result;
      }
    } else {
      event.target.value = "";
      alert("Selecione uma imagem válida");
    }
  };
  reader.readAsDataURL(event.target.files[0]);
};

// for profile photo update
let ProfileChange = document.querySelector("#profile-change");
if(ProfileChange) ProfileChange.addEventListener("change", loadFile);

/* multi select with remove button */
const multipleCancelButton = new Choices("#choices-multiple-remove-button1", {
  allowHTML: true,
  removeItemButton: true,
});
const multipleCancelButton1 = new Choices("#choices-multiple-remove-button2", {
  allowHTML: true,
  removeItemButton: true,
});

/* TargetDate Picker */
flatpickr("#targetDate", {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
});

/* For Delete Contact */
let invoicebtn = document.querySelectorAll(".contact-delete");
invoicebtn.forEach((eleBtn) => {
  eleBtn.onclick = () => {
    let invoice = eleBtn.closest(".crm-contact");
    invoice.remove();
  };
});
