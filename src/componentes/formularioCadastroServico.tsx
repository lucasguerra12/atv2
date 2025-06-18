import { Component } from "react";
import { Servico } from "../types/servico";

type Props = {
    tema: string;
    servico?: Servico;
    onSubmit: (servico: Servico) => void;
}

type State = {
    servico: Servico;
}

export default class FormularioCadastroServico extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            servico: props.servico || {
                nome: "",
                preco: 0,
            }
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            servico: {
                ...prevState.servico,
                [name]: name === "preco" ? parseFloat(value) || 0 : value
            }
        }));
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.onSubmit(this.state.servico);
    }

    render() {
        const { servico } = this.state;
        const isEditing = !!this.props.servico;

        return (
            <div className="w-full px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold content-header">
                        {isEditing ? "Editar Serviço" : "Cadastrar Serviço"}
                    </h2>
                </div>
                <form onSubmit={this.handleSubmit} className="card-background rounded-lg p-6"> 
                    <div className="mb-4">
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                            Nome do Serviço
                        </label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={servico.nome}
                            onChange={this.handleChange}
                            required
                            className="w-full input-field"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="preco" className="block text-sm font-medium text-gray-700 mb-1">
                            Preço (R$)
                        </label>
                        <input
                            type="number"
                            id="preco"
                            name="preco"
                            value={servico.preco}
                            onChange={this.handleChange}
                            required
                            min="0"
                            step="0.01"
                            className="w-full input-field"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="duracaoMedia" className="block text-sm font-medium text-gray-700 mb-1">
                            Duração Média (Ex: 30min, 1h30min)
                        </label>
                        <input
                            type="text"
                            id="duracaoMedia"
                            name="duracaoMedia"
                            onChange={this.handleChange}
                            className="w-full input-field" 
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
                            Descrição do Serviço
                        </label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            onChange={this.handleChange}
                            rows={3}
                            className="w-full input-field"
                        ></textarea>
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
                            {isEditing ? "Salvar Alterações" : "Cadastrar"}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}