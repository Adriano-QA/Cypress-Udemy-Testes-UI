/// <reference types="cypress"/>

import loc from '../../support/locators'
import '../../support/commandsConta'
import buildEnv from '../../support/buildEnv'

describe('Should test at a functional level', () => {

    after(() => {
        cy.clearLocalStorage()
    })

    beforeEach(() => {
        buildEnv()
        cy.login('teste@qaadriano.com.br', 'senhaerrada')
        cy.get(loc.MENU.HOME).click()
        //cy.resetApp()
    })

    it('Should create an account', () => {

        cy.route({
            method: 'POST',
            url: '/contas',
            response: [
                { id: 3, nome: "Conta teste", visivel: true, usuario_id: 1 },
            ]
        }).as('saveConta')

        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                { id: 1, nome: "Carteira", visivel: true, usuario_id: 1 },
                { id: 2, nome: "Banco", visivel: true, usuario_id: 1 },
                { id: 3, nome: "Conta teste", visivel: true, usuario_id: 1 }
            ]
        }).as('contaSave')

        cy.inserirConta('Conta teste')
        cy.get(loc.MESSAGE).should('contain', 'inserida com sucesso')
    })

    it('Should update an account', () => {

        cy.route({
            method: 'PUT',
            url: '/contas/**',
            response: [
                { id: 1, nome: "Conta Alterada", visivel: true, usuario_id: 1 }
            ]
        })

        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'atualizada com sucesso')
    })

    it('Should not create an account with same name', () => {

        cy.route({
            method: 'POST',
            url: '/contas',
            response: { error: "Já existe uma conta com esse nome!" }, 
            status:400
        }).as('saveContaMesmoNome')

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
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

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
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')


    })

    it('Should remove a transaction', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

    });

});