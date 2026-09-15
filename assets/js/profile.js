(function () {
    "use strict"

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

    const lightboxVideo = GLightbox({
        selector: '.glightbox'
    });
    lightboxVideo.on('slide_changed', ({ prev, current }) => {

        const { slideIndex, slideNode, slideConfig, player } = current;
    });

})();