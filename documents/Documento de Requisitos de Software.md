## **Documento de Requisitos de Software (DRS)**

O **Documento de Requisitos de Software** (DRS) é a base do nosso projeto. Ele descreve o que o sistema deve fazer, sem detalhar como ele fará. Pense nele como um contrato entre o dono do negócio e a equipe de desenvolvimento. Um DRS bem feito evita mal-entendidos e garante que o produto final atenda às suas expectativas.

Aqui estão os principais pontos que você vamos incluir no nosso DRS para a loja de relógios **All Time**:

### **Requisitos Funcionais**

São as funcionalidades que o sistema deve oferecer. Para uma loja virtual de relógios, vamos listar os seguintes:

* **Gerenciamento de Produtos:**  
  * Cadastrar, editar, excluir e listar relógios.  
  * Incluir informações como nome, descrição, preço, estoque, imagens e categorias (ex: analógico, digital, esportivo).  
* **Gerenciamento de Usuários:**  
  * Criar e gerenciar contas de clientes.  
  * Permitir login, logout e recuperação de senha.  
  * Permitir que o cliente visualize seu histórico de pedidos.  
* **Processo de Compra:**  
  * Permitir que o cliente adicione relógios ao carrinho.  
  * Calcular o valor total da compra, incluindo frete.  
  * Realizar o checkout com diferentes métodos de pagamento (cartão de crédito, Pix, boleto).  
  * Gerar e enviar confirmação de pedido para o cliente.  
* **Busca e Navegação:**  
  * Implementar um sistema de busca por palavras-chave.  
  * Permitir que os clientes naveguem pelos relógios por categoria, marca ou preço.

### **Requisitos Não Funcionais**

Esses requisitos descrevem como o sistema deve funcionar, focando em atributos de qualidade.

* **Usabilidade:** A interface deve ser intuitiva e fácil de usar. O design precisa ser responsivo, funcionando bem em computadores e dispositivos móveis.  
* **Desempenho:** As páginas devem carregar rapidamente (por exemplo, em menos de 3 segundos). O sistema deve suportar um número (10) de usuários simultâneos sem lentidão.  
* **Segurança:** Todas as transações financeiras devem ser criptografadas. As senhas dos usuários devem ser armazenadas de forma segura. O sistema deve estar protegido contra ataques comuns (ex: injeção de SQL).  
* **Confiabilidade:** O site deve estar disponível 99% do tempo. Em caso de falha, o sistema deve se recuperar rapidamente.