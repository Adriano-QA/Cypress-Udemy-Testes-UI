/// <reference types="cypress"/>

import loc from '../../support/locators'
import '../../support/commandsConta'

describe('Should test at a functional level', () => {

    after(() => {
        cy.clearLocalStorage()
    })

   before(() => {
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

    cy.login('teste@qaadriano.com.br', 'senhaerrada')
   })

   beforeEach(() => {
    cy.get(loc.MENU.HOME).click()
    cy.resetApp()
   })
   
   

   it('Should create an account', () => {
    cy.acessarMenuConta()
    cy.inserirConta('Conta_1')
    cy.get(loc.MESSAGE).should('contain', 'inserida com sucesso')
   })

   it('Should update an account', () => {
    cy.acessarMenuConta()
    cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
    cy.get(loc.CONTAS.NOME)
        .clear()
        .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'atualizada com sucesso')    
   })

   it('Should not create an account with same name', () => {
    cy.acessarMenuConta()
    cy.inserirConta('Conta mesmo nome')
    cy.get(loc.MESSAGE).should('contain', 'code 400')
   })

   it('Should create a transaction', () => {
    cy.get(loc.MENU.MOVIMENTACAO).click()

    cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Descricao') 
    cy.get(loc.MOVIMENTACAO.VALOR).type('150')
    cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
    cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
    cy.get(loc.MOVIMENTACAO.STATUS).click()
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain','sucesso') 

    cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)

    cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Descric', '150')).should('exist')

   })

   it('Should get a balance', () => {
    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')  
    
    cy.get(loc.MENU.EXTRATO).click()
    cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
    //cy.wait(1000)
    cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
    cy.get(loc.MOVIMENTACAO.STATUS).click()
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain','sucesso')
    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')  


   })

   it('Should remove a transaction', () => {
    cy.get(loc.MENU.EXTRATO).click()
    cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
    cy.get(loc.MESSAGE).should('contain','sucesso') 

   });

});