## **Diagrama de Entidade-Relacionamento (DER)**

O **Diagrama de Entidade-Relacionamento** é essencial para a criação do banco de dados da loja. Ele modela a estrutura de dados, mostrando as entidades (conceitos importantes, como `Produto`, `Cliente` e `Pedido`) e os relacionamentos entre elas.

Para a **All Time** o DER define a estrutura de como os dados de relógios, clientes, carrinhos de compras e pedidos serão armazenados e conectados. Por exemplo, ele mostra que um `Cliente` pode ter vários `Pedidos` e um `Pedido` pode conter vários `Produtos`. Isso é crucial para o desenvolvimento do back-end.

### **Componentes do DER**

1. **Entidades:** São os objetos ou conceitos do mundo real que queremos armazenar. No nosso caso:  
   * **Cliente:** Quem compra os relógios.  
   * **Produto:** O relógio em si, com suas informações.  
   * **Pedido:** A compra que um cliente faz.  
   * **ItemPedido:** Representa um item específico dentro de um pedido, pois um pedido pode ter vários produtos.  
   * **Categoria:** Para agrupar relógios (ex: digital, analógico, esportivo).  
2. **Atributos:** São as características de cada entidade. Por exemplo, a entidade **Cliente** tem atributos como `nome`, `email`, `senha`, etc. O **ID** de cada entidade é a **chave primária**, que a identifica de forma única.  
3. **Relacionamentos:** As ligações entre as entidades.  
   * **Cardinalidade:** Descreve a quantidade de entidades envolvidas no relacionamento.  
     * **1:N (Um para Muitos):** Um cliente pode fazer muitos pedidos.  
     * **N:N (Muitos para Muitos):** Um pedido pode ter muitos produtos, e um produto pode estar em muitos pedidos. Esse relacionamento geralmente é quebrado por uma nova entidade, como a **ItemPedido**.

---

### **Descrição do Diagrama de Entidade-Relacionamento (DER) para "All Time"**

Vamos descrever as entidades e seus relacionamentos de forma clara.

**1\. Entidade Cliente**

* **Atributos:** `id_cliente` (PK), `nome`, `email`, `senha`, `endereco`, `data_cadastro`.  
* **Relacionamento:** `Cliente` **FAZ** `Pedido`. A cardinalidade é **1:N**, significando que um cliente pode fazer muitos pedidos, mas cada pedido pertence a apenas um cliente.

**2\. Entidade Pedido**

* **Atributos:** `id_pedido` (PK), `data_pedido`, `status`, `valor_total`, `id_cliente` (FK \- Chave Estrangeira).  
* **Relacionamento:** `Pedido` **CONTÉM** `ItemPedido`. A cardinalidade é **1:N**, pois um pedido pode ter vários itens, mas cada item pertence a apenas um pedido.  
* **Relacionamento:** `Pedido` está ligado ao `Cliente` pelo atributo `id_cliente`.

**3\. Entidade Produto**

* **Atributos:** `id_produto` (PK), `nome`, `descricao`, `preco`, `estoque`, `imagem_url`, `id_categoria` (FK).  
* **Relacionamento:** `Produto` **ESTÁ EM** `ItemPedido`. A cardinalidade é **1:N**, pois um produto pode estar em muitos itens de pedido, mas cada item de pedido se refere a apenas um produto.  
* **Relacionamento:** `Produto` **PERTENCE A** `Categoria`. A cardinalidade é **N:1**, pois muitos produtos podem pertencer a uma única categoria.

**4\. Entidade ItemPedido (Tabela de Relacionamento)**

* **Atributos:** `id_pedido` (FK), `id_produto` (FK), `quantidade`, `preco_unitario`.  
* **Relacionamento:** Esta entidade é a junção entre `Pedido` e `Produto`. Ela resolve o relacionamento de muitos para muitos (N:N), permitindo rastrear quantos de cada produto foram comprados em um pedido específico.

**5\. Entidade Categoria**

* **Atributos:** `id_categoria` (PK), `nome`.  
* **Relacionamento:** `Categoria` **TEM** `Produto`. A cardinalidade é **1:N**.

Aqui está um resumo visual das entidades e seus principais relacionamentos:

Essa estrutura garante que seu banco de dados seja consistente e eficiente, facilitando a consulta de informações como: quais produtos um cliente comprou ou quantos de um determinado relógio estão em estoque.

