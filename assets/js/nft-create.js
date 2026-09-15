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
  "use strict";

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

  /* single upload */
  FilePond.create(document.querySelector(".single-fileupload"), {
    labelIdle: `Png, Gif, MP4 (ou) MP3, WEBP, Modelo 3D <span class="filepond--label-action">Procure</span>`,
    imagePreviewHeight: 170,
    imageCropAspectRatio: "1:1",
    imageResizeTargetWidth: 200,
    imageResizeTargetHeight: 200,
    stylePanelLayout: "compact circle",
    styleLoadIndicatorPosition: "center bottom",
    styleButtonRemoveItemPosition: "center bottom",
  });
  
})();
