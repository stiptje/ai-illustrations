import { useEffect, useState } from 'react'

const tokens = ['The', 'moon', 'reflects', 'sunlight', '.']

function Mark() {
  return <img className="mark" src="/logo.svg" alt="" width="36" height="36"/>
}

function Header() {
  return <header className="topbar">
    <a className="brand" href="#top"><Mark/><span>LLMs Illustrated</span></a>
    <nav aria-label="On this page">
      <a href="#story">How it works</a>
      <a href="#myths">Myth / reality</a>
    </nav>
  </header>
}

function SourceIllustration() {
  return <div className="source-scene visual" aria-label="Books, articles, websites, and conversations">
    <div className="book-stack"><i/><i/><i/><i/></div>
    <div className="open-book"><span/><span/></div>
    <div className="browser-card"><b/><i/><i/><i/></div>
    <div className="speech-cloud"><span>hello</span><span>bonjour</span><span>你好</span></div>
  </div>
}

function CollectionIllustration() {
  return <div className="collection-scene visual" aria-label="Pages are scanned and websites are collected">
    <div className="paper-page"><span>Once upon a time…</span><i/><i/><i/><i/></div>
    <div className="scan-line"/>
    <div className="arrow-flow">→</div>
    <div className="digital-page"><span>TEXT</span><code>Once upon<br/>a time...</code></div>
    <div className="pixel-trail">{Array.from({length:12},(_,i)=><i key={i}/>)}</div>
  </div>
}

function CleaningIllustration() {
  const papers = ['useful text', 'duplicate', 'spam', 'useful text', 'private data', 'good example']
  return <div className="cleaning-scene visual" aria-label="Collected material is filtered and organized">
    <div className="paper-rain">{papers.map((paper,i)=><span key={`${paper}-${i}`} className={paper.includes('useful')||paper.includes('good')?'keep':'drop'}>{paper}</span>)}</div>
    <div className="funnel"><b>filter</b></div>
    <div className="clean-stack"><span/><span/><span/><strong>training<br/>collection</strong></div>
  </div>
}

function TokenIllustration() {
  return <div className="token-scene visual" aria-label="A sentence is split into tokens and represented as numbers">
    <p>“The moon reflects sunlight.”</p>
    <div className="token-row">{tokens.map((token,i)=><span key={token}><b>{token}</b><small>{[791,10458,22901,18432,13][i]}</small></span>)}</div>
    <div className="token-key"><span><b>whole word</b> moon</span><span><b>word piece</b> reflect + s</span><span><b>mark</b> .</span></div>
    <div className="number-ribbon">a small reusable vocabulary can build almost any text</div>
  </div>
}

function VectorIllustration() {
  const dots = [
    ['moon',60,26,'focus'],['sun',77,18,'warm'],['planet',47,16,''],['night',42,44,''],
    ['light',76,43,'warm'],['reflect',63,57,'focus'],['mirror',78,68,''],['banana',20,78,'far'],
  ]
  return <div className="vector-scene visual" aria-label="Words become vectors so the model can calculate relationships and context">
    <div className="vector-number">
      <small>1 · turn a token into coordinates</small>
      <strong>moon</strong><b>→</b><code>[ 0.18, −0.72, 0.44, … ]</code>
      <p>Computers can transform numbers. They cannot directly calculate with the idea “moon.”</p>
    </div>
    <div className="vector-map">
      <small>2 · relationships become distance</small>
      <div className="orbit one"/><div className="orbit two"/>
      {dots.map(([label,x,y,kind])=><span key={label} className={`vector-dot ${kind}`} style={{left:`${x}%`,top:`${y}%`}}>{label}</span>)}
      <p>similar uses → similar numerical patterns</p>
    </div>
    <div className="context-vectors">
      <small>3 · context reshapes the coordinates</small>
      <span><i>river</i> bank <b>→ land</b></span>
      <span>bank <i>loan</i> <b>→ finance</b></span>
    </div>
  </div>
}

function TrainingIllustration() {
  return <div className="training-scene visual" aria-label="The network predicts a missing word, checks the error, and adjusts">
    <div className="sentence-card">The cat sat on the <b>?</b></div>
    <div className="training-round wrong">
      <small>early attempt</small><strong>roof</strong><b>✕ wrong</b><span>the real next word was “mat”</span>
    </div>
    <div className="adjustment"><i>error</i><b>→</b><span>nudge many internal numbers a tiny amount</span><b>→</b><i>try again</i></div>
    <div className="training-round right">
      <small>after many adjustments</small><strong>mat</strong><b>✓ better</b><span>“mat” now receives the highest probability</span>
    </div>
    <div className="weight-dots" aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i}/>)}</div>
  </div>
}

function ModelIllustration() {
  return <div className="model-scene visual" aria-label="Learning leaves a trained network of numerical weights">
    <div className="model-core"><span>billions of<br/><strong>adjusted numbers</strong></span>{Array.from({length:24},(_,i)=><i key={i}/>)}</div>
    <div className="not-library"><span className="mini-book">▤</span><b>not a shelf of stored answers</b></div>
    <div className="pattern-note"><span>patterns</span><span>relationships</span><span>style</span><span>facts</span></div>
  </div>
}

function AttentionIllustration() {
  return <div className="attention-scene visual" aria-label="Attention lets each word use clues from other words">
    <div className="attention-intro"><span>Each word asks:</span><strong>Which other words help me understand my job here?</strong></div>
    <div className="attention-examples">
      <div><small>meaning</small><p>They sat on the <mark>river</mark> <b>bank</b>.</p><span>bank = land beside water</span></div>
      <div><small>meaning</small><p>She asked the <mark>bank</mark> for a <b>loan</b>.</p><span>bank = financial institution</span></div>
      <div><small>reference</small><p>The <mark>animal</mark> stopped because <b>it</b> was tired.</p><span>“it” points back to animal</span></div>
    </div>
    <div className="attention-link"><i/><b>attention strengthens useful connections and weakens irrelevant ones</b><i/></div>
  </div>
}

function ChatIllustration() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const timer = window.setInterval(() => setActive(value => (value + 1) % 4), 1000)
    return () => window.clearInterval(timer)
  }, [])
  const steps = [
    {context:'Your question', choices:'The · Because · During', picked:'The'},
    {context:'The', choices:'Moon · sky · reason', picked:'Moon'},
    {context:'The Moon', choices:'is · looks · can', picked:'is'},
    {context:'The Moon is', choices:'visible · bright · above', picked:'visible'},
  ]
  return <div className="chat-scene visual" aria-label="A chatbot generates a reply one token at a time">
    <div className="generation-question">Why can we see the Moon during the day?</div>
    <div className="generation-ladder">{steps.map((step,i)=><div className={active===i?'active':''} key={step.context}>
      <span>{i+1}</span><p><small>text so far</small>{step.context}</p><p><small>possible next pieces</small>{step.choices}</p><strong>+ {step.picked}</strong>
    </div>)}</div>
    <div className="generation-result" aria-live="polite">The Moon is visible <i>…and the cycle continues</i></div>
  </div>
}

const stages = [
  { number:'01', kicker:'The raw material', title:'People make language.', copy:'Long before AI, people write books, publish websites, create code, tell stories, and answer questions. These human-made materials are the starting point.', Visual:SourceIllustration },
  { number:'02', kicker:'Collection', title:'Pages become digital text.', copy:'Printed pages can be scanned and read by software. Public or licensed digital material can be collected directly. At this point, the system is gathering examples—not understanding them.', Visual:CollectionIllustration },
  { number:'03', kicker:'Preparation', title:'The collection is cleaned.', copy:'Broken text, spam, repeated pages, and some sensitive material are removed. The remaining examples are organized into a very large training collection.', Visual:CleaningIllustration },
  { number:'04', kicker:'Translation for machines', title:'Sentences are cut into small pieces.', copy:'The model needs a limited set of reusable building blocks. A tokenizer therefore splits text into tokens: a common word may stay whole, an unusual word may become several pieces, and punctuation gets its own piece. Each token receives an ID so the model can turn it into numbers and process it.', Visual:TokenIllustration },
  { number:'05', kicker:'Why vectors?', title:'Meaning becomes something the model can calculate with.', copy:'A token ID only names a vocabulary entry; it says nothing about how that token relates to others. The model therefore converts each token into a vector—a long list of coordinates. Those numbers let the network compare relationships, combine clues, and transform meaning through many layers. Similar uses develop similar patterns, while context continually reshapes the vector: “river bank” and “bank loan” begin with the same token but end with different contextual representations.', Visual:VectorIllustration },
  { number:'06', kicker:'Learning', title:'The model guesses, checks, and adjusts.', copy:'Again and again, the model tries to predict what comes next. A wrong guess produces an error signal. Millions of tiny adjustments slowly improve its predictions.', Visual:TrainingIllustration },
  { number:'07', kicker:'What remains', title:'Training produces a model—not a library.', copy:'What remains is an enormous network of adjusted numbers called weights. They hold learned patterns and relationships, not a neat shelf of complete answers.', Visual:ModelIllustration },
  { number:'08', kicker:'Using context', title:'Attention connects the clues.', copy:'A word alone is often ambiguous. Attention lets every token look across the sentence and give more weight to the clues that matter right now. This helps the model choose a meaning, connect a pronoun to what it refers to, and carry information across a long sentence.', Visual:AttentionIllustration },
  { number:'09', kicker:'Your conversation', title:'A reply appears one piece at a time.', copy:'The model reads your prompt and ranks possible first tokens. It selects one, joins it to the text, then runs the calculation again with the longer text. The answer grows one token at a time: “The” → “The Moon” → “The Moon is” → “The Moon is visible”…', Visual:ChatIllustration },
]

const myths = [
  { myth:'It stores every answer.', reality:'It learns patterns across many examples.', happens:'Training repeatedly adjusts numerical weights. When asked a question, the model constructs a new continuation from those learned patterns; it does not normally retrieve a stored answer.', why:'It can repeat familiar phrases and facts so smoothly that it feels like a searchable archive.' },
  { myth:'It searches the web every time.', reality:'Web search is a separate tool.', happens:'The language model can answer using its trained weights and the text in the current conversation. Some products can also call a search tool and place fresh webpages into that context.', why:'Search and generation are presented in one seamless chat window, so the boundary is easy to miss.' },
  { myth:'It thinks exactly like a person.', reality:'It predicts language through numerical operations.', happens:'Tokens move through layers of learned mathematical transformations. The result can resemble reasoning, but the process differs greatly from a human body, brain, experience, and social life.', why:'Fluent first-person language automatically activates our social instinct to imagine a mind like ours.' },
  { myth:'It learns from every chat instantly.', reality:'A normal chat does not retrain the model.', happens:'During a conversation, earlier messages remain in a temporary context and influence the next answer. Changing the underlying model requires a separate training process.', why:'Adapting to what you just said looks and feels like permanent learning.' },
  { myth:'Confident means correct.', reality:'Fluent answers can still be wrong.', happens:'The model selects language that fits likely patterns. It does not automatically check every claim against evidence, so a polished sentence may contain an invented fact.', why:'With people, confidence and articulate speech often signal expertise. The same shortcut is unreliable for generated text.' },
  { myth:'It works without people.', reality:'AI rests on a large human system.', happens:'Authors create the source material; workers prepare and evaluate data; engineers build systems; people manufacture chips, supply electricity, set rules, and decide where AI is used.', why:'The simple chat box hides the long chain of labor and infrastructure behind it.' },
]

function MythGrid() {
  const [open, setOpen] = useState<number | null>(null)
  return <div className="myth-grid">{myths.map((item,i)=>{
    const expanded = open === i
    return <article className={expanded?'expanded':''} key={item.myth}>
      <button onClick={()=>setOpen(expanded?null:i)} aria-expanded={expanded} aria-controls={`myth-detail-${i}`}>
        <span>{String(i+1).padStart(2,'0')}</span><span className="myth"><s>{item.myth}</s></span><span className="reality">{item.reality}</span><i>{expanded?'−':'+'}</i>
      </button>
      {expanded&&<div className="myth-detail" id={`myth-detail-${i}`}><p><b>What really happens</b>{item.happens}</p><p><b>Why this myth spreads</b>{item.why}</p></div>}
    </article>
  })}</div>
}

export default function App() {
  return <div className="app" id="top">
    <a className="skip-link" href="#story">Skip to the story</a>
    <Header/>
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">From a library shelf to a chat reply</p>
          <h1>How does an AI learn to talk?</h1>
          <p>Scroll through one continuous visual story. No computer-science background needed.</p>
          <a className="start-link" href="#story">Start the story <span>↓</span></a>
        </div>
        <div className="hero-machine" aria-label="A visual path from books and websites through an AI model to a chat answer">
          <div className="hero-books"><span/><span/><span/></div><b>+</b>
          <div className="hero-web">www<i/><i/></div><b>→</b>
          <div className="hero-brain">AI{Array.from({length:12},(_,i)=><i key={i}/>)}</div><b>→</b>
          <div className="hero-chat"><span>Hello!</span><i/><i/></div>
        </div>
      </section>

      <section className="story" id="story" aria-label="How a language model is made and used">
        <header className="story-intro">
          <p className="eyebrow">The whole journey</p>
          <h2>One long chain of transformations</h2>
          <p>The content changes form at every step—from human expression, to data, to numbers, to a newly generated reply.</p>
        </header>
        <div className="timeline">
          {stages.map(({number,kicker,title,copy,Visual},index)=><article className={`stage ${index%2?'flip':''}`} key={number}>
            <div className="timeline-point"><span>{number}</span></div>
            <div className="stage-copy"><p className="stage-kicker">{kicker}</p><h2>{title}</h2><p>{copy}</p></div>
            <Visual/>
          </article>)}
        </div>
      </section>

      <section className="myths" id="myths">
        <header><p className="eyebrow">Myth / reality</p><h2>Six myths</h2><p>Open any myth to see what really happens—and why the misconception is so persuasive.</p></header>
        <MythGrid/>
      </section>

      <section className="ending">
        <Mark/><p>A language model is a human-built prediction system: remarkable at finding and extending patterns, but still capable of error.</p><a href="#top">Back to the beginning ↑</a>
      </section>
    </main>
  </div>
}
