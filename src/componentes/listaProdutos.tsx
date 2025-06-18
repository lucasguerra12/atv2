import { Component } from "react";
import { Produto } from "../types/produto";

type Props = {
    tema: string;
    onEditarProduto: (produto: Produto) => void;
    onExcluirProduto: (id: number) => void; 
    produtos: Produto[];
}

export default class ListaProdutos extends Component<Props>{
    render() {
        const { produtos, onEditarProduto, onExcluirProduto } = this.props;

        return (
            <div className="w-full px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold content-header">Lista de Produtos</h2>
                </div>
                <div className="card-background overflow-hidden"> 
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="table-header"> 
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nome</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Marca</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Categoria</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Preço</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Qtd. Estoque</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {produtos.map((produto) => (
                                <tr key={produto.id} className="table-row-hover"> 
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{produto.nome}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        R$ {produto.preco.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => onEditarProduto(produto)}
                                            className="btn-secondary mr-4" 
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => onExcluirProduto(produto.id as number)}
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