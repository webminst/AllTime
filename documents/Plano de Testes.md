## **Plano de Testes**

O **Plano de Testes** é um documento que detalha a estratégia, os casos de teste e os critérios para a validação do software. O objetivo é garantir que o sistema funcione conforme o esperado e que esteja livre de erros.

Para a **All Time** o plano de testes da loja inclui testes para validar se o processo de compra funciona corretamente, se o login do cliente é seguro, se os produtos são exibidos de forma correta e se a busca por relógios retorna os resultados certos. Ele é a sua garantia de qualidade.

Esses artefatos transformam as ideias abstratas em especificações concretas e detalhadas, o que facilita o trabalho da equipe de desenvolvimento e aumenta a probabilidade de o projeto ser entregue com sucesso.

### **Estratégia e Escopo do Teste**

O objetivo deste plano de testes é verificar o funcionamento e a usabilidade do site **All Time**, garantindo que ele esteja pronto para ser lançado ao público. Os testes serão focados nos requisitos funcionais e não funcionais definidos anteriormente.

**Escopo:**

* **Funcionalidades Principais:**  
  * Navegação e Pesquisa de Produtos  
  * Gerenciamento de Carrinho de Compras  
  * Processo de Finalização de Compra (Checkout)  
  * Autenticação e Gerenciamento de Conta do Cliente  
* **Qualidade do Sistema:**  
  * Responsividade (em diferentes dispositivos)  
  * Desempenho (velocidade de carregamento)  
  * Segurança (transações e dados do usuário)

###  

### **Casos de Teste Detalhados**

Vamos criar casos de teste passo a passo para cada funcionalidade principal.

#### **Módulo 1: Navegação e Pesquisa de Produtos**

| ID do Teste | Funcionalidade | Cenário do Teste | Passos do Teste | Resultado Esperado |
| :---- | :---- | :---- | :---- | :---- |
| **TN-001** | Navegação por Categoria | Verificar a navegação principal por categorias. | 1\. Acessar a página inicial.  2\. Clicar em uma categoria (ex: "Relógios Analógicos"). | A página deve carregar e exibir apenas os produtos da categoria "Relógios Analógicos". |
| **TN-002** | Filtros de Produto | Testar o filtro de produtos por preço. | 1\. Acessar a página de categorias. 2\. Usar o filtro para selecionar uma faixa de preço (ex: R500−R1000). | A vitrine deve ser atualizada e mostrar apenas os produtos dentro da faixa de preço selecionada. |
| **TN-003** | Campo de Pesquisa | Testar a pesquisa por palavra-chave. | 1\. Acessar a página inicial.  2\. Digitar "dourado" na barra de pesquisa. | O site deve exibir uma lista de relógios com a palavra "dourado" no nome ou na descrição. |
| **TN-004** | Detalhes do Produto | Acessar a página de detalhes de um produto. | 1\. Acessar a página de listagem de produtos. 2\. Clicar em uma imagem de relógio. | A página de detalhes do produto deve carregar com todas as informações (descrição, preço, imagens e botão "Adicionar ao Carrinho"). |

#### **Módulo 2: Gerenciamento de Carrinho de Compras**

| ID do Teste | Funcionalidade | Cenário do Teste | Passos do Teste | Resultado Esperado |
| :---- | :---- | :---- | :---- | :---- |
| **TC-001** | Adicionar ao Carrinho | Adicionar um produto ao carrinho de compras. | 1\. Acessar a página de detalhes de um produto. 2\. Clicar no botão "Adicionar ao Carrinho". | O ícone do carrinho no cabeçalho deve ser atualizado para mostrar o novo número de itens. Uma mensagem de sucesso deve ser exibida. |
| **TC-002** | Alterar Quantidade | Aumentar a quantidade de um produto no carrinho. | 1\. Adicionar um item ao carrinho. 2\. Acessar a página do carrinho. 3\. Aumentar a quantidade do item para 2\. | O valor total do pedido deve ser atualizado para refletir o dobro do preço do produto. |
| **TC-003** | Remover do Carrinho | Remover um produto do carrinho. | 1\. Adicionar um item ao carrinho. 2\. Acessar a página do carrinho.  3\. Clicar no ícone de remover item. | O item deve ser removido da lista e o valor total deve ser recalculado. |

#### 

#### **Módulo 3: Processo de Finalização de Compra (Checkout)**

| ID do Teste | Funcionalidade | Cenário do Teste | Passos do Teste | Resultado Esperado |
| :---- | :---- | :---- | :---- | :---- |
| **TF-001** | Checkout Completo | Realizar uma compra com sucesso. | 1\. Adicionar um item ao carrinho. 2\. Acessar o carrinho e clicar em "Finalizar Compra". 3\. Preencher os dados de entrega. 4\. Inserir dados de pagamento (ex: cartão de crédito).  5\. Clicar em "Pagar". | Uma página de confirmação de pedido deve ser exibida e o cliente deve receber um e-mail de confirmação. |
| **TF-002** | Validação de Frete | Calcular o frete com base no CEP. | 1\. Adicionar um item ao carrinho. 2\. Na página do carrinho, inserir um CEP válido. | O valor do frete deve ser calculado e adicionado ao total do pedido. |
| **TF-003** | Pagamento Negado | Simular um pagamento negado. | 1\. Seguir os passos do checkout. 2\. Inserir dados de pagamento inválidos. | Uma mensagem de erro deve ser exibida, informando que o pagamento não foi aprovado. O pedido não deve ser finalizado. |

---

### 

### **Requisitos Não Funcionais (Qualidade)**

| ID do Teste | Requisito | Cenário do Teste | Passos do Teste | Resultado Esperado |
| :---- | :---- | :---- | :---- | :---- |
| **TQF-001** | Responsividade | Testar o layout em diferentes tamanhos de tela. | 1\. Acessar o site em um navegador web. 2\. Redimensionar a janela para simular um celular ou tablet. | O layout deve se adaptar fluidamente, sem barras de rolagem horizontais ou elementos quebrados. |
| **TQF-002** | Desempenho | Medir o tempo de carregamento da página. | 1\. Usar uma ferramenta de teste (como o Google Lighthouse) para medir o carregamento da página inicial. | O tempo de carregamento deve ser inferior a 3 segundos. |
| **TQF-003** | Segurança | Testar a criptografia na URL. | 1\. Acessar a página de checkout. 2\. Verificar se a URL começa com `https://`. | A conexão deve ser segura, indicada pelo `https` e pelo ícone de cadeado. |

Este plano de testes é um ótimo ponto de partida. Ele pode ser expandido com mais detalhes e cenários de teste, mas já oferece uma visão completa do que precisa ser validado para que a **All Time** seja lançada com sucesso.

