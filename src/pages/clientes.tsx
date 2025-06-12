import React, { Component } from 'react';
import { Cliente } from '../type'; 

interface ClientesState {
  clientes: Cliente[]; 
  mostrarFormulario: boolean;
}

export default class Clientes extends Component<{}, ClientesState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      clientes: [], // Inicializa a lista de clientes vazia
      mostrarFormulario: false, // O formulário estará oculto por padrão
    };

    // Vincula o 'this' para os métodos que serão passados como callback
    this.lidarComNovoCliente = this.lidarComNovoCliente.bind(this);
    this.alternarFormulario = this.alternarFormulario.bind(this);
  }

  // Método para adicionar um novo cliente à lista
  lidarComNovoCliente(novoCliente: Cliente) {
    this.setState((prevState) => ({
      clientes: [...prevState.clientes, novoCliente], // Adiciona o novo cliente ao array existente
      mostrarFormulario: false, // Oculta o formulário após o cadastro
    }));
  }

  // Método para alternar a visibilidade do formulário
  alternarFormulario() {
    this.setState((prevState) => ({
      mostrarFormulario: !prevState.mostrarFormulario,
    }));
  }

  render() {
    const { clientes, mostrarFormulario } = this.state;

    return (
      <div>
        <h1>Página de Clientes</h1>

        {/* Botão para adicionar novo cliente / Fechar formulário */}
        <button onClick={this.alternarFormulario}>
          {mostrarFormulario ? 'Cancelar Cadastro' : 'Adicionar Novo Cliente'}
        </button>

        {/* Formulário de cadastro (será implementado no próximo passo) */}
        {mostrarFormulario && (
          <p>Placeholder para o Formulário de Clientes</p>
        )}

        {/* Exibição da lista de clientes */}
        <h2>Lista de Clientes</h2>
        {clientes.length === 0 ? (
          <p>Nenhum cliente cadastrado ainda.</p>
        ) : (
          <ul>
            {clientes.map((cliente) => (
              <li key={cliente.id}>
                <strong>Nome:</strong> {cliente.nome} <br />
                <strong>Telefone:</strong> {cliente.telefone}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}