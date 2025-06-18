import { Component } from "react";
import { Cliente } from "../types/cliente";

type Props = {
    tema: string;
    onEditarCliente: (cliente: Cliente) => void;
    onExcluirCliente: (id: number) => void; 
    clientes: Cliente[];
}

export default class ListaCliente extends Component<Props>{
    render() {
        const { clientes, onEditarCliente, onExcluirCliente } = this.props;

        return (
            <div className="w-full px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold content-header">Lista de Clientes</h2>
                </div>
                <div className="card-background overflow-hidden"> 
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="table-header"> 
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nome</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">CPF</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">RG</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Data Cadastro</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Telefone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {clientes.map((cliente) => (
                                <tr key={cliente.id} className="table-row-hover"> 
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cliente.nome}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.cpf}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.rg}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {cliente.dataCadastro.toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.telefone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => onEditarCliente(cliente)}
                                            className="btn-secondary mr-4" 
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => onExcluirCliente(cliente.id as number)}
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