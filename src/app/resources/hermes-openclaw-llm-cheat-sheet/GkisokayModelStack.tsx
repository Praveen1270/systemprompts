import { Fragment } from 'react';
import styles from './gkisokay-stack.module.css';

type TierId = 't1' | 't2' | 't3' | 't4';

interface Row {
  name: string;
  vendorLine: string;
  cost: string;
  context: string;
  avgMin: string;
  specs: string;
  benchmarks: number[];
  bestFor: string;
  why: string;
}

interface TierBlock {
  id: TierId;
  label: string;
  focusLine: string;
  rows: Row[];
}

const TIERS: TierBlock[] = [
  {
    id: 't1',
    label: 'Tier 1 — Frontier',
    focusLine:
      'Complex reasoning · Strategy · Planning · External dev only',
    rows: [
      {
        name: 'Claude Opus 4.6',
        vendorLine: 'Anthropic · Feb 2026',
        cost: '$5 in · $25 out',
        context: '1M',
        avgMin: '—',
        specs: 'Chain-of-thought, expert level',
        benchmarks: [93.4, 84.6, 53.0],
        bestFor: 'Complex terminal coding, multi-step planning',
        why: 'Highest-tier reasoning for the hardest agent plans and code paths.',
      },
      {
        name: 'GPT-5.4',
        vendorLine: 'OpenAI · Mar 2026',
        cost: '$2.50 in · $12.50 out',
        context: '1.28M',
        avgMin: '—',
        specs: 'Dynamic MCT, superhuman desktop control',
        benchmarks: [92.7, 75.6, 62.8],
        bestFor: 'Autonomous execution, high-level agency',
        why: 'Built for end-to-end autonomy with strong tool and desktop control.',
      },
      {
        name: 'GLM-5.1',
        vendorLine: 'Zhipu AI · Apr 2026',
        cost: '$1.40 in · $4.40 out',
        context: '200K',
        avgMin: '—',
        specs: '7b–60 total / 400 active MoE, Huawei chips',
        benchmarks: [91.4, 85.3, 68.7],
        bestFor: 'Long-horizon agentic routing',
        why: 'MoE scale plus hardware-aware routing for sustained agent runs.',
      },
    ],
  },
  {
    id: 't2',
    label: 'Tier 2 — Execution',
    focusLine:
      'Agent execution · Tool calls · Long task chains · Multi-step pipelines',
    rows: [
      {
        name: 'MiniMax N2.7',
        vendorLine: 'MiniMax',
        cost: '$0.30 in · $1.20 out',
        context: '200K',
        avgMin: '—',
        specs: 'Self-evolving CoT, multi-agent loops',
        benchmarks: [88.2, 85.1, 57.0],
        bestFor: 'OpenClaw execution backbone',
        why: 'Reliable execution layer for chained tools and agent loops.',
      },
      {
        name: 'Kimi K2.5',
        vendorLine: 'Moonshot',
        cost: '$0.60 in · $3.00 out',
        context: '256K',
        avgMin: '—',
        specs: '31 experts, 384 active, parallel agentic vision',
        benchmarks: [93.2, 73.4, 75.6],
        bestFor: 'Multi-source browsing',
        why: 'Wide context and parallel vision for research-heavy agents.',
      },
      {
        name: 'Grok 4.20',
        vendorLine: 'xAI',
        cost: '$2.00 in · $6.00 out',
        context: '2M',
        avgMin: '—',
        specs: '8-agent parallel system, real-time X data',
        benchmarks: [90.0, 82.0, 70.1],
        bestFor: 'Real-time research',
        why: 'Massive context plus live signal for attention-sensitive research.',
      },
      {
        name: 'DeepSeek V3.2',
        vendorLine: 'DeepSeek',
        cost: '$0.27 in · $0.41 out',
        context: '164K',
        avgMin: '—',
        specs: 'Multi-head latent attention, MLA optimized',
        benchmarks: [73.0, 71.2],
        bestFor: 'Open-source power-user',
        why: 'Efficient attention stack for heavy execution without frontier cost.',
      },
    ],
  },
  {
    id: 't3',
    label: 'Tier 3 — Balanced',
    focusLine: 'Context · Code · Research · Day-to-day tasks',
    rows: [
      {
        name: 'Claude Sonnet 4.6',
        vendorLine: 'Anthropic',
        cost: '$3 in · $15 out',
        context: '1M',
        avgMin: '—',
        specs: 'Adaptive thinking, 40–60 active',
        benchmarks: [72.6, 65.0, 54.0],
        bestFor: 'Daily coding, content automation',
        why: 'Default “always on” balance of quality, speed, and cost.',
      },
      {
        name: 'GPT-5.4 mini',
        vendorLine: 'OpenAI',
        cost: '$0.15 in · $4.50 out',
        context: '400K',
        avgMin: '—',
        specs: 'Native vision, sub-agent optimized',
        benchmarks: [55.6, 71.4, 72.7],
        bestFor: 'High-speed chat, layer-2 chains',
        why: 'Fast passes and sub-agents where full GPT-5.4 is overkill.',
      },
      {
        name: 'Gemini 1.1 Pro',
        vendorLine: 'Google',
        cost: '$2 in · $12 out',
        context: '1M',
        avgMin: '—',
        specs: 'Native multimodal, video-audio-action',
        benchmarks: [72.3, 84.3, 81.2],
        bestFor: 'Multi-modal agents, video/audio analysis',
        why: 'First-class media understanding for multimodal agent stacks.',
      },
      {
        name: 'Qwen 3.6 Plus',
        vendorLine: 'Alibaba · OpenRouter',
        cost: '$0 in · $0 out',
        context: '1M',
        avgMin: 'via OpenRouter',
        specs: 'Hybrid MoE, 3.5 on steroids',
        benchmarks: [78.8],
        bestFor: 'Agent routing, Tier 3 tasking',
        why: 'Free-tier routing workhorse with strong MoE throughput.',
      },
      {
        name: 'Llama 4 Maverick',
        vendorLine: 'Meta',
        cost: '$0.15 – $0.45',
        context: '1M',
        avgMin: 'provider-dependent',
        specs: '400B total, 1.2T parameters',
        benchmarks: [85.5, 68],
        bestFor: 'Self-hosted Tier 3',
        why: 'On-prem option that still feels like a mid-tier frontier model.',
      },
      {
        name: 'Mistral Small 4',
        vendorLine: 'Mistral',
        cost: '$0.15 in · $0.60 out',
        context: '256K',
        avgMin: '—',
        specs: 'Apache 2.0, reasoning-gated',
        benchmarks: [71.7, 74.0, 67.0],
        bestFor: 'Modern commerce, scaling',
        why: 'License-friendly, low-latency scaling for product workloads.',
      },
    ],
  },
  {
    id: 't4',
    label: 'Tier 4 — Local / Micro',
    focusLine:
      'Summaries · Routing · Classification · Always-on loops · $0 cost',
    rows: [
      {
        name: 'Qwen 3.6-8B',
        vendorLine: 'Local',
        cost: '$0.00',
        context: '252K',
        avgMin: 'Local',
        specs: 'Thinking toggle, multimodal',
        benchmarks: [81.7, 73.3, 57.7],
        bestFor: 'Summarization, routing',
        why: 'Tiny footprint for 24/7 summarization and intent routing.',
      },
      {
        name: 'Qwen 3.6-27B',
        vendorLine: 'Local',
        cost: '$0.00',
        context: '252K',
        avgMin: 'Local',
        specs: '32B dense, 255 languages',
        benchmarks: [83.6, 77.1, 72.5],
        bestFor: 'Local reasoning, micro-classification',
        why: 'Step up in logic depth while staying entirely on-device.',
      },
      {
        name: 'Gemma 4 (31B)',
        vendorLine: 'Google · local',
        cost: '$0.00',
        context: '256K',
        avgMin: 'Local',
        specs: '31B dense, Gemini 2.0 — QFT quantized',
        benchmarks: [83.2, 85.0, 76.9],
        bestFor: 'Local agentic sub-tasks',
        why: 'Gemini-family behavior in a compact, quant-friendly package.',
      },
      {
        name: 'DeepSeek R1 Distill',
        vendorLine: 'DeepSeek · local',
        cost: '$0.00',
        context: '128K',
        avgMin: 'Local',
        specs: '32B dense distilled from R1',
        benchmarks: [54.2, 72.0, 62.3],
        bestFor: 'Reasoning-heavy, logic-based tasks',
        why: 'Distilled reasoning traces without calling the full R1 endpoint.',
      },
      {
        name: 'GLM-4.5-Air',
        vendorLine: 'Zhipu · SiliconFlow',
        cost: 'Low',
        context: '128K',
        avgMin: 'via SiliconFlow',
        specs: 'Multi-purpose, agent-focused',
        benchmarks: [71.0, 68.0, 55.0],
        bestFor: 'Lightweight agentic sub-tasks',
        why: 'Near-free edge tier for browser helpers and micro-tools.',
      },
    ],
  },
];

const BANNER_CLASS: Record<TierId, string> = {
  t1: styles.bannerT1,
  t2: styles.bannerT2,
  t3: styles.bannerT3,
  t4: styles.bannerT4,
};

const BAR_COLOR: Record<TierId, string> = {
  t1: '#ff4b5c',
  t2: '#00e676',
  t3: '#42a5f5',
  t4: '#ffb300',
};

const PILL_CLASS: Record<TierId, string> = {
  t1: styles.pillT1,
  t2: styles.pillT2,
  t3: styles.pillT3,
  t4: styles.pillT4,
};

const MOBILE_TIER_HEADER: Record<TierId, string> = {
  t1: styles.mobileTierHeaderT1,
  t2: styles.mobileTierHeaderT2,
  t3: styles.mobileTierHeaderT3,
  t4: styles.mobileTierHeaderT4,
};

const MOBILE_CARD: Record<TierId, string> = {
  t1: styles.mobileCardT1,
  t2: styles.mobileCardT2,
  t3: styles.mobileCardT3,
  t4: styles.mobileCardT4,
};

function BenchmarkBars({ values, tier }: { values: number[]; tier: TierId }) {
  const color = BAR_COLOR[tier];
  return (
    <div className={styles.benchmarkCell}>
      {values.map((pct, i) => (
        <div key={i} className={styles.barRow}>
          <div className={styles.barTrack}>
            <div
              className={styles.barFill}
              style={{ width: `${Math.min(100, pct)}%`, backgroundColor: color }}
            />
          </div>
          <span className={styles.barLabel}>{pct.toFixed(1)}%</span>
        </div>
      ))}
    </div>
  );
}

export default function GkisokayModelStack() {
  const modelCount = TIERS.reduce((n, t) => n + t.rows.length, 0);

  return (
    <div className={styles.sheet}>
      <div className={styles.headerRow}>
        <div className={styles.titleBlock}>
          <p className={styles.kicker}>Multimodal routing guide</p>
          <h2 className={styles.title}>LLM model stack</h2>
          <p className={styles.subtitle}>
            {modelCount} models · 4 tiers · Hermes · OpenClaw · Claude · Code ·
            Codex — a multi-model routing guide for agent builders, start to
            finish.
          </p>
        </div>
        <div className={styles.meta}>
          <strong>SystemPrompts</strong>
          <br />
          April 2026
        </div>
      </div>

      <div className={styles.legend} aria-label="Tier legend">
        <span className={`${styles.pill} ${PILL_CLASS.t1}`}>Tier 1: Frontier</span>
        <span className={`${styles.pill} ${PILL_CLASS.t2}`}>Tier 2: Execution</span>
        <span className={`${styles.pill} ${PILL_CLASS.t3}`}>Tier 3: Balanced</span>
        <span className={`${styles.pill} ${PILL_CLASS.t4}`}>Tier 4: Local</span>
      </div>

      <div className={styles.mobileOnly} aria-label="Model list — optimized for small screens">
        {TIERS.map((tier) => (
          <section key={tier.id} className={styles.mobileTierBlock}>
            <div
              className={`${styles.mobileTierHeader} ${MOBILE_TIER_HEADER[tier.id]}`}
            >
              {tier.label}
              <span>{tier.focusLine}</span>
            </div>
            {tier.rows.map((row) => (
              <article
                key={`${tier.id}-${row.name}`}
                className={`${styles.mobileCard} ${MOBILE_CARD[tier.id]}`}
              >
                <h3 className={styles.mobileCardTitle}>{row.name}</h3>
                <p className={styles.mobileCardVendor}>{row.vendorLine}</p>
                <dl className={styles.mobileDl}>
                  <div>
                    <dt className={styles.mobileDt}>Cost (1M in/out)</dt>
                    <dd className={styles.mobileDd}>{row.cost}</dd>
                  </div>
                  <div>
                    <dt className={styles.mobileDt}>Context</dt>
                    <dd className={styles.mobileDd}>{row.context}</dd>
                  </div>
                  <div>
                    <dt className={styles.mobileDt}>Avg / min</dt>
                    <dd className={styles.mobileDd}>{row.avgMin}</dd>
                  </div>
                  <div>
                    <dt className={styles.mobileDt}>Key specs</dt>
                    <dd className={styles.mobileDd}>{row.specs}</dd>
                  </div>
                  <div>
                    <dt className={styles.mobileDt}>Top benchmarks</dt>
                    <dd className={`${styles.mobileDd} ${styles.mobileBenchmarkBlock}`}>
                      <BenchmarkBars values={row.benchmarks} tier={tier.id} />
                    </dd>
                  </div>
                  <div>
                    <dt className={styles.mobileDt}>Best for</dt>
                    <dd className={styles.mobileDd}>{row.bestFor}</dd>
                  </div>
                  <div>
                    <dt className={styles.mobileDt}>Why this model</dt>
                    <dd className={styles.mobileDd}>{row.why}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </section>
        ))}
      </div>

      <div className={styles.desktopOnly}>
        <div className={styles.scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Model</th>
                <th className={styles.th}>Cost (1M In/Out)</th>
                <th className={styles.th}>Context</th>
                <th className={styles.th}>Avg / Min</th>
                <th className={styles.th}>Key specs</th>
                <th className={styles.th}>Top benchmarks</th>
                <th className={styles.th}>Best for</th>
                <th className={styles.th}>Why this model</th>
              </tr>
            </thead>
            <tbody>
              {TIERS.map((tier) => (
                <Fragment key={tier.id}>
                  <tr>
                    <td colSpan={8} className={`${styles.tierBanner} ${BANNER_CLASS[tier.id]}`}>
                      {tier.label}
                      <span>{tier.focusLine}</span>
                    </td>
                  </tr>
                  {tier.rows.map((row) => (
                    <tr key={`${tier.id}-${row.name}`}>
                      <td className={`${styles.td} ${styles.tdModel}`}>
                        <strong>{row.name}</strong>
                        <span className={styles.vendor}>{row.vendorLine}</span>
                      </td>
                      <td className={styles.td}>{row.cost}</td>
                      <td className={styles.td}>{row.context}</td>
                      <td className={styles.td}>{row.avgMin}</td>
                      <td className={styles.td}>{row.specs}</td>
                      <td className={styles.td}>
                        <BenchmarkBars values={row.benchmarks} tier={tier.id} />
                      </td>
                      <td className={styles.td}>{row.bestFor}</td>
                      <td className={styles.td}>{row.why}</td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer className={styles.footer}>
        <p>
          <em>Prices as of April 2026.</em> Active in Green / Hermes / OpenClaw.
          Red = Frontier / strategy. Blue = Balanced. Orange = Local.
        </p>
      </footer>
    </div>
  );
}
