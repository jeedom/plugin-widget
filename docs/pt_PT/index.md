Configuração 
=============

Introdução 
=====

O plug-in de widget é um pouco especial porque não permite
criar equipamento, mas modificar a renderização (exibição) de um
comando O objetivo deste plugin é, portanto, permitir a personalização
simplesmente como exibir um valor, informações ou ação com base
de seus gostos e desejos.

Desde a versão 1.112 da Jeedom, é possível personalizar
widgets com opções específicas (criadas pelo desenvolvedor do
widget). Assim, podemos ter um widget que será exibido diferentemente de um
ordem para o outro.

Assim, podemos ter o mesmo widget escrito em azul em um pedido e em
verde em outro.

> **NOTA**
>
> Widget e lado a lado, para não confundir.
>
> O widget é a parte que cuidará da formatação e
> exibir uma informação ou pedido. Um widget deve lidar apenas com um
> único pedido ou informação.
>
> La Tuile é um agrupamento de widgets para um módulo. Este é o
> área na qual os diferentes widgets aplicados serão exibidos
> comandos e informações do módulo.

Instalando o plugin Widget 
=============================

Como em qualquer plug-in, o plug-in Widget é instalado a partir da interface
Jeedom, menu "Geral" ⇒ "Plugins"

![capture001](../images/capture001.png)

Clique no ícone verde para ir diretamente ao mercado. Neste
janela, clique em "Oficial" e, no campo de pesquisa, coloque
"Widget".

![capture002](../images/capture002.png)

Clique no ícone do plugin. Isso abre a folha de plug-ins em
que contém várias informações.

![capture003](../images/capture003.png)

Clique no botão "Instalar estável"". Uma vez instalado, o Jeedom irá
pergunte se você deseja ir para a página de configuração do plugin.
Responda sim. Na página de configuração do plugin do widget, nós
só temos uma opção para este plugin : ativar ou desativar.

Por padrão, o plug-in está desativado. Convido você a clicar no
botão verde "ativar".

A partir de agora o plug-in está ativo e operacional.

Apresentação e função básica do Widget Plugin 
=================================================

Para acessar o plug-in Widget, vá para o menu
"Plugins "⇒" Programação "⇒" Widget".

![capture005](../images/capture005.png)

Então, nós estamos na página principal do plugin. Este último tem
por padrão, vários widgets na instalação É possível
faça o download de outros no mercado ou crie seus próprios widgets
(veja abaixo).

![capture006](../images/capture006.png)

Ao clicar em um dos widgets da lista no menu à direita ou
esquerda, você abrirá a página de configuração do widget, em
que você pode modificar, veja uma prévia do widget (se o Jeedom
encontre um comando compatível) e muitas informações de configuração
como código fonte do widget

![capture007](../images/capture007.png)

> **Aviso**
>
> Se você modificar um widget que não é uma de suas criações, é
> melhor duplicá-lo para evitar perder suas alterações se o
> o widget original é atualizado.

Para mais informações sobre configuração e criação de widget, veja mais
bas.

Aplique o widget em um pedido 
------------------------------------

Para aplicar um widget em um único comando ou modificar o
aplicado, você deve ir para a página de configuração do módulo. O
O caminho para acessar o módulo difere de acordo com o tipo deste último.
Aqui estão alguns exemplos :

Para módulos Z-Wave, "Plugins" ⇒ "Protocolo de automação residencial" ⇒ "Z-wave" e, em seguida,
escolha o módulo de pedido que você deseja modificar.

![capture024](../images/capture024.png)

Na página de configuração do módulo, vá para o pedido e
clique nas rodas dentadas. Na nova janela, vá para
Guia "Visualização avançada""

![capture025](../images/capture025.png)

Aqui você pode alterar o widget aplicado aos computadores e
celulares com listas suspensas dedicadas.

![capture014](../images/capture014.png)

> **NOTA**
>
> As listas suspensas são auto-filtradas. Eles apenas fornecem
> widgets compatíveis com o tipo de comando.

Aplique o widget em vários comandos {# anchor-1}
-------------------------------------------

En cliquant sur le bouton “Appliquer sur des commandes” vous ouvrez une
janela que lista todos os comandos compatíveis com o tipo de
widget. Assim, você pode simplesmente aplicar ou remover o widget de
muitos pedidos de uma só vez.

![capture008](../images/capture008.png)

Basta verificar as ordens em que você deseja
aplicar widget

### Vários exemplos para a mesma ordem 

![Widget : badge-transparent](../images/capture009.png)

![Widget : badge](../images/capture010.png)

![Widget : ConsoIMG](../images/capture011.png)

Opções de personalização de widget 
---------------------------------------

Desde a versão 1.112 da Jeedom, é possível personalizar
widgets com opções específicas (criadas pelo desenvolvedor do
widget) e comum a todos os widgets. Para que possamos ter um widget que
será exibido de maneira diferente de um comando para outro.

Existem 2 maneiras de acessar essas opções. Pela árvore da automação residencial
que pode ser encontrado no menu "Geral" ⇒ "Resumo da automação residencial"

![capture012](../images/capture012.png)

Nesta página, você encontra todos os seus elementos de automação residencial, objetos,
módulos, comandos. Clique na pequena roda dentada para
acesse a página de configuração.

![capture013](../images/capture013.png)

Na página de configuração do módulo.

![capture015](../images/capture015.png)

### Adicionar uma opção personalizada 

Na guia "Exibição avançada", existem 2 listas suspensas que
permite alterar para o comando o widget usado em um
computador e outro para celular. Existem também outras opções,
para exibir ou não nomes e estatísticas, force uma quebra de linha
antes / depois do widget se houver vários comandos em um módulo
(quebras de linha no bloco). Finalmente, a lista de parâmetros
Widget opcional aplicado (a lista disponível está no fórum
ou Wiki, um sistema de documentos está em estudo)

![capture014](../images/capture014.png)

![exemple 1 de valeur pour afficher un compteur
específico](../ images / capture016.png)

![exemple 2 de valeur pour afficher un autre
contador](../ images / capture017.png)

> **NOTA**
>
> Para adicionar uma opção, basta clicar no botão
> "Adicionar ", digite o nome da opção com as letras minúsculas corretas
> e maiúsculas, bem como o valor a ser atribuído à opção. Para
> encontre as opções, consulte o fórum e / ou o Wiki

Configuração avançada 
---------------------

Consulte o documento no resumo da automação residencial ⇒
[Aqui](https://jeedom.github.io/core/pt_PT/display)

Criação / modificação de widget 
---------------------------------

O plugin oferece 2 possibilidades para a criação de Widgets, o modo
fácil, o que permite criar widgets básicos facilmente com um
assistente de criação e o modo avançado que também permite
modificação subsequente de todos os widgets.

> **NOTA**
>
> O modo avançado fornece flexibilidade ilimitada. No entanto, você
> deve ter algum conhecimento da linguagem de programação básica
> como HTML e CSS para a base e JavaScript para realizar
> coisas um pouco mais complexas.

### Modo de criação fácil 

Para criar um widget com o assistente, basta ir
no plugin : Menu "Plugins" ⇒ "Programação" ⇒ "Widget". De
Nesta página, clique no botão "Modo de criação fácil" na parte superior
gauche.

![capture026](../images/capture026.png)

Na nova página, você pode, na parte direita, visualizar
Ícones básicos do Jeedom, imagens importadas e
pacotes importados. No lado esquerdo, primeiro um botão para
importar pacotes ou imagens e, em seguida, 3 botões para criação de widget.

![capture027](../images/capture027.png)

-   Widget On / Off ⇒ Destinado a comandos de botão para on / off

-   Widget de Estado Simples ⇒ Destinado a comandos com feedback de status

-   Widget Digital ⇒ Destinado a comandos que enviam um valor
    digital (exemplo : Temperatura, brilho ... etc)

#### Exemplo com a criação de um widget de status 

> **NOTA**
>
> Este exemplo permanece aplicável aos outros 2 tipos de criação

Clique no botão "Simple State Widget". Chegamos na página de
configuração assistida. Você precisa atribuir um nome ao widget (nome exclusivo), o
tipo de interface, se o widget for para PC (painel) ou dispositivo móvel,
depois a biblioteca a ser usada (Jeedom, Imagem pessoal ou pacotes).

![capture028](../images/capture028.png)

Então você tem que escolher o ícone para os estados 0 e 1, assim como o
tamanho do ícone (valor em "EM" =% do tamanho original do
fonte do navegador, 1 = 100%). Feito isso, o código fonte aparece em
abaixo da área de configuração.

> **Aviso**
>
> Não modifique essas informações se você não souber o que deseja
> fazer.

Resta apenas validar para finalizar a criação do widget. Você
será automaticamente redirecionado para a página de configuração avançada que
permite aplicar o widget a vários comandos (consulte o
capítulo [Aplique o widget em vários comandos](#ancre-1))

### Criação / modificação no modo avançado 

No modo avançado, você deve ter conhecimento do idioma de
Programação "HTML", "CSS" e "JavaScript" para poder modificar
corretamente um widget.

> **NOTA**
>
> Existem vários sites em FR na web para aprender esses
> idiomas, recomendo o OpenClassRoom, que explica tudo, desde o
> Começo.

Para acessar o modo avançado, basta ir para o
plugin do widget, escolha o widget para modificar ou clique no
Botão "Adicionar widget""

#### Criando um widget 

Na página principal do plug-in, clique em "Adicionar um widget".
Jeedom pede algumas informações sobre o widget futuro.

![capture029](../images/capture029.png)

-   O nome deve ser um nome exclusivo. Portanto, verifique se esse nome não existe
    ainda não.

-   Versão, corresponde ao tipo de dispositivo a que se destina
    (PC ou celular).

-   Tipo, corresponde ao tipo de comando que usará o widget: aucun,
    informação ou ação.

-   Subtipo, fornece precisão ao tipo escolhido anteriormente.

Você pode alterar o nome, o tipo e o subtipo posteriormente. No entanto, isso
pode ter implicações se o widget já estiver aplicado a um ou
pedidos múltiplos. Portanto, é melhor evitá-lo.

##### Informações do tipo 

O tipo "info" é usado para comandos que retornam um valor,
por exemplo, um estado do módulo, um valor numérico (temperatura,
brilho, umidade etc), um texto ou qualquer outra informação.

-   Digital : para números

-   Binário : para estados liga / desliga (0/1)

-   Outro : para todos os outros tipos de informações, como textos

##### O tipo de ação 

O tipo "action" é usado para comandos que terão um
ação no Jeedom ou em equipamento externo.

-   Falha : usado para criar botões de ação

-   Slider : usado para criar controles deslizantes para edição
    valores numéricos

-   Mensagem : Usado para criar uma área de entrada de texto com um botão
    d'envoi

-   Cor : usado para criar um botão de escolha de cores

Depois de configurado, clique em "Adicionar". O Jeedom o redireciona para o
página principal de Configuração / modificação de widgets. De
lá, o widget é criado no Jeedom, mas atualmente não contém
código para exibir o comando.

![capture030](../images/capture030.png)

#### Editando um widget 

Uma vez na página principal de configuração de um widget, ele está no
A parte "código fonte" que muda de aparência se aplica.

> **Aviso**
>
> Para modificar essas informações, você precisa ter algumas bases de programação
> HTML, CSS e JavaScript. Mudanças podem ter um impacto
> importante na exibição do widget e na exibição de outros
> widgets, ou mesmo bloquear a exibição de todos os widgets.

A base (esqueleto) de um widget está em HTML. Isso permite
estruture a tela e encontre as informações de maneira mais simples.

No Jeedom para widgets, o primeiro pedaço de código a ser criado é um
"div ", que atuará como contêiner principal para todo o código do nosso
Widget.

Nesta "div", você pode encontrar até 3 sub-partes distintas :

-   A parte HTML que exibirá as informações

-   A parte CSS, que a tornará mais atraente, formatando a parte
    HTML (parte opcional)

-   A parte do JavaScript que permite trabalhar em várias ações,
    cálculos e animações

##### Código HTML 

Em vez de discursos longos, aqui está um exemplo de código básico para um
widget

**Estrutura HTML básica.**

`` `{.html}
<div>
    <center>
        <span></span>
    </center>

    <style>

    </style>

    <script>

    </script>
</div>
`` ''

A estrutura básica que esquematiza os diferentes locais no
nosso widget agora é criado. No entanto, não temos nada que
é exibido, é normal.

div

:   recipiente multifuncional relativamente versátil com retorno à
    linha atrás dele

center

:   tag que centraliza seu conteúdo

span

:   recipiente multifuncional relativamente versátil sem retorno ao
    linha atrás dele

style

:   Contêiner para código CSS que será aplicado geralmente
    (atenção, o conteúdo pode afetar todos os elementos da página)

script

:   tag que conterá JavaScript

Tal como está, é difícil fazer algo com este pouco de
código. É por isso que adicionaremos algumas opções (chamadas Atributo
em HTML) em nossas tags.

**Adição de atributos básicos.**

`` `{.html}
<div class="Doc-#id# cmd dicas cmd-widget #history#" title="" data-type="info" data-subtype="numeric" data-cmd_id="#id#" >

    <center>
        <span></span>
    </center>

    <style>

    </style>

    <script>

    </script>
</div>
`` ''

Em nosso "div" principal, adicionamos vários atributos :

id

:   O atributo "id" não é recomendado no Jeedom

> **IMPORTANTE**
>
> Certifique-se de evitar um conflito de IDs (que pode
> plantar toda a página da web), no Jeedom usamos identificações de classe e
> atributos "dados"-". Isso permite ter certeza de que, em caso de colisão,
> a página da web inteira não está travada.

class

:   Classes diferentes dos IDs não são exclusivas. Eles estão acostumados a
    aplicar um estilo definido na parte do estilo (a tag). Nós podemos
    simplesmente reproduza a mesma formatação que criamos um
    vezes e que reutilizamos por palavra-chave (classe). Aqui nós adicionamos
    várias classes básicas definidas e disponíveis no Jeedom (consulte
    classe Jeedom inferior).

        O Jeedom usa, em vez do atributo id, uma classe como id, isso torna possível tornar um elemento único na página para encontrá-lo e direcioná-lo mais facilmente. É imperativo que seu valor seja único na página. Para isso, aconselho que você use uma palavra que represente nosso elemento. No nosso exemplo, a div representa todo o nosso widget, para que possamos usar o nome do nosso widget ou uma abreviação (aqui eu escolhi Doc-). Então, para garantir que o ID da classe seja único, colocaremos uma tag "#id#" (para obter mais informações sobre tags Jeedom, veja abaixo), que fornece "Doc-#id#".

data-type

:   esse atributo permite armazenar o tipo de comando no qual
    o widget será aplicado. Seu valor deve, portanto, corresponder
    para o parâmetro type acima da área de código.

data-subtype

:   esse atributo permite armazenar o subtipo do comando no
    qual widget será aplicado. Então o seu valor
    corresponde ao parâmetro subtipo acima da área de código.

data-cmd\_id

:   Este atributo assume como valor o Tag \#id\#. É usado por
    Jeedom para a atualização do painel.

A partir daí, temos uma base que corresponde ao padrão Jeedom. É
o código minimalista necessário para ter um widget que respeite o
Regra / regra Jeedom

> **IMPORTANTE**
>
> Não se esqueça de modificar o atributo data-type e data-subttype se
> você altera esses valores na configuração do widget.

##### Código CSS 

Esta parte que é adicionada entre as 2 tags "estilo", permite
declarar regras de formatação. Esta parte é opcional porque
você pode adicionar a formatação diretamente no atributo style
uma tag ou usando JavaScript. O uso desta parte
Portanto, é uma questão de preferência separar adequadamente HTML e CSS

> **Aviso**
>
> Qualquer código declarado em tags de estilo se aplica a toda a página.
> Portanto, tenha cuidado com o seletor CSS escolhido
> usar para não alterar os outros widgets.

Para não afetar acidentalmente outros widgets por código
CSS que você vai colocar lá, eu aconselho você a usar o seletor
ID que segmenta seu widget.

Exemplo, se eu quiser colocar em vermelho o texto localizado na tag
"Span ", tenderíamos a escrever :

**Código inserido na tag Style.**

`` `{.CSS}
span{
    color: red;
}
`` ''

Mas isso mudaria a cor do texto de todos
período de páginas. Portanto, para evitar isso, adicione um seletor de ID que tenha como objetivo
seu widget para definir sua ação :

**Código inserido na tag Style e delimitado.**

`` `{.CSS}
.Doc-#id# span{
    color: red;
}
`` ''

Adicionando .Doc- \#id\# na frente do seletor de span, delimitamos o
modificação dentro do nosso widget.

##### Código JavaScript 

JavaScript é colocado entre as tags "Script". Nós usamos o
JavaScript para fazer cálculos, converter dados, animar o
widget, formate o widget, execute ações no widget
função de evento. Além do JavaScript básico, o Jeedom integra-se por
padrão várias estruturas que permitem simplificar o código
JavaScript. Portanto, podemos usar sem inicializá-los :

-   Jquery

-   UI do Jquery

-   Bootstrap

> **Aviso**
>
> Em caso de erro no código JS, ele pode bloquear todos os códigos JS
> que podem ser seguidos, seja no widget ou em outros widgets.
> Portanto, tenha cuidado ao fazer alterações.

> **Dica**
>
> Se, após salvar uma modificação do widget, a roda dentada
> contido para girar indefinidamente, você pode ter feito uma
> Erro de JS causando o travamento da continuação da execução de JS na página.
> Para poder corrigi-lo, basta passar a div
> id = jqueryLoadingDiv na exibição nenhum usando o console
> navegador, corrija o código e salve. Você também tem que fazer F5
> para atualizar a página.

### Tags Jeedom 

No Jeedom, você encontrará frequentemente tags que são nomes
cercar com "\#". O princípio de operação dessas tags é simples :
Jeedom irá substituí-los pelo valor que corresponde à tag. Tags
são tipos de variáveis (caixas) nas quais são armazenadas
valores que não conhecemos no momento da escrita do código. É
um pouco como se estivéssemos fazendo um texto com espaços em branco para colocar mais
palavras tardias que dariam significado variável ao texto.

Nem todas as tags estão disponíveis com todos os tipos de pedidos,
então aqui está a lista e seus detalhes :

\#id\#

:   ID do pedido criado por Jeedom quando o pedido foi criado
    (valor numérico único).

        Use como texto, em JS ou em atributos HTML

\#logicalId\#

:   ID do pedido lógico (pode estar vazio).

        Use como texto ou em JS

\#name\#

:   Nome do comando.

        Use como texto ou em JS

\#name\_display\#

:   Nome do comando. Para ser usado para exibir o nome do
    comando no nível do widget.

        Use como texto ou em JS

\#hideCmdName\#

:   Vazio se o nome do comando precisar ser exibido. E "exibição:none;"
    se o nome do comando não deve ser exibido.

        Use nos atributos de estilo HTML (CSS)

\#maxValue\#

:   Valor máximo que pode receber o pedido.

        Use como texto, em JS ou em atributos HTML

<!-- -->

\#valueName\#

:   Nome do comando info vinculado, se o comando action estiver vinculado a um
    comando info, nome do comando action caso contrário.

        Use como texto ou em JS

\#lastValue\#

:   Último valor do pedido (pode estar vazio).

        Use como texto ou em JS

<!-- -->

\#unite\#

:   Unidade de controle

        Use como texto ou em JS

\#collectDate\#

:   Retorna a data e hora da última atualização do widget em
    formato "aaaa-mm-dd hh:mn:ss"

        Use como texto, em JS ou no atributo title

\#state\#

:   Valor do pedido

        Use como texto ou em JS

\#displayHistory\#

:   Permite que você leve em consideração a opção "Exibir estatísticas em
    widgets "no menu" Geral "⇒" Administração "⇒" Configuração"
    Guia "Configuração do comando"". Se a opção estiver ativada, o
    a tag retornará uma exibição em branco ' : none;'

        Para ser usado no atributo "style" de uma tag html para exibir se o log estiver ativado na configuração do Jeedom

\#averageHistoryValue\#

:   Valor médio nas últimas x horas do pedido

        Use como texto ou em JS

\#minHistoryValue\#

:   Mínimo nas últimas x horas do pedido

        Use como texto ou em JS

\#maxHistoryValue\#

:   Máximo nas últimas x horas do pedido

        Use como texto ou em JS

\#tendance\#

:   Permite que o histórico do valor esteja ativado para retornar o
    classe : 'fa fa-minus ',' fa fa-arrow-up 'ou' fa fa-arrow-down '(ícone
    linha, seta para baixo, seta para cima), relacionada à tendência de valor

        Para ser usado no atributo "class" de uma tag "i"

\#history\#

:   Permite que o histórico do valor esteja ativado para retornar o
    classe : 'cursor de histórico '(consulte a classe CSS Jeedom), caso contrário
    substituído por um vácuo. A tag permite, portanto, exibir ou não o
    gráfico de histórico no painel.

        Para ser usado no atributo "class" da div principal

![Exemple de retour de valeur](../images/capture031.png)

### Classes CSS Jeedom 

cmd:   
    - Deve ser adicionado ao atributo "class" da div
    principal, essa classe permite a atualização do widget. Sem isso
    o widget de classe é atualizado apenas atualizando a página.

cmd-widget:   
    - Esta classe é recomendada porque permite adicionar alguns
    configurações CSS padrão para o widget por bom comportamento.

cursor:   
    - Permite alterar o ponteiro na mão.

history:
    - Esta classe permite alterar o ponteiro na mão e, ao clicar em
    exibir o histórico de valor do widget.

tooltips:   
    - É para o título de um elemento, em vez de ser amarelo, torna-se
    preto translúcido com texto branco

Faq 
===

Como aprender a criar um widget ?

:   O sistema de widgets é baseado nas linguagens HTML e Javascript,
    Portanto, é aconselhável assistir aos cursos (muito numerosos) em
    esses idiomas. Além disso, também é interessante ler cursos sobre
    Jquery (e Jquery mobile para a versão móvel de widgets).

Outra maneira é criar um widget de "criação fácil", para que o
plugin irá gerar automaticamente o seu código de widgets.
