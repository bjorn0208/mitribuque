/* FilePond: textos em pt-BR */
if (window.FilePond && FilePond.setOptions) {
    FilePond.setOptions({
        labelIdle: 'Arraste e solte seus arquivos ou <span class="filepond--label-action">Procure</span>',
        labelInvalidField: 'O campo contém arquivos inválidos',
        labelFileWaitingForSize: 'Aguardando tamanho',
        labelFileSizeNotAvailable: 'Tamanho indisponível',
        labelFileLoading: 'Carregando',
        labelFileLoadError: 'Erro ao carregar',
        labelFileProcessing: 'Enviando',
        labelFileProcessingComplete: 'Envio concluído',
        labelFileProcessingAborted: 'Envio cancelado',
        labelFileProcessingError: 'Erro no envio',
        labelFileProcessingRevertError: 'Erro ao reverter',
        labelFileRemoveError: 'Erro ao remover',
        labelTapToCancel: 'toque para cancelar',
        labelTapToRetry: 'toque para tentar de novo',
        labelTapToUndo: 'toque para desfazer',
        labelButtonRemoveItem: 'Remover',
        labelButtonAbortItemLoad: 'Abortar',
        labelButtonRetryItemLoad: 'Tentar de novo',
        labelButtonAbortItemProcessing: 'Cancelar',
        labelButtonUndoItemProcessing: 'Desfazer',
        labelButtonRetryItemProcessing: 'Tentar de novo',
        labelButtonProcessItem: 'Enviar'
    });
}
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

    // for color selection
    const multipleCancelButton = new Choices('#product-color-add',{
        allowHTML: true,
        removeItemButton: true,
    });

    // for product tags
    const  textUniqueVals = new Choices('#choices-text-preset-values', {
        allowHTML: true,
        paste: false,
        duplicateItemsAllowed: false,
        editItems: true,
    });

    // for product features
    const toolbarOptions = [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'align': [] }],
        ['clean']                                         // remove formatting button
    ];
    const quill = new Quill('#product-features', {
        modules: {toolbar: toolbarOptions},
        theme: 'snow'
    });

    // for publish date picker
    flatpickr("#publish-date", {});

    // for publish time
    flatpickr("#publish-time", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
    });

    // for product images upload
    const MultipleElement1 = document.querySelector('.product-Images');
    if(MultipleElement1)  FilePond.create(MultipleElement1,);

    // for documents upload
    const MultipleElement = document.querySelector('.product-documents');
    if(MultipleElement) FilePond.create(MultipleElement,);

})();