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

type Myth = {
  claim: string
  verdict: string
  why: string[]
  wouldTake: string[]
  actually: string[]
  visual: 'memory' | 'archive' | 'programmed' | 'one-mind' | 'tokens' | 'autocomplete' | 'literature'
  caseTitle?: string
  sources?: { label: string; url: string }[]
}

const myths: Myth[] = [
  {
    claim:'When I share personal data with ChatGPT, it remembers me forever.',
    verdict:'False. What you type does not simply enter the model’s “mind.” It can be kept in three different places, each with different rules.',
    why:[
      'Later in the same chat, it uses your name and details you gave earlier. With an optional memory feature, it may even recall your job in a later conversation. That feels like talking to a person—and people remember what we tell them.',
      'But several different computer mechanisms can create the same feeling. “The chatbot remembers” is therefore an impression, not yet an explanation.',
    ],
    wouldTake:[
      'For the model itself to remember you, your conversation would have to change its internal weights. That means retraining the model, not merely saving a sentence.',
      'Training leading models is done in enormous batches and costs vast amounts of time and computing power. Retraining after every chat would be impractical, could damage earlier learning, and would effectively require a different model for every user.',
    ],
    actually:[
      'Short-term context: when you send a new message, earlier parts of the conversation are sent to the model again. It “remembers” because it rereads them. A new chat normally begins without that conversation.',
      'Saved memory: a separate system can store a short note such as “teaches theology in Leuven” and insert it into a later chat. The model reads the note; the note is not stored inside the model’s weights.',
      'Future training: depending on the product and your settings, some conversations may later be filtered and included in a much larger training process. This is slow, indirect, and diluted among enormous amounts of other text.',
      'The more useful privacy question is therefore: who stores the transcript, for how long, for what purpose, and who can access it?',
    ],
    visual:'memory',
  },
  {
    claim:'AI is a large archive of books with a search engine attached.',
    verdict:'False. A language model is not a shelf of intact books. It is a large collection of learned numerical relationships.',
    why:[
      'It can discuss thousands of books, reproduce famous lines, and answer detailed questions. The familiar machine that does this is a search engine looking through a library, so that is the picture we naturally reach for.',
      'Many chatbots can now also search the web and show links. That makes two very different operations—generating from a model and retrieving from a database—look like one thing.',
    ],
    wouldTake:[
      'A real archive stores documents intact. It finds an existing passage, returns the exact words, and can identify the source and page. A language model was trained on far more text than could fit verbatim inside its model file.',
      'A search engine can only retrieve something that already exists. It does not normally invent a new sonnet about your cat. A true archive would also not fabricate a plausible quotation or a book that was never written.',
    ],
    actually:[
      'Training compresses recurring patterns across many texts rather than filing every document. A useful analogy is a widely read person: they may discuss many books without being able to reproduce page 43 exactly.',
      'Some very frequent passages can be memorized almost word for word. That is why a model can sometimes appear to be looking up a stored text—and why memorization remains an important concern.',
      'When a chatbot searches the web, a separate search tool retrieves pages and places relevant excerpts into the conversation. The model then writes from those excerpts. The library and the writer are separate parts of the system.',
    ],
    visual:'archive',
  },
  {
    claim:'Engineers programmed its answers.',
    verdict:'False. Engineers programmed the learning procedure; they did not write the model’s millions of possible answers.',
    why:[
      'Most familiar software follows explicit instructions written by programmers. Early “expert systems” worked this way too, using thousands of hand-written if–then rules. Chatbot greetings, refusals, and polite formulas can also sound prewritten.',
      'So when an answer appears on screen, it is natural to imagine a hidden rule or a person-written script behind it.',
    ],
    wouldTake:[
      'Someone would have to write a rule for every possible question, every phrasing, every language, and every situation. Ordinary language is too open and context-dependent for that.',
      'Earlier expert systems reached this wall: they could work in a narrow domain, but became brittle as soon as the situation changed. Gathering enough rules from experts was itself a major bottleneck.',
    ],
    actually:[
      'Engineers design an architecture and give it a learning task: predict the next piece of text. During training, the system makes predictions, measures its errors, and automatically adjusts billions of internal numbers called weights.',
      'A later stage shapes behaviour. People provide examples, compare answers, and write guidelines. These human choices influence the model indirectly—more like education than scripting every sentence.',
      'One surprising consequence is that even the builders cannot fully explain every individual answer. The field called interpretability tries to understand what the learned internal machinery is doing.',
    ],
    visual:'programmed',
  },
  {
    claim:'ChatGPT is one mind talking to millions of people and learning from all of them in real time.',
    verdict:'False. One trained model can power many separate conversations, but those conversations do not merge into a single live stream of thought.',
    why:[
      'Everyone encounters the same name, interface, and recognisable voice, so “ChatGPT said” sounds like one person speaking. Within one chat, the replies adapt to what you wrote earlier, which looks like learning.',
      'Science fiction strengthens the image of one central machine mind watching and talking to everyone at once.',
    ],
    wouldTake:[
      'The model’s weights would need to update after every message from millions of users, while all the copies running across data centres stayed synchronized.',
      'Secrets from one conversation could then enter another person’s answers, and malicious users could immediately corrupt the system. Microsoft’s Tay chatbot illustrated the danger in 2016 when coordinated users rapidly pushed it toward offensive output.',
    ],
    actually:[
      'After training, the model is normally fixed. The same trained file can be run many times, much as many people can run separate copies of the same app.',
      'Each conversation has its own temporary context. Its apparent adaptation comes mainly from rereading that conversation, not from rewriting the shared model.',
      'Correcting one answer does not instantly make the underlying model smarter for everybody. A changed model appears later only after its creators train or update a new version. This leaves a useful philosophical question: is “ChatGPT” the model file, one running instance, or the particular conversation between you and it?',
    ],
    visual:'one-mind',
  },
  {
    claim:'It reads words the way we do.',
    verdict:'False. The model receives tokens—numbered chunks of text—not words and letters in the human sense.',
    why:[
      'Its input and output look like fluent language. It can discuss spelling, puns, rhyme, and poetry, so we assume that it sees the same words and letters that we see.',
      'The interface hides the translation step. By the time text reaches the neural network, the visible sentence has already been cut into pieces and converted into numbers.',
    ],
    wouldTake:[
      'Processing every character separately would make a text several times longer. Because the model compares positions throughout the sequence, longer input means substantially more computation.',
      'Character-level models do exist, but token chunks are usually a more efficient compromise: a small reusable vocabulary can represent almost any text without treating every letter as a separate step.',
    ],
    actually:[
      'A tokenizer splits frequent text into reusable fragments. A common word may be one token, while “unbelievable” might become “un” + “believ” + “able.” Each token receives an ID and then a vector of learned numbers.',
      'This helps explain odd failures such as counting letters in “strawberry,” spelling a word backwards, or reasoning about the exact shape of a word. The system is often working with chunks rather than inspecting each letter directly.',
      'There is also a fairness issue. Languages represented by less online text may be broken into more tokens per sentence, which can increase cost and reduce the amount of context the model can handle.',
    ],
    visual:'tokens',
  },
  {
    claim:'It is just autocomplete, so it is trivial.',
    verdict:'False—or deeply misleading. It does predict the next token, but doing that well across human language is not a trivial task.',
    why:[
      'The description is technically accurate: a language model produces one token at a time. The autocomplete on a phone also predicts what comes next, and nobody mistakes it for a deep thinker.',
      'Calling an LLM “autocomplete” is therefore a useful correction to exaggerated claims—but it can become a different kind of exaggeration by hiding everything required to make the prediction.',
    ],
    wouldTake:[
      'A trivial system would mostly count which word commonly follows another. It would fail when asked to translate a new sentence, repair unfamiliar code, maintain an argument across pages, or answer a question in an unusual form.',
      'These tasks require the system to keep track of relationships across the whole context, not merely repeat the most common two- or three-word sequence.',
    ],
    actually:[
      'To predict the next sentence of a court ruling, a proof, or a philosophical argument, it helps to represent what the text is about. At large scale, models develop internal patterns related to grammar, facts, concepts, and relationships—even though nobody explicitly programmed each one.',
      '“Autocomplete” describes the final action: selecting the next token. It does not describe the depth of the calculation that produces the probabilities.',
      'Whether those internal representations amount to genuine understanding remains debated. Both easy answers—“it is a person” and “it is only a toy”—miss something important.',
    ],
    visual:'autocomplete',
  },
  {
    claim:'AI will never be able to write real literature.',
    verdict:'False—or at least already very hard to defend. Producing admired prose and being an author are different questions.',
    why:[
      'Literature seems to require lived experience, suffering, intention, and a unique voice—and a model possesses none of these in the human sense. Early chatbot writing was also bland and easy to recognise.',
      'We may want the claim to be true. Creativity feels like the last human territory, so the idea of a machine producing literature can feel like a threat to human uniqueness rather than merely a technical question.',
    ],
    wouldTake:[
      'There would have to be something in great writing that cannot be learned from text: a mark of lived experience that remains visible on the page. Expert readers would then need to identify human and machine prose reliably.',
      'But rhythm, imagery, repetition, structure, and even the impression of a distinctive voice are patterns in the text itself. Models trained on centuries of writing can learn those patterns without having the experiences that originally produced them.',
    ],
    caseTitle:'The Goncourt affair · September 2026',
    actually:[
      'C’était ça ou mourir, the debut novel of Canadian-Haitian writer Thélyson Orélien, was one of the literary events of autumn 2026. Published by Grasset, it won the Prix du roman Fnac and appeared on the first lists of the Goncourt, Renaudot, Femina, and Médicis. Critics praised its style.',
      'On 21–22 September, an anonymous account posted AI-detector results and alleged that passages were machine-generated. On 25 September, the Académie Goncourt removed the novel from its selection. Allegations of plagiarism also weighed on the decision.',
      'Orélien denies using AI. He says he drafted the book between 2017 and 2019, before ChatGPT existed, and that its voice draws on Haitian and Caribbean oral traditions. His publisher supports him. As of 28 September 2026, the dispute remains unresolved.',
      'AFP tested the same passages with eight detection systems and obtained sharply contradictory results—from “very likely human” to “100% AI,” with other scores changing by passage.',
      'Either possibility unsettles the myth. If AI wrote it, machine-produced prose impressed editors, critics, and prize juries. If Orélien wrote it, professional readers and detection systems still could not reliably distinguish his work from machine prose.',
      'The deeper question is therefore not merely “can AI produce good text?” but “what makes a text literature?” Is literary meaning in the words on the page, in the person behind them, or in the relation between the two?',
    ],
    visual:'literature',
    sources:[
      { label:'Prix du roman Fnac', url:'https://www.fnac.com/prix-du-roman-fnac' },
      { label:'Goncourt decision', url:'https://js.livreshebdo.fr/article/lacademie-goncourt-retire-thelyson-orelien-de-sa-selection' },
      { label:'AFP detector comparison', url:'https://agerpres.ro/cultura/2026/09/22/scriitorul-thelyson-orelien-premiat-recent-in-franta-acuzat-ca-a-utilizat-ai--1596015' },
    ],
  },
]

function MythIllustration({kind}:{kind:Myth['visual']}) {
  if (kind === 'memory') return <div className="myth-visual memory-visual" aria-label="A conversation can be reread, a separate memory note can be inserted, and training is a different later process">
    <div className="mini-chat"><span>You: I teach theology.</span><span>AI: I’ll keep that in mind.</span></div>
    <div className="visual-arrow">→</div><div className="context-box"><small>this chat</small><b>conversation reread</b></div>
    <div className="sticky-note"><small>separate memory</small>teaches theology</div>
    <div className="model-box"><small>model weights</small><b>not rewritten now</b></div>
  </div>
  if (kind === 'archive') return <div className="myth-visual archive-visual" aria-label="An archive retrieves an intact page while a model generates from learned patterns">
    <div className="archive-side"><small>Archive</small><span>BOOK 1</span><span>BOOK 2</span><b>find exact page</b></div>
    <div className="versus">≠</div>
    <div className="pattern-side"><small>Language model</small><div>{Array.from({length:16},(_,i)=><i key={i}/>)}</div><b>generate from patterns</b></div>
    <div className="tool-note">web search can be added as a separate tool</div>
  </div>
  if (kind === 'programmed') return <div className="myth-visual programmed-visual" aria-label="Engineers design a learning loop rather than writing each answer">
    <div className="rule-card"><small>Not millions of scripts</small><code>IF question 8,492<br/>THEN answer 8,492</code></div>
    <div className="learning-loop"><span>predict</span><b>→</b><span>check error</span><b>→</b><span>adjust</span><b>↻</b></div>
    <p>Engineers design this learning process. Training produces the detailed behaviour.</p>
  </div>
  if (kind === 'one-mind') return <div className="myth-visual copies-visual" aria-label="One fixed model runs several isolated conversations">
    <div className="shared-model">same fixed<br/><b>MODEL</b></div>
    {[['A','My medical question'],['B','My private draft'],['C','My travel plan']].map(([id,text])=><div className={`private-chat chat-${id.toLowerCase()}`} key={id}><small>chat {id}</small>{text}</div>)}
    <span className="no-sharing">separate contexts · no live sharing</span>
  </div>
  if (kind === 'tokens') return <div className="myth-visual tokens-visual" aria-label="Visible words are split into token pieces and converted into numbers">
    <div className="human-word"><small>what we see</small><strong>unbelievable</strong></div><div className="visual-arrow">→</div>
    <div className="machine-tokens"><small>what the model receives</small><span>un<em>421</em></span><span>believ<em>9837</em></span><span>able<em>612</em></span></div>
    <div className="token-trap"><b>How many letters?</b><span>Tokens hide the individual letters.</span></div>
  </div>
  if (kind === 'autocomplete') return <div className="myth-visual autocomplete-visual" aria-label="Phone autocomplete uses short local patterns while an LLM weighs a much richer context">
    <div className="phone-complete"><small>phone keyboard</small><p>See you ___</p><b>soon · later · there</b><span>short nearby pattern</span></div>
    <div className="llm-complete"><small>large language model</small><div><span>whole context</span><span>grammar</span><span>facts</span><span>relationships</span><span>instructions</span></div><p>→ probabilities for the next token</p></div>
  </div>
  return <div className="myth-visual literature-visual" aria-label="The same page is judged through two possible stories about who wrote it">
    <div className="book-page"><span>C’était ça<br/>ou mourir</span><i/><i/><i/></div>
    <div className="reader-judgement"><small>readers first judge</small><b>the words on the page</b></div>
    <div className="authorship-split"><span><b>If AI wrote it</b>praised machine prose</span><span><b>If a human wrote it</b>experts could not reliably tell</span></div>
    <p>Good text? <b>≠</b> Human author? <b>≠</b> Literature?</p>
  </div>
}

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
        <MythIllustration kind={item.visual}/>
        <div className="buster-explanations">
          <div className="explanation-panel"><b>Why it feels true</b>{item.why.map((paragraph,index)=><p key={index}>{paragraph}</p>)}</div>
          <div className="explanation-panel"><b>What it would take</b>{item.wouldTake.map((paragraph,index)=><p key={index}>{paragraph}</p>)}</div>
          <div className="buster-reality">
            <b>{item.caseTitle ?? 'What is actually happening'}</b>
            {item.actually.map((paragraph,index)=><p key={index}>{paragraph}</p>)}
            {item.sources&&<div className="buster-sources"><span>Sources</span>{item.sources.map(source=><a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label}</a>)}</div>}
          </div>
        </div>
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
