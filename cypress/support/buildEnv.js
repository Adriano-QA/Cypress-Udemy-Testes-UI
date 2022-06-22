const buildEnv = () => {
    cy.server()
    cy.route({
        method: 'POST',
        url: '/signin',
        response: {
            id: 1000,
            nome: 'Usuario falso',
            token: 'Token mock'
        }
    }).as('signin')

    cy.route({
        method: 'GET',
        url: '/saldo',
        response: [{
            conta_id: 999,
            conta: 'carteira',
            saldo: "100",
        },
        {
            conta_id: 909,
            conta: 'banco',
            saldo: "14674300",
        }
        ]
    }).as('saldo')

    cy.route({
        method: 'GET',
        url: '/contas',
        response: [
            { id: 1, nome: "Carteira", visivel: true, usuario_id: 1 },
            { id: 2, nome: "Banco", visivel: true, usuario_id: 1 }
        ]
    }).as('contas')

    cy.route({
        method: 'GET',
        url: '/extrato/**',
        response: [ { "conta": "Conta para movimentacoes", "id": 1163901, "descricao": "Movimentacao para exclusao", "envolvido": "AAA", "observacao": null, "tipo": "DESP", "data_transacao": "2022-06-22T03:00:00.000Z", "data_pagamento": "2022-06-22T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 1248710, "usuario_id": 30842, "transferencia_id": null, "parcelamento_id": null },
        { "conta": "Conta com movimentacao", "id": 1163902, "descricao": "Movimentacao de conta", "envolvido": "BBB", "observacao": null, "tipo": "DESP", "data_transacao": "2022-06-22T03:00:00.000Z", "data_pagamento": "2022-06-22T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 1248711, "usuario_id": 30842, "transferencia_id": null, "parcelamento_id": null },
        { "conta": "Conta para saldo", "id": 1163903, "descricao": "Movimentacao 1, calculo saldo", "envolvido": "CCC", "observacao": null, "tipo": "REC", "data_transacao": "2022-06-22T03:00:00.000Z", "data_pagamento": "2022-06-22T03:00:00.000Z", "valor": "3500.00", "status": false, "conta_id": 1248712, "usuario_id": 30842, "transferencia_id": null, "parcelamento_id": null },
        { "conta": "Conta para saldo", "id": 1163904, "descricao": "Movimentacao 2, calculo saldo", "envolvido": "DDD", "observacao": null, "tipo": "DESP", "data_transacao": "2022-06-22T03:00:00.000Z", "data_pagamento": "2022-06-22T03:00:00.000Z", "valor": "-1000.00", "status": true, "conta_id": 1248712, "usuario_id": 30842, "transferencia_id": null, "parcelamento_id": null },
        { "conta": "Conta para saldo", "id": 1163905, "descricao": "Movimentacao 3, calculo saldo", "envolvido": "EEE", "observacao": null, "tipo": "REC", "data_transacao": "2022-06-22T03:00:00.000Z", "data_pagamento": "2022-06-22T03:00:00.000Z", "valor": "1534.00", "status": true, "conta_id": 1248712, "usuario_id": 30842, "transferencia_id": null, "parcelamento_id": null },
        { "conta": "Conta para extrato", "id": 1163906, "descricao": "Movimentacao para extrato", "envolvido": "FFF", "observacao": null, "tipo": "DESP", "data_transacao": "2022-06-22T03:00:00.000Z", "data_pagamento": "2022-06-22T03:00:00.000Z", "valor": "-220.00", "status": true, "conta_id": 1248713, "usuario_id": 30842, "transferencia_id": null, "parcelamento_id": null },
        { "conta": "Conta para extrato", "id": 1163906, "descricao": "Descric", "envolvido": "FFF", "observacao": null, "tipo": "DESP", "data_transacao": "2022-06-22T03:00:00.000Z", "data_pagamento": "2022-06-22T03:00:00.000Z", "valor": "150.00", "status": true, "conta_id": 1248713, "usuario_id": 30842, "transferencia_id": null, "parcelamento_id": null }]
    })
}

export default buildEnv;


   