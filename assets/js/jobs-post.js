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
(function() {
    "use strict"
    
    // for personal information language
    const multipleCancelButton = new Choices(
        '#language',
        {
            allowHTML: true,
            removeItemButton: true,
        }
    );
    
    // for personal information language
    const multipleCancelButton2 = new Choices(
        '#skills',
        {
            allowHTML: true,
            removeItemButton: true,
        }
    );
    
    // for personal information language
    const multipleCancelButton3 = new Choices(
        '#qualification',
        {
            allowHTML: true,
            removeItemButton: true,
        }
    );
    /* For Date Range Picker */
    flatpickr("#job-deadline", {
        mode: "range",
        dateFormat: "Y-m-d",
    });
     
})();