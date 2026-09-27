import { useEffect, useState } from 'react'

const tokens = ['The', 'moon', 'reflects', 'sunlight', '.']
const reply = ['The', 'Moon', 'is', 'visible', 'in', 'daylight', 'because', 'it', 'reflects', 'sunlight', '.']

function Mark() {
  return <span className="mark" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><i/></span>
}

function Header() {
  return <header className="topbar">
    <a className="brand" href="#top"><Mark/><span>AI, illustrated</span></a>
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
    <div className="down-arrow">↓</div>
    <div className="number-ribbon">numbers the model can process</div>
  </div>
}

function VectorIllustration() {
  const dots = [
    ['moon',60,26,'focus'],['sun',77,18,'warm'],['planet',47,16,''],['night',42,44,''],
    ['light',76,43,'warm'],['reflect',63,57,'focus'],['mirror',78,68,''],['banana',20,78,'far'],
  ]
  return <div className="vector-scene visual" aria-label="Related ideas become nearby points in a numerical space">
    <div className="orbit one"/><div className="orbit two"/>
    {dots.map(([label,x,y,kind])=><span key={label} className={`vector-dot ${kind}`} style={{left:`${x}%`,top:`${y}%`}}>{label}</span>)}
    <p>ideas used in similar ways gather near one another</p>
  </div>
}

function TrainingIllustration() {
  return <div className="training-scene visual" aria-label="The network predicts a missing word, checks the error, and adjusts">
    <div className="sentence-card">The cat sat on the <b>?</b></div>
    <div className="guess-bars">
      <span><b>mat</b><i style={{width:'76%'}}/><em>76%</em></span>
      <span><b>roof</b><i style={{width:'17%'}}/><em>17%</em></span>
      <span><b>idea</b><i style={{width:'7%'}}/><em>7%</em></span>
    </div>
    <div className="learning-loop"><span>guess</span><b>→</b><span>check</span><b>→</b><span>adjust</span><b>↻</b></div>
    <div className="network" aria-hidden="true">
      <div>{[0,1,2].map(i=><i key={i}/>)}</div><svg viewBox="0 0 160 120" preserveAspectRatio="none"><path d="M0 18L160 20M0 18L160 60M0 18L160 100M0 60L160 20M0 60L160 60M0 60L160 100M0 102L160 20M0 102L160 60M0 102L160 100"/></svg><div>{[0,1,2].map(i=><i key={i}/>)}</div>
    </div>
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
    <p>“She sat by the river bank.”</p>
    <svg viewBox="0 0 700 210" role="img" aria-label="Curved lines connect the word bank strongly to river">
      <path className="faint" d="M65 170Q350 5 622 170"/><path d="M280 170Q450 35 622 170"/><path className="mid" d="M420 170Q520 85 622 170"/>
    </svg>
    <div className="attention-words"><span>She</span><span>sat</span><span>by</span><span>the</span><span className="clue">river</span><span className="focus">bank</span></div>
    <strong>“river” tells the model which meaning of “bank” fits</strong>
  </div>
}

function ChatIllustration() {
  const [visible, setVisible] = useState(1)
  useEffect(() => {
    const timer = window.setInterval(() => setVisible(value => value >= reply.length ? 1 : value + 1), 430)
    return () => window.clearInterval(timer)
  }, [])
  return <div className="chat-scene visual" aria-label="A chatbot generates a reply one token at a time">
    <div className="chat-window">
      <div className="user-message">Why can we see the Moon during the day?</div>
      <div className="assistant-message" aria-live="polite">{reply.slice(0,visible).join(' ')}<i>▌</i></div>
    </div>
    <div className="next-word">
      <small>next word possibilities</small>
      <span><b style={{width:'68%'}}/>because</span><span><b style={{width:'22%'}}/>when</span><span><b style={{width:'10%'}}/>although</span>
    </div>
    <p>choose one piece → add it to the sentence → repeat</p>
  </div>
}

const stages = [
  { number:'01', kicker:'The raw material', title:'People make language.', copy:'Long before AI, people write books, publish websites, create code, tell stories, and answer questions. These human-made materials are the starting point.', Visual:SourceIllustration },
  { number:'02', kicker:'Collection', title:'Pages become digital text.', copy:'Printed pages can be scanned and read by software. Public or licensed digital material can be collected directly. At this point, the system is gathering examples—not understanding them.', Visual:CollectionIllustration },
  { number:'03', kicker:'Preparation', title:'The collection is cleaned.', copy:'Broken text, spam, repeated pages, and some sensitive material are removed. The remaining examples are organized into a very large training collection.', Visual:CleaningIllustration },
  { number:'04', kicker:'Translation for machines', title:'Sentences are cut into small pieces.', copy:'The model does not receive a sentence exactly as we see it. Text is split into tokens—often words or pieces of words—and each token gets a number.', Visual:TokenIllustration },
  { number:'05', kicker:'Meaning as position', title:'Words become clouds of numbers.', copy:'Each token is turned into a list of numbers. During learning, words and ideas used in similar ways develop related numerical patterns.', Visual:VectorIllustration },
  { number:'06', kicker:'Learning', title:'The model guesses, checks, and adjusts.', copy:'Again and again, the model tries to predict what comes next. A wrong guess produces an error signal. Millions of tiny adjustments slowly improve its predictions.', Visual:TrainingIllustration },
  { number:'07', kicker:'What remains', title:'Training produces a model—not a library.', copy:'What remains is an enormous network of adjusted numbers called weights. They hold learned patterns and relationships, not a neat shelf of complete answers.', Visual:ModelIllustration },
  { number:'08', kicker:'Using context', title:'Attention connects the clues.', copy:'When a sentence has several possible meanings, the model weighs nearby clues. “River” makes one meaning of “bank” much more useful than the others.', Visual:AttentionIllustration },
  { number:'09', kicker:'Your conversation', title:'A reply appears one piece at a time.', copy:'Your prompt passes through the trained model. It estimates possible next tokens, selects one, adds it to the text, and repeats until the reply is complete.', Visual:ChatIllustration },
]

const myths = [
  ['It stores every answer.', 'It learns patterns across many examples.'],
  ['It searches the web every time.', 'Web search is a separate tool that may or may not be connected.'],
  ['It thinks exactly like a person.', 'It predicts language through numerical operations.'],
  ['It learns from every chat instantly.', 'A normal chat uses the model; it does not retrain it.'],
  ['Confident means correct.', 'A fluent answer can still be mistaken or invented.'],
  ['It works without people.', 'Human writing, decisions, feedback, chips, and energy make it possible.'],
]

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
        <header><p className="eyebrow">Myth / reality</p><h2>Six shortcuts that lead us astray</h2></header>
        <div className="myth-grid">{myths.map(([myth,reality],i)=><article key={myth}><span>{String(i+1).padStart(2,'0')}</span><p className="myth"><s>{myth}</s></p><p className="reality">{reality}</p></article>)}</div>
      </section>

      <section className="ending">
        <Mark/><p>A language model is a human-built prediction system: remarkable at finding and extending patterns, but still capable of error.</p><a href="#top">Back to the beginning ↑</a>
      </section>
    </main>
  </div>
}
