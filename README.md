# Vyzor — cópia local do frontend público

Preparado por [[Dominic]] para Theus em 13/09/2026.

Fonte: https://preview.sprukomarket.com/html/bootstrap/vyzor/dist/html/index.html

## Abrir

O mapa mental está em `../mapa-arquitetura.html`. Ele é independente de bibliotecas e pode ser aberto diretamente. Para navegar pelo clone com carregamento correto de fontes e JSON, abra o Terminal na pasta extraída do pacote e execute:

```sh
node vyzor-local/servir.mjs
```

Requer Node.js 18 ou superior, sem instalar dependências. Abra:

- Mapa: http://127.0.0.1:4173/
- Site: http://127.0.0.1:4173/vyzor-local/html/index.html

O servidor atende somente em `127.0.0.1`. Encerre com Ctrl+C. Para outra porta: `VYZOR_PORT=4174 node vyzor-local/servir.mjs`.

## O que foi copiado

- As **180 páginas HTML** encontradas nos links da demonstração, incluindo as páginas dos menus recolhidos.
- HTML de abas, menus, modais, formulários, cards, tabelas e demais componentes presentes nessas páginas.
- CSS, JavaScript, fontes, ícones, imagens e bibliotecas públicas referenciadas e obtidas.
- Configuração e dados demonstrativos dos gráficos, preservando as bibliotecas e os scripts originais.
- Recursos identificados em execução: avatares do Select2, marcadores Leaflet e JSON do seletor de emojis do chat.
- Fontes Google, jQuery, Select2, DataTables e outras dependências estáticas de CDN foram localizadas no pacote.

A cópia abrange as rotas públicas vinculadas a esse preview HTML/Bootstrap. Não é uma enumeração de URLs não vinculadas ou de outras versões comerciais do template. Conteúdo e opções embutidos são preservados; não foi acionada cada combinação possível de interações, temas, estados e larguras das 180 páginas.

## Organização

```text
mapa-arquitetura.html     Mapa interativo, explicações e busca das 180 telas
mapa-arquitetura.svg      Mapa vetorial para compartilhar ou imprimir
mapa-arquitetura.opml     Árvore editável para ferramentas que importam OPML
arquitetura.md            Estudo em texto e inventário com links
vyzor-local/
  html/                  Páginas com o HTML da demo decodificado para estudo
  assets/css/            Estilos e fontes de ícones
  assets/js/             Scripts comuns e scripts por tela
  assets/libs/           Bibliotecas da demonstração
  assets/images/         Imagens públicas obtidas
  assets/external/       Recursos estáticos provenientes de CDNs
  originais/             HTML recebido e arquivos alterados preservados
  manifesto.json         URL de origem, tamanho, hashes e ajustes de cada arquivo
  navegacao.json         Hierarquia de menus extraída do HTML
  inventario-telas.json  As 180 telas com área, nome e caminho
  verificacao.json       Checagem de referências e integridade dos arquivos
  verificacao-browser.json  Registro da validação no Chrome
  verificar.mjs          Repetir a checagem estática
  servir.mjs             Servidor local sem dependências
```

A árvore acima começa na raiz do ZIP. Os diretórios de imagens, bibliotecas e código pertencem ao Vyzor. O mapa, o estudo, os relatórios e o servidor local foram preparados para esta entrega.

## Fidelidade e ajustes

O HTML público usa uma codificação que o navegador transforma em marcação. A versão em `html/` foi decodificada estaticamente, sem executar o código baixado durante a conversão. Os HTMLs recebidos permanecem em `originais/html/`.

Links de recursos externos localizados foram ajustados para caminhos relativos. Os avisos de autoria foram preservados. As seguintes correções pontuais estão registradas no manifesto:

1. `blog-details.html`: `href="javascript;"` foi corrigido para `javascript:void(0);`.
2. `landing.html`: o caminho do logo `../../assets/images/brand-logos/desktop-dark.png`, que retorna 404 no preview, foi corrigido para o logo existente em `../assets/images/brand-logos/desktop-dark.png`.

Não foi reescrito o comportamento de negócio nem feita uma modernização do template.

## Verificação realizada

- Abertura das **180 páginas** no Chrome; todas apresentaram conteúdo na checagem de renderização inicial.
- Nenhuma imagem concluída com erro foi encontrada na rodada final dessas páginas. Isso não certifica imagens geradas por todas as interações possíveis.
- **230 links do menu principal** da página inicial comparados com a aba original: rótulos e destinos idênticos.
- Painel Sales conferido visualmente: **68 imagens, 2 gráficos ApexCharts e nenhum erro no console** no teste desse painel.
- **214 elementos de gráfico/canvas em 41 páginas** na passagem de renderização. É uma contagem de elementos DOM; não significa 214 jornadas testadas.
- Mapa mental conferido visualmente; ramo técnico navega para `#tecnica`; busca por CRM retorna as cinco telas esperadas; apagar a busca restaura o inventário.
- Todas as referências estáticas locais verificadas e integridade SHA-256 dos arquivos. Valores finais em `verificacao.json`.

Para repetir a checagem estática, a partir da raiz do pacote:

```sh
node vyzor-local/verificar.mjs
```

## Limites e falhas existentes na demonstração

**Backend:** não foram obtidos servidor, banco, API de negócio, credenciais privadas ou projeto de build. Os arquivos CSS mencionam fontes SCSS em comentários, mas isso não permite afirmar que o projeto de desenvolvimento foi recuperado. Login, pagamentos, compras, notificações e outras funções podem ser apenas exemplos visuais.

**Internet:** players YouTube/Vimeo e demos de mídia, mapas Google/OpenStreetMap, a consulta demonstrativa à API GitHub em Sweet Alerts e alguns avatares remotos permanecem dependentes de serviços externos. O código e os links dessas integrações foram preservados. Não se trata de uma cópia offline da internet nem de conteúdo desses serviços.

**Falhas do código original:** o console revelou `sibling is not defined` em `assets/js/task-kanban-board.js` e `tagify is not defined` em `assets/js/tagify.js`. Esses trechos foram recebidos assim e preservados; podem interromper parte das interações de Kanban e formulários avançados. Isso está separado das ausências de recursos da cópia, que foram corrigidas. Não foi declarada equivalência funcional exaustiva de todos os controles.

**Recurso indisponível:** uma URL de GIF encontrada durante a coleta (`assets/images/gif's/1.gif`) respondeu HTTP 404 na origem. A tentativa foi mantida no manifesto; não foi inventado um arquivo substituto. Não há referência estática local pendente a esse GIF na checagem final.

## Como usar o mapa para pensar

1. Escolha as áreas que realmente pertencem ao seu produto.
2. Para uma delas, descreva a decisão principal do usuário.
3. Desenhe a jornada: painel → lista → detalhe → ação.
4. Identifique componentes compartilhados.
5. Só então defina entidades, regras, API, persistência e permissões.

O mapa diferencia **observações**, **interpretação do design**, **fluxos inferidos** e **decisões futuras**. A intenção dos autores não é conhecida.

## Autoria e uso

Vyzor e seus recursos originais: Spruko e os respectivos autores das bibliotecas. A disponibilização pública do preview não concede licença adicional de uso ou redistribuição. Esta cópia preserva créditos; para uso em produto, utilize a licença correspondente do template e das dependências.
