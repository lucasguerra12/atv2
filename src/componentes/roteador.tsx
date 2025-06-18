import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import ListaProdutos from "./listaProdutos";
import FormularioCadastroProduto from "./formularioCadastroProduto";
import ListaServicos from "./listaServicos";
import FormularioCadastroServico from "./formularioCadastroServico";
import FormularioCadastroConsumo from "./formularioCadastroConsumo";
import ListaConsumos from "./listaConsumos";
import Relatorios from "./relatorios";
import { Cliente } from "../types/cliente";
import { Produto } from "../types/produto";
import { Servico } from "../types/servico";
import { Consumo } from "../types/consumo";

type State = {
    tela: string;
    clientes: Cliente[]; 
    produtos: Produto[]; 
    servicos: Servico[]; 
    consumos: Consumo[];
    cliente?: Cliente; 
    produto?: Produto;  
    servico?: Servico; 
}

export default class Roteador extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            tela: "Clientes-Listar",
            clientes: [
                { id: 1, nome: "Ana Paula Silva", cpf: "111.111.111-11", rg: "11.111.111-1", dataCadastro: new Date("2023-01-15"), telefone: "(11) 98765-4321" },
                { id: 2, nome: "Bruno Costa Oliveira", cpf: "222.222.222-22", rg: "22.222.222-2", dataCadastro: new Date("2023-02-20"), telefone: "(11) 99876-5432" },
            ],produtos: [
                { id: 1, nome: "Shampoo Hidratante", quantidade: 10 ,preco: 45.00 },
                { id: 2, nome: "Condicionador Reconstrutor", preco: 40.00, quantidade: 10 },
                { id: 3, nome: "Esmalte Vermelho", preco: 10.00, quantidade: 10 },
            ],
            servicos: [
                { id: 1, nome: "Corte Feminino", preco: 80.00 },
                { id: 2, nome: "Manicure", preco: 35.00},
                { id: 3, nome: "Escova Progressiva", preco: 250.00},
            ],
            consumos: [
                { id: 1, cliente: { id: 1, nome: "Ana Paula Silva", cpf: "111.111.111-11", rg: "11.111.111-1", dataCadastro: new Date("2023-01-15"), telefone: "(11) 98765-4321" }, tipo: "servico", servico: { id: 1, nome: "Corte Feminino", preco: 80.00 }, quantidade: 1, data: new Date("2024-06-10"), valor: 80.00 },
                { id: 2, cliente: { id: 2, nome: "Bruno Costa Oliveira", cpf: "222.222.222-22", rg: "22.222.222-2", dataCadastro: new Date("2023-02-20"), telefone: "(11) 99876-5432" }, tipo: "produto", produto: { id: 1, nome: "Shampoo Hidratante", quantidade: 10, preco: 45.00}, quantidade: 1, data: new Date("2024-06-12"), valor: 45.00 },
            ],
        };
        this.selecionarView = this.selecionarView.bind(this);
        this.handleClienteSubmit = this.handleClienteSubmit.bind(this);
        this.handleProdutoSubmit = this.handleProdutoSubmit.bind(this);
        this.handleServicoSubmit = this.handleServicoSubmit.bind(this);
        this.handleConsumoSubmit = this.handleConsumoSubmit.bind(this);
        this.handleEditarCliente = this.handleEditarCliente.bind(this);
        this.handleEditarProduto = this.handleEditarProduto.bind(this);
        this.handleEditarServico = this.handleEditarServico.bind(this);
        this.handleExcluirCliente = this.handleExcluirCliente.bind(this);
        this.handleExcluirProduto = this.handleExcluirProduto.bind(this);
        this.handleExcluirServico = this.handleExcluirServico.bind(this);
    }

    selecionarView(novaTela: string, evento?: React.MouseEvent) {
        if (evento) {
            evento.preventDefault();
        }
        this.setState({
            tela: novaTela,
            cliente: undefined,
            produto: undefined,
            servico: undefined
        });
    }

    handleClienteSubmit(cliente: Cliente) {
        this.setState(prevState => {
            if (cliente.id) {
                // Se o cliente já tem um ID, é uma edição
                const updatedClientes = prevState.clientes.map(c =>
                    c.id === cliente.id ? cliente : c
                );
                return { clientes: updatedClientes, tela: "Clientes-Listar" };
            } else {
                // Se não tem ID, é um novo cadastro
                const newId = prevState.clientes.length > 0 ? Math.max(...prevState.clientes.map(c => c.id || 0)) + 1 : 1;
                const novoClienteComId = { ...cliente, id: newId };
                return { clientes: [...prevState.clientes, novoClienteComId], tela: "Clientes-Listar" };
            }
        });
    }

    handleProdutoSubmit(produto: Produto) {
        this.setState(prevState => {
            if (produto.id) {
                // Se o produto já tem um ID, é uma edição
                const updatedProdutos = prevState.produtos.map(p =>
                    p.id === produto.id ? produto : p
                );
                return { produtos: updatedProdutos, tela: "Produtos-Listar" };
            } else {
                // Se não tem ID, é um novo cadastro
                const newId = prevState.produtos.length > 0 ? Math.max(...prevState.produtos.map(p => p.id || 0)) + 1 : 1;
                const novoProdutoComId = { ...produto, id: newId };
                return { produtos: [...prevState.produtos, novoProdutoComId], tela: "Produtos-Listar" };
            }
        });
    }

    handleServicoSubmit(servico: Servico) {
        this.setState(prevState => {
            if (servico.id) {
                // Se o serviço já tem um ID, é uma edição
                const updatedServicos = prevState.servicos.map(s =>
                    s.id === servico.id ? servico : s
                );
                return { servicos: updatedServicos, tela: "Servicos-Listar" };
            } else {
                // Se não tem ID, é um novo cadastro
                const newId = prevState.servicos.length > 0 ? Math.max(...prevState.servicos.map(s => s.id || 0)) + 1 : 1;
                const novoServicoComId = { ...servico, id: newId };
                return { servicos: [...prevState.servicos, novoServicoComId], tela: "Servicos-Listar" };
            }
        });
    }

    handleConsumoSubmit(consumo: Consumo) {
        this.setState(prevState => {
            // Para consumo, sempre adicionamos um novo, não editamos um existente pelo formulário de cadastro.
            const newId = prevState.consumos.length > 0 ? Math.max(...prevState.consumos.map(c => c.id || 0)) + 1 : 1;
            const novoConsumoComId = { ...consumo, id: newId };
            return { consumos: [...prevState.consumos, novoConsumoComId], tela: "Consumos-Listar" };
        });
    }

    handleEditarCliente(cliente: Cliente) {
        this.setState({
            tela: "Clientes-Cadastrar",
            cliente: cliente
        });
    }

    handleEditarProduto(produto: Produto) {
        this.setState({
            tela: "Produtos-Cadastrar",
            produto: produto
        });
    }

    handleEditarServico(servico: Servico) {
        this.setState({
            tela: "Servicos-Cadastrar",
            servico: servico
        });
    }

    handleExcluirCliente = (id: number) => { 
        this.setState(prevState => ({
            clientes: prevState.clientes.filter(cliente => cliente.id !== id)
        }));
        console.log("Cliente excluído:", id);
    }

    handleExcluirProduto = (id: number) => { 
        this.setState(prevState => ({
            produtos: prevState.produtos.filter(produto => produto.id !== id)
        }));
        console.log("Produto excluído:", id);
    }

    handleExcluirServico = (id: number) => { 
        this.setState(prevState => ({
            servicos: prevState.servicos.filter(servico => servico.id !== id)
        }));
        console.log("Serviço excluído:", id);
    }

    render() {
        let barraNavegacao = <BarraNavegacao tema="purple" seletorView={this.selecionarView} />;

        if (this.state.tela === "Clientes-Listar") {
            return (
                <>
                   {barraNavegacao}
                <ListaCliente
                    tema="purple"
                    onEditarCliente={this.handleEditarCliente}
                    clientes={this.state.clientes} 
                    onExcluirCliente={this.handleExcluirCliente} 
                />

                </>
            );
        } else if (this.state.tela === "Clientes-Cadastrar") {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroCliente tema="purple" cliente={this.state.cliente} onSubmit={this.handleClienteSubmit} />
                </>
            );
        } else if (this.state.tela === "Pets-Cadastrar") {
            return (
                <>
                    {barraNavegacao}
                </>
            );
        } else if (this.state.tela === "Produtos-Listar") {
            return (
                <>
                    {barraNavegacao}
                    <ListaProdutos
                    tema="purple"
                    onEditarProduto={this.handleEditarProduto}
                    produtos={this.state.produtos} 
                    onExcluirProduto={this.handleExcluirProduto} 
            />
                </>
            );
        } else if (this.state.tela === "Produtos-Cadastrar") {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroProduto tema="purple" produto={this.state.produto} onSubmit={this.handleProdutoSubmit} />
                </>
            );
        } else if (this.state.tela === "Servicos-Listar") {
            return (
                <>
                    {barraNavegacao}
                    <ListaServicos tema="purple" onEditarServico={this.handleEditarServico} 
                    servicos={this.state.servicos}
                    onExcluirServico={this.handleExcluirServico}/>
                </>
            );
        } else if (this.state.tela === "Servicos-Cadastrar") {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroServico tema="purple" servico={this.state.servico} onSubmit={this.handleServicoSubmit} />
                </>
            );
        } else if (this.state.tela === "Consumos-Listar") {
            return (
                <>
                    {barraNavegacao}
                    <ListaConsumos tema="purple"
                    consumos={this.state.consumos} />
                </>
            );
        } else if (this.state.tela === "Consumos-Registrar") {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroConsumo
                tema="purple"
                onSubmit={this.handleConsumoSubmit}
                clientes={this.state.clientes} 
                produtos={this.state.produtos} 
                servicos={this.state.servicos}  
            />
                </>
            );
        } else if (this.state.tela === "Relatorios-Relatorios") {
            return (
                <>
                    {barraNavegacao}
                    <Relatorios tema="purple"
                    clientes={this.state.clientes}
                    produtos={this.state.produtos} 
                    servicos={this.state.servicos} 
                    consumos={this.state.consumos} />
                </>
            );
        } else {
            return (
                <>
                    {barraNavegacao}
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold mb-4">Página em desenvolvimento</h2>
                        <p>Esta funcionalidade está sendo implementada.</p>
                    </div>
                </>
            );
        }
    }
}