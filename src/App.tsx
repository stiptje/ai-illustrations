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
      <a href="#myths">Myth Busters</a>
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
    <div className="why-vectors">
      <small>Why not use words directly?</small>
      <div><span>moon = token 10458</span><span>sunlight = token 18432</span><b>IDs are only labels. Their size and distance mean nothing.</b></div>
      <strong>words <i>→</i> coordinates <i>→</i> comparisons and transformations</strong>
    </div>
    <div className="vector-number">
      <small>1 · give each token useful coordinates</small>
      <strong>moon</strong><b>→</b><code>[ 0.18, −0.72, 0.44, … ]</code>
      <p>Now the network can mathematically compare, combine, and transform the token.</p>
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
  const question = 'Why can we see the Moon during the day?'
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const total = question.length + 78
    const timer = window.setInterval(() => setTick(value => (value + 1) % total), 90)
    return () => window.clearInterval(timer)
  }, [question.length])
  const typedCount = Math.min(tick, question.length)
  const generationTick = Math.max(0, tick - question.length)
  const revealed = Math.min(3, Math.floor(generationTick / 22) + (generationTick > 2 ? 1 : 0))
  const pulse = Math.floor(generationTick / 7) % 3
  const steps = [
    { number:'1', context:'question only', prefix:'', choices:[['The',42],['Because',26],['During',11]], picked:'The' },
    { number:'2', context:'question + “The”', prefix:'The', choices:[['Moon',61],['reason',14],['sky',9]], picked:'Moon' },
    { number:'3', context:'question + “The Moon”', prefix:'The Moon', choices:[['is',74],['appears',12],['can',7]], picked:'is' },
  ]
  return <div className="chat-scene visual" aria-label="A chatbot types a question, calculates token probabilities, selects a token, and repeats with the longer context">
    <div className="typing-scene">
      <small>First, the user types a question</small>
      <p>{question.slice(0,typedCount)}<i>{typedCount < question.length?'▌':''}</i></p>
    </div>
    <div className={`prompt-tokens ${typedCount===question.length?'visible':''}`}><small>The question is split into tokens</small><span>Why</span><span>can</span><span>we</span><span>see</span><span>the</span><span>Moon</span><span>during</span><span>the</span><span>day</span><span>?</span></div>
    <div className="probability-steps">{steps.map((step,i)=><div className={`probability-step ${revealed>i?'revealed':''} ${revealed===i+1&&pulse===i?'calculating':''}`} key={step.number}>
      <div className="step-context"><span>{step.number}</span><p><small>context sent through the model</small>{step.context}</p></div>
      <div className="candidate-list"><small>possible next tokens</small>{step.choices.map(([word,value])=><div className={word===step.picked?'winner':''} key={word}><b>{word}</b><i><em style={{width:`${value}%`}}/></i><output>{value}%</output></div>)}</div>
      <div className="selection"><small>selected, then added to context</small><strong>{step.prefix&&<span>{step.prefix} </span>}{step.picked}</strong><b>↓ calculate again</b></div>
    </div>)}</div>
    <div className="generation-result" aria-live="polite">The Moon is <i>…then repeat for token 4, token 5, and onward</i></div>
  </div>
}

const stages = [
  { number:'01', kicker:'The raw material', title:'People make language.', copy:'Long before AI, people write books, publish websites, create code, tell stories, and answer questions. These human-made materials are the starting point.', Visual:SourceIllustration },
  { number:'02', kicker:'Collection', title:'Pages become digital text.', copy:'Printed pages can be scanned and read by software. Public or licensed digital material can be collected directly. At this point, the system is gathering examples—not understanding them.', Visual:CollectionIllustration },
  { number:'03', kicker:'Preparation', title:'The collection is cleaned.', copy:'Broken text, spam, repeated pages, and some sensitive material are removed. The remaining examples are organized into a very large training collection.', Visual:CleaningIllustration },
  { number:'04', kicker:'Translation for machines', title:'Sentences are cut into small pieces.', copy:'The model needs a limited set of reusable building blocks. A tokenizer therefore splits text into tokens: a common word may stay whole, an unusual word may become several pieces, and punctuation gets its own piece. Each token receives an ID so the model can turn it into numbers and process it.', Visual:TokenIllustration },
  { number:'05', kicker:'Why vectors?', title:'Meaning becomes something the model can calculate with.', copy:'A computer cannot multiply, compare, or gradually adjust the words “moon” and “sunlight” themselves. Token IDs do not solve this: 18432 is not more meaningful than 10458, and the gap between them says nothing about how the words relate. Vectors replace each label with many learned coordinates. This gives the network a mathematical space where it can measure useful relationships, mix information, and update a token according to context. That is the whole point: vectors turn language into a form the model can transform while preserving patterns of use.', Visual:VectorIllustration },
  { number:'06', kicker:'Learning', title:'The model guesses, checks, and adjusts.', copy:'Again and again, the model tries to predict what comes next. A wrong guess produces an error signal. Millions of tiny adjustments slowly improve its predictions.', Visual:TrainingIllustration },
  { number:'07', kicker:'What remains', title:'Training produces a model—not a library.', copy:'What remains is an enormous network of adjusted numbers called weights. They hold learned patterns and relationships, not a neat shelf of complete answers.', Visual:ModelIllustration },
  { number:'08', kicker:'Using context', title:'Attention connects the clues.', copy:'A word alone is often ambiguous. Attention lets every token look across the sentence and give more weight to the clues that matter right now. This helps the model choose a meaning, connect a pronoun to what it refers to, and carry information across a long sentence.', Visual:AttentionIllustration },
  { number:'09', kicker:'Your conversation', title:'A reply appears one piece at a time.', copy:'The model reads your prompt and ranks possible first tokens. It selects one, joins it to the text, then runs the calculation again with the longer text. The answer grows one token at a time: “The” → “The Moon” → “The Moon is” → “The Moon is visible”…', Visual:ChatIllustration },
]

const myths = [
  {
    claim:'When I share personal data with ChatGPT, it remembers me forever.',
    verdict:'False. A conversation can be stored, but the model does not personally absorb your facts during an ordinary chat.',
    why:'Later in the same chat it uses details you shared, and an optional memory feature may recall a note in a future conversation. Both feel like human memory.',
    wouldTake:'The conversation would need to change the model’s weights through retraining. Doing that separately after every chat would be enormously expensive, unstable, and would require a different model for every user.',
    actually:'Three mechanisms are easily confused: the context window resends earlier messages; a separate memory database can paste saved notes into a new chat; and some conversations may later enter a slow, filtered training process depending on product settings. The sharper privacy question is who stores the transcript, for how long, and who can access it.',
  },
  {
    claim:'AI is a large archive of books with a search engine attached.',
    verdict:'False. A language model contains learned numerical weights, not a searchable library of intact books.',
    why:'It can discuss books, reproduce famous lines, and sometimes browse the web—exactly what we associate with a searchable archive.',
    wouldTake:'An archive would keep texts intact, retrieve exact passages, and reliably identify their pages. It would not invent quotations or generate genuinely new combinations.',
    actually:'Training compresses patterns across texts rather than filing every document. Frequently repeated passages may be memorized, but most answers are newly generated from learned regularities. When web search is available, a separate tool retrieves pages and pastes them into the model’s context.',
  },
  {
    claim:'Engineers programmed its answers.',
    verdict:'False. Engineers programmed the learning process; they did not write every answer.',
    why:'Traditional software follows explicit instructions, and chatbot politeness or refusal formulas can sound scripted.',
    wouldTake:'People would have to write rules for every possible question, phrasing, language, and situation. Earlier expert systems tried this and became brittle outside narrow domains.',
    actually:'Engineers design the transformer and its training objective. The model then adjusts billions of weights while predicting text. Later, human examples, ratings, and guidelines shape behaviour indirectly—more like education than writing a script for each answer.',
  },
  {
    claim:'ChatGPT is one mind talking to millions of people and learning from all of them in real time.',
    verdict:'False. A fixed model runs in many separate sessions, and ordinary conversations do not update its weights.',
    why:'Everyone encounters the same name and voice. Within one chat, rereading earlier messages looks like personal adaptation and learning.',
    wouldTake:'Millions of simultaneous conversations would need to rewrite and synchronize the model continuously. Secrets and malicious instructions could then leak from one user into another user’s answers.',
    actually:'After training, the model file is fixed. Each conversation runs that model with its own temporary context. Separate sessions do not share their chat contents, and correcting one response does not make the underlying model smarter for everyone.',
  },
  {
    claim:'It reads words the way we do.',
    verdict:'False. The model processes numbered tokens—often word fragments—not words and letters in the human sense.',
    why:'Its input and output look like fluent language, and it can discuss spelling, poetry, and wordplay.',
    wouldTake:'Reading every character separately would make sequences much longer and computation far more expensive, because the model compares positions throughout the sequence.',
    actually:'A tokenizer divides text into common reusable chunks. “Unbelievable” might become “un” + “believ” + “able.” This helps explain difficulty with letter counting and spelling backwards. Languages represented by less online text may also be split into more tokens and cost more to process.',
  },
  {
    claim:'It is just autocomplete, so it is trivial.',
    verdict:'False—or at least deeply misleading. It predicts the next token, but doing that well can require rich internal representations.',
    why:'Phone keyboards also predict the next word, so the label “autocomplete” makes the mechanism sound familiar and simple.',
    wouldTake:'A trivial system would merely count common word sequences. It could not translate unfamiliar sentences, maintain an argument across pages, or produce functioning code for a new request.',
    actually:'At very large scale, successful next-token prediction rewards models for representing grammar, facts, concepts, and relationships. “Autocomplete” describes the output procedure, not the depth of computation behind each prediction. Whether this constitutes understanding remains debated.',
  },
  {
    claim:'AI detectors can tell whether a text was written by ChatGPT.',
    verdict:'False. Detectors make uncertain statistical guesses; they cannot reliably prove authorship.',
    why:'AI prose can have a recognizable smooth style, plagiarism detectors work well for copied passages, and percentage scores look authoritative.',
    wouldTake:'Reliable proof would require a trace unique to AI text. Newly generated text has no stored original to match. Watermarks can help in limited cases, but paraphrasing, translation, and unwatermarked models weaken them.',
    actually:'Most detectors measure predictability and uniformity. Formulaic human writing—especially writing by non-native speakers—can look equally predictable, producing false accusations. Detector scores are hints, not proof; drafts, notes, version history, and discussion with the writer are better evidence.',
  },
]

function MythGrid() {
  const [votes, setVotes] = useState<Record<number, 'true' | 'false'>>({})
  return <div className="myth-grid">{myths.map((item,i)=>{
    const vote = votes[i]
    return <article className={`buster-card ${vote?'answered':''}`} key={item.claim}>
      <div className="buster-question"><span>{String(i+1).padStart(2,'0')}</span><p>“{item.claim}”</p></div>
      <div className="vote-row" role="group" aria-label={`Vote on myth ${i+1}`}>
        <button className={vote==='true'?'selected':''} onClick={()=>setVotes(current=>({...current,[i]:'true'}))} aria-pressed={vote==='true'}>True</button>
        <button className={vote==='false'?'selected':''} onClick={()=>setVotes(current=>({...current,[i]:'false'}))} aria-pressed={vote==='false'}>False</button>
      </div>
      {vote&&<div className="buster-detail" aria-live="polite">
        <div className={`vote-result ${vote==='false'?'correct':'incorrect'}`}><span>{vote==='false'?'✓ Correct':'✕ Not quite'}</span><strong>{item.verdict}</strong></div>
        <div className="buster-explanations"><p><b>Why it feels true</b>{item.why}</p><p><b>What it would take</b>{item.wouldTake}</p><p><b>What is actually happening</b>{item.actually}</p></div>
      </div>}
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
        <header><p className="eyebrow">True or false?</p><h2>Myth Busters</h2><p>Vote before revealing the answer. Each result explains why the claim feels convincing and what is actually happening.</p></header>
        <MythGrid/>
      </section>

      <section className="ending">
        <Mark/><p>A language model is a human-built prediction system: remarkable at finding and extending patterns, but still capable of error.</p><a href="#top">Back to the beginning ↑</a>
      </section>
    </main>
  </div>
}
