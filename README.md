# AI Illustrations

AI Illustrations is an interactive, technically faithful explanation of how transformer-based large language models move from human-created source material to generated responses.

The experience separates four processes that are often confused:

1. collecting and preparing training data;
2. pretraining a base model;
3. post-training assistant behavior;
4. running the trained model when a user sends a prompt.

It also includes a 22-part **Myth / Reality** sequence and a searchable **Concept Atlas**.

## Experience

- Sources, OCR, collection routes, and provenance
- Dataset preparation and filtering trade-offs
- Tokenization
- Vectors and contextual embeddings
- Loss, gradients, and parameter updates
- Query, key, value, attention, MLPs, and residual streams
- Instruction and preference training
- Autoregressive inference and decoding controls
- Failure modes and mitigations
- AI labor, rights, material infrastructure, and institutional responsibility

Every simulation is an educational reduction. The site does not claim to reconstruct any proprietary system or undisclosed training pipeline.

## Local development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run typecheck
npm test
npm run build
```

## Cloudflare Pages

Recommended settings:

- Framework preset: **Vite**
- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`

The included `public/_redirects` file supports client-side routes, and `public/_headers` supplies a restrictive baseline security policy.

## Accessibility

- Keyboard-operable controls
- Visible focus states
- Reduced-motion support
- Responsive layouts from 320px upward
- Text descriptions paired with simulations
- No essential information communicated by color alone

## Content method

The explanatory approach distinguishes:

- widely documented mechanisms;
- technically faithful simplifications;
- implementation choices that vary;
- proprietary or unknown details.

Key foundations include the transformer architecture described by Vaswani et al. in *Attention Is All You Need* and standard treatments of embeddings, gradient learning, autoregressive modeling, instruction tuning, and preference optimization.
