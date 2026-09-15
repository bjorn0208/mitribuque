$(function () {

    // Basic datatable
    const $basicTable = $('#datatable-basic').DataTable({
        language: {
            searchPlaceholder: 'Pesquisar...',
            sSearch: '',
            lengthMenu: 'Exibir _MENU_ registros',
            info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
            infoEmpty: 'Mostrando 0 a 0 de 0 registros',
            infoFiltered: '(filtrado de _MAX_ registros no total)',
            zeroRecords: 'Nenhum registro encontrado',
            emptyTable: 'Nenhum dado disponível na tabela',
            loadingRecords: 'Carregando...',
            processing: 'Processando...',
            paginate: { first: 'Primeira', last: 'Última', next: 'Próxima', previous: 'Anterior' },
            buttons: { copy: 'Copiar', print: 'Imprimir', copyTitle: 'Copiado', copySuccess: { _: '%d linhas copiadas', 1: '1 linha copiada' } },
        },
        pageLength: 10,
    });

    // Responsive datatable
    const $responsiveTable = $('#responsiveDataTable').DataTable({
        responsive: true,
        language: {
            searchPlaceholder: 'Pesquisar...',
            sSearch: '',
            lengthMenu: 'Exibir _MENU_ registros',
            info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
            infoEmpty: 'Mostrando 0 a 0 de 0 registros',
            infoFiltered: '(filtrado de _MAX_ registros no total)',
            zeroRecords: 'Nenhum registro encontrado',
            emptyTable: 'Nenhum dado disponível na tabela',
            loadingRecords: 'Carregando...',
            processing: 'Processando...',
            paginate: { first: 'Primeira', last: 'Última', next: 'Próxima', previous: 'Anterior' },
            buttons: { copy: 'Copiar', print: 'Imprimir', copyTitle: 'Copiado', copySuccess: { _: '%d linhas copiadas', 1: '1 linha copiada' } },
        },
        pageLength: 10,
    });

    // Responsive modal datatable
    const $responsiveModalTable = $('#responsivemodal-DataTable').DataTable({
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.modal({
                    header: function (row) {
                        const data = row.data();
                        return data[0] + ' ' + data[1];
                    }
                }),
                renderer: $.fn.dataTable.Responsive.renderer.tableAll({
                    tableClass: 'table'
                })
            }
        },
        language: {
            searchPlaceholder: 'Pesquisar...',
            sSearch: '',
            lengthMenu: 'Exibir _MENU_ registros',
            info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
            infoEmpty: 'Mostrando 0 a 0 de 0 registros',
            infoFiltered: '(filtrado de _MAX_ registros no total)',
            zeroRecords: 'Nenhum registro encontrado',
            emptyTable: 'Nenhum dado disponível na tabela',
            loadingRecords: 'Carregando...',
            processing: 'Processando...',
            paginate: { first: 'Primeira', last: 'Última', next: 'Próxima', previous: 'Anterior' },
            buttons: { copy: 'Copiar', print: 'Imprimir', copyTitle: 'Copiado', copySuccess: { _: '%d linhas copiadas', 1: '1 linha copiada' } },
        },
        pageLength: 10,
    });

    // File export datatable
    const $fileExportTable = $('#file-export').DataTable({
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
        language: {
            searchPlaceholder: 'Pesquisar...',
            sSearch: '',
            lengthMenu: 'Exibir _MENU_ registros',
            info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
            infoEmpty: 'Mostrando 0 a 0 de 0 registros',
            infoFiltered: '(filtrado de _MAX_ registros no total)',
            zeroRecords: 'Nenhum registro encontrado',
            emptyTable: 'Nenhum dado disponível na tabela',
            loadingRecords: 'Carregando...',
            processing: 'Processando...',
            paginate: { first: 'Primeira', last: 'Última', next: 'Próxima', previous: 'Anterior' },
            buttons: { copy: 'Copiar', print: 'Imprimir', copyTitle: 'Copiado', copySuccess: { _: '%d linhas copiadas', 1: '1 linha copiada' } },
        },
    });

    // Delete row datatable
    const $deleteTable = $('#delete-datatable').DataTable({
        language: {
            searchPlaceholder: 'Pesquisar...',
            sSearch: '',
            lengthMenu: 'Exibir _MENU_ registros',
            info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
            infoEmpty: 'Mostrando 0 a 0 de 0 registros',
            infoFiltered: '(filtrado de _MAX_ registros no total)',
            zeroRecords: 'Nenhum registro encontrado',
            emptyTable: 'Nenhum dado disponível na tabela',
            loadingRecords: 'Carregando...',
            processing: 'Processando...',
            paginate: { first: 'Primeira', last: 'Última', next: 'Próxima', previous: 'Anterior' },
            buttons: { copy: 'Copiar', print: 'Imprimir', copyTitle: 'Copiado', copySuccess: { _: '%d linhas copiadas', 1: '1 linha copiada' } },
        }
    });

    const $deleteTableBody = $('#delete-datatable tbody');
    const $deleteButton = $('#button');

    $deleteTableBody.on('click', 'tr', function () {
        const $row = $(this);
        if ($row.hasClass('selected')) {
            $row.removeClass('selected');
        } else {
            $deleteTable.$('tr.selected').removeClass('selected');
            $row.addClass('selected');
        }
    });

    $deleteButton.on('click', function () {
        $deleteTable.row('.selected').remove().draw(false);
    });

    // Scroll vertical datatable
    const $scrollTable = $('#scroll-vertical').DataTable({
        scrollY: '265px',
        scrollCollapse: true,
        paging: false,
        scrollX: true,
        language: {
            searchPlaceholder: 'Pesquisar...',
            sSearch: '',
            lengthMenu: 'Exibir _MENU_ registros',
            info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
            infoEmpty: 'Mostrando 0 a 0 de 0 registros',
            infoFiltered: '(filtrado de _MAX_ registros no total)',
            zeroRecords: 'Nenhum registro encontrado',
            emptyTable: 'Nenhum dado disponível na tabela',
            loadingRecords: 'Carregando...',
            processing: 'Processando...',
            paginate: { first: 'Primeira', last: 'Última', next: 'Próxima', previous: 'Anterior' },
            buttons: { copy: 'Copiar', print: 'Imprimir', copyTitle: 'Copiado', copySuccess: { _: '%d linhas copiadas', 1: '1 linha copiada' } },
        },
    });

    // Hidden columns datatable
    const $hiddenColumnsTable = $('#hidden-columns').DataTable({
        columnDefs: [
            { target: 2, visible: false, searchable: false },
            { target: 3, visible: false }
        ],
        language: {
            searchPlaceholder: 'Pesquisar...',
            sSearch: '',
            lengthMenu: 'Exibir _MENU_ registros',
            info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
            infoEmpty: 'Mostrando 0 a 0 de 0 registros',
            infoFiltered: '(filtrado de _MAX_ registros no total)',
            zeroRecords: 'Nenhum registro encontrado',
            emptyTable: 'Nenhum dado disponível na tabela',
            loadingRecords: 'Carregando...',
            processing: 'Processando...',
            paginate: { first: 'Primeira', last: 'Última', next: 'Próxima', previous: 'Anterior' },
            buttons: { copy: 'Copiar', print: 'Imprimir', copyTitle: 'Copiado', copySuccess: { _: '%d linhas copiadas', 1: '1 linha copiada' } },
        },
        pageLength: 10,
    });

    // Add row datatable
    const $addRowTable = $('#add-row').DataTable({
        language: {
            searchPlaceholder: 'Pesquisar...',
            sSearch: '',
            lengthMenu: 'Exibir _MENU_ registros',
            info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
            infoEmpty: 'Mostrando 0 a 0 de 0 registros',
            infoFiltered: '(filtrado de _MAX_ registros no total)',
            zeroRecords: 'Nenhum registro encontrado',
            emptyTable: 'Nenhum dado disponível na tabela',
            loadingRecords: 'Carregando...',
            processing: 'Processando...',
            paginate: { first: 'Primeira', last: 'Última', next: 'Próxima', previous: 'Anterior' },
            buttons: { copy: 'Copiar', print: 'Imprimir', copyTitle: 'Copiado', copySuccess: { _: '%d linhas copiadas', 1: '1 linha copiada' } },
        },
    });

    let counter = 1;
    $('#addRow').on('click', function () {
        $addRowTable.row.add([
            counter + '.1',
            counter + '.2',
            counter + '.3',
            counter + '.4',
            counter + '.5'
        ]).draw(false);
        counter++;
    });

});
