// =============================================================================
//  content.js — Conteúdo integral das 3 trilhas, estruturado para o app.
//  Todo o texto rico é guardado em markdown e renderizado no cliente.
//  Cada "item", "exit criteria" e "projeto" vira um nó marcável que dá XP.
// =============================================================================

const TRACKS = [
  // ===========================================================================
  //  TRILHA 1 — TÉCNICA
  // ===========================================================================
  {
    id: "tecnica",
    title: "Trilha Técnica",
    subtitle: "Da Base de Tensores à Arquitetura de Produção de IA",
    icon: "🧠",
    color: "#7c5cff",
    color2: "#22d3ee",
    tagline: "Engenharia de IA, LLMs e RAG — código primeiro, matemática just-in-time.",
    intro: `> Para um desenvolvedor backend/web migrando para engenharia de IA/LLMs **sem base matemática formal prévia**.
> Síntese do consenso de Andrew Ng, Andrej Karpathy, Jeremy Howard, Geoffrey Hinton e Yann LeCun.

**Princípios não-negociáveis:** código primeiro (*top-down*), matemática *just-in-time*, e a recusa de abstrações de alto nível antes de entender o funcionamento interno dos algoritmos.

**A ordem não é arbitrária.** O domínio de cada fase é pré-requisito *cognitivo* da próxima. Cada fase desbloqueia a seguinte. Codifique ao lado da teoria.

### O salto de paradigma: determinista → probabilístico
A transição de dev web para engenharia de IA exige reestruturar o raciocínio analítico. O dev web é **determinista**: condicionais estritas, saídas reproduzíveis. A IA opera sob um paradigma **probabilístico**: o código não dita o resultado — ele define a *arquitetura* pela qual a máquina infere padrões a partir de dados. Cada execução de um modelo generativo produz texto sutilmente distinto; abandonar a expectativa de determinismo é o primeiro salto mental.

A abordagem *top-down* ("código primeiro") é mais eficaz e motivadora para perfis de software. A compreensão duradoura vem da prática deliberada intensa, não da prova matemática exaustiva antecipada. **O código é a fonte absoluta da verdade empírica.**

> **Estimativa total:** ~12 a 20 meses até um microsserviço de IA em produção, estudando em paralelo (~10–15h/semana). Não é corrida — é a ordem que importa.`,
    phases: [
      {
        id: "tec-f0",
        code: "Fase 0",
        title: "A Base Computacional e o Idioma da IA",
        subtitle: "(pré-requisito para tudo)",
        duration: "3–5 semanas",
        body: `Antes de pensar em uma máquina aprender, é imperativo dominar a linguagem pela qual os dados são ingeridos, transformados e manipulados. O ecossistema de ML foi edificado sobre **Python** — mas o Python puro é ineficiente para operações matemáticas em larga escala, o que torna as bibliotecas fundamentais obrigatórias.

**Por que primeiro:** a carga cognitiva de aprender ML e a sintaxe de dados simultaneamente é paralisante. Separar as duas coisas — primeiro a fluência com dados, depois o aprendizado de máquina — é o que mantém a curva sustentável.`,
        items: [
          { id: "tec-f0-1", label: "Python para ML", note: "O idioma operacional do ML." },
          { id: "tec-f0-2", label: "NumPy & Pandas — tensores antes dos tensores", note: "**NumPy** introduz o conceito prático de **tensores** (matrizes multidimensionais otimizadas). Estudar **vetorização** é crucial: redes neurais processam dados em **lotes (*batches*)**, não em laços sequenciais. Internalizar isso evita construir toda a intuição futura sobre `for` loops lentos. **Pandas** — manipulação de dados tabulares: limpeza de nulos, normalização de colunas, *antes* de qualquer modelagem." },
        ],
        exit: "Você carrega um dataset real, limpa nulos, normaliza colunas e reescreve um laço `for` como operação vetorizada NumPy — **sem consultar tutorial**.",
        project: "Notebook de análise exploratória (EDA) de um dataset público, usando apenas NumPy/Pandas, com estatísticas descritivas e gráficos básicos.",
      },
      {
        id: "tec-f1",
        code: "Fase 1",
        title: "Matemática Pragmática e Just-in-Time",
        subtitle: "(prática, não orientada a provas)",
        duration: "4–6 semanas (revisitada conforme necessário)",
        body: `A ausência de base formal em cálculo **não é impedimento** se a matemática for abordada pela aplicação direta e computacional. Karpathy resume: "uma vaga lembrança do cálculo do ensino médio" + Python já basta para começar. Você programa antes de dominar a matemática, mas precisa de **entendimento intuitivo** ao chegar no *backpropagation* (Fase 3).

> **A justificativa espacial da ordem:** a **álgebra cria o espaço**, o **cálculo fornece a bússola** para navegá-lo, e a **estatística fornece a régua** para medir o sucesso.

**Por que esta ordem:** introduzir a matemática *just-in-time* — no momento em que se torna necessária — em vez de tudo de uma vez minimiza os "portões" que desmotivam, sem sacrificar o rigor.`,
        items: [
          { id: "tec-f1-1", label: "Álgebra Linear", note: "Vetores, matrizes, produtos escalares, transformações lineares; como os dados se movem pelos modelos. Redes neurais realizam **multiplicações de matrizes em paralelo**. Entender que uma matriz atua como uma *transformação do espaço de dados* é vital para visão e NLP. *(Usado pesado na Fase 3 e 5.)*" },
          { id: "tec-f1-2", label: "Cálculo Diferencial Pragmático", note: "Derivadas, gradientes, derivadas parciais e a **regra da cadeia**; como os modelos aprendem. Se a álgebra define a *estrutura*, o cálculo define a *mecânica* do aprendizado. A regra da cadeia é o motor do *backpropagation*. *(Usado na Fase 3.)*" },
          { id: "tec-f1-3", label: "Probabilidade e Estatística", note: "Distribuições (normal), valor esperado, variância, métricas; como medimos incerteza. Modelos de IA **não produzem certezas lógicas** — mapeiam distribuições de probabilidade. *(Usado na Fase 2, na amostragem de tokens da Fase 5 e na avaliação da Fase 6.)*" },
        ],
        exit: "Você explica, com suas palavras e um exemplo numérico, o que a regra da cadeia faz no backprop e por que uma matriz \"transforma o espaço\". Não precisa demonstrar teoremas.",
        project: "Implementar, em NumPy puro, gradiente descendente para minimizar uma função simples e visualizar a convergência.",
      },
      {
        id: "tec-f2",
        code: "Fase 2",
        title: "Machine Learning Clássico e a Construção da Intuição",
        subtitle: "",
        duration: "5–7 semanas",
        body: `A abordagem *top-down* defende **dominar modelos clássicos antes de saltar para *deep learning***. Classical ML ensina o que "aprender" significa sem afogar você em cálculo matricial. Andrew Ng e Jeremy Howard ambos começam aqui. Você constrói intuição para o *trade-off* viés-variância antes que as redes neurais o tornem abstrato.

**Conceitos centrais desta fase:**
- Viés vs. variância (*bias-variance tradeoff*)
- Particionamento treino / validação / teste
- Regularização e *overfitting*

**Por que primeiro:** saltar direto para redes neurais gera profissionais incapazes de diagnosticar falhas estruturais, porque elas operam como "caixas pretas". As métricas clássicas ensinam as **fundações do que significa "aprender"** — e você levará exatamente esse vocabulário (precisão, *recall*, *overfitting*) para a avaliação de LLMs na Fase 6.`,
        items: [
          { id: "tec-f2-1", label: "Aprendizado Supervisionado", note: "Aprender a partir de exemplos rotulados." },
          { id: "tec-f2-2", label: "Regressão Linear", note: "O mapeamento mais elementar entre variáveis; a ***baseline* obrigatória** contra a qual todo modelo complexo deve ser comparado." },
          { id: "tec-f2-3", label: "Regressão Logística", note: "Introduz a **função sigmoide**, convertendo saídas contínuas em probabilidades. Base da classificação binária e do que está \"por baixo do capô\" de muitas redes." },
          { id: "tec-f2-4", label: "Árvores de Decisão e Random Forests", note: "Compreensão de limites de decisão **não-lineares** sem a carga pesada do cálculo matricial (a abordagem de Howard)." },
          { id: "tec-f2-5", label: "Avaliação de Modelos", note: "Particionamento **treino / validação / teste**, métricas, *overfitting*, regularização." },
        ],
        exit: "Dado um problema tabular novo, você escolhe baseline, faz o split correto, treina, mede com a métrica certa e diagnostica se há overfitting — explicando o trade-off viés-variância no caso.",
        project: "Competição Kaggle \"for beginners\" (ex.: Titanic ou House Prices) com baseline + modelo melhorado e relatório das métricas.",
      },
      {
        id: "tec-f3",
        code: "Fase 3",
        title: "Fundamentos Microscópicos de Redes Neurais",
        subtitle: "",
        duration: "5–8 semanas",
        body: `**Transição crítica:** abandonar bibliotecas de alto nível para entender a mecânica interna. Implementar uma rede do zero garante a **visualização absoluta dos sinais de erro**. Sem isso, fenômenos como *vanishing gradient* permanecem misteriosos.`,
        items: [
          { id: "tec-f3-1", label: "Perceptron", note: "O neurônio original; a representação digital rudimentar de um neurônio. Origem histórica e conceitual." },
          { id: "tec-f3-2", label: "Funções de Ativação (ReLU, Tanh, sigmoide)", note: "Não-linearidades essenciais; sem elas, uma rede profunda **colapsaria em uma única regressão linear**. É a razão pela qual redes podem representar praticamente qualquer função." },
          { id: "tec-f3-3", label: "Gradient Descent e Backpropagation", note: "O motor do aprendizado; como o erro flui reversamente pela rede. Reconstrução **manual em código** para visualizar o fluxo do gradiente." },
          { id: "tec-f3-4", label: "Funções de Perda (MSE, Entropia Cruzada)", note: "O que \"erro\" significa." },
          { id: "tec-f3-5", label: "Otimizadores (SGD, Adam, learning-rate schedules)", note: "Como efetivamente encontrar mínimos." },
        ],
        exit: "Você implementa backprop **sem framework** e explica, olhando o código, por que o gradiente \"some\" em redes profundas e o que ReLU faz a respeito.",
        project: "🏆 Marco-chave: construir um **MLP de 2 camadas do zero** — a abordagem *micrograd* de Karpathy. Implementar a retropropagação à mão desmistifica o *vanishing gradient*.",
      },
      {
        id: "tec-f4",
        code: "Fase 4",
        title: "Sistemas de Deep Learning e Topologias de Dados",
        subtitle: "(a partir daqui, adote PyTorch)",
        duration: "6–8 semanas",
        body: `Uma vez solidificado o mecanismo de retropropagação, o estudo avança para **arquiteturas que exploram a geometria específica de cada tipo de dado**. É o momento de parar de reinventar a roda e migrar para **PyTorch** (padrão de pesquisa e indústria).

> O estudante **aprende a falhar com RNNs** para poder apreciar a solução definitiva. Essa "falha pedagógica" deliberada é o que torna a atenção, na Fase 5, uma revelação e não apenas mais uma técnica.`,
        items: [
          { id: "tec-f4-1", label: "Deep Neural Networks", note: "Profundidade, capacidade, aproximação universal." },
          { id: "tec-f4-2", label: "CNNs (Redes Convolucionais)", note: "Para imagens e sinais espaciais. Ensinam **invariância à translação**: um padrão visual mantém sua identidade independentemente da posição dos pixels. Hierarquia de features." },
          { id: "tec-f4-3", label: "RNNs, LSTMs e GRUs", note: "Para dados onde a **ordem sequencial** é vital. Estudar suas **limitações na retenção de contextos longos** é pré-requisito para entender por que a indústria as abandonou em favor do mecanismo seguinte." },
          { id: "tec-f4-4", label: "Training Tricks", note: "*batch norm*, *dropout*, *data augmentation*, inicialização." },
          { id: "tec-f4-5", label: "Experiment Tracking e reprodutibilidade", note: "Weights & Biases (ou MLflow): versionar hiperparâmetros, métricas e checkpoints. Sem isso você não sabe *qual* mudança melhorou o modelo — e isso é metade do trabalho real de ML." },
        ],
        exit: "Você treina uma CNN em PyTorch, lê a curva de loss para diagnosticar overfitting/underfitting e justifica cada *training trick* que aplicou.",
        project: "🏆 Marco-chave: treinar uma **CNN no CIFAR-10 ou MNIST**, com experimentos rastreados no W&B e um relatório comparando configurações.",
      },
      {
        id: "tec-f5",
        code: "Fase 5",
        title: "A Arquitetura Transformer e a Base dos LLMs",
        subtitle: "(ponto de convergência de todo o conhecimento anterior)",
        duration: "6–10 semanas",
        body: `**Ponto de convergência de todo o conhecimento anterior:** álgebra linear, otimização e processamento sequencial se encontram aqui.`,
        items: [
          { id: "tec-f5-1", label: "Mecanismo de Atenção (Self-Attention)", note: "Substitui o processamento passo-a-passo por uma **matriz de interações globais**. Calcula pesos de relevância de cada *token* em relação a todos os demais, permitindo a compreensão de ambiguidades contextuais. Atribui importância em vez de assumir contexto fixo." },
          { id: "tec-f5-2", label: "Arquitetura Transformer", note: "Codificadores, decodificadores, *self-attention* e ***Positional Encoding***. Como as matrizes de atenção processam tudo **em paralelo**, a ordem da sequência precisa ser **injetada matematicamente** (codificação posicional)." },
          { id: "tec-f5-3", label: "Tokenização e Embeddings", note: "Como o texto vira números: o vocabulário é fragmentado em *tokens* e projetado em **espaços de alta dimensionalidade**, onde conceitos similares ficam geometricamente próximos." },
          { id: "tec-f5-4", label: "Objetivos de Pré-treino", note: "Autorregressão, *masked LM*; como os modelos absorvem texto." },
        ],
        exit: "Você explica self-attention com uma conta de matriz no papel, descreve por que precisamos de positional encoding e ajusta temperatura/top-p entendendo o efeito na saída.",
        project: "🏆 Marco-chave: construir um **GPT do zero** — a abordagem *makemore* / *build-gpt* de Karpathy. Passo indispensável: dominar **como os tokens são amostrados probabilisticamente** (temperatura, *top-k*, *top-p*).",
      },
      {
        id: "tec-f6",
        code: "Fase 6",
        title: "LLMs, RAG e Engenharia de Aplicação (Harnesses)",
        subtitle: "(aqui a trilha SaaS engata com força)",
        duration: "8–12 semanas",
        body: `Aqui **abandonamos a criação de arquiteturas teóricas** e focamos na **extração de valor de modelos pré-treinados**. É a fase em que a trilha técnica passa a produzir algo *vendável* — e o ponto onde a trilha de negócio ganha peso decisivo.

### 6.1 — RAG, Bancos Vetoriais e Recuperação Avançada
- **RAG** injeta **fatos externos** na janela de contexto para **combater alucinações**. É a ponte entre um LLM genérico e o conhecimento proprietário que torna um produto defensável.
- **Bancos de dados vetoriais** armazenam *embeddings* e permitem busca por similaridade semântica — a espinha dorsal de qualquer pipeline RAG.
- **O que separa demo de produto:** estratégias de ***chunking*** (tamanho/sobreposição), **busca híbrida** (densa + esparsa/BM25), ***re-ranking*** (cross-encoder), e **avaliação da recuperação isoladamente** — se o RAG recupera o documento errado, nenhuma geração salva.
- **Agentes** — raciocínio multi-passo, uso de ferramentas, orquestração.

### 6.2 — Stack de Produção RAG/LLM (escolha um de cada camada e domine)
| Camada | Opções comuns |
| --- | --- |
| **Modelos abertos / serving** | Ollama (local/dev), vLLM (throughput), Hugging Face Transformers |
| **Banco vetorial** | pgvector (começo simples), Qdrant, Weaviate, Pinecone (gerenciado) |
| **Orquestração RAG/agentes** | LlamaIndex, LangChain |
| **API/serviço** | FastAPI, com filas/cache para custo e latência |
| **Observabilidade LLM** | Langfuse, Arize Phoenix (tracing de prompts, custo, latência) |
| **Avaliação** | DeepEval, Ragas, Promptfoo |

### 6.3 — Harnesses e Frameworks de Avaliação
**A diferença entre um protótipo amador e um SaaS corporativo está aqui.** Como cada execução gera texto distinto, a **avaliação sistemática é vital** — não é opcional.
| Framework | Paradigma | Caso de Uso Crítico |
| --- | --- | --- |
| **DeepEval** | Testes unitários semânticos | O "Pytest" para métricas de linguagem; ideal para **CI/CD** e coerência factual. |
| **Promptfoo** | Iteração rápida e segurança | **CLI + YAML** para testes A/B em massa de prompts e ***red-teaming***. |
| **Ragas** | Precisão de pipelines RAG | Mede ***Contextual Precision*** e ***Faithfulness***. Diagnostica se o RAG recupera o contexto certo **e** se a resposta é fiel a ele. |`,
        items: [
          { id: "tec-f6-1", label: "Arquitetura de LLMs", note: "*Decoder-only*, *encoder-decoder*, *mixture-of-experts* (MoE)." },
          { id: "tec-f6-2", label: "Finetuning Eficiente (LoRA, PEFT)", note: "*instruction tuning*. Permitem moldar **Llama / Mistral** com recursos mínimos, adaptando o modelo aos seus dados sem retreinar bilhões de parâmetros." },
          { id: "tec-f6-3", label: "Prompting Avançado", note: "Controlar o comportamento sem retreinar: ***chain-of-thought***, *few-shot*, decomposição de lógicas complexas." },
          { id: "tec-f6-4", label: "RLHF", note: "Alinhamento, segurança, intenção. Por que os modelos se comportam como assistentes polidos." },
          { id: "tec-f6-5", label: "Inferência Eficiente", note: "Quantização, *KV-cache*, *batching*; o *trade-off* latência vs. qualidade. (Base dos seus *unit economics*: custo de inferência por requisição = COGS do SaaS.)" },
          { id: "tec-f6-6", label: "RAG, Agentes e Uso de Ferramentas", note: "RAG + bancos vetoriais + chunking + busca híbrida + re-ranking + avaliação da recuperação. Ver 6.1." },
          { id: "tec-f6-7", label: "Avaliação, Harnesses e Red-Teaming", note: "Benchmarks, toxicidade, *jailbreaks*, testes sistemáticos. O vocabulário de avaliação da Fase 2 reaparece — agora aplicado a saídas de linguagem. DeepEval + Ragas + Promptfoo." },
        ],
        exit: "Você mede separadamente a qualidade da *recuperação* e da *geração*, faz um deploy travar no CI quando a Faithfulness cai, e demonstra um caso de red-teaming bloqueado por guardrail.",
        project: "🏆 Marco-chave: pipeline RAG ponta-a-ponta sobre documentos proprietários, com banco vetorial, busca híbrida + re-ranking, servido via FastAPI, observado no Langfuse e instrumentado com **DeepEval** (CI/CD), **Ragas** (Faithfulness/Contextual Precision) e **Promptfoo** (red-teaming).",
      },
      {
        id: "tec-f64",
        code: "Fase 6.4",
        title: "Segurança, Privacidade (LGPD) e Custos em Produção",
        subtitle: "(integrada à Fase 6/7)",
        duration: "2–4 semanas",
        body: `Para um produto que processa dados de clientes, isto é *gate* de venda corporativa — não detalhe técnico opcional.`,
        items: [
          { id: "tec-f64-1", label: "OWASP LLM Top 10", note: "*prompt injection*, vazamento de dados sensíveis, *insecure output handling*, envenenamento de dados. Conheça os vetores e mitigue." },
          { id: "tec-f64-2", label: "Guardrails", note: "validação de entrada/saída, *allow/deny lists*, moderação, limites de escopo." },
          { id: "tec-f64-3", label: "PII e LGPD", note: "minimização de dados, anonimização/pseudonimização antes de mandar ao modelo, cuidado redobrado com API de terceiros (onde residem os dados? há retenção?)." },
          { id: "tec-f64-4", label: "Teto de custo", note: "orçamento por requisição/usuário, *caching* de respostas, *rate limiting*, *fallback* para modelo menor. Custo de token **é** seu COGS." },
        ],
        exit: "Seu serviço tem guardrails ativos, não loga PII em claro, tem teto de custo por requisição e você aponta como ele endereça cada item relevante do OWASP LLM Top 10.",
        project: "Camada de guardrails + LGPD + teto de custo acoplada ao pipeline RAG.",
      },
      {
        id: "tec-f7",
        code: "Fase 7",
        title: "Produção, MLOps e Arquitetura de Microsserviços de IA",
        subtitle: "(casa com a Fase de Negócio 4 — incubação/captação)",
        duration: "6–10 semanas",
        body: `A passagem final: do *notebook* para a **arquitetura de produção**. Aqui o engenheiro de IA reencontra o engenheiro de backend que ele já era — agora servindo modelos probabilísticos em vez de endpoints determinísticos.`,
        items: [
          { id: "tec-f7-1", label: "MLOps e Deploy", note: "APIs, contêineres (Docker), orquestração, monitoramento, observabilidade e **otimização de custo**. Servir um modelo como **microsserviço**: isolamento, escalabilidade independente, *rate limiting*, *caching*, telemetria de qualidade em produção (reaproveitando os harnesses da Fase 6 como **monitores contínuos**)." },
          { id: "tec-f7-2", label: "Modelos de Peso Aberto", note: "Llama, Mistral, Qwen; **quando e por que** usá-los em vez de APIs proprietárias (custo, privacidade, *vendor lock-in*, customização via *finetuning*). Liga-se à decisão *Wrapper vs. Open-Weight* da trilha SaaS." },
          { id: "tec-f7-3", label: "Modelos Multimodais", note: "Visão-linguagem, áudio, IA incorporada (*embodied*)." },
        ],
        exit: "O serviço sobe com `docker compose`, tem health checks, dashboards de custo/latência/qualidade e os eval harnesses rodando como monitores em produção (não só no CI).",
        project: "🏆 Marco final: empacotar o pipeline RAG avaliado como **microsserviço conteinerizado**, com API documentada, monitoramento de custo/latência, *guardrails* e avaliação contínua em produção. O artefato técnico que sustenta o *due diligence* de captação.",
      },
    ],
    appendices: [
      {
        id: "tec-apx-a",
        title: "Apêndice A — Notas sobre as Fontes",
        body: `- **Andrew Ng** — regressão linear/logística primeiro, sem pré-requisitos de matemática, progressão estruturada.
- **Andrej Karpathy** — construir redes neurais do zero primeiro (*micrograd* → MLP → Transformer), mínimo de matemática antecipada. O código é a fonte da verdade empírica.
- **Jeremy Howard** — *random forests* antes das redes neurais; abordagem prática *top-down*.
- **Geoffrey Hinton** — matemática forte primeiro (cálculo, álgebra linear, probabilidade), depois redes neurais como o evento principal.
- **Yann LeCun** — fundação formal de matemática/física exigida antes de tocar em ML.

**Abordagem mesclada adotada:** começar com ML clássico (Ng/Howard) para intuição, depois construir redes do zero (Karpathy), com matemática *just-in-time*. Minimiza os portões desmotivadores **sem perder o rigor**.`,
      },
      {
        id: "tec-apx-b",
        title: "Apêndice B — Mapa de Portfólio (o que você terá construído)",
        body: `| Fase | Artefato público |
| --- | --- |
| 0 | Notebook de EDA (NumPy/Pandas) |
| 1 | Gradiente descendente em NumPy puro |
| 2 | Competição Kaggle iniciante (baseline + melhoria) |
| 3 | MLP + backprop do zero (micrograd) |
| 4 | CNN no CIFAR/MNIST com experimentos rastreados (W&B) |
| 5 | GPT minimalista do zero (build-gpt) |
| 6 | Pipeline RAG avaliado (DeepEval/Ragas/Promptfoo) |
| 6.4 | Camada de guardrails + LGPD + teto de custo |
| 7 | Microsserviço de IA conteinerizado em produção |`,
      },
      {
        id: "tec-apx-c",
        title: "Apêndice C — Recursos Sugeridos",
        body: `**Matemática**
- "Mathematics for Machine Learning" (Deisenroth/Faisal/Ong) — PDF gratuito.
- "Mathematics for Machine Learning and Data Science" — DeepLearning.AI.
- 3Blue1Brown — séries "Neural Networks" e "Essence of Linear Algebra".

**Python e dados**
- Automate the Boring Stuff + documentação oficial do NumPy.

**ML clássico (top-down / código primeiro)**
- Andrew Ng — Machine Learning Specialization (Coursera).
- fast.ai — "Practical Deep Learning for Coders" e "Introduction to ML for Coders".

**Fundamentos do zero**
- Andrej Karpathy — "Neural Networks: Zero to Hero" (YouTube) e build-gpt.

**Transformers**
- "The Illustrated Transformer" (Jay Alammar) + Karpathy's build-gpt.

**RAG, avaliação e produção**
- DeepEval — deepeval.com; Ragas; Promptfoo.
- LlamaIndex / LangChain docs; pgvector / Qdrant docs.
- Langfuse / Arize Phoenix (observabilidade).
- OWASP Top 10 for LLM Applications.
- "LLM Evaluation Frameworks: Head-to-Head" — Comet.`,
      },
      {
        id: "tec-apx-d",
        title: "Apêndice D — Pessoas para seguir e se inspirar",
        body: `Escolha 4–5 vozes cujo estilo combina com você e acompanhe de perto.

**Construtores-educadores (coração da abordagem "código primeiro"):**
- **Andrej Karpathy** — *Neural Networks: Zero to Hero*, micrograd, build-gpt. A espinha dorsal desta trilha.
- **Andrew Ng** — fundamentos estruturados; newsletter *The Batch*.
- **Jeremy Howard e Rachel Thomas** — fast.ai; filosofia *top-down*.
- **Sebastian Raschka** — livro *Build a LLM (From Scratch)*.

**Engenharia de LLMs em produção (Fases 6–7):**
- **Chip Huyen** — *Designing ML Systems* e *AI Engineering*.
- **Hamel Husain** — evangelista de *evals* ("seu produto de IA precisa de evals").
- **Eugene Yan** — ML aplicado e LLMs no varejo (Amazon).
- **Simon Willison** — uso prático de LLMs (criador do \`llm\`/Datasette).
- **Jay Alammar** — *The Illustrated Transformer*; explicações visuais.
- **Lilian Weng** — posts de profundidade técnica (ex-OpenAI).

**RAG / frameworks / fine-tuning:**
- **Jerry Liu** (LlamaIndex), **Harrison Chase** (LangChain).
- **Omar Khattab** — ColBERT e **DSPy**.
- **Maxime Labonne** — guias de fine-tuning e *LLM course*.
- **Philipp Schmid** — deploy e fine-tuning no ecossistema HF.

**Pesquisadores-fundadores:** Yann LeCun, Geoffrey Hinton, Yoshua Bengio, Ilya Sutskever.`,
      },
      {
        id: "tec-apx-e",
        title: "Apêndice E — Bibliografia (ampliada, por fase)",
        body: `**Fundamentos e ML clássico (Fases 0–2):**
- *The Hundred-Page Machine Learning Book* — Andriy Burkov.
- *Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow* — Aurélien Géron (3ª ed.).
- *Mathematics for Machine Learning* — Deisenroth, Faisal & Ong (PDF gratuito).

**Deep learning (Fases 3–4):**
- *Dive into Deep Learning* (d2l.ai) — livro interativo gratuito.
- *Deep Learning* — Goodfellow, Bengio & Courville (referência teórica).

**Transformers e LLMs (Fases 5–6):**
- *Build a Large Language Model (From Scratch)* — Sebastian Raschka.
- *Natural Language Processing with Transformers* — Tunstall, von Werra & Wolf.
- *Speech and Language Processing* — Jurafsky & Martin (rascunho gratuito).

**Produção, sistemas e engenharia (Fases 6.4–7):**
- *Designing Machine Learning Systems* — Chip Huyen.
- *AI Engineering* — Chip Huyen (2025).
- *Designing Data-Intensive Applications* — Martin Kleppmann.`,
      },
      {
        id: "tec-apx-f",
        title: "Apêndice F — Comunidades técnicas (online)",
        body: `- **Hugging Face** (fórum + Discord) — epicentro de modelos abertos.
- **r/LocalLLaMA** — rodar/afinar LLMs abertos localmente.
- **r/MachineLearning** e **fast.ai Forums**.
- **MLOps Community** (Slack) e **Latent Space** (podcast + comunidade).
- **EleutherAI** (Discord) — pesquisa aberta de LLMs.
- **Papers with Code**.
- **X/Twitter** — siga as pessoas do Apêndice D.

> Dica de *build in public*: publique cada projeto de portfólio com um *thread* do que aprendeu. Solidifica o aprendizado, constrói rede e alimenta a trilha SaaS.`,
      },
      {
        id: "tec-apx-g",
        title: "🔥 Apêndice G — Modo Brutal: protocolo de estudo",
        body: `Enciclopédia não se estuda, se executa. As regras abaixo são **inegociáveis**.

**As 6 regras de ferro:**
1. **Regra do "sem tutorial".** Um exit criteria só conta quando você o refaz **de memória**, com a aba do tutorial fechada. Assistir não é aprender; reproduzir é.
2. **80/20 fazendo.** 80% do tempo escrevendo código, 20% lendo/assistindo. Vídeo do Karpathy sem codar junto = Netflix técnico.
3. **Cadência de envio (*ship*).** 1 commit público/dia, 1 projeto por fase no GitHub, 1 *thread* por projeto. Código que não sai do HD não existe.
4. **Repetição espaçada.** Anki para o que reaparece: regra da cadeia, métricas, amostragem de tokens.
5. **Timebox impiedoso.** Estourou 50% do prazo? **Corta escopo**, não estende. Pronto > perfeito.
6. **Antídoto ao isolamento.** No mínimo 1 dúvida postada por semana numa comunidade.

> **A pergunta de ouro de cada semana:** *"O que eu construí esta semana que não existia na semana passada?"* Se a resposta for "assisti uns vídeos", a semana foi perdida.`,
      },
      {
        id: "tec-apx-h",
        title: "🔥 Apêndice H — Armadilhas técnicas",
        body: `- **Tutorial Hell.** Assistir infinito sem construir. Sintoma: você "sabe" 10 conceitos e não consegue implementar 1. Cura: regras 1 e 2.
- **"From scratch" eterno.** Construir do zero é pedagógico **uma vez por conceito**. Depois do backprop (Fase 3), **USE PyTorch**.
- **Framework cedo demais (o oposto).** Pular a Fase 3 e ir direto pro \`model.fit()\`. Você vira a "caixa-preta" incapaz de diagnosticar.
- **Perfeccionismo de portfólio.** Melhor 6 projetos "bons o suficiente" e públicos do que 1 obra-prima eterna no rascunho.
- **GPU FOMO.** Colab grátis, Ollama e modelos pequenos bastam até a Fase 6. Escala é problema de produção, não de aprendizado.
- **Colecionador de cursos.** Um curso por fase, terminado, vale mais que 10 intocados.

> Regra-resumo: **na dúvida, construa e publique.** O roadmap é o mapa; o GitHub é a prova.`,
      },
      {
        id: "tec-apx-refs",
        title: "🔗 Referências e links",
        body: `Fontes verificadas usadas nesta trilha. Use como ponto de partida de estudo.

1. [Karpathy's Tips for ML beginners — Scribd](https://www.scribd.com/document/735983525/Karapathy-Advice-ML)
2. [How not to do Fast.ai (or any ML MOOC) — Medium](https://medium.com/@init_27/how-not-to-do-fast-ai-or-any-ml-mooc-3d34a7e0ab8c)
3. [Introduction to Machine Learning for Coders — Fast.ai](https://www.fast.ai/posts/2018-09-26-ml-launch.html)
4. [Machine Learning Course — Fast.ai](https://course18.fast.ai/ml.html)
5. [Heroes of Deep Learning: Andrej Karpathy — DeepLearning.AI](https://www.deeplearning.ai/blog/hodl-andrej-karpathy)
6. [Best way to learn ML in 2–3 months — Reddit](https://www.reddit.com/r/learnmachinelearning/comments/1qamb60/best_way_to_learn_machine_learning_in_23_months/)
7. [Mathematics for ML and Data Science — DeepLearning.AI](https://www.deeplearning.ai/specializations/mathematics-for-machine-learning-and-data-science)
8. [Practical Deep Learning for Coders 2022 — Fast.ai](https://www.fast.ai/posts/2022-07-21-dl-coders-22.html)
9. [Neural Networks: Zero To Hero — Andrej Karpathy](https://karpathy.ai/zero-to-hero.html)
10. [DeepEval](https://deepeval.com/)
11. [LLM Evaluation Frameworks: Head-to-Head — Comet](https://www.comet.com/site/blog/llm-evaluation-frameworks/)
12. [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)`,
      },
    ],
  },

  // ===========================================================================
  //  TRILHA 2 — SAAS STARTUPEIRO
  // ===========================================================================
  {
    id: "saas",
    title: "Trilha SaaS Startupeiro",
    subtitle: "Da Validação de Mercado ao Venture Capital",
    icon: "🚀",
    color: "#22c55e",
    color2: "#a3e635",
    tagline: "Negócio para quem domina IA em paralelo e quer fundar um SaaS — foco no ecossistema BR/amazônico.",
    intro: `> Trilha de negócio para quem está, **em paralelo**, dominando a Trilha Técnica e quer fundar uma startup SaaS de IA. Ênfase no **ecossistema brasileiro e amazônico**.

**Regra de ouro:** o escrutínio do comportamento humano e as leis de atração de capital devem **preceder e guiar** a engenharia do produto. A falha crônica do fundador técnico é desenvolver uma solução complexa em busca de um problema viável.

### ⚠️ Leia antes de tudo: desacople a validação do cronograma técnico
A Trilha Técnica leva de **12 a 20 meses**. A validação de mercado **não pode esperar por isso**. O maior risco não é falhar em aprender tensores — é passar 18 meses estudando e só então descobrir que ninguém quer o produto.

As Fases de Negócio 0 e 1 (ideação + Mom Test) rodam em **semanas**, em paralelo às primeiras fases técnicas. Você valida o problema *antes* de saber treinar um modelo.

> A IA é o "como"; a dor do cliente é o "porquê". A defensabilidade de um SaaS de IA quase nunca está no modelo — qualquer concorrente acessa o mesmo Llama/Mistral — está nos **seus dados**, na **qualidade do seu pipeline RAG** e na **confiabilidade que sua malha de avaliação garante**.

### Como esta trilha conversa com a Trilha Técnica
Quando o objetivo técnico de dominar IA/LLMs se atrela ao desejo de fundar um SaaS, o desafio ramifica-se: é imperativo dominar a complexidade algorítmica **e**, em paralelo, dominar a disciplina de validação de mercado, tração e captação. O domínio da engenharia de tensores é uma barreira formidável, mas é apenas **metade** da infraestrutura para fundar uma organização rentável. Cada fase de negócio indica a que fase técnica corre em paralelo. O **Mapa de Convergência** (no menu lateral) amarra tudo.`,
    phases: [
      {
        id: "saas-f0",
        code: "Fase 0",
        title: "Ideação e a Doutrina Lean Startup",
        subtitle: "(paralela às Fases Técnicas 0–1)",
        duration: "2–4 semanas, e contínua",
        body: `Antes de estruturar qualquer infraestrutura, fundamente o alicerce filosófico. A premissa de um SaaS de impacto não se baseia em tendências superficiais, mas em **resolver dores agudas que os usuários manifestam organicamente**. Entender custo de oportunidade evita o excesso de engenharia em ferramentas sem demanda documentada.

**Cânone fundador:** *The Lean Startup* (Eric Ries — ciclo construir-medir-aprender); *Startup Playbook* (Sam Altman); *Y Combinator Playbook*.`,
        items: [
          { id: "saas-f0-1", label: "Adotar o filtro \"problema, não produto\"", note: "Sair de \"vou construir X\" e passar a \"eu observo um padrão repetitivo em Y\"." },
          { id: "saas-f0-2", label: "Ler o cânone fundador", note: "*The Lean Startup* (Eric Ries), *Startup Playbook* (Sam Altman), *Y Combinator Playbook*." },
          { id: "saas-f0-3", label: "Escolher um nicho que você já conhece", note: "Custo de oportunidade: não construa em busca de demanda inexistente." },
        ],
        exit: "Você adotou o filtro mental \"eu observo um padrão repetitivo em Y\" no lugar de \"vou construir X\", e tem um nicho que você já conhece escolhido.",
        project: "",
      },
      {
        id: "saas-f1",
        code: "Fase 1",
        title: "Validação de Hipóteses e o Mom Test",
        subtitle: "(paralela às Fases Técnicas 2–3 — rode agora, não espere o código)",
        duration: "3–6 semanas",
        body: `Esta etapa debruça-se sobre a **psicologia das interações humanas iniciais**. É estatisticamente prevalente que ideias primárias falhem no contato com o público — principalmente por **falsos positivos** colhidos em pesquisas mal conduzidas.

**O *Mom Test* (Rob Fitzpatrick) ensina que:**
- Pedir opinião sobre a "qualidade de uma ideia futura" gera **elogios vazios** para preservar a harmonia social.
- É **proibido mencionar sua ideia de produto** durante entrevistas exploratórias.
- Interrogue o usuário sobre **hábitos, problemas passados e tentativas frustradas de solução**.

**Exemplo prático:**
- ❌ Errado: "Você pagaria por uma IA que escreve contratos?"
- ✅ Certo: "Qual foi a parte mais dispendiosa da última vez que sua empresa redigiu um contrato? Quantas horas dedicou? Que ferramentas já tentou usar?"

O foco recai na **documentação de comportamentos prévios** — o único preditor incontestável de comportamento transacional futuro. Procure tarefas onde uma saída "boa o suficiente" e probabilística já agrega valor — o nicho natural dos LLMs.`,
        items: [
          { id: "saas-f1-1", label: "Fazer 10+ entrevistas Mom Test", note: "Sem citar o produto. Documente dores, gastos atuais e tentativas frustradas." },
          { id: "saas-f1-2", label: "Documentar comportamentos prévios", note: "O único preditor incontestável de comportamento transacional futuro." },
          { id: "saas-f1-3", label: "Obter sinal de demanda mensurável", note: "Lista de espera, carta de intenção ou pré-venda — **antes** da primeira linha de código de produto." },
        ],
        exit: "10+ entrevistas feitas sem citar o produto, com dores e gastos atuais documentados, **e** um sinal de demanda mensurável (lista de espera, carta de intenção ou pré-venda) — tudo isso **antes** da primeira linha de código de produto.",
        project: "",
      },
      {
        id: "saas-f2",
        code: "Fase 2",
        title: "Estratégia de MVP em IA",
        subtitle: "(paralela às Fases Técnicas 4–6 — RAG e harnesses)",
        duration: "acompanha a Fase Técnica 6",
        body: `**Ponto de fusão das duas trilhas.** De posse da validação de um problema inegável, o percurso converge para a arquitetura do MVP.

**Decisão central: *Wrapper* vs. *Open-Weight* (e o meio-termo)**
- **Wrapper** — interface sobre a API de gigantes (ex.: OpenAI). Velocidade máxima; vulnerabilidade: **dependência de terceiros** (*vendor lock-in*, margem refém de preço de API, dados saindo do seu controle).
- **Open-Weight local** — modelos abertos (Llama/Mistral/Qwen) sob seu controle. Garantem **isolamento e soberania dos dados** — vital em B2B confidencial. Custa mais engenharia (a Fase Técnica 7, MLOps, viabiliza).
- **Meio-termo** — modelo aberto servido por provedor gerenciado, ou *fine-tuning* leve (LoRA) hospedado.

A decisão não é abstração tecnológica, é **economia da inovação**.

**Anatomia do MVP de IA defensável:**
- **MVP = LLM pré-treinado + RAG sobre dados proprietários + harness de avaliação.**
- **Avaliação como diferencial de produto** — "Medimos *Faithfulness* a cada resposta" é argumento comercial.
- **Moats além de dados** — *workflow lock-in*, integrações profundas, suíte de avaliação proprietária.
- **Precificação e *unit economics*** — modele o custo de inferência por requisição. Latência e custo de tokens **são** seu COGS. Pondere **usage-based** vs. **seat-based** (ou híbrido).`,
        items: [
          { id: "saas-f2-1", label: "Decidir Wrapper vs. Open-Weight", note: "Justificada por escrito; é economia da inovação, não escolha técnica abstrata." },
          { id: "saas-f2-2", label: "Definir a anatomia do MVP defensável", note: "LLM pré-treinado + RAG sobre dados proprietários + harness de avaliação." },
          { id: "saas-f2-3", label: "Avaliação como diferencial comercial", note: "Métricas de Faithfulness visíveis ao cliente = venda de confiabilidade." },
          { id: "saas-f2-4", label: "Modelar unit economics", note: "Custo de inferência por requisição. Usage-based vs. seat-based vs. híbrido." },
        ],
        exit: "MVP em produção combinando RAG sobre dados proprietários + métricas de avaliação visíveis ao cliente + um modelo de *unit economics* com margem positiva por requisição + decisão Wrapper/Open-Weight justificada por escrito.",
        project: "",
      },
      {
        id: "saas-f3",
        code: "Fase 3",
        title: "Conformidade: LGPD e Marco Legal da IA",
        subtitle: "(paralela à Fase Técnica 6.4)",
        duration: "2–3 semanas, antes da primeira venda B2B",
        body: `Para um SaaS B2B de IA que processa dados de clientes, conformidade é **gate de venda**, não burocracia tardia. Um cliente corporativo não assina sem isso.`,
        items: [
          { id: "saas-f3-1", label: "LGPD (Lei 13.709/2018)", note: "bases legais, minimização de dados, direitos do titular, e atenção a **dados saindo para APIs de terceiros** (onde residem? há retenção/treinamento?). Liga-se à Fase Técnica 6.4." },
          { id: "saas-f3-2", label: "Marco Legal da IA (PL 2338/2023)", note: "acompanhar a tramitação e deveres (transparência, classificação de risco, governança). Posicionar-se cedo vira vantagem em vendas corporativas." },
          { id: "saas-f3-3", label: "Contratos e DPA", note: "*Data Processing Agreement* com clientes e com fornecedores de modelo/infra." },
        ],
        exit: "Base legal definida, fluxo de dados mapeado (incluindo terceiros), política de privacidade publicada e um DPA-modelo pronto para clientes.",
        project: "",
      },
      {
        id: "saas-f4",
        code: "Fase 4",
        title: "Ecossistema, Incubação e Captação Não-Diluível",
        subtitle: "(paralela às Fases Técnicas 6→7)",
        duration: "contínua a partir do MVP",
        body: `A segregação geográfica atrofia o progresso. Com MVP definido, busque **inserção simbiótica num tecido tecnologicamente denso** — incubadoras e fundos valorizam **aderência sociocultural**. Com um microsserviço em produção e relatórios de avaliação (Ragas/DeepEval) como *due diligence* técnico, você tem o que precisa.

**Comunidades e hubs (enraizamento — comece aqui):**
- **Jaraqui Valley** — comunidade de startups de Manaus desde 2014; meetups e o **Prêmio Jaraqui Graúdo**.
- **Impact Hub Manaus** e **SebraeLab** — hubs que reduzem assimetria de informação.

**Capital não-diluível regional (prioridade — não custa equity):**
- **FAPEAM – Centelha Amazonas** — subvenção de até **R$ 80 mil**/projeto + bolsa de até R$ 50 mil. *(Centelha 3 destinou ~R$ 3,76 mi a 47 projetos no AM.)*
- **FAPEAM – Edital Deep Tech (nº 012/2026)** — apoio a startups *deep tech*. **Mais aderente a uma startup de IA** que a incubação genérica.
- **Finep + Sebrae + MCTI** — chamada de **R$ 300 milhões** não-reembolsáveis para startups do **Norte/Nordeste/Centro-Oeste**.
- **CIDE** — primeira incubadora da Amazônia (1999); editais da ordem de R$ 50 mil.
- **SEBRAE Startups** — *Capital Empreendedor* (aceleração de 4 meses), *Inova Startups*, e **Prêmio Sebrae Startups 2026** (até R$ 250 mil).

**Nota de "fit" — bioeconomia:** vários programas amazônicos (ex.: **Inova Amazônia / Inova Biomas**, bolsa ~R$ 6,5 mil/mês por 6 meses) são **focados em bioeconomia**. Encaixam o seu SaaS **se a tese for IA aplicada à bioeconomia/floresta/cadeias amazônicas**. Se a sua IA for horizontal, priorize os editais *deep tech*.`,
        items: [
          { id: "saas-f4-1", label: "Presença ativa em hub local", note: "Jaraqui Valley, Impact Hub Manaus, SebraeLab — exponha falhas cedo, construa credibilidade." },
          { id: "saas-f4-2", label: "Submeter a edital não-diluível", note: "Centelha / Deep Tech FAPEAM / Finep — capital sem equity." },
          { id: "saas-f4-3", label: "Entrar em programa de incubação/aceleração", note: "CIDE, SEBRAE Capital Empreendedor." },
          { id: "saas-f4-4", label: "Avaliar fit de bioeconomia (honestamente)", note: "Inova Amazônia/Biomas só se a tese for IA aplicada à floresta/cadeias amazônicas." },
        ],
        exit: "Presença ativa em ao menos um hub local + ao menos uma submissão a edital não-diluível (Centelha/Deep Tech FAPEAM/Finep) + entrada em programa de incubação ou aceleração.",
        project: "",
      },
      {
        id: "saas-f5",
        code: "Fase 5",
        title: "Métricas SaaS, GTM B2B e Aceleração Institucional",
        subtitle: "(pós-trilha técnica — operação e escala)",
        duration: "contínua",
        body: `Com tração incipiente e conformidade resolvida, profissionalize crescimento e mensuração.

**Framework de métricas SaaS (instrumente desde o primeiro cliente):**
- **MRR/ARR**, **churn** (de logos e de receita), **CAC** e **LTV** (e a razão LTV/CAC), **ativação** e **retenção/expansão**. Para IA, acompanhe **margem por requisição** (receita − COGS de token).

**Go-to-market B2B:**
- Defina o **ICP** com precisão; **founder-led sales** e **outbound** direcionado; provas de valor (estudos de caso, POCs com métrica visível). Para PLG, *onboarding* que entrega valor rápido.

**Aceleração institucional:**
- **InovAtiva** — dividida em **InovAtiva Brasil** e **InovAtiva de Impacto** (ciclos temáticos). Confira a aderência ao seu setor/estado.
- **Manaus Tech Hub** — integração com indústrias locais; conteúdos sobre P&D via Lei de Informática.

**Marco regulatório-vantagem (Manaus):**
- **Lei de Informática (Suframa/CAPDA)** — empresas da Zona Franca devem aplicar ~**5% do faturamento** em P&D na Amazônia, podendo **investir diretamente em startups**. Vantagem estrutural específica do polo de Manaus.`,
        items: [
          { id: "saas-f5-1", label: "Dashboard de MRR/churn/CAC/LTV ativo", note: "Mais margem por requisição (receita − COGS de token) para IA." },
          { id: "saas-f5-2", label: "ICP escrito", note: "Perfil de cliente ideal com precisão." },
          { id: "saas-f5-3", label: "Processo de vendas repetível", note: "Founder-led sales + outbound, com clientes pagantes." },
          { id: "saas-f5-4", label: "Mapear captação via Lei de Informática", note: "~5% do faturamento de empresas da ZFM em P&D — aporte direto possível." },
        ],
        exit: "Dashboard de MRR/churn/CAC/LTV ativo, ICP escrito, processo de vendas repetível com ao menos alguns clientes pagantes, e mapeamento de como capturar recurso via Lei de Informática.",
        project: "",
      },
      {
        id: "saas-f6",
        code: "Fase 6",
        title: "Expansão, Escala e Venture Capital",
        subtitle: "(pós-trilha técnica — maturação nacional)",
        duration: "quando houver tração comprovada",
        body: `Estágio conclusivo: VCs de Série A/B, trocando equity por crescimento exponencial.

- **ACE Ventures** — dinamizador de ecossistema, pontes internacionais; ativa em 2025.
- **Bossa Invest** (ex-**Bossanova Investimentos**) — um dos VCs mais ativos da AL; foco em estágio inicial e *exits*. *(Independente da ACE desde dez/2022.)*

> **⚠️ Cuidado crítico:** buscar VC nas fases iniciais resulta em rejeição ou **desvalorização prematura**. VC busca tração comprovada. Antes disso, priorize capital não-diluível (Centelha, Finep, Lei de Informática).`,
        items: [
          { id: "saas-f6-1", label: "Métricas de tração consistentes", note: "Crescimento de MRR + retenção saudável que sustentem uma conversa de Série A." },
          { id: "saas-f6-2", label: "Mapear VCs (ACE Ventures, Bossa Invest)", note: "Só após tração — VC é combustível de foguete, inútil antes do foguete." },
        ],
        exit: "Métricas de tração consistentes (crescimento de MRR, retenção saudável) que sustentem uma conversa de Série A sem desvalorização.",
        project: "",
      },
    ],
    appendices: [
      {
        id: "saas-apx-a",
        title: "Apêndice A — Guia Prático: do Problema ao Lançamento",
        body: `**1) Comece pelo problema, não pelo produto.** Saia de "vou construir X" e passe a "eu observo um padrão repetitivo em Y". Escolha um nicho que você já conhece e liste 20 dores repetitivas. *Ler:* The Mom Test; Escola de Negócios para Startups (Sebrae).

**2) Mentalidade de SaaS e Micro-SaaS.** 10 pagantes a R$ 100 já é produto real. *Ler:* The Lean Startup; Micro-SaaS: Startup de Uma Pessoa Só; The SaaS Playbook.

**3) Como gerar ideias.** Fontes semanais: trabalhos repetitivos, comunidades reclamando da mesma lacuna, posts "procuro alternativa para X", adaptar ferramentas internacionais para o BR. *Praticar:* uma ideia por dia por 30 dias.

**4) Validação antes de construir.** Barato → caro: landing page com preço + captura de e-mail; grupos de nicho; "pague R$ X pela beta"; pré-venda.

**5) Primeiro produto (Build).** Stack mínima: Landing + pagamento (Gumroad/Stripe/Mercado Pago); base (Supabase/Firebase); frontend (Next.js ou HTML+JS); automação (n8n/Make/Zapier).

**6) Modelo de negócio e precificação.** Pior erro: cobrar pouco ou não cobrar. Preço por valor, não por custo. *Cuidado com freemium em IA* — custo marginal de token não é zero. *Ler:* Product-Led Growth; Predictable Revenue.

**7) Lançamento e crescimento.** Primeira semana: post em comunidades; e-mail direto para 50 potenciais; mostrar o processo em público.

**Processo geral:** (1) escolha 1 nicho que entende; (2) liste 30 problemas; (3) escolha 1 e valide em 7 dias; (4) monte landing; (5) converse com 10 pessoas; (6) decida: seguir, pivotar ou descartar.`,
      },
      {
        id: "saas-apx-b",
        title: "Apêndice B — Mapa de Progressão Institucional",
        body: `| Estrutura | Estágio | Propósito |
| --- | --- | --- |
| Comunidades e Hubs (Jaraqui Valley, Impact Hub Manaus) | Ideação inicial | Networking, validação cultural, protótipo base. |
| Capital não-diluível (Centelha/Deep Tech FAPEAM, Finep, CIDE, SEBRAE) | MVP lançado | Subvenção sem equity, incubação, gestão. |
| Aceleradoras e Políticas Setoriais (InovAtiva, Suframa/CAPDA) | Tração e receitas | Expansão B2B, Lei de Informática, P&D. |
| Venture Capital (ACE Ventures, Bossa Invest) | Maturação nacional | Liquidez em troca de equity, crescimento exponencial. |`,
      },
      {
        id: "saas-apx-c",
        title: "Apêndice C — Mapa de Convergência das Duas Trilhas",
        body: `| Fase Técnica | Entrega Técnica | Fase de Negócio paralela | Entrega de Negócio |
| --- | --- | --- | --- |
| 0 — Base computacional | Fluência NumPy/Pandas | 0 — Ideação / Lean | Filtro "problema, não produto" |
| 1 — Matemática JIT | Intuição álgebra/cálculo/estatística | 1 — Mom Test (rode já) | 10+ entrevistas sem pitch |
| 2 — ML clássico | Baseline + vocabulário de avaliação | 1 — Mom Test | Sinal de demanda mensurável |
| 3 — Redes neurais | MLP do zero (micrograd) | 1→2 | Decisão de seguir/pivotar |
| 4 — Deep learning | CNN + experiment tracking | 2 — MVP de IA | Decisão Wrapper vs. Open-Weight |
| 5 — Transformers | GPT do zero (build-gpt) | 2 — MVP de IA | Pré-venda validada |
| 6 — LLMs + RAG + harness | Pipeline RAG avaliado | 2→3→4 | MVP defensável + conformidade + hubs |
| 6.4 — Segurança/LGPD | Guardrails + PII + teto de custo | 3 — Conformidade | Base legal + DPA |
| 7 — Produção/MLOps | Microsserviço conteinerizado | 4→5→6 | Não-diluível → tração → Série A |`,
      },
      {
        id: "saas-apx-d",
        title: "Apêndice D — Pessoas para se inspirar e seguir",
        body: `**Bootstrapped / Micro-SaaS (mais aderente ao fundador técnico solo):**
- **Rob Walling** — *The SaaS Playbook*, *Start Small, Stay Small*; fundador da MicroConf e do TinySeed.
- **Arvid Kahl** — *Zero to Sold* e *The Embedded Entrepreneur*.
- **Pieter Levels** — indie hacker extremo (Nomad List, PhotoAI).
- **Jason Cohen** — blog *A Smart Bear*; posicionamento, preço, estratégia.
- **Courtland Allen** — fundador do **Indie Hackers**.

**Produto, posicionamento e go-to-market:**
- **April Dunford** — *Obviously Awesome*; autoridade em posicionamento B2B.
- **Lenny Rachitsky** — *Lenny's Newsletter*.
- **Patrick McKenzie** (patio11) — preço e SaaS.
- **Hiten Shah** e **Steli Efti** — métricas e vendas.

**Visão de startup e capital:**
- **Paul Graham** — ensaios da Y Combinator.
- **Sam Altman** — *Startup Playbook*.
- **Alex Hormozi** — *$100M Offers*.

**Brasil / cena local:**
- **Comunidade de Micro-SaaS BR** (@brunomicrosaas).
- Fundadores ativos no **Jaraqui Valley** e **Manaus Tech Hub**.`,
      },
      {
        id: "saas-apx-e",
        title: "Apêndice E — Bibliografia (negócio, por fase)",
        body: `**Ideação e mentalidade (Fase 0):** *The Lean Startup* (Eric Ries); *The Personal MBA* (Josh Kaufman); ensaios da Y Combinator / Paul Graham.

**Validação (Fase 1):** *The Mom Test* (Rob Fitzpatrick) — leia antes de qualquer entrevista.

**MVP, produto e crescimento (Fases 2, 5):** *The SaaS Playbook* (Rob Walling); *Obviously Awesome* (April Dunford); *Product-Led Growth* (Wes Bush); *Traction* (Weinberg & Mares); *Hooked* (Nir Eyal); *Crossing the Chasm* (Geoffrey Moore); *The Lean Product Playbook* (Dan Olsen).

**Vendas, preço e receita (Fases 5–6):** *Predictable Revenue* (Aaron Ross); *$100M Offers* (Alex Hormozi); *Zero to Sold* / *The Embedded Entrepreneur* (Arvid Kahl).

**Inspiração / histórias reais:** *Founders at Work* (Jessica Livingston).`,
      },
      {
        id: "saas-apx-f",
        title: "Apêndice F — Networking: Manaus e online",
        body: `**Em Manaus / Amazônia (presencial):**
- **Meetups do Jaraqui Valley** — frequentemente no Casarão da Inovação Cassina. O ponto de entrada mais natural.
- **Polo Digital de Manaus** — agenda anual com ~35 eventos de tecnologia.
- **Amazônia Inteligente 2026** — inovação, IA e desenvolvimento sustentável.
- **36ª Conferência Anprotec** — Manaus, **29/jun a 2/jul de 2026**; networking nacional dentro de casa.
- **DSX 2026** — maior evento de marketing digital do Norte (2.000+).
- **Encontro Manauara de Marketing Digital 2026**.
- **Comunidades técnicas locais** — PyLadies Manaus, eventos de IA na EST/UEA.
- **Hubs** — Impact Hub Manaus, Manaus Tech Hub / MTH Academy, CIDE, Inova Amazônia.

**Online:**
- **Comunidade de Micro-SaaS BR** (@brunomicrosaas) — comece por aqui.
- **Indie Hackers**, **MicroConf / MicroConf Connect**, **ABStartups**.
- **Reddit** — r/SaaS, r/startups, r/Entrepreneur.
- **Build in public no X/LinkedIn**.

> **Tática de convergência:** os projetos de portfólio da trilha técnica são seu melhor cartão de visitas. Levar um RAG avaliado funcionando a um meetup vale mais que qualquer pitch teórico.`,
      },
      {
        id: "saas-apx-g",
        title: "🔥 Apêndice G — Modo Brutal: armadilhas de fundador",
        body: `- **Construir antes de falar (o pecado original).** Sua zona de conforto é o editor de código, não a entrevista. Toda hora codando uma feature não-validada é roubada da única coisa que importa: descobrir se alguém paga.
- **Caçador de edital (*grant chasing*).** Dinheiro de edital **não valida mercado** — ele só financia. Cliente pagante valida; edital acelera. Não confunda a gasolina com o destino.
- **Métricas de vaidade.** Seguidores, likes, signups grátis. A única métrica inicial: **alguém pagou? Pagou de novo?**
- **Bio-cosplay.** Forçar tese de bioeconomia só pra encaixar nos editais, sem fit real. Capta-se o dinheiro, perde-se a empresa.
- **VC cedo demais.** Pedir Série A sem tração é colecionar "nãos" caros. VC é combustível de foguete — perigoso antes de você ter um foguete.
- **Pivot covarde vs. compulsivo.** Pivote com **evidência**, não com humor.
- **"Build in public" que virou "build in private".** Publique feio e cedo.

> Regra-resumo: **na dúvida, fale com um cliente.** O código pode esperar uma tarde; a validação, não.`,
      },
      {
        id: "saas-apx-h",
        title: "📅 Apêndice H — Plano dos Primeiros 90 Dias",
        body: `**Semanas 1–2 — Fundação dupla.** 💻 Python + NumPy/Pandas (notebook EDA no GitHub). 📈 Escolha 1 nicho que já conhece, leia *The Mom Test*, liste 20 dores.

**Semanas 3–4 — Saia do prédio.** 💻 Intuição de álgebra/cálculo (3Blue1Brown). 📈 **10 entrevistas Mom Test, sem citar produto.**

**Semanas 5–6 — Primeiro sinal.** 💻 ML clássico; baseline no Kaggle. 📈 Landing page com proposta de valor em 1 frase + captura de e-mail.

**Semanas 7–8 — Decisão honesta.** 💻 Conclua o Kaggle no GitHub. 📈 Olhe os dados e **decida: seguir, pivotar ou descartar.**

**Semanas 9–10 — Microscópio.** 💻 MLP/backprop do zero (micrograd). 📈 Defina o **ICP**, rascunhe a oferta; se validou, abra pré-venda.

**Semanas 11–12 — Prova pública.** 💻 Conclua o micrograd + *thread* "build in public". 📈 Vá a 1 meetup do Jaraqui Valley ou entre na Comunidade Micro-SaaS BR.

**✅ Marco dos 90 dias:** 3 projetos públicos (EDA, Kaggle, micrograd) + 10+ entrevistas documentadas + 1 landing validada + 1 decisão go/pivot + presença em 1 comunidade.

> **A real:** você **não** vai ser ML engineer nem ter fundado nada em 90 dias. O ponto é ter **prova** de duas coisas: (1) você consegue aprender e enviar; (2) existe — ou não — um mercado. Quem tem essas evidências está à frente de 95% dos que "começaram a estudar IA" e sumiram.`,
      },
      {
        id: "saas-apx-nota",
        title: "📌 Nota de atualização (jun/2026)",
        body: `Dados do ecossistema verificados na web nesta data. Programas, editais, valores e datas **mudam todo ciclo** — confirme sempre o edital vigente antes de inscrever.

Principais ajustes desde a versão anterior: **Bossanova → Bossa Invest**; o carro-chefe de bioeconomia do Sebrae é o **Inova Amazônia/Inova Biomas** (não "Acelera Amazônia"); **InovAtiva** dividida em **Brasil** e **de Impacto** (ciclos temáticos); inclusão de **Centelha**, **Deep Tech FAPEAM (012/2026)**, **Finep R$ 300 mi (N/NE/CO)** e **Prêmio Sebrae Startups 2026**.`,
      },
      {
        id: "saas-apx-refs",
        title: "🔗 Referências e links",
        body: `1. [Startup Playbook — Sam Altman](https://playbook.samaltman.com/)
2. [Sam Altman: Advice for AI Founders — YouTube](https://www.youtube.com/watch?v=EZqn2XVSV7w)
3. [The Mom Test — Blinkist](https://www.blinkist.com/en/books/the-mom-test-en)
4. [Book Summary — The Mom Test — Readingraphics](https://readingraphics.com/book-summary-the-mom-test/)
5. [CIDE — Centro de Incubação e Desenvolvimento Empresarial](https://cide.org.br/)
6. [CIDE mantém incubadora ativa após 25 anos — RealTime1](https://realtime1.com.br/cide-mantem-incubadora-ativa-apos-25-anos-e-reune-startups-de-varios-setores-da-amazonia/)
7. [Jaraqui Valley — ecossistema de Manaus (Medium)](https://medium.com/jaraqui-valley/o-ecossistema-de-inova%C3%A7%C3%A3o-de-manaus-jaraqui-valley-34eea2f2a596)
8. [Jaraqui Valley Summit 2025 — Polo Digital](https://polodigitaldemanaus.com/jaraqui-valley-summit-2025-planejando-o-futuro-da-comunidade-de-startups-em-manaus/)
9. [Incubadora FAPEAM](https://www.fapeam.am.gov.br/incubadora-apoiada-pelo-governo-do-amazonas-oferece-servicos-especializados-a-empresas-de-base-tecnologica/)
10. [Edital nº 012/2026 — Deep Tech FAPEAM](https://www.fapeam.am.gov.br/editais/edital-no-012-2026-programa-de-apoio-a-startup-deep-tech-para-inovacao-cientifica-e-tecnologica-deep-tech-fapeam/)
11. [Programa Centelha 3 (R$ 3,7 mi, 47 projetos no AM) — RealTime1](https://realtime1.com.br/programa-centelha-3-investe-r-37-milhoes-em-47-projetos-inovadores-no-amazonas/)
12. [Finep/Sebrae/MCTI — R$ 300 milhões para N/NE/CO — Agência Sebrae](https://agenciasebrae.com.br/inovacao-e-tecnologia/selecao-disponibiliza-r-300-milhoes-para-investimento-em-startups-do-norte-nordeste-e-centro-oeste/)
13. [Capital Empreendedor — Sebrae](https://sebrae.com.br/sites/PortalSebrae/ufs/pe/sebraeaz/capital-empreendedor,ace8a05989dce810VgnVCM1000001b00320aRCRD)
14. [Prêmio Sebrae Startups 2026](https://programas.sebraestartups.com.br/in/premiosebraestartups2026)
15. [Inova Startups 5ª ed. 2026 — Sebrae Startups](https://programas.sebraestartups.com.br/in/5)
16. [Sebrae acelera bioeconomia da Amazônia (Inova Amazônia) — ASN](https://agenciasebrae.com.br/inovacao-e-tecnologia/sebrae-acelera-pequenos-negocios-ligados-a-bioeconomia-da-amazonia/)
17. [Inova Amazônia investiu R$ 2,6 mi em aceleração — ASN](https://agenciasebrae.com.br/inovacao-e-tecnologia/inova-amazonia-investiu-26-milhoes-em-aceleracao-de-empresas-valorizando-a-bioeconomia/)
18. [InovAtiva de Impacto 2026 — ciclo](https://hub.inovativa.online/ciclo-2026)
19. [InovAtiva Brasil](https://www.inovativa.online/inovativa-brasil/)
20. [Lei de Informática / P&D — Suframa](https://www.gov.br/suframa/pt-br/zfm/pesquisa-e-desenvolvimento/lei-de-informatica)
21. [CAPDA — Suframa](https://www.gov.br/suframa/pt-br/assuntos/pdi/capda)
22. [Programas Prioritários (Lei de Informática) — Manaus Tech Hub](https://www.manaustechhub.com/programas-prioritarios-saiba-como-startups-e-atores-de-inovacao-podem-se-beneficiar/)
23. [Manaus, polo de inovação — Manaus Tech Hub](https://www.manaustechhub.com/manaus-um-polo-de-inovacao-e-de-oportunidades/)
24. [Após cinco anos, ACE recompra participação da Bossanova — Exame](https://exame.com/negocios/apos-cinco-anos-ace-recompra-participacao-adquirida-pela-bossanova/)
25. [Bossa Invest — site oficial](https://bossainvest.com/)
26. [Programa de Aceleração — ACE Ventures](https://aceventures.com.br/coalizao-pelo-impacto/)
27. [Empresas Nascentes de Base Tecnológica — Gov.br/Suframa](https://www.gov.br/suframa/pt-br/assuntos/pdi/entidades/empresas-nascentes-de-base-tecnologica-startups-1)
28. [Agenda 2026: 35 eventos de tecnologia e inovação — Polo Digital](https://polodigitaldemanaus.com/agenda-2026-confira-35-eventos-de-tecnologia-e-inovacao-para-acompanhar-ao-longo-do-ano/)
29. [Amazônia Inteligente 2026 — Polo Digital](https://polodigitaldemanaus.com/amazonia-inteligente-2026-exposicao-e-patrocinio-abertos/)
30. [36ª Conferência Anprotec (Manaus, 29/jun–2/jul 2026) — Brasil Inovador](https://brasilinovador.com.br/conferencia-anprotec-2026-promove-imersao-nos-principais-polos-do-ecossistema-de-inovacao-de-manaus/)
31. [DSX 2026 — Digital Summit Experience Manaus](https://www.listadeeventos.com.br/evento/dsx-2026-digital-summit-experience-manaus)
32. [Comunidade de Micro-SaaS (Brasil)](https://comunidade.microsaas.com.br/)
33. [Indie Hackers](https://www.indiehackers.com/)`,
      },
    ],
  },

  // ===========================================================================
  //  TRILHA 3 — DISTRIBUIÇÃO
  // ===========================================================================
  {
    id: "distribuicao",
    title: "Trilha de Distribuição",
    subtitle: "Marketing, Audiência e Growth com IA (Codex-first)",
    icon: "📡",
    color: "#f59e0b",
    color2: "#fb7185",
    tagline: "Fazer as pessoas saberem que o produto existe e quererem usá-lo — distribuição como código.",
    intro: `> A terceira trilha. As outras duas te ensinam a **construir** e a **validar/captar**. Esta te ensina a coisa que mata mais SaaS de fundador técnico que qualquer bug: **fazer as pessoas saberem que o produto existe e quererem usá-lo.**

**Tese central:** produto sem distribuição é hobby caro. E você tem uma vantagem injusta — é fundador *técnico*. Onde o marqueteiro comum **usa** ferramentas de SaaS, você pode **construir as suas** e tratar **distribuição como código**, com o **Codex** e agentes de IA como seu time de growth.

### A verdade desconfortável que ancora esta trilha
A maioria dos fundadores técnicos acredita na *Field of Dreams fallacy*: "se eu construir, eles virão". **Não virão.** O produto não se vende sozinho, o algoritmo não te descobre por mérito, e "ter um bom produto" é a aposta-base, não o diferencial.

Distribuição **não é a etapa depois do produto** — é uma disciplina paralela, tão produto quanto o produto. Idealmente começa **antes** dele (audiência primeiro). Roda em paralelo às outras duas desde o dia 1.

> **Princípio-mestre (de *Traction*, Weinberg & Mares):** um canal **dominado** vale mais que sete canais medianos. Foco mata dispersão.`,
    phases: [
      {
        id: "dist-f0",
        code: "Fase 0",
        title: "Posicionamento e Mensagem (a base de tudo)",
        subtitle: "(paralela à Fase de Negócio 1 — Mom Test)",
        duration: "2–3 semanas",
        body: `Antes de qualquer tática de canal, defina **o que você diz e para quem**. Distribuição sem posicionamento é megafone gritando no vazio.

- **Posicionamento** (April Dunford, *Obviously Awesome*): contra o que você compete, para quem você é a melhor escolha, e por quê.
- **ICP e linguagem do cliente** — use as **entrevistas do Mom Test** como matéria-prima. As palavras exatas que o cliente usa para descrever a dor **são** seu copy. Você não inventa mensagem, você transcreve.
- **One-liner + 3 mensagens testáveis** — uma frase que explica o produto em 5 segundos, e três ângulos de dor para testar.`,
        items: [
          { id: "dist-f0-1", label: "Definir posicionamento (Obviously Awesome)", note: "Contra o que você compete, para quem é a melhor escolha, e por quê." },
          { id: "dist-f0-2", label: "Extrair linguagem do cliente das entrevistas", note: "As palavras exatas que o cliente usa para a dor **são** seu copy. Você transcreve, não inventa." },
          { id: "dist-f0-3", label: "Escrever one-liner + 3 mensagens testáveis", note: "Frase de 5 segundos + três ângulos de dor." },
        ],
        codex: "Rode um agente que ingere as transcrições das entrevistas e extrai padrões de linguagem, objeções recorrentes e *jobs-to-be-done* — virando um \"banco de copy\" baseado em fala real do cliente, não em achismo.",
        exit: "One-liner que um estranho entende, ICP escrito, e 3 mensagens prontas para teste.",
        project: "Documento de posicionamento + banco de copy do cliente.",
      },
      {
        id: "dist-f1",
        code: "Fase 1",
        title: "Build in Public e Audiência-primeiro",
        subtitle: "(paralela às Fases Técnicas 0–3 · começa JÁ)",
        duration: "contínua",
        body: `A estratégia mais subestimada pelo fundador técnico: **construir audiência enquanto constrói competência**. Você já vai estudar IA por 12–20 meses — documentar essa jornada **gera audiência de graça** e transforma estudo em ativo de distribuição.

- **Build in public** (Arvid Kahl; Austin Kleon, *Show Your Work!*): publique o processo. Cada **projeto de portfólio** da trilha técnica (micrograd, CNN, GPT do zero, RAG) é um *thread* pronto.
- **Plataforma-âncora**: escolha **uma** para morar (X ou LinkedIn — B2B costuma viver no LinkedIn). Domine antes de espalhar.
- **Cadência > intensidade**: melhor 3 posts/semana por um ano do que 20 numa semana e silêncio. O algoritmo premia consistência.`,
        items: [
          { id: "dist-f1-1", label: "Escolher e dominar UMA plataforma-âncora", note: "X (técnico) ou LinkedIn (B2B/decisores)." },
          { id: "dist-f1-2", label: "Build in public dos projetos de portfólio", note: "micrograd, CNN, GPT do zero, RAG — cada um é um thread pronto." },
          { id: "dist-f1-3", label: "Sustentar cadência semanal por 8+ semanas", note: "Cadência > intensidade. O algoritmo premia consistência." },
        ],
        codex: "Construa um pequeno *pipeline de repurposing* — um script/agente que pega um commit, um diff ou um *thread* técnico e gera rascunhos de post adaptados ao tom da plataforma. Você revisa e publica; o trabalho braçal é da máquina.",
        exit: "Cadência semanal sustentada por 8+ semanas e os primeiros seguidores/engajamento reais (não comprados).",
        project: "Perfil-âncora ativo + pipeline de repurposing v1.",
      },
      {
        id: "dist-f2",
        code: "Fase 2",
        title: "Canais e o Teste Bullseye",
        subtitle: "(paralela à Fase de Negócio 2 — MVP)",
        duration: "4–6 semanas de experimentação",
        body: `De *Traction*: existem ~19 canais de tração (SEO, conteúdo, ads, comunidades, *cold outbound*, parcerias, PR, viral/indicação, eventos, etc.). O erro fatal é tentar todos. O método **Bullseye**: liste todos, aposte em 2–3 prováveis, **teste barato**, e concentre no que funcionar.

- **Critério de escolha**: onde seu ICP *já está* + onde você tem vantagem injusta (você é técnico → conteúdo técnico, *dev marketing*, comunidades de nicho rendem mais que ads genéricos).
- **Teste barato antes de escalar**: pequeno experimento por canal, medindo sinal de CAC e qualidade de lead.`,
        items: [
          { id: "dist-f2-1", label: "Listar os ~19 canais e preencher a matriz Bullseye", note: "Aposte em 2–3 prováveis." },
          { id: "dist-f2-2", label: "Testar barato cada canal aposta", note: "Medindo sinal de CAC e qualidade de lead." },
          { id: "dist-f2-3", label: "Eleger 1 canal primário por experimento (não palpite)", note: "Onde seu ICP já está + sua vantagem injusta." },
        ],
        codex: "Construa ferramentas de reconhecimento de canal — um *scraper* que mapeia onde seu ICP reclama da dor (subreddits, fóruns, grupos), um analisador de *keywords* de cauda longa, um monitor de menções. Distribuição como código começa aqui.",
        exit: "1 canal primário identificado por **experimento** (não por palpite), com sinal de CAC viável.",
        project: "Matriz Bullseye preenchida + relatório dos testes de canal.",
      },
      {
        id: "dist-f3",
        code: "Fase 3",
        title: "Conteúdo e SEO/GEO com IA (a máquina de descoberta)",
        subtitle: "(paralela à Fase Técnica 6 — RAG/LLMs)",
        duration: "contínua a partir daqui",
        body: `Conteúdo é o canal de maior alavancagem para fundador técnico — e o que mais combina com IA. Mas a barra subiu: conteúdo genérico de IA (*slop*) é punido. O jogo é **qualidade em escala**, não lixo em escala.

- **SEO clássico + GEO (*Generative Engine Optimization*)**: além de ranquear no Google, você precisa **aparecer nas respostas de IA** (ChatGPT, Perplexity, Gemini). Monitore sua *AI visibility*.
- **E-E-A-T e profundidade**: experiência real, dados próprios, opinião. Justamente o que você tem (a jornada técnica) e a IA genérica não tem.
- **Ferramentas de mercado (2026)**: Surfer SEO, Writesonic, AirOps, Koala, Jasper; Otto SEO (SEO "hands-off"); Similarweb *AI Brand Visibility*. Use como acelerador — não como piloto automático.`,
        items: [
          { id: "dist-f3-1", label: "Dominar SEO clássico + GEO", note: "Ranquear no Google E aparecer nas respostas de IA (ChatGPT, Perplexity, Gemini)." },
          { id: "dist-f3-2", label: "Aplicar E-E-A-T e profundidade", note: "Experiência real, dados próprios, opinião — o que a IA genérica não tem." },
          { id: "dist-f3-3", label: "Montar content engine semi-automatizado", note: "Com revisão humana obrigatória." },
        ],
        codex: "**O pulo do gato:** em vez de só *assinar* uma ferramenta, **construa seu próprio pipeline** com o Codex: um agente que (1) pesquisa *keyword*/intenção, (2) gera rascunho ancorado nos seus dados reais, (3) otimiza on-page, (4) publica via API do CMS, (5) mede e reporta. Você vira dono da máquina, sem mensalidade de SaaS e com qualidade sob seu controle.",
        exit: "Pipeline de conteúdo semi-automatizado rodando, com revisão humana obrigatória, e primeiras posições/visibilidade (orgânica ou em respostas de IA).",
        project: "*Content engine* v1 + dashboard de visibilidade.",
      },
      {
        id: "dist-f4",
        code: "Fase 4",
        title: "Redes Sociais e Distribuição Multicanal",
        subtitle: "(pós-Fase 3)",
        duration: "contínua",
        body: `Com a âncora dominada (Fase 1) e a máquina de conteúdo rodando (Fase 3), expanda **a partir de uma fonte**, sem se esfacelar.

- **Modelo "1 → N" (repurposing)**: uma peça-pilar (artigo, vídeo longo, *case*) vira N derivados (thread, carrossel, Reel/Short, post de LinkedIn, recorte). Produza **uma vez**, distribua em muitos formatos.
- **Estratégia por plataforma**: X (técnico/build-in-public), LinkedIn (B2B), YouTube (autoridade), Reels/Shorts/TikTok (alcance), Reddit/comunidades (nicho, com cuidado anti-spam).
- **Comunidade própria** (médio prazo): newsletter ou grupo. Audiência que você **possui** > audiência alugada de um algoritmo.`,
        items: [
          { id: "dist-f4-1", label: "Implementar o modelo 1 → N (repurposing)", note: "Uma peça-pilar vira N derivados por formato/plataforma." },
          { id: "dist-f4-2", label: "Estratégia por plataforma (só onde o ICP está)", note: "Não é estar em todas — é estar nas certas." },
          { id: "dist-f4-3", label: "Iniciar comunidade própria (newsletter/grupo)", note: "Audiência que você possui > audiência alugada." },
        ],
        codex: "Evolua o pipeline de repurposing para multicanal — um agente que recebe a peça-pilar e gera variações por formato/plataforma, agenda via API e coleta métricas. Crie *skills* reutilizáveis do Codex (ex.: \"transformar este artigo em thread no meu tom\").",
        exit: "Presença multicanal alimentada por **uma** fonte de conteúdo, com agente de repurposing operando e métricas por canal.",
        project: "Pipeline de repurposing multicanal + primeira lista de e-mail própria.",
      },
      {
        id: "dist-f5",
        code: "Fase 5",
        title: "Funil, Growth Loops e Analytics",
        subtitle: "(paralela à Fase de Negócio 5 — métricas SaaS)",
        duration: "contínua",
        body: `Tráfego sem funil é balde furado. Aqui você instrumenta a conversão e — mais importante — troca funis lineares por **loops**.

- **Pirate Metrics (AARRR)**: Aquisição, Ativação, Retenção, Receita, Indicação. Conecta com MRR, churn, CAC, LTV da trilha de negócio.
- **Lifecycle/e-mail**: onboarding, ativação ("primeiro valor"), reengajamento. E-mail é o canal de maior ROI e que você **possui**.
- **Growth loops > funis**: mecanismos onde a saída realimenta a entrada (UGC, indicação, *network effects*, SEO programático). Loop bom cresce composto; funil só vaza.`,
        items: [
          { id: "dist-f5-1", label: "Instrumentar Pirate Metrics (AARRR)", note: "Aquisição, Ativação, Retenção, Receita, Indicação." },
          { id: "dist-f5-2", label: "Montar lifecycle/e-mail (onboarding → ativação)", note: "E-mail = maior ROI e canal que você possui." },
          { id: "dist-f5-3", label: "Implementar ao menos 1 growth loop", note: "Saída realimenta entrada. Loop cresce composto; funil só vaza." },
        ],
        codex: "Construa seus próprios dashboards e automações de *lifecycle* (e-mails disparados por evento), e rode **experimentos A/B como código** — versionados, reproduzíveis. Sua skill da Fase Técnica 4 (rastreio de experimentos) reaparece, agora em growth.",
        exit: "Funil instrumentado ponta-a-ponta (visita → ativação → receita) e ao menos 1 *growth loop* funcionando.",
        project: "Dashboard de funil/AARRR + automação de lifecycle.",
      },
      {
        id: "dist-f6",
        code: "Fase 6",
        title: "Distribuição como Produto: Agentes de Growth",
        subtitle: "(pós-trilha técnica — operação madura)",
        duration: "contínua",
        body: `O nível final, onde sua identidade de AI engineer e a de marketeiro se fundem: **agentes autônomos de growth**. Usando **Codex + MCP + skills**, você constrói e opera uma máquina de distribuição que pesquisa, produz, publica, mede e itera — com você na supervisão estratégica.

- **Codex como infraestrutura de growth**: agentes que rodam o ciclo de conteúdo/distribuição, conectados às APIs de marketing via **MCP**, empacotados como **skills**, orquestrados via **Python SDK**.
- **Supervisão humana inegociável**: o agente propõe, você aprova o que importa. Modo *suggest*/*auto-edit* do Codex existe para isso.
- **Ética e risco**: não virar fábrica de *slop*, respeitar plataformas (anti-spam, anti-ban), e **LGPD em marketing** — consentimento para e-mail, cuidado em *cold outreach*, opt-out real.`,
        items: [
          { id: "dist-f6-1", label: "Operar suíte de agentes de growth (Codex + MCP + skills)", note: "Pesquisa, produz, publica, mede e itera." },
          { id: "dist-f6-2", label: "Garantir supervisão humana (modo suggest/auto-edit)", note: "O agente propõe, você aprova o que importa." },
          { id: "dist-f6-3", label: "Respeitar ética, anti-spam e LGPD em marketing", note: "Consentimento, opt-out real, cuidado em cold outreach." },
        ],
        codex: "Empacote tudo como skills reutilizáveis do Codex, conectadas via MCP às APIs (CMS, analytics, agendador social, e-mail), orquestradas pelo Python SDK + hooks + sandbox de CI (pipeline rodando sozinho à noite).",
        exit: "Máquina de distribuição majoritariamente automatizada, com supervisão humana, gerando aquisição de forma previsível — e dentro das regras (plataforma + LGPD).",
        project: "Suíte de agentes de growth (Codex skills + MCP) documentada.",
      },
    ],
    appendices: [
      {
        id: "dist-apx-a",
        title: "Apêndice A — Codex para Distribuição: o manual",
        body: `Estado do Codex em jun/2026: **agente de codação no terminal** (CLI), aberto, roda local, lê seu código, propõe mudanças multi-arquivo e executa comandos em *sandbox*.

- **Três modos de autonomia** — *suggest* (aprova tudo), *auto-edit* (edita arquivos, confirma comandos), e modo mais autônomo. **Comece no *suggest*.** Marketing automatizado sem freio = desastre de marca.
- **Agent Skills** — pacotes reutilizáveis de instruções (+ scripts). Crie skills para tarefas recorrentes: "gerar variações de thread", "auditar SEO on-page", "montar relatório semanal".
- **MCP (Model Context Protocol)** — conecte o Codex às APIs (CMS, analytics, agendador social, e-mail). Transforma "gerar texto" em "publicar e medir".
- **Python SDK + hooks + sandbox de CI** — automações programáticas e agendadas.

**O que construir com Codex (em ordem de dificuldade):**
1. Pipeline de repurposing (Fase 1/4).
2. Scrapers de reconhecimento de canal e *keyword* (Fase 2).
3. *Content engine* SEO/GEO ponta-a-ponta (Fase 3).
4. Dashboards e automações de lifecycle/A-B (Fase 5).
5. Suíte de agentes de growth orquestrados (Fase 6).

> **Filosofia:** o marqueteiro comum aluga ferramentas; o fundador-engenheiro **constrói** as suas. Cada SaaS de marketing que você não assina é margem no bolso — e controle de qualidade nas suas mãos.`,
      },
      {
        id: "dist-apx-b",
        title: "Apêndice B — Pessoas para seguir",
        body: `**Distribuição / fundador técnico:**
- **Arvid Kahl** — audiência-primeiro, build in public.
- **Pieter Levels** — distribuição indie radical.
- **Justin Welsh** — solopreneur, sistema de conteúdo.
- **Dan Koe** — marca pessoal e conteúdo.

**Marketing / growth (referências de ofício):**
- **April Dunford** — posicionamento.
- **Harry Dry** (Marketing Examples) — copy com exemplos concretos; ouro gratuito.
- **Rand Fishkin** (SparkToro) — SEO e *audience research*.
- **Brian Dean** (Backlinko) — SEO prático.
- **Julian Shapiro** — growth e copywriting.
- **Katelyn Bourgoin** (*Why We Buy*) — psicologia de compra.
- **Ross Simmonds** — "create once, distribute forever".
- **Lenny Rachitsky** — product/growth.

**Brasil:** Comunidade de Micro-SaaS BR (@brunomicrosaas); cena de marketing do Norte (DSX, Encontro Manauara).`,
      },
      {
        id: "dist-apx-c",
        title: "Apêndice C — Bibliografia de estudo",
        body: `**Essenciais (leia primeiro):**
- *Traction* — Weinberg & Mares (os 19 canais + Bullseye). **A base desta trilha.**
- *Obviously Awesome* — April Dunford (posicionamento).
- *This Is Marketing* — Seth Godin.

**Mensagem, copy e persuasão:**
- *Building a StoryBrand* — Donald Miller.
- *Made to Stick* — Chip & Dan Heath.
- *Influence* — Robert Cialdini.
- *The 1-Page Marketing Plan* — Allan Dib.

**Conteúdo, audiência e loops:**
- *The Embedded Entrepreneur* — Arvid Kahl.
- *Show Your Work!* — Austin Kleon.
- *Contagious* — Jonah Berger.
- *Hooked* — Nir Eyal.

**Oferta e aquisição:**
- *$100M Leads* — Alex Hormozi.
- *Predictable Revenue* — Aaron Ross.

**Newsletters/blogs gratuitos:** Marketing Examples (Harry Dry), Demand Curve, Lenny's Newsletter, Growth.Design.`,
      },
      {
        id: "dist-apx-d",
        title: "Apêndice D — Networking de marketing (Manaus + online)",
        body: `**Manaus / presencial (alta aderência):**
- **DSX 2026 — Digital Summit Experience** — maior evento de marketing digital do Norte (2.000+). Praticamente feito para esta trilha.
- **Encontro Manauara de Marketing Digital 2026**.
- **Polo Digital de Manaus** — agenda com ~35 eventos/ano.
- **Jaraqui Valley** (meetups) e **Manaus Tech Hub**.

**Online:**
- **Comunidade de Micro-SaaS BR** (@brunomicrosaas), **Indie Hackers**, **MicroConf**.
- **Demand Curve**, **Superpath** (content marketing), **Traffic Think Tank** (SEO).
- **Reddit**: r/marketing, r/SEO, r/Entrepreneur, r/SaaS.`,
      },
      {
        id: "dist-apx-e",
        title: "🔥 Apêndice E — Modo Brutal: armadilhas de distribuição",
        body: `- **Field of Dreams.** "Construí, logo virão." Não virão. Distribuição começa no **dia 1**, não no lançamento.
- **Fábrica de *slop*.** Automatizar conteúdo genérico de IA. Usuários ignoram, buscadores punem. Automação **amplifica** qualidade — ou amplifica lixo.
- **Automatizar antes de fazer manual.** Faça à mão primeiro para saber o que vale automatizar. Automatizar processo não-validado = escalar o erro.
- **Canal-hopping.** Domine **um** antes de abrir o segundo.
- **Métricas de vaidade.** A pergunta é sempre: isso virou ativação ou receita?
- **Comprar audiência.** Leads falsos destroem engajamento real e reputação.
- **Esperar viralizar.** Viral é sorte; sistema é escolha.
- **Sumir.** "Build in public" que vira silêncio de 12 meses. Publique feio e cedo.
- **Ignorar LGPD no marketing.** Cold outreach sem consentimento/opt-out vira multa e dano de marca.

> Regra-resumo: **distribua todo dia, automatize só o que você já dominou na mão, e nunca troque autenticidade por escala.**`,
      },
      {
        id: "dist-apx-refs",
        title: "🔗 Referências e links",
        body: `1. [OpenAI Codex — repositório oficial](https://github.com/openai/codex)
2. [Codex CLI — OpenAI Developers](https://developers.openai.com/codex/cli)
3. [Codex Changelog — OpenAI Developers](https://developers.openai.com/codex/changelog)
4. [Unrolling the Codex agent loop — OpenAI](https://openai.com/index/unrolling-the-codex-agent-loop/)
5. [The 17 best AI marketing tools in 2026 — Zapier](https://zapier.com/blog/best-ai-marketing-tools/)
6. [We Tested the 13 Best AI SEO Tools in 2026 — Whatagraph](https://whatagraph.com/blog/articles/ai-seo-tools)
7. [Best AI SEO Tools 2026 — Writesonic](https://writesonic.com/blog/ai-seo-tools)
8. [30 best AI marketing tools for 2026 — Marketer Milk](https://www.marketermilk.com/blog/ai-marketing-tools)
9. [DSX 2026 — Digital Summit Experience Manaus](https://www.listadeeventos.com.br/evento/dsx-2026-digital-summit-experience-manaus)
10. [Encontro Manauara de Marketing Digital 2026 — Sympla](https://www.sympla.com.br/evento/encontro-manauara-de-marketing-digital-2026/3270844)
11. [Agenda 2026 de eventos — Polo Digital de Manaus](https://polodigitaldemanaus.com/agenda-2026-confira-35-eventos-de-tecnologia-e-inovacao-para-acompanhar-ao-longo-do-ano/)
12. [Comunidade de Micro-SaaS (Brasil)](https://comunidade.microsaas.com.br/)
13. [Indie Hackers](https://www.indiehackers.com/)`,
      },
      {
        id: "dist-apx-f",
        title: "Apêndice F — Convergência das TRÊS trilhas",
        body: `| Momento | Técnica | Negócio | Distribuição |
| --- | --- | --- | --- |
| Início (mês 0–3) | Fases 0–3: base + redes neurais | Fases 0–1: ideação + Mom Test | Fases 0–1: posicionamento + build in public |
| Construção (mês 4–10) | Fases 4–6: DL, Transformers, RAG | Fase 2–3: MVP + LGPD | Fases 2–3: canais + content engine |
| Produção (mês 10+) | Fase 7: microsserviço de IA | Fases 4–5: captação + métricas | Fases 4–5: multicanal + funil/loops |
| Maturidade | Operação/escala | Fase 6: VC | Fase 6: agentes de growth |

> **A grande sacada:** as três trilhas compartilham o **mesmo motor** — o Codex e os agentes de IA. Você usa Codex para *construir o produto*, *modelar unit economics/conformidade* e *operar a distribuição*. É a mesma habilidade de engenharia nas três frentes. Essa é a sua vantagem injusta como fundador técnico no mundo pós-LLM.`,
      },
    ],
  },
];

module.exports = { TRACKS };
