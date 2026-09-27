export type Phase = {
  id: string
  number: string
  title: string
  eyebrow: string
  headline: string
  intro: string
  core: string
  accuracy: string
}

export const phases: Phase[] = [
  {
    id: 'sources', number: '01', title: 'Sources', eyebrow: 'From culture to data',
    headline: 'Before there is data, there are people and sources.',
    intro: 'Books, websites, code, archives, and human demonstrations enter technical systems through different legal and institutional routes.',
    core: 'Training material does not fall from nature. People create, edit, publish, scan, license, collect, label, and preserve it.',
    accuracy: 'Real developers use different mixtures of public, licensed, purchased, donated, and human-created material. Exact datasets may be undisclosed.',
  },
  {
    id: 'preparation', number: '02', title: 'Preparation', eyebrow: 'A dataset is designed',
    headline: 'Collection is only the beginning.',
    intro: 'Formatting, deduplication, language detection, quality filtering, privacy controls, and balancing decisions determine what the model will encounter.',
    core: 'Every filter embodies judgments about quality, relevance, risk, language, and representation. Keeping everything would also be a choice.',
    accuracy: 'The controls here illustrate trade-offs. Real pipelines contain many more filters, classifiers, audits, and policy decisions.',
  },
  {
    id: 'tokens', number: '03', title: 'Tokens', eyebrow: 'Text becomes a sequence',
    headline: 'A model receives token IDs—not words directly.',
    intro: 'A tokenizer divides text into vocabulary units that may be words, fragments, punctuation, or character sequences.',
    core: 'Token IDs are arbitrary addresses. A larger ID is not more meaningful. The ID retrieves a learned vector from an embedding table.',
    accuracy: 'The tokenizer shown here is illustrative. Production tokenizers use learned vocabularies and language-specific statistical rules.',
  },
  {
    id: 'embeddings', number: '04', title: 'Embeddings', eyebrow: 'Language becomes geometry',
    headline: 'Tokens become learned vectors.',
    intro: 'An embedding is an ordered list of numbers whose relationships help the model distinguish and connect tokens.',
    core: 'The initial vector for “bank” is stable, but transformer layers create a contextual representation shaped by “river,” “money,” and other nearby tokens.',
    accuracy: 'Real embeddings have hundreds or thousands of dimensions. A two-dimensional map is a projection that discards most information.',
  },
  {
    id: 'training', number: '05', title: 'Training', eyebrow: 'Prediction becomes learning',
    headline: 'The model learns by being wrong—billions of times.',
    intro: 'It predicts tokens, measures the error, sends gradients backward, and makes tiny parameter updates.',
    core: 'Knowledge is distributed across learned weights. The model is not simply filing complete sentences into a searchable archive.',
    accuracy: 'The visible network is intentionally tiny. Real training uses many accelerators, batches, checkpoints, optimizers, and evaluation systems.',
  },
  {
    id: 'transformer', number: '06', title: 'Transformer', eyebrow: 'Inside the architecture',
    headline: 'Attention routes information between token positions.',
    intro: 'Queries look for relevant information, keys advertise it, and values carry the information that is mixed.',
    core: 'Attention, feed-forward networks, residual connections, and normalization repeat across many blocks to build contextual representations.',
    accuracy: 'Attention is a mathematical operation, not consciousness—and an attention map is not a complete explanation of a model’s answer.',
  },
  {
    id: 'post-training', number: '07', title: 'Post-training', eyebrow: 'From predictor to assistant',
    headline: 'A base model is not yet a helpful chatbot.',
    intro: 'Instruction examples, response comparisons, preference optimization, safety work, and tool-use training shape assistant behavior.',
    core: 'Helpfulness is a trained product behavior. Human feedback is selected and operationalized through institutional choices.',
    accuracy: 'Organizations use different combinations of supervised learning, preference optimization, reinforcement learning, and evaluations.',
  },
  {
    id: 'inference', number: '08', title: 'Your prompt', eyebrow: 'The model runs',
    headline: 'One prompt becomes one token, then another.',
    intro: 'The prompt is tokenized, processed through the trained network, projected into vocabulary scores, and continued autoregressively.',
    core: 'During ordinary inference the weights are used, not retrained. Search, retrieval, calculators, and memory are separate systems when connected.',
    accuracy: 'Products may assemble hidden instructions, conversation summaries, retrieved passages, and tool results around the visible user prompt.',
  },
  {
    id: 'failures', number: '09', title: 'Failure lab', eyebrow: 'Where confidence breaks',
    headline: 'Fluency is not the same as truth.',
    intro: 'Hallucination, ambiguity, distribution shift, retrieval mismatch, lost context, and automation bias arise through different mechanisms.',
    core: 'Reliability depends on the model, tools, evidence, interface, evaluation, institutional safeguards, and appropriately skeptical users.',
    accuracy: 'No single test or mitigation eliminates every failure mode. High-stakes deployments require domain-specific evidence and accountability.',
  },
]

export type Myth = {
  claim: string
  verdict: 'Myth' | 'Partly true' | 'Unsupported'
  reality: string
  why: string
  consequence: string
  demo: 'database' | 'search' | 'memory' | 'tokens' | 'vectors' | 'attention' | 'brain' | 'prediction' | 'fluency' | 'confidence' | 'failure' | 'data' | 'objective' | 'bias' | 'labor' | 'temperature' | 'context' | 'variation' | 'scale' | 'jobs' | 'harm' | 'consciousness'
}

export const myths: Myth[] = [
  { claim:'An LLM is a giant database of sentences.', verdict:'Myth', reality:'Training reshapes distributed numerical parameters. Ordinary generation is not conventional document lookup.', why:'Models can sometimes reproduce memorized material, making retrieval feel like the obvious mechanism.', consequence:'A generated statement does not automatically carry an identifiable stored source.', demo:'database' },
  { claim:'ChatGPT searches the internet for every answer.', verdict:'Myth', reality:'A model can generate from parameters and context without live browsing. Search is a separate tool.', why:'Current products may combine a model with search, making two distinct operations look seamless.', consequence:'Check whether sources were actually retrieved and cited.', demo:'search' },
  { claim:'The model learns continuously from every conversation.', verdict:'Myth', reality:'Ordinary inference uses fixed parameters. Context, product memory, data retention, and later training are separate processes.', why:'A model can adapt within a conversation, which resembles learning.', consequence:'Correcting one conversation does not update the underlying model for everyone.', demo:'memory' },
  { claim:'Tokens are words.', verdict:'Myth', reality:'Tokens can be words, subwords, punctuation, whitespace combinations, or character sequences.', why:'Common words frequently do appear as single tokens.', consequence:'Tokenization affects context length, cost, and multilingual performance.', demo:'tokens' },
  { claim:'Embedding dimensions are human-readable meanings.', verdict:'Myth', reality:'Meaning is generally distributed across many learned dimensions and interactions.', why:'Two-dimensional plots make the space look like a labeled map.', consequence:'Projected embedding maps are illustrations, not literal internal geography.', demo:'vectors' },
  { claim:'Attention shows exactly why the model answered.', verdict:'Myth', reality:'Attention displays one information-routing computation, not a complete causal explanation.', why:'Attention lines are visible and intuitively resemble explanations.', consequence:'Do not treat one attention map as an audit trail.', demo:'attention' },
  { claim:'A neural network works just like a human brain.', verdict:'Myth', reality:'Artificial networks use extremely simplified units and differ in structure, learning, embodiment, energy, and development.', why:'Neurons historically inspired the terminology.', consequence:'Brain language is not evidence of consciousness.', demo:'brain' },
  { claim:'It is only autocomplete.', verdict:'Partly true', reality:'Next-token prediction is the objective, but doing it broadly can require rich internal representations.', why:'The output is indeed generated one token at a time.', consequence:'“Only prediction” understates capability but does not prove human-like understanding.', demo:'prediction' },
  { claim:'Fluent answers demonstrate understanding.', verdict:'Myth', reality:'Fluency shows linguistic competence, not necessarily truth, grounding, consciousness, or stable understanding.', why:'Humans normally associate articulate explanation with knowledgeable speakers.', consequence:'Evaluate evidence, not rhetorical confidence.', demo:'fluency' },
  { claim:'If the model sounds uncertain, it knows it is uncertain.', verdict:'Myth', reality:'Verbal confidence may be poorly calibrated to actual probability of error.', why:'First-person language encourages us to infer introspection.', consequence:'Self-reported confidence is not a substitute for evaluation.', demo:'confidence' },
  { claim:'Hallucination is one bug engineers can remove.', verdict:'Myth', reality:'Fabrication has multiple causes in objectives, data, prompts, decoding, grounding, and product design.', why:'One label makes distinct failure modes appear to share one fix.', consequence:'High-stakes use requires verification, retrieval, tools, and safeguards.', demo:'failure' },
  { claim:'More data always creates a better model.', verdict:'Myth', reality:'Quality, relevance, diversity, provenance, duplication, contamination, and rights matter alongside quantity.', why:'Scale has produced genuine capability gains.', consequence:'Dataset governance is part of model design.', demo:'data' },
  { claim:'AI is objective because it uses mathematics.', verdict:'Myth', reality:'Calculations are precise, but objectives, labels, thresholds, datasets, and deployment choices are human decisions.', why:'Numerical outputs can conceal the judgments that produced them.', consequence:'Technical precision does not remove normative judgment.', demo:'objective' },
  { claim:'Bias is just bad data.', verdict:'Myth', reality:'Bias can arise from data, labels, measurement, objectives, thresholds, interfaces, institutions, or the task itself.', why:'Data problems are visible and sometimes fixable.', consequence:'Cleaning data alone cannot resolve structural injustice.', demo:'bias' },
  { claim:'AI acts autonomously, without people.', verdict:'Myth', reality:'Models depend on authors, data workers, engineers, evaluators, moderators, chips, energy, institutions, and users.', why:'The final interface hides the production network.', consequence:'Automation can redistribute or conceal labor rather than eliminate it.', demo:'labor' },
  { claim:'Temperature makes the model smarter or more creative.', verdict:'Myth', reality:'Temperature reshapes token-selection probabilities. It does not add knowledge or capability.', why:'Higher values often produce more varied language.', consequence:'Variation and error may rise together.', demo:'temperature' },
  { claim:'The model remembers everything said to it.', verdict:'Myth', reality:'The context is finite; product memory is separate; older material may be summarized or omitted.', why:'A continuous chat interface resembles a persistent relationship.', consequence:'Do not rely on assumed memory for critical records or instructions.', demo:'context' },
  { claim:'The same prompt always gives the same answer.', verdict:'Myth', reality:'Sampling, context, hidden instructions, tools, model versions, and infrastructure can change output.', why:'Software is often expected to be deterministic.', consequence:'Reproducible evaluation must control versions and settings.', demo:'variation' },
  { claim:'A bigger model is always better.', verdict:'Myth', reality:'Scale can help, but task fit, data, tools, latency, energy, cost, and safety also matter.', why:'Scaling has driven conspicuous benchmark gains.', consequence:'Use the smallest system that reliably meets the requirement.', demo:'scale' },
  { claim:'AI will replace jobs one-for-one.', verdict:'Myth', reality:'Technology automates tasks, reorganizes occupations, changes power, and distributes effects unevenly.', why:'Job titles make work look like one indivisible unit.', consequence:'Analyze tasks, relationships, job quality, and transition costs.', demo:'jobs' },
  { claim:'If AI is not conscious, it cannot seriously harm anyone.', verdict:'Myth', reality:'Systems can shape access, decisions, beliefs, and institutions without subjective experience.', why:'Moral blame is usually associated with intention.', consequence:'People and institutions retain responsibility for deployed systems.', demo:'harm' },
  { claim:'Impressive performance proves consciousness.', verdict:'Unsupported', reality:'Performance establishes capability. Subjective experience requires additional evidence and lacks an agreed operational test.', why:'Human-like language strongly activates social intuitions.', consequence:'Avoid both confident attribution and confident dismissal unsupported by evidence.', demo:'consciousness' },
]

export const concepts = [
  ['Vector','An ordered list of numbers representing a point, direction, measurement, or learned state.'],
  ['Matrix','A rectangular array of numbers that transforms vectors and batches of vectors.'],
  ['Token','A vocabulary unit: a word, subword, punctuation mark, or character sequence.'],
  ['Embedding','A learned vector whose relationships help a model use tokens or other items.'],
  ['Parameter','A learned numerical value—usually a weight or bias—adjusted during training.'],
  ['Artificial neuron','A weighted sum followed by an activation function.'],
  ['Attention','A weighted information-routing computation between token positions.'],
  ['Query, key, value','Learned projections used to match information needs and mix content.'],
  ['Transformer block','Attention, an MLP, normalization, and residual connections arranged as a repeatable unit.'],
  ['Residual connection','A path that adds a transformation back to the representation it received.'],
  ['Logit','An unnormalized score assigned to a possible output token.'],
  ['Softmax','A transformation that converts a set of scores into a probability distribution.'],
  ['Loss','A number measuring how poorly the model performed on the training objective.'],
  ['Gradient','The direction and sensitivity of loss change with respect to a parameter.'],
  ['Backpropagation','Efficiently applying the chain rule to calculate gradients through the network.'],
  ['Learning rate','The scale of each optimization update.'],
  ['Context window','The finite token sequence available during the current computation.'],
  ['KV cache','Previously computed attention keys and values reused during generation.'],
  ['Temperature','A control that sharpens or flattens token-selection probabilities.'],
  ['Retrieval','Adding selected external documents to the model’s runtime context.'],
  ['Tool use','Allowing a model-driven application to request external operations such as search or calculation.'],
  ['Hallucination','A fluent output that is fabricated, unsupported, or inconsistent with relevant facts.'],
]
