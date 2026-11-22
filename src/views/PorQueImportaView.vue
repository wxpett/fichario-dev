<template>
  <div class="sheet">
    <!-- Cabeçalho da folha -->
    <div class="section-block">
      <span class="section-label">Folha 1 de 6</span>
      <h1>
        Por que responsividade
        <span class="highlight-title">importa?</span>
      </h1>
      <p class="mt-2 text-sm text-muted">
        A web mora em dispositivos de todos os tamanhos. Responsividade é a habilidade de um site
        se adaptar a qualquer tela — do celular de R$300 ao monitor 4K do escritório.
      </p>
    </div>

    <!-- 1. Explicação -->
    <div class="section-block">
      <span class="section-label">📖 Explicação</span>
      <h2 class="mb-2">O que é responsividade, em termos simples?</h2>
      <p>
        Imagine que você escreveu uma carta em folha A4. Responsividade seria a carta se
        dobrar e reorganizar automaticamente para caber em um post-it, num envelope e num pôster,
        <em>sem você precisar reescrever nada.</em>
      </p>
      <p class="mt-2">
        Para isso acontecer na web, três coisas precisam funcionar juntas:
      </p>
      <ul style="list-style:disc; padding-left:1.5rem; margin-top:0.75rem; display:flex; flex-direction:column; gap:0.5rem;">
        <li><strong>Meta tag viewport</strong> — diz ao celular "renderize no tamanho real, não em desktop miniaturizado"</li>
        <li><strong>CSS fluido</strong> — unidades relativas (<code>rem</code>, <code>%</code>, <code>vw</code>) em vez de px fixos</li>
        <li><strong>Media queries</strong> — regras CSS que se aplicam a partir de uma certa largura de tela</li>
      </ul>

      <div class="stat-cards mt-3">
        <div class="stat-card">
          <span class="stat-number">63%</span>
          <span class="stat-label">do tráfego web global vem de celulares (2024)</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">53%</span>
          <span class="stat-label">dos usuários abandonam sites que demoram +3s para carregar</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">↑ SEO</span>
          <span class="stat-label">Google prioriza sites mobile-friendly nos resultados de busca</span>
        </div>
      </div>
    </div>

    <!-- 2. Código -->
    <div class="section-block">
      <span class="section-label">💻 Código comentado</span>
      <h2 class="mb-2">A base de qualquer página responsiva</h2>

      <CodeBlock linguagem="html" filename="index.html" :codigo="codigoHtml">
<span class="comment">&lt;!-- Sempre no &lt;head&gt; da sua página --&gt;</span>
<span class="keyword">&lt;meta</span> <span class="property">name</span>=<span class="string">"viewport"</span>
      <span class="property">content</span>=<span class="string">"width=device-width, initial-scale=1.0"</span><span class="keyword">&gt;</span>

<span class="comment">&lt;!--
  width=device-width
    → usa a largura REAL do dispositivo (não os 980px simulados)
  initial-scale=1.0
    → não aplica zoom automático ao carregar
  Sem isso: o celular simula um browser de 980px e fica tudo minúsculo!
--&gt;</span>
      </CodeBlock>

      <CodeBlock linguagem="css" filename="base.css" :codigo="codigoCss" class="mt-2">
<span class="comment">/* Mobile-First: estilos base = celular */</span>
<span class="selector">.container</span> {
  <span class="property">width</span>: <span class="value">100%</span>;
  <span class="property">padding</span>: <span class="value">1rem</span>;      <span class="comment">/* rem — escala com acessibilidade */</span>
  <span class="property">margin</span>: <span class="value">0 auto</span>;
}

<span class="comment">/* Tablet: a partir de 48rem (768px) */</span>
<span class="keyword">@media</span> (<span class="property">min-width</span>: <span class="value">48rem</span>) {
  <span class="selector">.container</span> {
    <span class="property">max-width</span>: <span class="value">45rem</span>;
    <span class="property">padding</span>: <span class="value">1.5rem 2rem</span>;
  }
}

<span class="comment">/* Desktop: a partir de 64rem (1024px) */</span>
<span class="keyword">@media</span> (<span class="property">min-width</span>: <span class="value">64rem</span>) {
  <span class="selector">.container</span> {
    <span class="property">max-width</span>: <span class="value">72rem</span>;
    <span class="property">padding</span>: <span class="value">2rem 3rem</span>;
  }
}
      </CodeBlock>
    </div>

    <!-- 3. Post-it pergunta-guia -->
    <div class="section-block">
      <span class="section-label">🤔 Pergunta-guia</span>
      <PostItNote cor="yellow" label="📌 Pense nisso...">
        <strong>
          Um site tem media queries bem escritas, mas não tem a meta tag viewport.
          No celular, ele aparece como a versão de computador, só que minúscula. Por que isso acontece?
        </strong>
        <div style="margin-top:0.75rem; font-size:1rem;">
          <span style="font-weight:700; color:#B45309;">Resposta:</span>
          Sem a meta viewport, o celular (iOS/Android) usa o <strong>"viewport virtual"</strong>
          de ~980px de largura — uma herança dos anos 2000, quando sites eram feitos só para desktop.
          O browser então <em>encolhe</em> tudo para caber na tela física.
          As media queries nunca disparam porque o browser "acha" que a tela tem 980px.
          A meta tag <code style="font-size:0.9em">width=device-width</code> substitui esse valor pelo
          tamanho real (ex: 390px no iPhone 14), fazendo as media queries funcionarem corretamente.
        </div>
      </PostItNote>
    </div>

    <!-- 4. Fontes -->
    <div class="sources-section">
      <h3>📚 Fontes consultadas</h3>
      <ul class="sources-list">
        <li>
          <a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML/Viewport_meta_tag" target="_blank" rel="noopener">
            MDN Web Docs — Viewport meta tag
          </a>
        </li>
        <li>
          <a href="https://web.dev/learn/design/responsive-images" target="_blank" rel="noopener">
            web.dev — Responsive design fundamentals
          </a>
        </li>
        <li>
          <a href="https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design" target="_blank" rel="noopener">
            MDN — Responsive Design overview
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

const codigoHtml = `<!-- Sempre no <head> da sua página -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!--
  width=device-width → usa a largura REAL do dispositivo
  initial-scale=1.0  → não aplica zoom automático
  Sem isso: celular simula browser de 980px e fica tudo minúsculo!
-->`

const codigoCss = `/* Mobile-First: estilos base = celular */
.container {
  width: 100%;
  padding: 1rem;
  margin: 0 auto;
}

/* Tablet: a partir de 48rem (768px) */
@media (min-width: 48rem) {
  .container {
    max-width: 45rem;
    padding: 1.5rem 2rem;
  }
}

/* Desktop: a partir de 64rem (1024px) */
@media (min-width: 64rem) {
  .container {
    max-width: 72rem;
    padding: 2rem 3rem;
  }
}`
</script>

<style scoped>
.stat-cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stat-card {
  background: white;
  border: 1.5px solid var(--border-subtle);
  border-left: 4px solid var(--ink-blue);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--ink-blue);
  font-family: var(--font-handwriting);
}

.stat-label {
  font-size: 0.82rem;
  color: rgba(0,0,0,0.6);
}

@media (min-width: 48rem) {
  .stat-cards {
    flex-direction: row;
  }

  .stat-card {
    flex: 1;
  }
}
</style>
