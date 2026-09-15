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
(function () {
    'use strict'

    /* dropzone */
    let myDropzone = new Dropzone(".dropzone", {
        dictDefaultMessage: 'Arraste arquivos aqui para enviar',
        dictFallbackMessage: 'Seu navegador não suporta envio por arrastar e soltar.',
        dictFileTooBig: 'Arquivo muito grande ({{filesize}}MB). Máximo: {{maxFilesize}}MB.',
        dictInvalidFileType: 'Tipo de arquivo não permitido.',
        dictResponseError: 'O servidor respondeu com o código {{statusCode}}.',
        dictCancelUpload: 'Cancelar envio',
        dictUploadCanceled: 'Envio cancelado.',
        dictCancelUploadConfirmation: 'Deseja mesmo cancelar este envio?',
        dictMaxFilesExceeded: 'Não é possível enviar mais arquivos.',
        dictRemoveFile: 'Remover',
    });
        myDropzone.on("addedfile", file => {
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
    if (MultipleElement) FilePond.create(MultipleElement,);
    
    /* single upload */
    FilePond.create(
        document.querySelector('.single-fileupload'),
        {
            labelIdle: `Arraste e solte sua foto ou <span class="filepond--label-action">Procure</span>`,
            imagePreviewHeight: 170,
            imageCropAspectRatio: '1:1',
            imageResizeTargetWidth: 200,
            imageResizeTargetHeight: 200,
            stylePanelLayout: 'compact circle',
            styleLoadIndicatorPosition: 'center bottom',
            styleButtonRemoveItemPosition: 'center bottom'
        }
    );

})();