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
    'use strict'

    // Date issued 
    flatpickr("#invoice-date-issued", {
        disableMobile: true
    });

    // Due date 
    flatpickr("#invoice-date-due", {
        disableMobile: true
    });

    // for nummber of products selected 

    let value = 1;
    const minValue = 0;
    const maxValue = 30;

    const  productMinusBtn = document.querySelectorAll(".product-quantity-minus")
    const  productPlusBtn = document.querySelectorAll(".product-quantity-plus")
    
    productMinusBtn.forEach((element) => {
        element.onclick = () => {
            value = Number(element.parentElement.childNodes[3].value);
            if (value > minValue) {
                value--;
                element.parentElement.childNodes[3].value = value;
            }
        };
    });

    productPlusBtn.forEach((element) => {
        element.onclick = () => {
            value = Number(element.parentElement.childNodes[3].value);
            if (value < maxValue) {
                value++;
                element.parentElement.childNodes[3].value = value;
            }
        };
    });

    /* dropzone */
    let myDropzone = new Dropzone(".dropzone", {
        maxFiles: 1,  // Allow only 1 file to be uploaded
        addRemoveLinks: true,  // Adds a remove link to each file preview
        dictDefaultMessage: 'Arraste arquivos aqui para enviar',
        dictFallbackMessage: 'Seu navegador não suporta envio por arrastar e soltar.',
        dictFileTooBig: 'Arquivo muito grande ({{filesize}}MB). Máximo: {{maxFilesize}}MB.',
        dictInvalidFileType: 'Tipo de arquivo não permitido.',
        dictResponseError: 'O servidor respondeu com o código {{statusCode}}.',
        dictCancelUpload: 'Cancelar envio',
        dictUploadCanceled: 'Envio cancelado.',
        dictCancelUploadConfirmation: 'Deseja mesmo cancelar este envio?',
        dictMaxFilesExceeded: 'Não é possível enviar mais arquivos.',
        dictRemoveFile: 'Remover',  // Change the text on the remove button if needed
    });

})();