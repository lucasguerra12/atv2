import { Component } from "react";
import { Cliente } from "../types/cliente";
import { Produto } from "../types/produto";
import { Servico } from "../types/servico";
import { Consumo } from "../types/consumo";

type Props = {
    tema: string;
    clientes: Cliente[];
    produtos: Produto[];
    servicos: Servico[];
    consumos: Consumo[];
}

type State = {
    selectedReport: string;
    top10ClientesQtd: Array<{ cliente: Cliente; quantidade: number }>;
    clientesPorGenero: { [genero: string]: Cliente[] };
    produtosServicosMaisConsumidosGeral: Array<{ item: Produto | Servico; quantidade: number; valorTotal: number }>;
    produtosServicosMaisConsumidosPorGenero: { [genero: string]: Array<{ item: Produto | Servico; quantidade: number; valorTotal: number }> };
    top10ClientesMenosConsumiram: Array<{ cliente: Cliente; quantidade: number }>;
    top5ClientesMaisConsumiramValor: Array<{ cliente: Cliente; valorTotal: number }>;
}

export default class Relatorios extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedReport: "top10-clientes-qtd", 
            top10ClientesQtd: [],
            clientesPorGenero: {},
            produtosServicosMaisConsumidosGeral: [],
            produtosServicosMaisConsumidosPorGenero: {},
            top10ClientesMenosConsumiram: [],
            top5ClientesMaisConsumiramValor: [],
        };
        this.calcularRelatorios = this.calcularRelatorios.bind(this);
        this.handleReportChange = this.handleReportChange.bind(this);
    }

    componentDidMount() {
        this.calcularRelatorios(this.props);
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.consumos !== this.props.consumos ||
            prevProps.clientes !== this.props.clientes ||
            prevProps.produtos !== this.props.produtos ||
            prevProps.servicos !== this.props.servicos) {
            this.calcularRelatorios(this.props);
        }
    }

    calcularRelatorios(props: Props) {
        const { clientes, produtos, servicos, consumos } = props;

        
        const consumoPorClienteQtd: { [clienteId: number]: { cliente: Cliente; quantidade: number } } = {};
        clientes.forEach(c => consumoPorClienteQtd[c.id as number] = { cliente: c, quantidade: 0 }); 
        consumos.forEach(c => {
            const clienteId = c.cliente.id as number;
            if (consumoPorClienteQtd[clienteId]) {
                 consumoPorClienteQtd[clienteId].quantidade += c.quantidade;
            }
        });
        const top10ClientesQtd = Object.values(consumoPorClienteQtd)
            .sort((a, b) => b.quantidade - a.quantidade)
            .slice(0, 10);

       
        const clientesPorGenero: { [genero: string]: Cliente[] } = {};
        
        const clientesComGenero: (Cliente & {genero?: string})[] = clientes.map(c => ({
            ...c,
            genero: (c as any).genero || (Math.random() > 0.5 ? 'Feminino' : 'Masculino')
        }));

        clientesComGenero.forEach(cliente => {
            const genero = cliente.genero || 'Não Informado';
            if (!clientesPorGenero[genero]) {
                clientesPorGenero[genero] = [];
            }
            clientesPorGenero[genero].push(cliente);
        });


        const itensConsumidosGeral: { [id: string]: { item: Produto | Servico; quantidade: number; valorTotal: number } } = {};
        consumos.forEach(c => {
            let itemId: string;
            let item: Produto | Servico | undefined;
            if (c.tipo === "produto" && c.produto) {
                itemId = `p-${c.produto.id}`;
                item = c.produto;
            } else if (c.tipo === "servico" && c.servico) {
                itemId = `s-${c.servico.id}`;
                item = c.servico;
            } else {
                return; 
            }

            if (!itensConsumidosGeral[itemId]) {
                itensConsumidosGeral[itemId] = { item: item, quantidade: 0, valorTotal: 0 };
            }
            itensConsumidosGeral[itemId].quantidade += c.quantidade;
            itensConsumidosGeral[itemId].valorTotal += c.valor;
        });
        const produtosServicosMaisConsumidosGeral = Object.values(itensConsumidosGeral)
            .sort((a, b) => b.quantidade - a.quantidade);


       
        const itensConsumidosPorGenero: { [genero: string]: { [itemId: string]: { item: Produto | Servico; quantidade: number; valorTotal: number } } } = {};
        consumos.forEach(c => {
            const clienteComGenero = clientesComGenero.find(cli => cli.id === c.cliente.id);
            const genero = (clienteComGenero as any)?.genero || 'Não Informado'; 

            if (!itensConsumidosPorGenero[genero]) {
                itensConsumidosPorGenero[genero] = {};
            }

            let itemId: string;
            let item: Produto | Servico | undefined;
            if (c.tipo === "produto" && c.produto) {
                itemId = `p-${c.produto.id}`;
                item = c.produto;
            } else if (c.tipo === "servico" && c.servico) {
                itemId = `s-${c.servico.id}`;
                item = c.servico;
            } else {
                return;
            }

            if (!itensConsumidosPorGenero[genero][itemId]) {
                itensConsumidosPorGenero[genero][itemId] = { item: item, quantidade: 0, valorTotal: 0 };
            }
            itensConsumidosPorGenero[genero][itemId].quantidade += c.quantidade;
            itensConsumidosPorGenero[genero][itemId].valorTotal += c.valor;
        });
        const produtosServicosMaisConsumidosPorGenero: { [genero: string]: Array<{ item: Produto | Servico; quantidade: number; valorTotal: number }> } = {};
        for (const genero in itensConsumidosPorGenero) {
            produtosServicosMaisConsumidosPorGenero[genero] = Object.values(itensConsumidosPorGenero[genero])
                .sort((a, b) => b.quantidade - a.quantidade);
        }

        //QUANTIDADE
        const top10ClientesMenosConsumiram = Object.values(consumoPorClienteQtd)
            .sort((a, b) => a.quantidade - b.quantidade)
            .slice(0, 10);

        //VALOR 
        const consumoPorClienteVenda: { [clienteId: number]: { cliente: Cliente; valorTotal: number } } = {};
        clientes.forEach(c => consumoPorClienteVenda[c.id as number] = { cliente: c, valorTotal: 0 }); 
        consumos.forEach(c => {
            const clienteId = c.cliente.id as number;
            if (consumoPorClienteVenda[clienteId]) {
                consumoPorClienteVenda[clienteId].valorTotal += c.valor;
            }
        });
        const top5ClientesMaisConsumiramValor = Object.values(consumoPorClienteVenda)
            .sort((a, b) => b.valorTotal - a.valorTotal)
            .slice(0, 5);


        this.setState({
            top10ClientesQtd,
            clientesPorGenero,
            produtosServicosMaisConsumidosGeral,
            produtosServicosMaisConsumidosPorGenero,
            top10ClientesMenosConsumiram,
            top5ClientesMaisConsumiramValor,
        });
    }

    handleReportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ selectedReport: e.target.value });
    }

    renderTop10ClientesQtd() {
        return (
            <div className="card-background">
                <h3 className="text-lg font-semibold px-6 py-4 bg-secondary-purple text-text-light border-b border-border-color-dark">Top 10 Clientes (Mais Consumiram em Quantidade)</h3> {/* Estilizado */}
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="table-header"> 
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cliente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantidade de Consumos</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {this.state.top10ClientesQtd.length > 0 ? (
                            this.state.top10ClientesQtd.map((item, index) => (
                                <tr key={index} className="table-row-hover"> 
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.cliente.nome}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantidade}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">Nenhum consumo registrado ainda.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    renderClientesPorGenero() {
        return (
            <div className="card-background"> 
                <h3 className="text-lg font-semibold px-6 py-4 bg-secondary-purple text-text-light border-b border-border-color-dark">Clientes por Gênero</h3> 
                {Object.keys(this.state.clientesPorGenero).length > 0 ? (
                    Object.keys(this.state.clientesPorGenero).map(genero => (
                        <div key={genero} className="mb-4 last:mb-0">
                            <h4 className="text-md font-semibold px-6 py-2 bg-gray-100 text-secondary-purple">{genero} ({this.state.clientesPorGenero[genero].length} clientes)</h4> 
                            <ul className="divide-y divide-gray-200">
                                {this.state.clientesPorGenero[genero].map((cliente, index) => (
                                    <li key={index} className="px-6 py-3 text-sm text-gray-700 hover:bg-gray-50">
                                        {cliente.nome} ({cliente.telefone})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <div className="px-6 py-4 text-center text-sm text-gray-500">Nenhum cliente com gênero definido ou dados de consumo.</div>
                )}
            </div>
        );
    }

    renderProdutosServicosMaisConsumidosGeral() {
        return (
            <div className="card-background">
                <h3 className="text-lg font-semibold px-6 py-4 bg-secondary-purple text-text-light border-b border-border-color-dark">Produtos e Serviços Mais Consumidos (Geral)</h3> 
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="table-header"> 
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Item</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tipo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantidade</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Valor Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {this.state.produtosServicosMaisConsumidosGeral.length > 0 ? (
                            this.state.produtosServicosMaisConsumidosGeral.map((item, index) => (
                                <tr key={index} className="table-row-hover"> 
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.item.nome}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {'quantidadeEstoque' in item.item ? 'Produto' : 'Serviço'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantidade}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {item.valorTotal.toFixed(2)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">Nenhum consumo de produto/serviço registrado ainda.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    renderProdutosServicosMaisConsumidosPorGenero() {
        return (
            <div className="card-background">
                <h3 className="text-lg font-semibold px-6 py-4 bg-secondary-purple text-text-light border-b border-border-color-dark">Produtos e Serviços Mais Consumidos por Gênero</h3> 
                {Object.keys(this.state.produtosServicosMaisConsumidosPorGenero).length > 0 ? (
                    Object.keys(this.state.produtosServicosMaisConsumidosPorGenero).map(genero => (
                        <div key={genero} className="mb-4 last:mb-0">
                            <h4 className="text-md font-semibold px-6 py-2 bg-gray-100 text-secondary-purple">{genero}</h4> 
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="table-header"> 
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Item</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tipo</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantidade</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Valor Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {this.state.produtosServicosMaisConsumidosPorGenero[genero].map((item, index) => (
                                        <tr key={index} className="table-row-hover">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.item.nome}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {'quantidadeEstoque' in item.item ? 'Produto' : 'Serviço'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantidade}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {item.valorTotal.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))
                ) : (
                    <div className="px-6 py-4 text-center text-sm text-gray-500">Nenhum consumo de produto/serviço por gênero registrado.</div>
                )}
            </div>
        );
    }

    renderTop10ClientesMenosConsumiram() {
        return (
            <div className="card-background"> 
                <h3 className="text-lg font-semibold px-6 py-4 bg-secondary-purple text-text-light border-b border-border-color-dark">Top 10 Clientes (Menos Consumiram em Quantidade)</h3> 
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="table-header">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cliente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantidade de Consumos</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {this.state.top10ClientesMenosConsumiram.length > 0 ? (
                            this.state.top10ClientesMenosConsumiram.map((item, index) => (
                                <tr key={index} className="table-row-hover"> 
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.cliente.nome}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantidade}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">Nenhum consumo registrado ainda.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    renderTop5ClientesMaisConsumiramValor() {
        return (
            <div className="card-background"> 
                <h3 className="text-lg font-semibold px-6 py-4 bg-secondary-purple text-text-light border-b border-border-color-dark">Top 5 Clientes (Mais Consumiram em Valor)</h3>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="table-header"> 
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cliente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Valor Total Consumido</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {this.state.top5ClientesMaisConsumiramValor.length > 0 ? (
                            this.state.top5ClientesMaisConsumiramValor.map((item, index) => (
                                <tr key={index} className="table-row-hover"> 
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.cliente.nome}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {item.valorTotal.toFixed(2)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">Nenhum consumo registrado ainda.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        return (
            <div className="w-full px-4">
                <div className="flex flex-col items-center mb-8">
                    <h2 className="text-2xl font-bold mb-6 content-header">Relatórios do Salão de Beleza</h2> 
                    <div className="w-full max-w-md">
                        <select
                            value={this.state.selectedReport}
                            onChange={this.handleReportChange}
                            className="w-full input-field appearance-none cursor-pointer text-secondary-purple font-semibold" 
                        >
                            <option value="top10-clientes-qtd">Top 10 Clientes (Mais Consumiram em Quantidade)</option>
                            <option value="clientes-por-genero">Clientes por Gênero</option>
                            <option value="produtos-servicos-mais-consumidos-geral">Produtos e Serviços Mais Consumidos (Geral)</option>
                            <option value="produtos-servicos-mais-consumidos-por-genero">Produtos e Serviços Mais Consumidos por Gênero</option>
                            <option value="top10-clientes-menos-consumiram">Top 10 Clientes (Menos Consumiram)</option>
                            <option value="top5-clientes-valor">Top 5 Clientes (Mais Consumiram em Valor)</option>
                        </select>
                    </div>
                </div>

                <div className="mt-8 space-y-8"> 
                    {this.state.selectedReport === "top10-clientes-qtd" && this.renderTop10ClientesQtd()}
                    {this.state.selectedReport === "clientes-por-genero" && this.renderClientesPorGenero()}
                    {this.state.selectedReport === "produtos-servicos-mais-consumidos-geral" && this.renderProdutosServicosMaisConsumidosGeral()}
                    {this.state.selectedReport === "produtos-servicos-mais-consumidos-por-genero" && this.renderProdutosServicosMaisConsumidosPorGenero()}
                    {this.state.selectedReport === "top10-clientes-menos-consumiram" && this.renderTop10ClientesMenosConsumiram()}
                    {this.state.selectedReport === "top5-clientes-valor" && this.renderTop5ClientesMaisConsumiramValor()}
                </div>
            </div>
        );
    }
}