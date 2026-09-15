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

    /* StartDate Picker */
    flatpickr("#startDate", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    });

    /* EndDate Picker */
    flatpickr("#endDate", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    });

    /* multi select with remove button */
    const multipleCancelButton = new Choices(
        '#assigned-team-members',
        {
            allowHTML: true,
            removeItemButton: true,
        }
    );

    /* quill snow editor */
    const toolbarOptions = [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'align': [] }],

        ['image', 'video'],
        ['clean']                                         // remove formatting button
    ];
    const quill = new Quill('#project-descriptioin-editor', {
        modules: {
            toolbar: toolbarOptions
        },
        theme: 'snow'
    });

    /* filepond */
    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageExifOrientation,
        FilePondPluginFileValidateSize,
        FilePondPluginFileEncode,
        FilePondPluginImageEdit,
        FilePondPluginFileValidateType,
        FilePondPluginImageCrop,
        FilePondPluginImageResize,
        FilePondPluginImageTransform
    );

    /* multiple upload */
    const MultipleElement = document.querySelector('.multiple-filepond');
    if(MultipleElement) FilePond.create(MultipleElement,);

    /* passing unique values */
    const textUniqueVals = new Choices('#choices-text-unique-values', {
        allowHTML: true,
        paste: false,
        duplicateItemsAllowed: false,
        editItems: true,
    });

})();