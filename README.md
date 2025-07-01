# Sistema WB - Interface Gráfica (Frontend)

Bem-vindo à documentação oficial do projeto de interface gráfica do **Sistema WB**. Este projeto foi desenvolvido para o Grupo World Beauty (WB) com o objetivo de modernizar e facilitar o uso do sistema por meio de uma interface web responsiva, intuitiva e acessível em qualquer dispositivo.

---

## 📋 Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Padrões de Desenvolvimento](#padrões-de-desenvolvimento)
- [Funcionalidades das Telas](#funcionalidades-das-telas)
- [Customização e Temas](#customização-e-temas)
- [Contribuição](#contribuição)
- [Contato](#contato)

---

## Visão Geral

O **Sistema WB** foi projetado para atender todas as franquias do Grupo World Beauty, proporcionando uma experiência moderna e eficiente para os usuários. A interface gráfica (GUI) foi construída com foco em usabilidade, responsividade e facilidade de navegação, garantindo que qualquer colaborador, independente do dispositivo, consiga operar o sistema sem dificuldades.

---

## Tecnologias Utilizadas

- **React 17+** (componentes de classe)
- **TypeScript**
- **Tailwind CSS** (responsividade e design moderno)
- **Heroicons** (ícones SVG)
- **Jest + Testing Library** (testes unitários)

> **Observação:** O projeto foi migrado do MaterializeCSS para Tailwind CSS para garantir maior flexibilidade e modernidade no design.

---

## Como Executar o Projeto

1. **Pré-requisitos:**  
   - Node.js (versão 14 ou superior)
   - npm ou yarn

2. **Instalação:**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execução:**
   ```bash
   npm start
   # ou
   yarn start
   ```

4. **Acesso:**  
   Abra o navegador e acesse [http://localhost:3000](http://localhost:3000)

---

## Estrutura do Projeto

```
src/
  componentes/
    barraNavegacao.tsx
    clientes.tsx
    formularioCadastro.tsx
    home.tsx
    listagensEspeciais.tsx
    Modal.tsx
    produtos.tsx
    roteador.tsx
    servicos.tsx
  index.tsx
  index.css
  ...
public/
  index.html
  manifest.json
  robots.txt
```

- **componentes/**: Todos os componentes React de cada tela e funcionalidade.
- **index.tsx**: Ponto de entrada da aplicação.
- **index.css**: Configuração do Tailwind CSS.

---

## Padrões de Desenvolvimento

- **Componentes de Classe:**  
  Todos os componentes React são implementados como classes, conforme padrão definido pela equipe WB.
- **Responsividade:**  
  Layout adaptável para desktop, tablets e celulares.
- **Design Moderno:**  
  Uso de cores, gradientes e ícones para uma experiência agradável.
- **Sem Backend:**  
  Este projeto é um pré-projeto de interface, sem integração com banco de dados ou APIs.

---

## Funcionalidades das Telas

- **Home:**  
  Tela inicial com navegação para Clientes, Produtos, Serviços e Listagens Especiais.

- **Clientes:**  
  - Atualizar dados do cliente
  - Excluir cliente
  - Listagens especiais (por gênero, maiores/menores consumidores, top 5, etc.)

- **Produtos:**  
  - Atualizar produto
  - Excluir produto
  - Listagem de produtos

- **Serviços:**  
  - Atualizar serviço
  - Excluir serviço
  - Listagem de serviços

- **Cadastros:**  
  - Cadastro de Cliente (formulário em etapas)
  - Cadastro de Produto
  - Cadastro de Serviço

- **Listagens Especiais:**  
  - Listagem de mais consumidos
  - Listagem por gênero

---

## Customização e Temas

- O tema principal utiliza tons de roxo e rosa, seguindo a identidade visual do Grupo WB.
- Para alterar cores ou estilos, edite o arquivo `index.css` e os utilitários Tailwind nos componentes.

---

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nome`)
3. Commit suas alterações (`git commit -am 'Adiciona nova feature'`)
4. Push para o branch (`git push origin feature/nome`)
5. Abra um Pull Request

---

**Desenvolvido para o Grupo World Beauty (WB) - 2025**  
Documentação criada para uso interno e treinamento de colaboradores.
