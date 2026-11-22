<template>
  <div class="sheet">
    <div class="section-block">
      <span class="section-label">Folha 3 de 6</span>
      <h1>
        Flexbox &amp;
        <span class="highlight-title">Grid</span>
      </h1>
      <p class="mt-2 text-sm text-muted">
        Flexbox organiza em <strong>uma dimensão</strong> (linha ou coluna).
        Grid organiza em <strong>duas dimensões</strong> (linhas e colunas) ao mesmo tempo.
      </p>
    </div>

    <!-- 1. Explicação -->
    <div class="section-block">
      <span class="section-label">📖 Explicação</span>

      <div class="compare-cards">
        <div class="compare-card flex-card">
          <h3>📏 Flexbox — 1D</h3>
          <p>Pense numa prateleira: os itens ficam em fila e você decide como distribuir o espaço entre eles.</p>
          <ul>
            <li><code>justify-content</code> — distribui no eixo principal (horizontal por padrão)</li>
            <li><code>align-items</code> — alinha no eixo cruzado (vertical por padrão)</li>
            <li><code>flex-wrap: wrap</code> — deixa os itens quebrarem para a próxima linha</li>
            <li><code>gap</code> — espaço entre os itens (substitui margin em filhos)</li>
          </ul>
          <span class="use-when">✅ Use para: navbars, botões em linha, cards em fila, centralizar um item</span>
        </div>

        <div class="compare-card grid-card">
          <h3>⬛ Grid — 2D</h3>
          <p>Pense numa planilha: você define as colunas e linhas, e os itens se encaixam nas células.</p>
          <ul>
            <li><code>grid-template-columns</code> — define as colunas</li>
            <li><code>repeat(auto-fit, minmax(14rem, 1fr))</code> — colunas que somem/aparecem automaticamente</li>
            <li><code>gap</code> — espaço entre linhas e colunas</li>
            <li><code>grid-column: span 2</code> — um item ocupa 2 colunas</li>
          </ul>
          <span class="use-when">✅ Use para: layouts de página, galerias, dashboards</span>
        </div>
      </div>

      <PostItNote cor="blue" label="💡 Regra de ouro" class="mt-3">
        Se você precisa alinhar <strong>em uma direção só</strong> → Flexbox.<br>
        Se precisa alinhar <strong>nas duas direções ao mesmo tempo</strong> → Grid.<br>
        Eles também funcionam <strong>juntos</strong>: Grid no layout da página, Flexbox nos componentes internos.
      </PostItNote>
    </div>

    <!-- 2. Código -->
    <div class="section-block">
      <span class="section-label">💻 Código comentado</span>
      <CodeBlock linguagem="css" filename="layout.css" :codigo="codigoCss">
<span class="comment">/* === FLEXBOX === */</span>
<span class="selector">.navbar</span> {
  <span class="property">display</span>: <span class="value">flex</span>;
  <span class="property">justify-content</span>: <span class="value">space-between</span>; <span class="comment">/* logo esquerda, links direita */</span>
  <span class="property">align-items</span>: <span class="value">center</span>;          <span class="comment">/* centraliza verticalmente */</span>
  <span class="property">gap</span>: <span class="value">1rem</span>;                   <span class="comment">/* espaço entre itens */</span>
  <span class="property">flex-wrap</span>: <span class="value">wrap</span>;             <span class="comment">/* quebra linha se não couber */</span>
}

<span class="comment">/* === GRID AUTO-RESPONSIVO (a mágica!) === */</span>
<span class="selector">.cards-grid</span> {
  <span class="property">display</span>: <span class="value">grid</span>;

  <span class="comment">/*
    repeat(auto-fit, ...)
      → cria quantas colunas couberem no espaço
    minmax(14rem, 1fr)
      → cada coluna: mínimo 14rem, máximo 1fr (cresce igualmente)

    Resultado: em 280px → 1 coluna
               em 464px → 2 colunas (14 + 1 gap + 14 = 29rem = 464px)
               em 702px → 3 colunas (14+1+14+1+14 = 44rem = 704px)
  --></span>
  <span class="property">grid-template-columns</span>: <span class="value">repeat(auto-fit, minmax(14rem, 1fr))</span>;
  <span class="property">gap</span>: <span class="value">1rem</span>;
}

<span class="comment">/* Nenhuma media query necessária! O grid cuida de tudo ✨ */</span>
      </CodeBlock>
    </div>

    <!-- 3. Post-it -->
    <div class="section-block">
      <span class="section-label">🤔 Pergunta-guia</span>
      <PostItNote cor="yellow" label="📌 Pense nisso...">
        <strong>
          Um contêiner usa <code style="font-size:0.9em">grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr))</code>
          e <code style="font-size:0.9em">gap: 1rem</code>.
          A partir de qual largura do contêiner os cards passam de 1 para 2 colunas?
        </strong>
        <div style="margin-top:0.75rem; font-size:1rem;">
          <span style="font-weight:700; color:#B45309;">Resposta (com a conta):</span>
          Para caber 2 colunas, o contêiner precisa ter espaço para:
          <br>
          <code style="font-size:0.9em; display:block; margin:0.5rem 0; background:rgba(0,0,0,0.08); padding:0.4rem 0.75rem; border-radius:4px;">
            14rem + 1rem (gap) + 14rem = 29rem = 29 × 16px = <strong>464px</strong>
          </code>
          Assim que o contêiner atinge 464px de largura, o grid cria automaticamente a segunda coluna.
          Teste isso no laboratório abaixo! 👇
        </div>
      </PostItNote>
    </div>

    <!-- 4. Laboratório -->
    <div class="section-block">
      <span class="section-label">🔬 Laboratório</span>
      <LabGrid />
    </div>

    <!-- Fontes -->
    <div class="sources-section">
      <h3>📚 Fontes consultadas</h3>
      <ul class="sources-list">
        <li>
          <a href="https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox" target="_blank" rel="noopener">
            MDN — Conceitos básicos de Flexbox
          </a>
        </li>
        <li>
          <a href="https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout" target="_blank" rel="noopener">
            MDN — Conceitos básicos de Grid Layout
          </a>
        </li>
        <li>
          <a href="https://web.dev/learn/css/grid" target="_blank" rel="noopener">
            web.dev — Learn CSS Grid
          </a>
        </li>
      </ul>
    </div>

    <SheetNav />
  </div>
</template>

<script setup>
import CodeBlock from '@/components/ui/CodeBlock.vue'
import PostItNote from '@/components/ui/PostItNote.vue'
import SheetNav from '@/components/ui/SheetNav.vue'
import LabGrid from '@/components/labs/LabGrid.vue'

const codigoCss = `/* === FLEXBOX === */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* === GRID AUTO-RESPONSIVO === */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
  /* 2 colunas surgem a partir de: 14rem + 1rem gap + 14rem = 29rem = 464px */
}`
</script>

<style scoped>
.compare-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.compare-card {
  border: 1.5px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
}

.compare-card h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.compare-card ul {
  list-style: none;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.compare-card li {
  font-size: 0.85rem;
  padding-left: 0.5rem;
  border-left: 2px solid var(--border-subtle);
}

.compare-card li code {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--ink-blue);
}

.flex-card { border-left: 4px solid #F59E0B; }
.grid-card { border-left: 4px solid var(--ink-blue); }

.use-when {
  display: block;
  margin-top: 0.75rem;
  font-size: 0.8rem;
  background: #F9F7F4;
  padding: 0.4rem 0.6rem;
  border-radius: var(--radius-sm);
  color: rgba(0,0,0,0.6);
}

@media (min-width: 48rem) {
  .compare-cards {
    flex-direction: row;
  }

  .compare-card {
    flex: 1;
  }
}
</style>
