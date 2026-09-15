(function () {
    "use strict";

    const tour = new Shepherd.Tour({
        defaultStepOptions: {
            cancelIcon: {
                enabled: true
            },
            classes: 'class-1 class-2',
            scrollTo: { behavior: 'smooth', block: 'center' }
        },
        useModalOverlay: {
            enabled: true,
        }
    });

    tour.addStep({
        id: 'step-1',
        title: "Bem-vindo ao nosso app de viagens",
        text: 'Personalize sua viagem com destinos, atividades e hospedagens selecionados de acordo com suas preferências.',
        attachTo: {
            element: '#step-1',
            on: 'bottom',
        },
        buttons: [
            {
                text: 'Próximo',
                action: tour.next,
            },
        ],
    });

    tour.addStep({
        id: 'step-2',
        title: "Escolha um destino",
        text: 'Selecione um destino alinhado aos interesses e preferências do grupo.',
        attachTo: {
            element: '#step-2',
            on: 'bottom',
        },
        buttons: [
            {
                text: 'Próximo',
                action: tour.next,
            },
        ],
    });

    tour.addStep({
        id: 'Defina um orçamento',
        title: "Reserve transporte e hospedagem",
        text: 'Defina um orçamento que cubra transporte, hospedagem, refeições e atividades.',
        attachTo: {
            element: '#step-3',
            on: 'bottom',
        },
        buttons: [
            {
                text: 'Próximo',
                action: tour.next,
            },
        ],
    });

    tour.addStep({
        id: 'step-3',
        title: "Reserve transporte e hospedagem",
        text: 'Garanta o transporte de ida e volta e reserve hospedagens adequadas.',
        attachTo: {
            element: '#step-4',
            on: 'bottom',
        },
        buttons: [
            {
                text: 'Próximo',
                action: tour.next,
            },
        ],
    });

    tour.addStep({
        id: 'step-5',
        title: "Planeje as atividades",
        text: 'Liste as principais atividades ou atrações de cada dia da viagem.',
        attachTo: {
            element: '#step-5',
            on: 'bottom',
        },
        buttons: [
            {
                text: 'Próximo',
                action: tour.next,
            },
        ],
    });

    tour.addStep({
        id: 'step-6',
        title: "Comunique e confirme",
        text: 'Compartilhe o roteiro com os participantes, confirme as reservas e garanta que todos estejam preparados.',
        attachTo: {
            element: '#step-6',
            on: 'bottom',
        },
        buttons: [
            {
                text: 'Próximo',
                action: tour.next,
            },
        ],
    });
    
    tour.addStep({
        id: 'step-7',
        title: "Comece sua jornada",
        text: 'Compartilhe o roteiro com os participantes, confirme as reservas e garanta que todos estejam preparados.',
        attachTo: {
            element: '#step-7',
            on: 'bottom',
        },
        buttons: [
            {
                text: 'Concluir',
                action: tour.next,
            },
        ],
    });

    tour.start();

})();