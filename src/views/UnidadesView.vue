<template>
  <div class="sheet">
    <div class="section-block">
      <span class="section-label">Folha 2 de 6</span>
      <h1>
        Unidades
        <span class="highlight-title">CSS</span>
      </h1>
      <p class="mt-2 text-sm text-muted">
        Escolher a unidade certa é a diferença entre um site travado e um que respira.
        Veja quando usar cada uma.
      </p>
    </div>

    <!-- 1. Explicação -->
    <div class="section-block">
      <span class="section-label">📖 Explicação</span>
      <h2 class="mb-2">Absolutas vs. Relativas</h2>

      <div class="units-grid">
        <div class="unit-card unit-card--abs">
          <div class="unit-card-header">
            <span class="unit-badge abs">Absolutas</span>
            <span class="text-xs text-muted">Valor fixo, não muda</span>
          </div>
          <div class="unit-entry">
            <code>px</code>
            <span>Pixel CSS — 1/96 de polegada. Não respeita zoom do usuário.</span>
          </div>
        </div>

        <div class="unit-card unit-card--rel">
          <div class="unit-card-header">
            <span class="unit-badge rel">Relativas</span>
            <span class="text-xs text-muted">Escalam com o contexto</span>
          </div>
          <div class="unit-entry">
            <code>rem</code>
            <span>Relativo ao <code>font-size</code> do <strong>elemento raiz</strong> (<code>&lt;html&gt;</code>). Padrão: 1rem = 16px. Respeita configurações de acessibilidade do usuário.</span>
          </div>
          <div class="unit-entry">
            <code>em</code>
            <span>Relativo ao <code>font-size</code> do <strong>elemento pai</strong>. Pode acumular (1.2em dentro de 1.2em = 1.44em).</span>
          </div>
          <div class="unit-entry">
            <code>%</code>
            <span>Porcentagem do elemento pai. Ótimo para larguras fluidas.</span>
          </div>
          <div class="unit-entry">
            <code>fr</code>
            <span><em>Fraction</em> — fração do espaço disponível no Grid. <code>1fr 2fr</code> = divisão 1:2.</span>
          </div>
          <div class="unit-entry">
            <code>vw</code>
            <span><em>Viewport Width</em> — 1vw = 1% da largura da janela. <code>100vw</code> = tela inteira.</span>
          </div>
          <div class="unit-entry">
            <code>vh</code>
            <span><em>Viewport Height</em> — 1vh = 1% da altura visível. ⚠️ No celular, inclui a barra do browser.</span>
          </div>
          <div class="unit-entry">
            <code>dvh</code>
            <span><em>Dynamic Viewport Height</em> — altura real sem a barra do browser. Use para "telas cheias" no mobile.</span>
          </div>
          <div class="unit-entry">
            <code>ch</code>
            <span>Largura do caractere "0" na fonte atual. Ótimo para limitar linhas de texto: <code>max-width: 65ch</code>.</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Código -->
    <div class="section-block">
      <span class="section-label">💻 Código comentado</span>
      <CodeBlock linguagem="css" filename="unidades.css" :codigo="codigoCss">
<span class="comment">/* ✅ RECOMENDADO: use rem para texto e espaçamentos */</span>
<span class="selector">body</span> {
  <span class="property">font-size</span>: <span class="value">1rem</span>;      <span class="comment">/* = 16px padrão, mas respeita zoom */</span>
  <span class="property">line-height</span>: <span class="value">1.6</span>;      <span class="comment">/* sem unidade = relativo ao próprio font-size */</span>
}

<span class="selector">h1</span> {
  <span class="property">font-size</span>: <span class="value">2rem</span>;       <span class="comment">/* = 32px, mas escala com acessibilidade */</span>
  <span class="property">margin-bottom</span>: <span class="value">1.5rem</span>; <span class="comment">/* espaçamentos também em rem */</span>
}

<span class="comment">/* ✅ Largura fluida com max-width em ch */</span>
<span class="selector">article</span> {
  <span class="property">width</span>: <span class="value">100%</span>;
  <span class="property">max-width</span>: <span class="value">70ch</span>;    <span class="comment">/* ~70 caracteres por linha = legível */</span>
  <span class="property">margin</span>: <span class="value">0 auto</span>;
}

<span class="comment">/* ✅ Tela cheia no celular sem "vh bug" */</span>
<span class="selector">.hero</span> {
  <span class="property">min-height</span>: <span class="value">100dvh</span>;  <span class="comment">/* dvh = altura real sem barra do browser */</span>
  <span class="property">padding</span>: <span class="value">2rem</span>;
}

<span class="comment">/* ✅ Grid com fr — distribui espaço restante */</span>
<span class="selector">.layout</span> {
  <span class="property">display</span>: <span class="value">grid</span>;
  <span class="property">grid-template-columns</span>: <span class="value">1fr 3fr</span>; <span class="comment">/* sidebar: 25%, main: 75% */</span>
  <span class="property">gap</span>: <span class="value">1.5rem</span>;
}

<span class="comment">/* ❌ EVITE: px para font-size e espaçamentos */</span>
<span class="selector">p</span> {
  <span class="property">font-size</span>: <span class="value">16px</span>;   <span class="comment">/* NÃO escala com preferências do usuário */</span>
  <span class="property">padding</span>: <span class="value">24px</span>;    <span class="comment">/* Rígido, não "respira" */</span>
}
      </CodeBlock>
    </div>

    <!-- 3. Post-it -->
    <div class="section-block">
      <span class="section-label">🤔 Pergunta-guia</span>
      <PostItNote cor="pink" label="📌 Pense nisso...">
        <strong>
          Uma pessoa com baixa visão aumenta o tamanho da fonte nas configurações do navegador.
          O texto em <code style="font-size:0.9em">px</code> continua do mesmo tamanho, mas o em
          <code style="font-size:0.9em">rem</code> aumenta. Por quê?
        </strong>
        <div style="margin-top:0.75rem; font-size:1rem;">
          <span style="font-weight:700; color:#9F1239;">Resposta:</span>
          O navegador expõe um <strong>"font-size raiz"</strong> que o usuário controla
          (geralmente nas configurações de acessibilidade). Quando você usa <code style="font-size:0.9em">rem</code>,
          o valor final é <code style="font-size:0.9em">1rem × font-size-raiz</code>.
          Se o usuário aumentou de 16px para 20px, 1rem passa a valer 20px — tudo escala junto.
          Já <code style="font-size:0.9em">px</code> é um valor absoluto: o browser não tem autorização
          para alterá-lo, então o texto ignora completamente a preferência da pessoa.
          Usar <code style="font-size:0.9em">rem</code> é acessibilidade de graça!
        </div>
      </PostItNote>
    </div>

    <!-- 4. Laboratório -->
    <div class="section-block">
      <span class="section-label">🔬 Laboratório</span>
      <LabUnidades />
    </div>

    <!-- Fontes -->
    <div class="sources-section">
      <h3>📚 Fontes consultadas</h3>
      <ul class="sources-list">
        <li>
          <a href="https://developer.mozilla.org/pt-BR/docs/Web/CSS/length" target="_blank" rel="noopener">
            MDN Web Docs — Unidades de comprimento CSS
          </a>
        </li>
        <li>
          <a href="https://web.dev/articles/font-size" target="_blank" rel="noopener">
            web.dev — Use legible font sizes
          </a>
        </li>
        <li>
          <a href="https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units" target="_blank" rel="noopener">
            MDN — CSS values and units
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
import LabUnidades from '@/components/labs/LabUnidades.vue'

const codigoCss = `/* ✅ RECOMENDADO: use rem para texto e espaçamentos */
body {
  font-size: 1rem;       /* = 16px padrão, respeita zoom */
  line-height: 1.6;
}
h1 {
  font-size: 2rem;       /* = 32px, escala com acessibilidade */
  margin-bottom: 1.5rem;
}

/* ✅ Largura fluida com max-width em ch */
article {
  width: 100%;
  max-width: 70ch;    /* ~70 caracteres por linha */
  margin: 0 auto;
}

/* ✅ Tela cheia no celular sem "vh bug" */
.hero {
  min-height: 100dvh; /* dvh = altura real sem barra browser */
}

/* ❌ EVITE: px para font-size e espaçamentos */
p {
  font-size: 16px;   /* NÃO escala com preferências do usuário */
  padding: 24px;     /* Rígido */
}`
</script>

<style scoped>
.units-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.unit-card {
  border: 1.5px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.unit-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1rem;
  background: #F9F7F4;
  border-bottom: 1px solid var(--border-subtle);
}

.unit-badge {
  display: inline-block;
  padding: 0.15rem 0.6rem;
  border-radius: 2rem;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.unit-badge.abs { background: #FEE2E2; color: #B91C1C; }
.unit-badge.rel { background: #DCFCE7; color: #15803D; }

.unit-entry {
  display: grid;
  grid-template-columns: 3.5rem 1fr;
  gap: 0.75rem;
  align-items: start;
  padding: 0.6rem 1rem;
  border-bottom: 1px solid #F0EDE8;
  font-size: 0.85rem;
}

.unit-entry:last-child { border-bottom: none; }

.unit-entry code {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--ink-blue);
  background: #EFF6FF;
  padding: 0.1rem 0.4rem;
  border-radius: var(--radius-sm);
  white-space: nowrap;
  display: inline-block;
}

@media (min-width: 48rem) {
  .units-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
</style>
