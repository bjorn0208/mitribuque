(function () {
    'use script';

    const gridLanguagePtBr = {
        search: { placeholder: 'Pesquisar...' },
        sort: { sortAsc: 'Ordenar crescente', sortDesc: 'Ordenar decrescente' },
        pagination: { previous: 'Anterior', next: 'Próxima', navigate: (page, pages) => `Página ${page} de ${pages}`, page: (page) => `Página ${page}`, showing: 'Mostrando', of: 'de', to: 'a', results: 'resultados' },
        loading: 'Carregando...',
        noRecordsFound: 'Nenhum registro encontrado',
        error: 'Erro ao carregar os dados'
    };

    // basic example
    new gridjs.Grid({
        language: gridLanguagePtBr,
        columns: [{
            name: "Data",
            width: "150px",
        }, {
            name: "Nome",
            width: "150px",
        }, {
            name: "E-mail",
            width: "200px",
        }, {
            name: "ID",
            width: "150px",
        }, {
            name: "Preço",
            width: "100px",
        }, {
            name: "Quantidade",
            width: "100px",
        }, {
            name: "Total",
            width: "100px",
        }],
        data: [
            ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012", "$1799", "1", "$1799"],
            ["12-09-2022 04:24", "mark", "markzenner23@gmail.com", "#12013", "$2479", "2", "$4958"],
            ["18-11-2022 18:43", "eoin", "eoin1992@gmail.com", "#12014", "$769", "1", "$769"],
            ["10-09-2022 10:35", "sarahcdd", "sarahcdd129@gmail.com", "#12015", "$1299", "3", "$3997"],
            ["27-10-2022 09:55", "afshin", "afshin@example.com", "#12016", "$1449", "1", "$1449"]
        ],
    }).render(document.getElementById("grid-example1"));
    // basic example

    // with pagination
    new gridjs.Grid({
        language: gridLanguagePtBr,
        pagination: true,
        columns: [{
            name: "Data",
            width: "150px",
        }, {
            name: "Nome",
            width: "150px",
        }, {
            name: "E-mail",
            width: "200px",
        }, {
            name: "ID",
            width: "150px",
        }, {
            name: "Preço",
            width: "100px",
        }, {
            name: "Quantidade",
            width: "100px",
        }, {
            name: "Total",
            width: "100px",
        }],
        data: [
            ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012", "$1799", "1", "$1799"],
            ["12-09-2022 04:24", "mark", "markzenner23@gmail.com", "#12013", "$2479", "2", "$4958"],
            ["18-11-2022 18:43", "eoin", "eoin1992@gmail.com", "#12014", "$769", "1", "$769"],
            ["10-09-2022 10:35", "sarahcdd", "sarahcdd129@gmail.com", "#12015", "$1299", "3", "$3997"],
            ["27-10-2022 09:55", "afshin", "afshin@example.com", "#12016", "$1449", "1", "$1449"]
        ],
    }).render(document.getElementById("grid-pagination"));;
    // with pagination

    // with search
    new gridjs.Grid({
        language: gridLanguagePtBr,
        pagination: true,
        search: true,
        columns: [{
            name: "Data",
            width: "150px",
        }, {
            name: "Nome",
            width: "150px",
        }, {
            name: "E-mail",
            width: "200px",
        }, {
            name: "ID",
            width: "150px",
        }, {
            name: "Preço",
            width: "100px",
        }, {
            name: "Quantidade",
            width: "100px",
        }, {
            name: "Total",
            width: "100px",
        }],
        data: [
            ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012", "$1799", "1", "$1799"],
            ["12-09-2022 04:24", "mark", "markzenner23@gmail.com", "#12013", "$2479", "2", "$4958"],
            ["18-11-2022 18:43", "eoin", "eoin1992@gmail.com", "#12014", "$769", "1", "$769"],
            ["10-09-2022 10:35", "sarahcdd", "sarahcdd129@gmail.com", "#12015", "$1299", "3", "$3997"],
            ["27-10-2022 09:55", "afshin", "afshin@example.com", "#12016", "$1449", "1", "$1449"]
        ],
    }).render(document.getElementById("grid-search"));;
    // with search

    // with sorting
    new gridjs.Grid({
        language: gridLanguagePtBr,
        pagination: true,
        search: true,
        sort: true,
        columns: [{
            name: "Data",
            width: "150px",
        }, {
            name: "Nome",
            width: "150px",
        }, {
            name: "E-mail",
            width: "200px",
        }, {
            name: "ID",
            width: "150px",
        }, {
            name: "Preço",
            width: "100px",
        }, {
            name: "Quantidade",
            width: "100px",
        }, {
            name: "Total",
            width: "100px",
        }],
        data: [
            ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012", "$1799", "1", "$1799"],
            ["12-09-2022 04:24", "mark", "markzenner23@gmail.com", "#12013", "$2479", "2", "$4958"],
            ["18-11-2022 18:43", "eoin", "eoin1992@gmail.com", "#12014", "$769", "1", "$769"],
            ["10-09-2022 10:35", "sarahcdd", "sarahcdd129@gmail.com", "#12015", "$1299", "3", "$3997"],
            ["27-10-2022 09:55", "afshin", "afshin@example.com", "#12016", "$1449", "1", "$1449"]
        ],
    }).render(document.getElementById("grid-sorting"));;
    // with sorting

    // loading state
    new gridjs.Grid({
        language: gridLanguagePtBr,
        columns: [{
            name: "Data",
            width: "150px",
        }, {
            name: "Nome",
            width: "150px",
        }, {
            name: "E-mail",
            width: "200px",
        }, {
            name: "ID",
            width: "150px",
        }, {
            name: "Preço",
            width: "100px",
        }, {
            name: "Quantidade",
            width: "100px",
        }, {
            name: "Total",
            width: "100px",
        }],
        pagination: true,
        search: true,
        sort: true,
        data: () => {
            return new Promise(resolve => {
                setTimeout(() =>
                    resolve([
                        ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012", "$1799", "1", "$1799"],
                        ["12-09-2022 04:24", "mark", "markzenner23@gmail.com", "#12013", "$2479", "2", "$4958"],
                        ["18-11-2022 18:43", "eoin", "eoin1992@gmail.com", "#12014", "$769", "1", "$769"],
                        ["10-09-2022 10:35", "sarahcdd", "sarahcdd129@gmail.com", "#12015", "$1299", "3", "$3997"],
                        ["27-10-2022 09:55", "afshin", "afshin@example.com", "#12016", "$1449", "1", "$1449"]
                    ]), 2000);
            });
        }
    }).render(document.getElementById("grid-loading"));
    // loading state

    //wide tables
    new gridjs.Grid({
        language: gridLanguagePtBr,
        columns: [{
            name: "Data",
            width: "150px",
        }, {
            name: "Nome",
            width: "150px",
        }, {
            name: "E-mail",
            width: "200px",
        }, {
            name: "ID do pedido",
            width: "150px",
        }, {
            name: "Produto",
            width: "150px",
        }, {
            name: "Categoria",
            width: "150px",
        }, {
            name: "Preço",
            width: "100px",
        }, {
            name: "Quantidade",
            width: "100px",
        }, {
            name: "Total",
            width: "100px",
        }],
        style: {
            table: {
                'white-space': 'nowrap'
            }
        },
        resizable: true,
        sort: true,
        pagination: true,
        data: [
            ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012", "relógio inteligente", "eletrônicos", "$1799", "1", "$1799"],
            ["12-09-2022 04:24", "mark", "markzenner23@gmail.com", "#12013", "calça jeans azul", "roupas", "$2479", "2", "$4958"],
            ["18-11-2022 18:43", "eoin", "eoin1992@gmail.com", "#12014", "g phone", "celulares", "$769", "1", "$769"],
            ["10-09-2022 10:35", "sarahcdd", "sarahcdd129@gmail.com", "#12015", "fones de ouvido", "eletrônicos", "$1299", "3", "$3997"],
            ["27-10-2022 09:55", "afshin", "afshin@example.com", "#12016", "cadeira", "móveis", "$1449", "1", "$1449"]
        ],
    }).render(document.getElementById("grid-wide"));
    //wide tables

    // fixed header
    new gridjs.Grid({
        language: gridLanguagePtBr,
        pagination: true,
        search: true,
        sort: true,
        fixedHeader: true,
        height: '350px',
        columns: [{
            name: "Data",
            width: "150px",
        }, {
            name: "Nome",
            width: "150px",
        }, {
            name: "E-mail",
            width: "200px",
        }, {
            name: "ID",
            width: "150px",
        }, {
            name: "Preço",
            width: "100px",
        }, {
            name: "Quantidade",
            width: "100px",
        }, {
            name: "Total",
            width: "100px",
        }],
        data: [
            ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012", "$1799", "1", "$1799"],
            ["12-09-2022 04:24", "mark", "markzenner23@gmail.com", "#12013", "$2479", "2", "$4958"],
            ["18-11-2022 18:43", "eoin", "eoin1992@gmail.com", "#12014", "$769", "1", "$769"],
            ["10-09-2022 10:35", "sarahcdd", "sarahcdd129@gmail.com", "#12015", "$1299", "3", "$3997"],
            ["27-10-2022 09:55", "afshin", "afshin@example.com", "#12016", "$1449", "1", "$1449"],
            ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012", "$1799", "1", "$1799"],
            ["12-09-2022 04:24", "mark", "markzenner23@gmail.com", "#12013", "$2479", "2", "$4958"],
            ["18-11-2022 18:43", "eoin", "eoin1992@gmail.com", "#12014", "$769", "1", "$769"],
            ["10-09-2022 10:35", "sarahcdd", "sarahcdd129@gmail.com", "#12015", "$1299", "3", "$3997"],
            ["27-10-2022 09:55", "afshin", "afshin@example.com", "#12016", "$1449", "1", "$1449"],
            ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012", "$1799", "1", "$1799"]
        ],
    }).render(document.getElementById("grid-header-fixed"));
    // fixed header

    // hidden columns
    new gridjs.Grid({
        language: gridLanguagePtBr,
        columns: [{
            name: "Data",
            hidden: true,
        }, {
            name: "Nome",
            width: "150px",
        }, {
            name: "E-mail",
            width: "200px",
        }, {
            name: "ID",
            width: "150px",
        }, {
            name: "Preço",
            width: "100px",
        }, {
            name: "Quantidade",
            width: "100px",
        }, {
            name: "Total",
            width: "100px",
        }],
        sort: true,
        search: true,
        pagination: true,
        data: [
            ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012", "$1799", "1", "$1799"],
            ["12-09-2022 04:24", "mark", "markzenner23@gmail.com", "#12013", "$2479", "2", "$4958"],
            ["18-11-2022 18:43", "eoin", "eoin1992@gmail.com", "#12014", "$769", "1", "$769"],
            ["10-09-2022 10:35", "sarahcdd", "sarahcdd129@gmail.com", "#12015", "$1299", "3", "$3997"],
            ["27-10-2022 09:55", "afshin", "afshin@example.com", "#12016", "$1449", "1", "$1449"]
        ],
    }).render(document.getElementById("grid-hidden-column"));;
    // hidden columns

})();