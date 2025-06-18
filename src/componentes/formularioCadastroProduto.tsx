import { Component } from "react";
import { Produto } from "../types/produto";

type Props = {
    tema: string;
    produto?: Produto;
    onSubmit: (produto: Produto) => void;
}

type State = {
    produto: Produto;
}

export default class FormularioCadastroProduto extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            produto: props.produto || {
                nome: "",
                preco: 0,
                quantidade : 10
                
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        
        this.setState(prevState => ({
            produto: {
                ...prevState.produto,
                [name]: name === 'preco' || name === 'quantidadeEstoque' ? Number(value) : value
            }
        }));
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        this.props.onSubmit(this.state.produto);
    }

    render() {
        return (
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6 content-header">
                    {this.props.produto ? 'Editar Produto' : 'Cadastrar Produto'}
                </h2>
                <form onSubmit={this.handleSubmit} className="max-w-lg mx-auto space-y-4 card-background p-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                            type="text"
                            name="nome"
                            value={this.state.produto.nome}
                            onChange={this.handleChange}
                            className="mt-1 block w-full input-field" 
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Preço</label>
                        <input
                            type="number"
                            name="preco"
                            step="0.01"
                            min="0"
                            value={this.state.produto.preco}
                            onChange={this.handleChange}
                            className="mt-1 block w-full input-field"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Quantidade em Estoque</label>
                        <input
                            type="number"
                            name="quantidadeEstoque"
                            min="0"
                            onChange={this.handleChange}
                            className="mt-1 block w-full input-field" 
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Marca</label>
                        <input
                            type="text"
                            name="marca"                        
                            onChange={this.handleChange}
                            className="mt-1 block w-full input-field"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Categoria</label>
                        <select
                            name="categoria"
                            onChange={this.handleChange}
                            className="mt-1 block w-full input-field" 
                        >
                            <option value="">Selecione uma categoria</option>
                            <option value="Cabelo">Cabelo</option>
                            <option value="Maquiagem">Maquiagem</option>
                            <option value="Pele">Pele</option>
                            <option value="Unhas">Unhas</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
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
                            {this.props.produto ? 'Atualizar' : 'Cadastrar'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}