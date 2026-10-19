
const queryData = {
    "1": {
        sql: `SELECT os.id_os, c.nome AS cliente, t.nome AS tecnico, os.status\nFROM ordens_servico os\nINNER JOIN clientes c ON os.id_cliente = c.id_cliente\nINNER JOIN tecnicos t ON os.id_tecnico = t.id_tecnico;`,
        headers: ["ID OS", "Cliente", "Técnico", "Status"],
        rows: [
            [1, "Carlos Silva", "Roberto Alves", "Concluído"],
            [2, "Ana Souza", "Diego Martins", "Em Aberto"],
            [3, "Bruno Lima", "Mariana Rocha", "Concluído"],
            [4, "Fernanda Costa", "Patricia Lima", "Concluído"],
            [5, "Lucas Pereira", "Gabriel Santos", "Em Aberto"]
        ]
    },
    "2": {
        sql: `SELECT id_cliente, nome, cpf, telefone, email\nFROM clientes\nWHERE nome LIKE '%Silva%';`,
        headers: ["ID", "Nome", "CPF", "Telefone", "Email"],
        rows: [
            [1, "Carlos Silva", "111.222.333-44", "(11) 98888-1111", "carlos@email.com"]
        ]
    },
    "3": {
        sql: `SELECT id_os, id_cliente, data_abertura, status, valor_mao_obra\nFROM ordens_servico\nWHERE data_abertura BETWEEN '2026-10-01' AND '2026-10-15';`,
        headers: ["ID OS", "ID Cliente", "Data Abertura", "Status", "Mão de Obra (R$)"],
        rows: [
            [1, 1, "2026-10-01", "Concluído", "150.00"],
            [2, 2, "2026-10-05", "Em Aberto", "200.00"],
            [3, 3, "2026-10-10", "Concluído", "350.00"],
            [4, 4, "2026-10-12", "Concluído", "100.00"],
            [5, 5, "2026-10-15", "Em Aberto", "120.00"]
        ]
    },
    "4": {
        sql: `SELECT status, SUM(valor_mao_obra) AS total_mao_obra\nFROM ordens_servico\nGROUP BY status;`,
        headers: ["Status", "Total Mão de Obra (R$)"],
        rows: [
            ["Concluído", "600.00"],
            ["Em Aberto", "320.00"]
        ]
    },
    "5": {
        sql: `SELECT nome, preco_unitario, qtd_estoque\nFROM pecas\nWHERE qtd_estoque < 15\nORDER BY qtd_estoque ASC;`,
        headers: ["Nome da Peça", "Preço Unitário (R$)", "Qtd Estoque"],
        rows: [
            ["Tela OLED iPhone 13", "850.00", 10]
        ]
    },
    "6": {
        sql: `SELECT os.id_os, c.nome AS cliente, \n       os.valor_mao_obra + COALESCE(SUM(op.quantidade * op.preco_aplicado), 0) AS valor_total\nFROM ordens_servico os\nJOIN clientes c ON os.id_cliente = c.id_cliente\nLEFT JOIN os_pecas op ON os.id_os = op.id_os\nGROUP BY os.id_os, c.nome, os.valor_mao_obra;`,
        headers: ["ID OS", "Cliente", "Valor Total Calculado (R$)"],
        rows: [
            [1, "Carlos Silva", "1000.00"],
            [2, "Ana Souza", "520.00"],
            [3, "Bruno Lima", "440.00"],
            [4, "Fernanda Costa", "280.00"],
            [5, "Lucas Pereira", "650.00"]
        ]
    }
};

function loadQuery() {
    const select = document.getElementById("querySelect");
    const queryKey = select.value;
    const data = queryData[queryKey];

    
    document.getElementById("sqlCode").textContent = data.sql;

    
    const container = document.getElementById("tableContainer");
    
    let tableHTML = `<table class="sql-table"><thead><tr>`;
    data.headers.forEach(header => {
        tableHTML += `<th>${header}</th>`;
    });
    tableHTML += `</tr></thead><tbody>`;

    data.rows.forEach(row => {
        tableHTML += `<tr>`;
        row.forEach(cell => {
            tableHTML += `<td>${cell}</td>`;
        });
        tableHTML += `</tr>`;
    });

    tableHTML += `</tbody></table>`;
    container.innerHTML = tableHTML;
}


document.addEventListener("DOMContentLoaded", loadQuery);