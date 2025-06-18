import { Component } from "react";
import { Consumo, TipoConsumo } from "../types/consumo";
import { Cliente } from "../types/cliente";
import { Produto } from "../types/produto";
import { Servico } from "../types/servico";

type Props = {
    tema: string;
    onSubmit: (consumo: Consumo) => void;
    clientes: Cliente[];
    produtos: Produto[];
    servicos: Servico[];
}

type State = {
    consumo: Consumo;
    clientes: Cliente[];
    produtos: Produto[];
    servicos: Servico[];
}

export default class FormularioCadastroConsumo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            consumo: {
                cliente: {} as Cliente,
                tipo: "produto",
                quantidade: 1,
                data: new Date(),
                valor: 0
            },
            clientes: props.clientes,
            produtos: props.produtos,
            servicos: props.servicos,
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        if (name === "cliente") {
            const clienteId = parseInt(value);
            const cliente = this.state.clientes.find(c => c.id === clienteId);
            
            this.setState(prevState => ({
                consumo: {
                    ...prevState.consumo,
                    cliente: cliente || {} as Cliente,
                },
            }));
        }
        else if (name === "tipo") {
            this.setState(prevState => ({
                consumo: {
                    ...prevState.consumo,
                    tipo: value as TipoConsumo,
                    produto: undefined,
                    servico: undefined,
                    valor: 0
                }
            }));
        } else if (name === "produto") {
            const produtoId = parseInt(value);
            const produto = this.state.produtos.find(p => p.id === produtoId);
            
            this.setState(prevState => ({
                consumo: {
                    ...prevState.consumo,
                    produto,
                    servico: undefined,
                    valor: produto ? produto.preco * prevState.consumo.quantidade : 0
                }
            }));
        } else if (name === "servico") {
            const servicoId = parseInt(value);
            const servico = this.state.servicos.find(s => s.id === servicoId);
            
            this.setState(prevState => ({
                consumo: {
                    ...prevState.consumo,
                    servico,
                    produto: undefined,
                    valor: servico ? servico.preco * prevState.consumo.quantidade : 0
                }
            }));
        } else if (name === "quantidade") {
            const quantidade = parseInt(value);
            const valor = this.state.consumo.tipo === "produto" && this.state.consumo.produto
                ? this.state.consumo.produto.preco * quantidade
                : this.state.consumo.tipo === "servico" && this.state.consumo.servico
                    ? this.state.consumo.servico?.preco * quantidade 
                    : 0;
            
            this.setState(prevState => ({
                consumo: {
                    ...prevState.consumo,
                    quantidade,
                    valor
                }
            }));
        }
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.onSubmit(this.state.consumo);
    }

    render() {
        const { consumo } = this.state;

        return (
            <div className="w-full px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold content-header">Registrar Consumo</h2>
                </div>
                <form onSubmit={this.handleSubmit} className="card-background rounded-lg p-6">
                    <div className="mb-4">
                        <label htmlFor="cliente" className="block text-sm font-medium text-gray-700 mb-1">
                            Cliente
                        </label>
                        <select
                            id="cliente"
                            name="cliente"
                            value={consumo.cliente.id || ""}
                            onChange={this.handleChange}
                            required
                            className="w-full input-field" 
                        >
                            <option value="">Selecione um cliente</option>
                            {this.state.clientes.map(cliente => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo de Consumo
                        </label>
                        <select
                            id="tipo"
                            name="tipo"
                            value={consumo.tipo}
                            onChange={this.handleChange}
                            required
                            className="w-full input-field" 
                        >
                            <option value="produto">Produto</option>
                            <option value="servico">Serviço</option>
                        </select>
                    </div>

                    {consumo.tipo === "produto" ? (
                        <div className="mb-4">
                            <label htmlFor="produto" className="block text-sm font-medium text-gray-700 mb-1">
                                Produto
                            </label>
                            <select
                                id="produto"
                                name="produto"
                                value={consumo.produto?.id || ""}
                                onChange={this.handleChange}
                                required
                                className="w-full input-field" 
                            >
                                <option value="">Selecione um produto</option>
                                {this.state.produtos.map(produto => (
                                    <option key={produto.id} value={produto.id}>
                                        {produto.nome} - R$ {produto.preco.toFixed(2)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div className="mb-4">
                            <label htmlFor="servico" className="block text-sm font-medium text-gray-700 mb-1">
                                Serviço
                            </label>
                            <select
                                id="servico"
                                name="servico"
                                value={consumo.servico?.id || ""}
                                onChange={this.handleChange}
                                required
                                className="w-full input-field" 
                            >
                                <option value="">Selecione um serviço</option>
                                {this.state.servicos.map(servico => (
                                    <option key={servico.id} value={servico.id}>
                                        {servico.nome} - R$ {servico.preco.toFixed(2)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="mb-6">
                        <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700 mb-1">
                            Quantidade
                        </label>
                        <input
                            type="number"
                            id="quantidade"
                            name="quantidade"
                            value={consumo.quantidade}
                            onChange={this.handleChange}
                            required
                            min="1"
                            className="w-full input-field" 
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Valor Total
                        </label>
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"> 
                            R$ {consumo.valor.toFixed(2)}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="btn-secondary" 
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn-primary" 
                        >
                            Registrar
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}