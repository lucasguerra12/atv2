import { Component } from "react";
import { Consumo } from "../types/consumo";

type Props = {
    tema: string;
    consumos: Consumo[];
}

export default class ListaConsumos extends Component<Props> {
    render() {
        const { consumos } = this.props;

        return (
            <div className="w-full px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold content-header">Lista de Consumos</h2>
                </div>
                <div className="card-background overflow-hidden"> 
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="table-header"> 
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tipo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Item</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantidade</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Data</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Valor</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {consumos.map((consumo) => (
                                <tr key={consumo.id} className="table-row-hover"> 
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{consumo.cliente.nome}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{consumo.tipo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {consumo.tipo === "produto" ? consumo.produto?.nome : consumo.servico?.nome}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{consumo.quantidade}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {consumo.data.toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        R$ {consumo.valor.toFixed(2)}
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