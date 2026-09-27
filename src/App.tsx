import { useEffect, useMemo, useState } from 'react'
import { concepts, myths, phases, type Myth, type Phase } from './content'

type Page = 'home' | 'journey' | 'myths' | 'concepts' | 'about'

function routeFromPath(): { page: Page; phase?: string } {
  const parts = window.location.pathname.split('/').filter(Boolean)
  if (parts[0] === 'journey') return { page: 'journey', phase: parts[1] }
  if (parts[0] === 'myth-reality') return { page: 'myths' }
  if (parts[0] === 'concepts') return { page: 'concepts' }
  if (parts[0] === 'about') return { page: 'about' }
  return { page: 'home' }
}

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <i key={i} />)}</span>
}

function SiteHeader({ page, navigate }: { page: Page; navigate: (path: string) => void }) {
  const items: Array<[Page, string, string]> = [
    ['journey', 'The Journey', '/journey/sources'],
    ['myths', 'Myth / Reality', '/myth-reality'],
    ['concepts', 'Concept Atlas', '/concepts'],
    ['about', 'About', '/about'],
  ]
  return <header className="site-header">
    <button className="brand" onClick={() => navigate('/')} aria-label="AI Illustrations home"><BrandMark /><span>AI Illustrations</span></button>
    <nav aria-label="Primary navigation">
      {items.map(([id, label, path]) => <button key={id} className={page === id ? 'active' : ''} onClick={() => navigate(path)}>{label}</button>)}
    </nav>
  </header>
}

function Home({ navigate }: { navigate: (path: string) => void }) {
  const [active, setActive] = useState(0)
  const stations = [
    ['Human sources', 'People create the language, code, records, and images from which systems learn.'],
    ['Prepared data', 'Collection is followed by consequential choices about inclusion, quality, rights, and safety.'],
    ['Tokens & vectors', 'Text becomes vocabulary IDs and learned numerical representations.'],
    ['Training', 'Predictions, losses, gradients, and parameter updates repeat at immense scale.'],
    ['Trained model', 'Patterns are distributed across weights—not arranged as a simple document archive.'],
    ['Generated response', 'A prompt becomes a probability distribution, one selected token, and then another.'],
  ]
  return <main id="main-content" className="home-page">
    <section className="hero">
      <p className="eyebrow">An interactive model of a language model</p>
      <h1>How does human language become a machine-generated answer?</h1>
      <p className="hero-copy">Follow one sentence from books and websites into a training dataset, through tokens, vectors, attention, and learning, and finally into the response generated in a chat window.</p>
      <div className="hero-actions">
        <button className="button primary" onClick={() => navigate('/journey/sources')}>Begin the journey <span aria-hidden="true">→</span></button>
        <button className="button secondary" onClick={() => navigate('/myth-reality')}>Test an AI myth</button>
      </div>
    </section>
    <section className="overview" aria-labelledby="overview-title">
      <div className="section-head"><div><p className="eyebrow">The complete path</p><h2 id="overview-title">One sentence. Six transformations.</h2></div><p>Select a station to see what changes—and what does not.</p></div>
      <div className="station-line" aria-label="Model lifecycle stations">
        {stations.map(([title], index) => <button key={title} onClick={() => setActive(index)} className={active === index ? 'active' : ''} aria-pressed={active === index}><span>{String(index + 1).padStart(2, '0')}</span>{title}</button>)}
      </div>
      <div className="station-detail" aria-live="polite"><strong>{stations[active][0]}</strong><p>{stations[active][1]}</p></div>
    </section>
    <section className="scope-note"><p className="eyebrow">Scope</p><p>This is a technically faithful conceptual simulation, not a reconstruction of any proprietary model. Exact datasets, filters, architectures, and post-training systems vary.</p></section>
  </main>
}

function SourcesSimulation() {
  const [stage, setStage] = useState(0)
  const items = [
    { title: 'Printed source', text: 'Authorship, publication, edition, rights, and context exist before digitization.', icon: '▤' },
    { title: 'Page image', text: 'Scanning records pixels. OCR has not yet recognized the characters.', icon: '▧' },
    { title: 'OCR text', text: 'Software estimates the text, including possible errors and lost formatting.', icon: 'Aa' },
    { title: 'Collected record', text: 'Text, metadata, source route, and provenance enter a collection system.', icon: '⌘' },
  ]
  return <div className="simulation sources-sim">
    <div className="pipeline" role="list" aria-label="Digitization stages">
      {items.map((item, i) => <button role="listitem" key={item.title} className={stage === i ? 'active' : ''} onClick={() => setStage(i)}><span className="object-icon">{item.icon}</span><strong>{item.title}</strong><small>{i < items.length - 1 ? '→' : '✓'}</small></button>)}
    </div>
    <div className="sim-readout" aria-live="polite"><span>Stage {stage + 1}</span><strong>{items[stage].title}</strong><p>{items[stage].text}</p></div>
  </div>
}

function PreparationSimulation() {
  const [quality, setQuality] = useState(62)
  const [dedupe, setDedupe] = useState(70)
  const [balance, setBalance] = useState(45)
  const kept = Math.max(12, Math.round(100 - quality * .35 - dedupe * .22))
  return <div className="simulation prep-sim">
    <div className="control-stack">
      <label>Quality threshold <output>{quality}%</output><input type="range" min="0" max="100" value={quality} onChange={e => setQuality(Number(e.target.value))} /></label>
      <label>Deduplication strength <output>{dedupe}%</output><input type="range" min="0" max="100" value={dedupe} onChange={e => setDedupe(Number(e.target.value))} /></label>
      <label>Source balancing <output>{balance}%</output><input type="range" min="0" max="100" value={balance} onChange={e => setBalance(Number(e.target.value))} /></label>
    </div>
    <div className="dataset-vessel" aria-label={`${kept} percent of illustrative material retained`}>
      <div className="dataset-fill" style={{ height: `${kept}%` }} /><strong>{kept}%</strong><span>retained</span>
    </div>
    <p className="tradeoff">Stricter filters reduce volume and some risks, but can also remove useful, rare, or minority material. No setting is neutral.</p>
  </div>
}

function simpleTokenize(text: string) {
  return text.match(/[\p{L}\p{N}]+|[^\s\p{L}\p{N}]/gu) ?? []
}

function TokensSimulation() {
  const [text, setText] = useState('She went to the bank after lunch.')
  const tokens = simpleTokenize(text)
  return <div className="simulation token-sim">
    <label className="text-input">Try a sentence<input value={text} maxLength={90} onChange={e => setText(e.target.value)} /></label>
    <div className="token-output" aria-live="polite">{tokens.map((token, i) => <span key={`${token}-${i}`}><b>{token}</b><small>{(token.charCodeAt(0) * 73 + i * 211) % 12000}</small></span>)}</div>
    <p className="tradeoff">Illustrative tokenizer: production vocabularies often split rare words into subwords and may treat preceding spaces as part of a token.</p>
  </div>
}

function EmbeddingsSimulation() {
  const [context, setContext] = useState<'finance' | 'river'>('finance')
  const points = context === 'finance'
    ? [['money',22,35],['loan',33,52],['bank',43,38],['interest',55,56],['river',82,74],['shore',88,55]]
    : [['money',18,72],['loan',30,80],['bank',68,48],['interest',42,86],['river',76,35],['shore',86,52]]
  return <div className="simulation embedding-sim">
    <div className="segmented" role="group" aria-label="Sentence context"><button className={context === 'finance' ? 'active' : ''} onClick={() => setContext('finance')}>She deposited money in the bank.</button><button className={context === 'river' ? 'active' : ''} onClick={() => setContext('river')}>She rested on the river bank.</button></div>
    <div className="vector-space" aria-label={`Projected embedding space for ${context} context`}>
      {points.map(([label,x,y]) => <span key={label} className={label === 'bank' ? 'focus-point' : ''} style={{ left:`${x}%`, top:`${y}%` }}>{label}</span>)}
      <i className="axis-x" /><i className="axis-y" />
    </div>
    <p className="tradeoff">The moving point represents a contextual state. Real vectors have far more dimensions; this projection is explanatory, not literal.</p>
  </div>
}

function TrainingSimulation() {
  const [round, setRound] = useState(0)
  const probability = Math.min(91, 18 + round * 9)
  const loss = Math.max(.12, 2.45 * Math.exp(-round * .28))
  return <div className="simulation training-sim">
    <div className="training-example"><span>The cat sat on the</span><strong>___</strong></div>
    <div className="probabilities">
      {[['mat',probability],['roof',Math.max(3,35-round*3)],['idea',Math.max(2,24-round*2)]].map(([label,value]) => <div key={label}><span>{label}</span><i><b style={{width:`${value}%`}} /></i><output>{value}%</output></div>)}
    </div>
    <div className="training-metrics"><div><span>Training round</span><strong>{round}</strong></div><div><span>Loss</span><strong>{loss.toFixed(2)}</strong></div><button className="button primary" onClick={() => setRound(r => Math.min(8, r + 1))}>{round >= 8 ? 'Converged' : 'Run one update'}</button><button className="text-button" onClick={() => setRound(0)}>Reset</button></div>
    <div className="gradient-line" aria-label="Prediction, loss, gradient, and updated weights"><span>prediction</span><b>→</b><span>loss</span><b>→</b><span>gradients</span><b>→</b><span>weight update</span></div>
  </div>
}

function TransformerSimulation() {
  const [selected, setSelected] = useState(4)
  const [technical, setTechnical] = useState(false)
  const tokens = ['She','went','to','the','bank','after','lunch']
  const weights = selected === 4 ? [8,7,12,9,22,5,4] : [4,8,5,6,13,11,28]
  return <div className="simulation transformer-sim">
    <div className="segmented"><button className={!technical ? 'active' : ''} onClick={() => setTechnical(false)}>Intuitive</button><button className={technical ? 'active' : ''} onClick={() => setTechnical(true)}>Technical</button></div>
    <div className="attention-tokens" aria-label="Select a token to inspect attention">{tokens.map((token,i) => <button key={token} className={selected === i ? 'active' : ''} onClick={() => setSelected(i)}>{token}<i style={{height:`${weights[i]*2}px`}} /></button>)}</div>
    {technical ? <div className="formula-box"><code>Q = XW<sub>Q</sub></code><code>K = XW<sub>K</sub></code><code>V = XW<sub>V</sub></code><code>softmax(QKᵀ / √d<sub>k</sub>)V</code></div> : <div className="qkv"><div><strong>Query</strong><span>What information would help “{tokens[selected]}”?</span></div><div><strong>Keys</strong><span>What does each earlier position offer?</span></div><div><strong>Values</strong><span>Mix the information according to the match.</span></div></div>}
    <div className="block-flow"><span>attention</span><b>+</b><span>residual stream</span><b>→</b><span>MLP</span><b>+</b><span>residual stream</span><b>↻</b><span>many blocks</span></div>
  </div>
}

function PostTrainingSimulation() {
  const [view, setView] = useState<'base' | 'assistant'>('base')
  return <div className="simulation post-sim">
    <p className="prompt-line"><span>Prompt</span> Explain photosynthesis to a twelve-year-old.</p>
    <div className="segmented"><button className={view === 'base' ? 'active' : ''} onClick={() => setView('base')}>Base model</button><button className={view === 'assistant' ? 'active' : ''} onClick={() => setView('assistant')}>Instruction-tuned assistant</button></div>
    <div className="response-paper" aria-live="polite">{view === 'base' ? 'Explain photosynthesis to a twelve-year-old. Explain respiration to a fifteen-year-old. Questions and answers about biology...' : 'Plants use sunlight as energy to turn water and carbon dioxide into sugar. You can think of each leaf as a tiny solar-powered food factory.'}</div>
    <div className="post-steps"><span>instruction examples</span><span>response comparisons</span><span>preference optimization</span><span>safety evaluations</span></div>
  </div>
}

const generated = ['The','Moon','can','appear','during','the','day','because','it','reflects','sunlight','.']
function InferenceSimulation() {
  const [step, setStep] = useState(0)
  const [temperature, setTemperature] = useState(.7)
  return <div className="simulation inference-sim">
    <div className="chat-window"><div className="user-bubble">Why can I see the Moon during the day?</div><div className="assistant-bubble" aria-live="polite">{generated.slice(0, step).join(' ')}{step < generated.length && <i>▌</i>}</div></div>
    <label className="range-label">Temperature <output>{temperature.toFixed(1)}</output><input type="range" min="0" max="1.5" step="0.1" value={temperature} onChange={e => setTemperature(Number(e.target.value))} /></label>
    <div className="inference-controls"><button className="button primary" onClick={() => setStep(s => Math.min(generated.length, s + 1))}>{step === 0 ? 'Generate first token' : step === generated.length ? 'Complete' : 'Generate next token'}</button><button className="text-button" onClick={() => setStep(0)}>Reset</button><span>{step}/{generated.length} tokens</span></div>
    <div className="runtime-strip"><span>instructions</span><span>prompt</span><span>transformer</span><span>logits</span><span>softmax</span><span>selected token</span><span>repeat</span></div>
  </div>
}

function FailureSimulation() {
  const [failure, setFailure] = useState(0)
  const cases = [
    ['Fluent falsehood','“Summer happens because Earth is much closer to the Sun.”','Polished causal language conceals a false explanation. Axial tilt is the main cause.'],
    ['Lost context','The model no longer has the first-page constraint in its active context.','A continuous interface does not guarantee that every earlier token remains available.'],
    ['Retrieval mismatch','A source about Java the island is retrieved for a question about Java code.','Similarity can select plausible but irrelevant evidence.'],
    ['Automation bias','A reviewer accepts a confident score without checking the underlying record.','The human interface can amplify error even when the model is unchanged.'],
  ]
  return <div className="simulation failure-sim">
    <div className="failure-menu">{cases.map(([name],i)=><button key={name} className={failure===i?'active':''} onClick={()=>setFailure(i)}>{name}</button>)}</div>
    <div className="failure-case"><p className="eyebrow">Observed output</p><blockquote>{cases[failure][1]}</blockquote><p>{cases[failure][2]}</p><strong>Mitigation is not the same as elimination.</strong></div>
  </div>
}

function PhaseSimulation({ id }: { id: string }) {
  if (id === 'sources') return <SourcesSimulation />
  if (id === 'preparation') return <PreparationSimulation />
  if (id === 'tokens') return <TokensSimulation />
  if (id === 'embeddings') return <EmbeddingsSimulation />
  if (id === 'training') return <TrainingSimulation />
  if (id === 'transformer') return <TransformerSimulation />
  if (id === 'post-training') return <PostTrainingSimulation />
  if (id === 'inference') return <InferenceSimulation />
  return <FailureSimulation />
}

function Journey({ initialPhase, navigate }: { initialPhase?: string; navigate: (path: string) => void }) {
  const selected = phases.find(p => p.id === initialPhase) ?? phases[0]
  const index = phases.indexOf(selected)
  const change = (phase: Phase) => navigate(`/journey/${phase.id}`)
  return <main id="main-content" className="journey-page">
    <aside className="journey-rail" aria-label="Journey phases">
      <p>The journey</p>
      {phases.map(phase => <button key={phase.id} className={phase.id === selected.id ? 'active' : ''} onClick={() => change(phase)}><span>{phase.number}</span>{phase.title}</button>)}
    </aside>
    <article className="journey-main">
      <header><p className="eyebrow">Phase {selected.number} · {selected.eyebrow}</p><h1>{selected.headline}</h1><p>{selected.intro}</p></header>
      <PhaseSimulation id={selected.id} />
      <div className="journey-nav"><button disabled={index === 0} onClick={() => change(phases[index - 1])}>← Previous</button><span>{index + 1} of {phases.length}</span><button disabled={index === phases.length - 1} onClick={() => change(phases[index + 1])}>Next phase →</button></div>
    </article>
    <aside className="explanation-panel"><p className="eyebrow">What matters</p><h2>{selected.core}</h2><div className="accuracy-note"><strong>Accuracy note</strong><p>{selected.accuracy}</p></div><button className="text-link" onClick={() => navigate('/concepts')}>Open related concepts →</button></aside>
  </main>
}

function MythDemo({ myth }: { myth: Myth }) {
  if (myth.demo === 'database') return <div className="myth-demo compare-demo"><div><strong>Database</strong><span>query → index → stored record</span></div><div><strong>LLM</strong><span>context → weights → logits → token</span></div></div>
  if (myth.demo === 'temperature') return <div className="myth-demo temp-demo"><div><span>Low temperature</span><b style={{width:'84%'}}>likely token 84%</b></div><div><span>High temperature</span><b style={{width:'45%'}}>likely token 45%</b></div></div>
  if (myth.demo === 'tokens') return <div className="myth-demo token-demo"><span>un</span><span>believ</span><span>able</span><span>!</span></div>
  if (myth.demo === 'context') return <div className="myth-demo window-demo"><span>outside window</span><i /><b>active context window</b><i /><strong>next token</strong></div>
  if (myth.demo === 'labor') return <div className="myth-demo labor-demo">{['authors','data workers','engineers','evaluators','chips','energy','users'].map(x=><span key={x}>{x}</span>)}</div>
  if (myth.demo === 'search') return <div className="myth-demo compare-demo"><div><strong>Model only</strong><span>parameters + current context</span></div><div><strong>Model with search</strong><span>search tool → retrieved pages → added context</span></div></div>
  return <div className="myth-demo generic-demo"><span>reasonable observation</span><b>+</b><span>hidden assumption</span><b>→</b><strong>misleading conclusion</strong></div>
}

function MythReality() {
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState<string | null>(null)
  const myth = myths[index]
  const choose = (value: string) => setChoice(value)
  const move = (delta: number) => { setIndex(i => (i + delta + myths.length) % myths.length); setChoice(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  return <main id="main-content" className="myths-page">
    <section className="myth-question">
      <div className="myth-progress"><span>Myth {String(index + 1).padStart(2,'0')} of {myths.length}</span><progress max={myths.length} value={index + 1} aria-label={`Myth ${index + 1} of ${myths.length}`} /></div>
      <p className="eyebrow">Test the claim</p>
      <h1>“{myth.claim}”</h1>
      <div className="choice-row" role="group" aria-label="Choose your verdict">{['Myth','Partly true','Reality'].map(label=><button key={label} className={choice===label?'selected':''} onClick={()=>choose(label)} aria-pressed={choice===label}>{label}</button>)}</div>
      {choice && <div className="verdict" aria-live="polite"><p className="eyebrow">Verdict · {myth.verdict}</p><h2>{myth.reality}</h2><dl><div><dt>Why the myth is attractive</dt><dd>{myth.why}</dd></div><div><dt>Practical consequence</dt><dd>{myth.consequence}</dd></div></dl></div>}
      <div className="myth-navigation"><button onClick={()=>move(-1)}>← Previous</button><button className="button primary" onClick={()=>move(1)}>Next myth →</button></div>
    </section>
    <aside className="myth-mechanism"><p className="eyebrow">Inspect the mechanism</p><MythDemo myth={myth}/><p>AI myths often begin with one true observation and add one unjustified inference. The mechanism reveals the gap.</p></aside>
  </main>
}

function Concepts() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => concepts.filter(([name,definition]) => `${name} ${definition}`.toLowerCase().includes(query.toLowerCase())), [query])
  return <main id="main-content" className="concepts-page">
    <header className="page-intro"><p className="eyebrow">Reference layer</p><h1>Concept Atlas</h1><p>Plain definitions connected to the mechanisms you encounter throughout the journey.</p><label>Find a concept<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try: attention, vector, loss…" /></label></header>
    <section className="concept-grid" aria-live="polite">{filtered.map(([name,definition],i)=><article key={name}><span>{String(i+1).padStart(2,'0')}</span><h2>{name}</h2><p>{definition}</p></article>)}</section>
    {filtered.length===0 && <p className="empty-state">No matching concept. Try a broader term.</p>}
  </main>
}

function About() {
  return <main id="main-content" className="about-page">
    <header className="page-intro"><p className="eyebrow">Method and limits</p><h1>A faithful model—not a claim of privileged access.</h1><p>AI Illustrations explains widely documented transformer mechanisms while marking simplifications, variable implementations, and proprietary unknowns.</p></header>
    <div className="about-grid">
      <section><h2>Four distinctions</h2><ol><li>Creating and preparing training data.</li><li>Pretraining a base model.</li><li>Post-training assistant behavior.</li><li>Running a trained model for one response.</li></ol></section>
      <section><h2>Editorial commitments</h2><ul><li>Every simplification is labeled.</li><li>Performance is separated from consciousness.</li><li>Search, retrieval, tools, and memory remain distinct.</li><li>Labor, rights, energy, and institutions remain visible.</li></ul></section>
      <section><h2>Technical foundations</h2><ul><li>Vaswani et al., <em>Attention Is All You Need</em> (2017).</li><li>Standard treatments of tokenization, embeddings, gradient learning, and autoregressive modeling.</li><li>Publicly documented instruction and preference-training methods.</li></ul></section>
      <section><h2>Interpretive sources</h2><ul><li>Margaret Boden, <em>Artificial Intelligence: A Very Short Introduction</em>.</li><li>Melanie Mitchell, <em>Artificial Intelligence: A Guide for Thinking Humans</em>.</li><li>Jerry Kaplan, <em>Generative Artificial Intelligence</em>.</li><li>Kate Crawford, <em>Atlas of AI</em>.</li></ul></section>
    </div>
  </main>
}

function Footer({ navigate }: { navigate: (path: string) => void }) {
  return <footer className="site-footer"><div><BrandMark/><strong>AI Illustrations</strong><p>See the mechanism. Keep the humans in view.</p></div><nav aria-label="Footer navigation"><button onClick={()=>navigate('/journey/sources')}>Journey</button><button onClick={()=>navigate('/myth-reality')}>Myth / Reality</button><button onClick={()=>navigate('/concepts')}>Concepts</button><button onClick={()=>navigate('/about')}>About</button></nav></footer>
}

export default function App() {
  const [route, setRoute] = useState(routeFromPath)
  useEffect(() => {
    const update = () => setRoute(routeFromPath())
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])
  const navigate = (path: string) => {
    if (window.location.pathname !== path) window.history.pushState({}, '', path)
    setRoute(routeFromPath())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return <div className="app-shell">
    <SiteHeader page={route.page} navigate={navigate}/>
    {route.page === 'home' && <Home navigate={navigate}/>}
    {route.page === 'journey' && <Journey initialPhase={route.phase} navigate={navigate}/>}
    {route.page === 'myths' && <MythReality/>}
    {route.page === 'concepts' && <Concepts/>}
    {route.page === 'about' && <About/>}
    <Footer navigate={navigate}/>
  </div>
}
