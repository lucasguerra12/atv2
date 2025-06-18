import { Component } from "react";

type props = {
    tema: string,
    seletorView: Function
}

type State = {
    menuAberto: boolean
}

export default class BarraNavegacao extends Component<props, State> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            menuAberto: false
        }
        this.gerarListaBotoes = this.gerarListaBotoes.bind(this)
        this.toggleMenu = this.toggleMenu.bind(this)
    }

    toggleMenu() {
        this.setState(prevState => ({
            menuAberto: !prevState.menuAberto
        }))
    }

    gerarListaBotoes() {
        const botoes = [
            { nome: "Clientes", submenu: ["Listar", "Cadastrar"] },
            { nome: "Produtos", submenu: ["Listar", "Cadastrar"] },
            { nome: "Servicos", submenu: ["Listar", "Cadastrar"] },
            { nome: "Consumos", submenu: ["Registrar", "Listar"] },
            { nome: "Relatorios", submenu: ["Relatorios"]}
        ]

        return botoes.map((grupo, index) => (
            <li key={index} className="relative group">
                <button className="px-4 py-2 text-white hover:bg-secondary-purple rounded-md transition-colors duration-300"> {/* Adicionado 'transition-colors' */}
                    {grupo.nome}
                </button>
                <div className="absolute left-0 top-full mt-1 w-48 bg-bg-light-surface rounded-md shadow-lg hidden group-hover:block z-50">
                    {grupo.submenu.map((item, subIndex) => (
                        <a
                            key={subIndex}
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors duration-300" // Corrigido 'hover:bg-light' para 'hover:bg-gray-200' e adicionado 'transition-colors'
                            onClick={(e) => this.props.seletorView(`<span class="math-inline">\{grupo\.nome\}\-</span>{item}`, e)}
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </li>
        ))
    }

    render() {
        return (
            <nav className="bg-primary-dark-purple shadow-md mb-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-xl font-bold text-text-light">WB BEAUTY</span>
                        </div>
                        <div className="hidden md:flex items-center">
                            <ul className="flex space-x-4">
                                {this.gerarListaBotoes()}
                            </ul>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button
                                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-secondary-purple focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-300" // Adicionado 'transition-colors' e 'duration-300' aqui também
                                type="button"
                                onClick={this.toggleMenu}
                                aria-controls="mobile-menu"
                                aria-expanded={this.state.menuAberto}
                            >
                                <span className="sr-only">Abrir menu</span>
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`md:hidden ${this.state.menuAberto ? 'block' : 'hidden'}`} id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-secondary-purple">
                        {this.gerarListaBotoes().map((item, index) => (
                            <div key={index} className="relative">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </nav>
        )
    }
}