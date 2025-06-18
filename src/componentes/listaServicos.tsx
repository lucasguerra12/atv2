
import { Component } from "react";
import { Servico } from "../types/servico";

type Props = {
    tema: string;
    onEditarServico: (servico: Servico) => void;
    onExcluirServico: (id: number) => void; 
    servicos: Servico[];
}

export default class ListaServicos extends Component<Props>{
    render() {
        const { servicos, onEditarServico, onExcluirServico } = this.props;

        return (
            <div className="w-full px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold content-header">Lista de Serviços</h2>
                </div>
                <div className="card-background overflow-hidden"> 
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="table-header"> 
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nome</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Preço</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Duração Média</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Descrição</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {servicos.map((servico) => (
                                <tr key={servico.id} className="table-row-hover"> 
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{servico.nome}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        R$ {servico.preco.toFixed(2)}
                                    </td>                                
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => onEditarServico(servico)}
                                            className="btn-secondary mr-4" 
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => onExcluirServico(servico.id as number)}
                                            className="btn-secondary danger"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}