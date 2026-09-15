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
    "use strict";

    /* Form Wizard 1 */
    let args = {
        "wz_class": ".wizard-tab",
        highlight: true,
        highlight_time: 1000,
    };
    const wizard = new Wizard1(args);
    wizard.init();
    /* Form Wizard 1 */

    /* Data Picker */
    flatpickr("#date", {});
    /* Data Picker */

    /* Form Wizard with validation */
    new Wizard('#basicwizard', {
        validate: true,
    })
    /* Form Wizard with validation */

    /* Wizard with Progress */
    new Wizard("#progresswizard",{
        validate: true,
        progress: true
    });
    /* Wizard with Progress */

})();