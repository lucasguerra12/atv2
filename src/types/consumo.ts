import { Cliente } from "./cliente";
import { Produto } from "./produto";
import { Servico } from "./servico";

export type TipoConsumo = "produto" | "servico";

export interface Consumo {
    id?: number;
    cliente: Cliente;
    tipo: TipoConsumo;
    produto?: Produto;
    servico?: Servico;
    quantidade: number;
    data: Date;
    valor: number;
} 