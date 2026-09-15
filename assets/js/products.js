(function () {
    "use strict"

    // Sample Data
    const productsData = [
        ['SPK001', 'Smart TV 50', '../assets/images/ecommerce/png/1.png', '$699.99', 'In Stock', 'Published', '120', 'Mar 12, 2025', 'electronics'],
        ['SPK002', 'Tênis de corrida', '../assets/images/ecommerce/png/2.png', '$89.99', 'Out of Stock', 'Draft', '0', 'Mar 10, 2025', 'fashion'],
        ['SPK003', 'Mesa de jantar de madeira', '../assets/images/ecommerce/png/3.png', '$399.99', 'In Stock', 'Published', '45', 'Mar 5, 2025', 'home'],
        ['SPK004', 'Fones sem fio', '../assets/images/ecommerce/png/4.png', '$129.99', 'In Stock', 'Published', '250', 'Mar 2, 2025', 'electronics'],
        ['SPK005', 'Jaqueta de couro', '../assets/images/ecommerce/png/5.png', '$199.99', 'In Stock', 'Archived', '75', 'Feb 28, 2025', 'fashion'],
        ['SPK006', 'Cadeira de escritório', '../assets/images/ecommerce/png/7.png', '$149.99', 'Out of Stock', 'Draft', '0', 'Feb 25, 2025', 'home'],
        ['SPK007', 'Caixa de som portátil', '../assets/images/ecommerce/png/8.png', '$79.99', 'In Stock', 'Published', '300', 'Feb 20, 2025', 'electronics'],
        ['SPK008', 'Vestido de verão', '../assets/images/ecommerce/png/9.png', '$59.99', 'In Stock', 'Published', '150', 'Feb 18, 2025', 'fashion'],
        ['SPK009', 'Cafeteira', '../assets/images/ecommerce/png/10.png', '$59.99', 'In Stock', 'Published', '60', 'Feb 15, 2025', 'home'],
        ['SPK010', 'Chaleira elétrica', '../assets/images/ecommerce/png/16.png', '$39.99', 'Out of Stock', 'Archived', '0', 'Feb 10, 2025', 'electronics']
    ];

    const grid = new gridjs.Grid({
        columns: [
            {
                name: '#',
                formatter: (_, row) => gridjs.html(
                    `<input class="form-check-input" type="checkbox" id="product-${row.cells[0].data}" value="" aria-label="...">`
                )
            },
            {
                name: 'ID do produto',
                formatter: (_, row) => gridjs.html(
                    `<a href="javascript:void(0);">${row.cells[0].data}</a>`  // Correctly map to Product ID (row[0])
                )
            },
            {
                name: 'Nome do produto',
                formatter: (_, row) => gridjs.html(
                    `<a href="product-details.html">
                        <div class="d-flex align-items-center gap-3 position-relative">
                            <div class="lh-1">
                                <span class="avatar avatar-lg bg-light">
                                    <img src="${row.cells[2].data}" alt="Product Image">
                                </span>
                            </div>
                            <div>
                                <span class="d-block fw-semibold">${row.cells[1].data}</span>
                                <span class="text-muted fs-13">${row.cells[8].data}</span>
                            </div>
                        </div>
                    </a>`
                )
            },
            'Preço',
            {
                name: 'Estoque',
                formatter: (_, row) => gridjs.html(
                    `<span class="badge bg-${row.cells[4].data === 'In Stock' ? 'success' : 'danger'}-transparent">${({ 'In Stock': 'Em estoque', 'Out of Stock': 'Esgotado' })[row.cells[4].data] || row.cells[4].data}</span>`
                )
            },
            {
                name: 'Quantidade',
                formatter: (_, row) => gridjs.html(
                    `${row.cells[6].data}` // Correctly map to Quantity (row[6])
                )
            },
            {
                name: 'Status',
                formatter: (_, row) => gridjs.html(
                    `<span class="text-${row.cells[5].data === 'Published' ? 'primary' : row.cells[5].data === 'Archived' ? 'success' : 'danger'}">${({ 'Published': 'Publicado', 'Archived': 'Arquivado', 'Draft': 'Rascunho' })[row.cells[5].data] || row.cells[5].data}</span>`
                )
            },
            'Data de cadastro',
            {
                name: 'Ações',
                formatter: (_, row) => gridjs.html(`
                    <div class="dropdown">
                        <a href="javascript:void(0);" class="btn btn-icon btn-sm btn-primary-light border" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fe fe-more-vertical"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="product-details.html"><i class="ri-eye-line me-2"></i>Ver</a></li>
                            <li><a class="dropdown-item btn-delete" href="javascript:void(0);"><i class="ri-delete-bin-line me-2"></i>Excluir</a></li>
                        </ul>
                    </div>
                `)
            }
        ],
        data: productsData,
        language: {
            search: { placeholder: 'Pesquisar...' },
            sort: { sortAsc: 'Ordenar crescente', sortDesc: 'Ordenar decrescente' },
            pagination: { previous: 'Anterior', next: 'Próxima', navigate: (page, pages) => `Página ${page} de ${pages}`, page: (page) => `Página ${page}`, showing: 'Mostrando', of: 'de', to: 'a', results: 'resultados' },
            loading: 'Carregando...',
            noRecordsFound: 'Nenhum registro encontrado',
            error: 'Erro ao carregar os dados'
        },
        pagination: true,
        search: false,
        sort: true
    }).render(document.getElementById('product-table'));

    // Filter functionality: event listeners for input and filter dropdowns
    document.getElementById('search-input').addEventListener('input', (e) => applyFilters());
    document.getElementById('category-filter').addEventListener('change', (e) => applyFilters());
    document.getElementById('status-filter').addEventListener('change', (e) => applyFilters());
    document.getElementById('stock-filter').addEventListener('change', (e) => applyFilters());
    document.getElementById('sort-filter').addEventListener('change', (e) => applyFilters());

    // Function to apply search and filter logic
    function applyFilters() {
        const searchInput = document.getElementById('search-input').value.toLowerCase();
        const categoryFilter = document.getElementById('category-filter').value;
        const statusFilter = document.getElementById('status-filter').value;
        const stockFilter = document.getElementById('stock-filter').value;
        const sortFilter = document.getElementById('sort-filter').value;

        const filteredData = productsData.filter(row => {
            const productName = row[1].toLowerCase();
            const category = row[8].toLowerCase();
            const status = row[5].toLowerCase();
            const stock = row[4].toLowerCase();

            let formattedStock = "";
            if (row[4] === "In Stock") {
                formattedStock = "in-stock";
            } else if (row[4] === "Out of Stock") {
                formattedStock = "out-of-stock";
            }

            const searchCondition = productName.includes(searchInput);
            const categoryCondition = categoryFilter === '' || categoryFilter === 'all' || category === categoryFilter;
            const statusCondition = statusFilter === '' || statusFilter === 'all' || status === statusFilter;
            const stockCondition = stockFilter === '' || stockFilter === 'all' || formattedStock === stockFilter;

            return searchCondition && categoryCondition && statusCondition && stockCondition;
        });

        if (sortFilter) {
            if (sortFilter === 'date') {
                filteredData.sort((a, b) => new Date(b[7]) - new Date(a[7]));
            } else if (sortFilter === 'price') {
                filteredData.sort((a, b) => parseFloat(b[3].replace('$', '')) - parseFloat(a[3].replace('$', '')));
            } else if (sortFilter === 'name') {
                filteredData.sort((a, b) => a[1].localeCompare(b[1]));
            }
        }

        grid.updateConfig({
            data: filteredData
        }).forceRender();

        // Handle the display of the "No matches found" row
        const gridContainer = document.getElementById('product-table');
        const tableBody = gridContainer.querySelector('.gridjs-tbody');

        // Clear previous "No matches found" row
        const notFoundElement = document.querySelector('.gridjs-notfound');
        if (notFoundElement) {
            notFoundElement.style.display = 'none';  // Hide it using JavaScript
        }

        const noMatchesRow = document.getElementById('no-matches-row');
        if (noMatchesRow) {
            noMatchesRow.remove();
        }

        // If no results after filtering, create and append a "No matches found" row
        if (filteredData.length === 0) {
            const tr = document.createElement('tr');
            tr.id = 'no-matches-row';

            // Create a single cell spanning all columns
            const td = document.createElement('td');
            td.colSpan = 9; // Adjust the colspan to match the number of columns
            td.style.textAlign = 'center';
            td.textContent = 'Nenhum registro encontrado';
            td.style.fontWeight = '500';
            td.style.color = 'var(--default-text-color)';
            td.style.padding = '12px';

            tr.appendChild(td);
            tableBody.appendChild(tr);
        }
        
    }

    // Add a listener for delete actions in the table with SweetAlert confirmation
    document.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('btn-delete')) {
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
                    // Find the row index of the product to delete
                    const rowIndex = e.target.closest('tr').rowIndex - 1; // Subtract 1 to account for the header row

                    // Remove the product from the productsData array
                    productsData.splice(rowIndex, 1);

                    // Update the grid with the new data
                    grid.updateConfig({
                        data: productsData
                    }).forceRender();

                    Swal.fire(
                        'Excluído!',
                        'O produto foi excluído.',
                        'success'
                    );
                }
            });
        }
    });

})();