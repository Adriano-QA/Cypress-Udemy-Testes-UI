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

}

export default buildEnv;