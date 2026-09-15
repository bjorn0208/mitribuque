(function () {
    'use strict';

    /* for basic sweet alert */
    const basicAlertBtn = document.getElementById('basic-alert');
    if (basicAlertBtn) {
        basicAlertBtn.onclick = function () {
            Swal.fire('Olá, esta é uma mensagem de alerta simples!');
        };
    }
    const alertTextBtn = document.getElementById('alert-text');
    if (alertTextBtn) {
        alertTextBtn.onclick = function () {
            Swal.fire(
                'A Internet?',
                'Isso ainda existe?',
                'question'
            );
        };
    }
    const alertFooterBtn = document.getElementById('alert-footer');
    if (alertFooterBtn) {
        alertFooterBtn.onclick = function () {
            Swal.fire({
                icon: 'error',
                title: 'Ops...',
                text: 'Algo deu errado!',
                footer: '<a href="javascript:void(0);">Por que isso aconteceu?</a>'
            });
        };
    }
    const longWindowBtn = document.getElementById('long-window');
    if (longWindowBtn) {
        longWindowBtn.onclick = function () {
            Swal.fire({
                title: 'Alerta com imagem rolável',
                text: 'Este alerta contém uma imagem alta para testar a rolagem.',
                imageUrl: 'https://placeholder.pics/svg/300x1500',
                imageHeight: 1500,
                imageAlt: 'A tall image'
            });
        };
    }
    
    const alertDescriptionBtn = document.getElementById('alert-description');
    if (alertDescriptionBtn) {
        alertDescriptionBtn.onclick = function () {
            Swal.fire({
                title: '<strong>Exemplo de <u>HTML</u></strong>',
                icon: 'info',
                html: `
                    Você pode usar <b>negrito</b>, 
                    <a href="https://sweetalert2.github.io/" target="_blank">links</a> 
                    e outras tags HTML.
                `,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: '<i class="fe fe-thumbs-up"></i> Ótimo!',
                confirmButtonAriaLabel: 'Joinha, ótimo!',
                cancelButtonText: '<i class="fe fe-thumbs-down"></i>',
                cancelButtonAriaLabel: 'Não gostei'
            });
        };
    }

    const threeButtonsBtn = document.getElementById('three-buttons');
    if (threeButtonsBtn) {
        threeButtonsBtn.onclick = function () {
            Swal.fire({
                title: 'Deseja salvar as alterações?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Salvar',
                denyButtonText: `Não salvar`,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Salvo!', '', 'success');
                } else if (result.isDenied) {
                    Swal.fire('As alterações não foram salvas', '', 'info');
                }
                // No action for cancel
            });
        };
    }

    const alertDialogBtn = document.getElementById('alert-dialog');
    if (alertDialogBtn) {
        alertDialogBtn.onclick = function () {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Seu trabalho foi salvo',
                showConfirmButton: false,
                timer: 1500
            });
        };
    }

    const alertConfirmBtn = document.getElementById('alert-confirm');
    if (alertConfirmBtn) {
        alertConfirmBtn.onclick = function () {
            Swal.fire({
                title: 'Tem certeza?',
                text: "Não será possível desfazer esta ação!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, excluir!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Excluído!',
                        'Seu arquivo foi excluído.',
                        'success'
                    );
                }
            });
        };
    }

    const alertParameterBtn = document.getElementById('alert-parameter');
    if (alertParameterBtn) {
        alertParameterBtn.onclick = function () {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success ms-2',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            });
    
            swalWithBootstrapButtons.fire({
                title: 'Tem certeza?',
                text: "Não será possível desfazer esta ação!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, excluir!',
                cancelButtonText: 'Não, cancelar!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire(
                        'Excluído!',
                        'Seu arquivo foi excluído.',
                        'success'
                    );
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        'Cancelado',
                        'Seu arquivo imaginário está seguro :)',
                        'error'
                    );
                }
            });
        };
    }
    
    const alertImageBtn = document.getElementById('alert-image');
    if (alertImageBtn) {
        alertImageBtn.onclick = function () {
            Swal.fire({
                title: 'Legal!',
                text: 'Modal com imagem personalizada.',
                imageUrl: '../assets/images/media/media-59.jpg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Imagem personalizada'
            });
        };
    }

    const alertCustomBgBtn = document.getElementById('alert-custom-bg');
    if (alertCustomBgBtn) {
        alertCustomBgBtn.onclick = function () {
            Swal.fire({
                title: 'Largura, espaçamento, cor e fundo personalizados.',
                width: 600,
                padding: '3em',
                color: '#716add',
                background: 'url(../assets/images/media/media-19.jpg)',
                backdrop: `
                    rgba(0,0,0,0.3)
                    url(../assets/images/gif%27s/1.gif)
                    left top
                    no-repeat
                `
            });
        };
    }

    const alertAutoCloseBtn = document.getElementById('alert-auto-close');
    if (alertAutoCloseBtn) {
        alertAutoCloseBtn.onclick = function () {
            let timerInterval;

            Swal.fire({
                title: 'Alerta com fechamento automático!',
                html: 'Fecharei em <b></b> milissegundos.',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const b = Swal.getHtmlContainer().querySelector('b');
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft();
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('Alert closed automatically by timer');
                }
            });
        };
    }

    const alertAjaxBtn = document.getElementById('alert-ajax');
    if (alertAjaxBtn) {
        alertAjaxBtn.onclick = function () {
            Swal.fire({
                title: 'Informe seu usuário do GitHub',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Buscar',
                showLoaderOnConfirm: true,
                preConfirm: (login) => {
                    return fetch(`https://api.github.com/users/${login}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Usuário não encontrado`);
                            }
                            return response.json();
                        })
                        .catch(error => {
                            Swal.showValidationMessage(`Falha na requisição: ${error}`);
                        });
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    Swal.fire({
                        title: `Avatar de ${result.value.login}`,
                        imageUrl: result.value.avatar_url,
                        imageAlt: 'Avatar do usuário'
                    });
                }
            });
        };
    }

})();