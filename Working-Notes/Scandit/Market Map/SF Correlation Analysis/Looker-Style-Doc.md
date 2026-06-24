# Scandit Salesforce — Market Map Correlation Analysis

> **Purpose:** Validate ICP Matrix v1 against 2 years of closed Opportunity history. Feeds the next ICP Data Review call.
>
> **Source:** Scandit Salesforce, queried via `sf` CLI on 2026-05-15 (read-only)
>
> **Window:** Closed Opportunities, `CloseDate = LAST_N_YEARS:2`, stages `Closed Lost`, `Closed Billable`, `Closed Won`
>
> **Population:** 8,682 closed Opportunities. 4,248 won ($87.3M Grand Total). 4,434 lost. Aggregate win rate: **48.9%**.

---

## Methodology & Data Quality Notes

Read these before interpreting numbers.

1. **Primary "won" stage is `Closed Billable`** (6,592 records) not `Closed Won` (30 records). Filter `IsWon = true` instead of `StageName = 'Closed Won'`.
2. **`Amount` field is poisoned.** Its label is literally "Old Amount(Do not use)". All dollar figures use `Grand_Total__c`, `Won_Amount__c`, or `Lost_Amount__c`.
3. **Multi-currency:** SOQL `SUM()` aggregates auto-convert to org currency. Python-side sums on raw records do **not** — they mix native currencies. All dollar figures in this doc come from SOQL aggregates only.
4. **Sales cycle caveat:** Won-deal median cycle of ~350d strongly suggests these are annual renewals (opp created 12 months pre-close = SaaS subscription pattern), not new-business cycles. A separate `Type = 'New Business%'` pull is needed to isolate true new-biz cycle. Flagged as follow-up.
5. **Product amount fields only populated on wins.** `Barcode_Scanning_Amount__c`, `ID_Scanning_Amount__c`, and `Shelfview_Amount__c` sum to $31M on won deals but show $0 on losses. Per-product ICP analysis is win-side only.

---

## Headline Findings

1. **Three products = three ICPs.** Shelfview is Retail-only (96% revenue concentration). ID Scanning is T&L + Travel (84%). Barcode is horizontal. Building one company-wide ICP would obscure this.
2. **Classic SMB-vs-Enterprise tradeoff is sharp.** Win rate drops monotonically from 65% in `<50 employees` and `<$10M revenue` to 38-41% at `50K+ employees` and `$5B+ revenue`. Avg ACV climbs from $7K to $657K-$1.5M.
3. **Existing scoring infrastructure does not predict wins.** `q_Score__c`, `Signals_Research_Score__c`, MQA, and `Rating` all show no useful correlation with `IsWon`. The new Fit Score should be built from first principles, not borrow these.
4. **Proposed_Tier_2023__c is empty.** Field exists in schema but has zero populated values across all 48,245 accounts. Market Map will be Scandit's first data-driven tier population.
5. **Switzerland (HQ home market) wins at 67%** vs US 52% / Japan 32% / India 23%. Geo is a meaningful ICP vector.
6. **"Free/default tooling" is the dominant competitive threat** — Google ML Kit, Native iOS, ZXing, Scanbot all show up in top-15 competitors on lost deals.

---

## 1. Win Rate, ACV by Vertical

| Vertical | Won | Lost | Total | Win Rate | Won Value | Avg ACV |
|---|---:|---:|---:|---:|---:|---:|
| Retail | 1,118 | 1,371 | 2,489 | 44.9% | $40,287,569 | $36,035 |
| **(none)** | 413 | 1,102 | 1,515 | 27.3% | $1,841,999 | $4,471 |
| Technology | 817 | 421 | 1,238 | **66.0%** | $8,568,077 | $10,500 |
| Manufacturing | 632 | 446 | 1,078 | 58.6% | $6,040,473 | $9,558 |
| Transport & Logistics | 354 | 459 | 813 | 43.5% | $15,940,648 | **$45,030** |
| Healthcare | 316 | 167 | 483 | **65.4%** | $4,880,340 | $15,444 |
| Other | 227 | 141 | 368 | 61.7% | $1,523,709 | $6,712 |
| Field Services | 213 | 147 | 360 | 59.2% | $2,594,201 | $12,179 |
| Travel | 92 | 145 | 237 | 38.8% | $4,678,802 | **$50,857** |
| Media & Entertainment | 66 | 35 | 101 | 65.3% | $945,746 | $14,329 |
| **TOTAL** | **4,248** | **4,434** | **8,682** | **48.9%** | **$87,301,564** | $20,551 |

**Read:**
- High-volume high-fit (>59% win rate): Technology, Manufacturing, Healthcare, Field Services, Media & Entertainment, Other
- Gold mountains (high ACV, mid win rate): Transport & Logistics ($45K avg), Travel ($51K avg)
- Volume but mediocre fit: Retail (45% win rate despite $40M revenue concentration)
- **Data hygiene flag:** 1,515 deals (17%) have no Vertical__c set, and they win at only 27% — these are likely unqualified opportunities cluttering pipeline

---

## 1b. Sub-Vertical Detail (deals ≥ 20)

Top stand-outs:

**High win rate + meaningful volume (T1 candidates):**

| Vertical | Sub-Vertical | Won | Total | Win Rate | Avg ACV |
|---|---|---:|---:|---:|---:|
| Technology | Software Development & Design | 456 | 701 | 65.0% | $11,286 |
| Manufacturing | Industrial goods | 289 | 430 | 67.2% | $6,574 |
| Healthcare | Hospitals | 215 | 312 | **68.9%** | $19,692 |
| Technology | Other | 321 | 467 | 68.7% | $8,945 |
| Field Services | Energy | 41 | 59 | 69.5% | $10,696 |
| Field Services | Utilities | 53 | 77 | 68.8% | $7,222 |
| Other | Education | 34 | 45 | **75.6%** | $2,754 |
| Other | Agriculture | 17 | 22 | **77.3%** | $7,685 |

**Big ACV / mid-low win rate (whale-hunting trap):**

| Vertical | Sub-Vertical | Won | Total | Win Rate | Avg ACV |
|---|---|---:|---:|---:|---:|
| Retail | Mass Merchant | 19 | 51 | 37.3% | **$605,195** |
| Transport & Logistics | Quick Commerce Delivery | 19 | 48 | 39.6% | $226,234 |
| Retail | Sporting Goods | 16 | 33 | 48.5% | $86,544 |
| Transport & Logistics | Postal, Parcel & Express | 98 | 291 | 33.7% | $84,013 |
| Travel | Airlines | 41 | 122 | 33.6% | $68,019 |

The "whale" sub-verticals are exactly where Bernardo's "aspirational T1" trap shows up. They have $200K-$600K avg ACVs that excite stakeholders, but win rates of 33-49% suggest enterprise procurement cycles, competitive displacement, or wrong-fit.

**Low fit (deprioritize unless ACV justifies):**

| Vertical | Sub-Vertical | Won | Total | Win Rate |
|---|---|---:|---:|---:|
| Retail | Fuel & Convenience Stores | 19 | 56 | 33.9% |
| Transport & Logistics | 3rd party logistics | 63 | 157 | 40.1% |
| Travel | Rail | 14 | 40 | 35.0% |

---

## 2. By Customer Segment

| Segment | Won | Lost | Total | Win Rate | Won Value | Avg ACV |
|---|---:|---:|---:|---:|---:|---:|
| **(none)** | 3,284 | 3,691 | 6,975 | 47.1% | $38,628,417 | $11,763 |
| Customer Tier 1 | 382 | 406 | 788 | 48.5% | $22,361,227 | $58,537 |
| Customer Tier 2 | 273 | 175 | 448 | **60.9%** | $7,782,935 | $28,509 |
| Customer Tier 3 | 304 | 153 | 457 | **66.5%** | $7,821,146 | $25,727 |
| Other | 5 | 9 | 14 | 35.7% | $10,707,839 | $2,141,568 |

**Read:** This is the **Portnox pattern** in Scandit's own data. Existing "Customer Tier 1" (the aspirational tier) wins at **48.5%** — barely above baseline. Existing Tier 2 and Tier 3 win at 61% and 67%, with healthy $26-29K ACVs. The current Customer_Segment__c labeling is inverted relative to what actually wins. ICP refinement should consider flipping or recasting.

Also: 80% of deals (6,975 of 8,682) have no Customer_Segment__c populated.

---

## 2b. By Headcount and Revenue Bands

*Win rates are reliable; $ values are Python-side and mix currencies — directional only.*

**Employee Headcount:**

| Band | Won | Lost | Total | Win Rate | Note |
|---|---:|---:|---:|---:|---|
| < 50 | 1,143 | 616 | 1,759 | **65.0%** | High-fit, small |
| 50-249 | 527 | 308 | 835 | **63.1%** | High-fit, small |
| 250-999 | 371 | 282 | 653 | 56.8% | Mid |
| 1K-5K | 575 | 604 | 1,179 | 48.8% | Mid |
| 5K-10K | 269 | 338 | 607 | 44.3% | Below baseline |
| 10K-50K | 474 | 640 | 1,114 | 42.5% | Below baseline |
| 50K+ | 250 | 412 | 662 | 37.8% | Whales — low fit |

**Annual Revenue:**

| Band | Won | Lost | Total | Win Rate | Note |
|---|---:|---:|---:|---:|---|
| < $10M | 1,305 | 689 | 1,994 | **65.4%** | High-fit |
| $10M-$100M | 512 | 293 | 805 | **63.6%** | High-fit |
| $100M-$500M | 331 | 309 | 640 | 51.7% | Mid |
| $500M-$1B | 240 | 247 | 487 | 49.3% | Mid |
| $1B-$5B | 499 | 631 | 1,130 | 44.2% | Below baseline |
| $5B+ | 674 | 968 | 1,642 | 41.0% | Whales — low fit |

**Read:** Monotonic. Win rate decreases as size increases. The "best-fit" Scandit customer is small (sub-1K employees / sub-$100M revenue). The largest accounts (50K+ employees, $5B+ revenue) win 38-41%, which is below baseline.

This collides with the per-product reality below: the products that drive whale ACVs (ID Scanning, Shelfview) are in Travel/T&L/Retail — i.e., the verticals where Scandit ALSO wins least often. **Big ACVs and high fit don't coexist** in the current portfolio.

---

## 3. Per-Product Slice

Won-side product revenue by Vertical (SOQL-aggregated, multi-currency converted):

| Vertical | Wins | Barcode | ID Scan | Shelfview |
|---|---:|---:|---:|---:|
| Retail | 1,118 | $11,974,313 | $442,576 | **$665,760** |
| Technology | 817 | $2,745,078 | $32,898 | $0 |
| Manufacturing | 632 | $1,518,355 | $0 | $0 |
| Transport & Logistics | 354 | $4,454,974 | **$2,619,835** | $0 |
| Healthcare | 316 | $2,510,548 | $4,909 | $0 |
| Field Services | 213 | $568,891 | $2,700 | $0 |
| Travel | 92 | $674,260 | **$1,057,271** | $0 |
| Media & Entertainment | 66 | $224,768 | $21,616 | $0 |
| Other | 227 | $316,184 | $75,418 | $29,438 |
| (none) | 413 | $997,155 | $105,719 | $0 |
| **TOTAL** | **4,248** | **$25,984,526** | **$4,362,943** | **$695,199** |

**Read:** Three distinct ICPs.

- **Barcode Scanning** is the flagship — $26M won, spread broadly. Every vertical buys it. ICP should be the company-wide aggregate.
- **ID Scanning** is concentrated: 60% of revenue from T&L, 24% from Travel, 10% from Retail. **86% in three verticals.** The ID Scanning ICP is essentially "places that need to verify documents/IDs at high volume" — Airlines, Postal/Parcel, Mass Retail.
- **Shelfview** is **96% Retail-only**. Specifically Retail (excluding Mass Merchant) where store-shelf visibility matters. This is a single-vertical product.

This finding alone justifies building three sub-ICPs, not just one aggregate.

---

## 4. Geographic Concentration

Top 20 countries by deal volume (108 countries total with deals):

| Country | Won | Lost | Total | Win Rate | Won Value |
|---|---:|---:|---:|---:|---:|
| United States | 1,351 | 1,225 | 2,576 | 52.4% | $44,812,151 |
| Germany | 333 | 286 | 619 | 53.8% | $4,315,958 |
| United Kingdom | 232 | 320 | 552 | 42.0% | $3,413,489 |
| France | 246 | 280 | 526 | 46.8% | $3,636,856 |
| Japan | 161 | 335 | 496 | **32.5%** | $5,595,950 |
| Switzerland | 310 | 150 | 460 | **67.4%** | $2,924,707 |
| Italy | 194 | 163 | 357 | 54.3% | $3,049,565 |
| Spain | 121 | 167 | 288 | 42.0% | $1,793,965 |
| Netherlands | 134 | 92 | 226 | 59.3% | $1,714,868 |
| Australia | 102 | 102 | 204 | 50.0% | $1,036,028 |
| Canada | 74 | 122 | 196 | 37.8% | $1,214,403 |
| Sweden | 98 | 74 | 172 | 57.0% | $1,098,301 |
| Denmark | 66 | 50 | 116 | 56.9% | $670,058 |
| Belgium | 56 | 45 | 101 | 55.4% | $625,277 |
| Singapore | 55 | 43 | 98 | 56.1% | $972,999 |
| Poland | 41 | 54 | 95 | 43.2% | $1,518,745 |
| **India** | 21 | 71 | 92 | **22.8%** | $316,386 |
| Brazil | 41 | 44 | 85 | 48.2% | $986,520 |

**Read:**
- **US dominates volume** (30% of all closed deals, 51% of won value) — primary go-to-market market.
- **Switzerland is the home-market gold patch** (67% win rate). Founder effect, network, language — meaningful T1 signal for Scandit-HQ region (DACH plus Nordics).
- **Northern Europe** (Netherlands, Sweden, Denmark, Belgium, Switzerland) all run 55-67% win rates. Strong regional fit.
- **Japan, India, Canada** all underperform (23-38% win rates). Worth understanding before investing more.

---

## 5. Existing Scoring Fields — Validation

Question: do Scandit's existing scoring infrastructure fields predict win rate?

**Account Rating:**

| Rating | Won | Lost | Total | Win Rate |
|---|---:|---:|---:|---:|
| (none) | 4,097 | 4,228 | 8,325 | 49.2% |
| Top | 151 | 206 | 357 | **42.3%** |

"Top"-rated accounts win at **42% — worse than baseline (49%).** Classic aspirational labeling. The Rating field as currently used is misleading.

**q_Score__c (Qualified Signals Engagement Score):**
- 100% populated, but 99% of records score `≤10` (mean = 0.8). Effectively dead field.

**Signals_Research_Score__c:**
- 100% populated, broader spread (mean = 17.4). But highest bucket (51-100) wins at 48% vs lowest bucket (≤10) at 50%. No correlation.

**Account_Score_Marketo__c (MQA):**
- One anomaly: 26-50 bucket (350 deals) wins at 60.9%. But 51-100 bucket (71 deals) wins at only 7%. Inconsistent — likely scoring noise, not signal.

**Conclusion:** None of the existing score fields are predictive enough to seed Market Map's fit score. Build the new score from first principles using the Vertical / Sub-Vertical / Size patterns above.

---

## 6. Aspirational vs Actual T1 — N/A (Field Empty)

`Proposed_Tier_2023__c` (label "Proposed Tier 2026") is **100% null across all 48,245 accounts.** No existing data-driven tiering exists to compare against.

The closest proxy is **`Customer_Segment__c`** (see Section 2): existing "Customer Tier 1" wins at 48% (baseline), "Tier 2" at 61%, "Tier 3" at 67%. The current segment-tier labeling appears inverted relative to actual win patterns — worth raising in the next ICP Data Review.

---

## 7. Loss Patterns

**Top loss reasons** (`Closed_Lost_Reason__c`):

| Reason | Count | Lost Value (mixed currency) |
|---|---:|---:|
| Unknown (go dark) | 1,414 | $28,084,512 |
| Strategy change | 996 | $20,411,303 |
| Bad timing | 416 | $15,159,951 |
| Replaced/merged with other opportunity | 356 | $7,240,529 |
| Competitor win | 261 | $7,378,666 |
| No budget | 257 | $4,365,098 |
| Restructure Cleanup | 240 | $5,498,634 |
| Price too high | 188 | $2,940,193 |
| Missing feature | 156 | $4,286,870 |
| No authority | 60 | $1,534,561 |
| Missing platform | 55 | $1,592,090 |

**Read:**
- "Unknown (go dark)" is the **#1 loss reason** at 32% of all losses ($28M). This is hygiene — reps aren't capturing actual reason. Worth fixing for future analysis precision.
- "Strategy change" is #2 and could mean Scandit OR customer strategy. Worth unpacking.
- "Competitor win" is only 6% of losses (261), and "Price too high" 4% (188). The narrative that Scandit loses on competition or price is not borne out — they lose on **buyer-side process failures** (timing, strategy, going dark).

**Top competitors on lost deals** (`Primary_Competitor__c`):

| Competitor | Count | Lost Value |
|---|---:|---:|
| (none) | 3,286 | $47,293,819 |
| Only Considering Scandit | 256 | $5,477,226 |
| Competitor is Unknown | 235 | $9,229,268 |
| Zebra Hardware | 130 | $6,582,469 |
| Unknown / Other Software | 83 | $9,370,107 |
| Google ML Kit | 52 | $3,368,457 |
| Scanbot Software | 37 | $1,616,735 |
| Honeywell Hardware | 33 | $1,642,808 |
| Dynamsoft Software | 32 | $1,134,315 |
| Native iOS | 32 | $1,263,512 |
| ZXing | 29 | $1,830,828 |

**Read:**
- 33% of lost deals have no competitor recorded — major hygiene gap.
- **Real top threats:**
  - **Free / default tooling**: Google ML Kit (52), Native iOS (32), ZXing (29). 113 deals lost to "use what's already there."
  - **Hardware incumbents**: Zebra (130), Honeywell (33). 163 deals lost to dedicated hardware.
  - **Direct software competitors**: Scanbot (37), Dynamsoft (32), CodeCorp (27 combined). 96 deals to peers.
  - **"Only Considering Scandit"** (256) — these are losses where Scandit was sole-sourced. Pricing, timing, or champion failure, not competition.

ICP implication: in developer-heavy / tech-savvy segments, free tooling beats Scandit on 113 deals. The ICP should explicitly avoid segments where "build it ourselves with ML Kit" is the default choice — or invest in the developer story differently.

---

## 8. Domain Normalization Audit

Pre-Clay hygiene check on `Account.Website`.

- **41,442 of 48,245 accounts** (86%) have a Website populated.
- 6,803 accounts (14%) have no Website at all — Clay will need name-to-domain lookup for these.

**Format inconsistencies:**

| Issue | Count | % of populated |
|---|---:|---:|
| `www.` prefix | 18,922 | 45.7% |
| `https://` prefix | 7,599 | 18.3% |
| `http://` prefix | 2,044 | 4.9% |
| Trailing slash | 7,046 | 17.0% |
| Path beyond root (e.g. `/about`) | 3,098 | 7.5% |

**Duplicate domains after normalization:**
- Unique normalized domains: 37,871
- Domains with duplicates: 2,137
- Extra duplicate records: **3,571** (~7% of populated accounts)

**Junk placeholders in top dupes:**
- `unk` x197
- (empty string) x52
- `yelp.com` x77
- `en.wikipedia.org` x42
- `unknown` x39

**Read:** Standard pre-Clay normalization needed. The 3,571 duplicates aren't catastrophic but should be flagged before any enrichment push. The junk placeholders (>400 records) should be wiped and treated as null before Clay match. Estimated cleanup: 4-8 hours.

---

## Recommendations for Next ICP Data Review

1. **Build three product-specific ICPs.** Aggregate Scandit-wide ICP hides the Shelfview/ID Scanning concentration. Each product gets its own Vertical × Size × Geo cut.
2. **Lead Vertical priority:** Technology, Manufacturing, Healthcare (Hospitals), Field Services. Highest win rate + meaningful volume.
3. **Treat Retail as two segments:** Mass Merchant / Enterprise Retail = whale-hunting (low win rate, large ACV) vs. mid-market Retail (Grocery, Fashion, DIY) where Shelfview wins.
4. **Sub-1K employee, sub-$100M revenue is the sweet spot.** Win rate ≥63%. Push back on stakeholder instinct that ICP should be enterprise.
5. **Drop existing scoring fields from fit-score inputs.** Build new fit score from Vertical / Sub-Vertical / Size / Geo correlation patterns identified here.
6. **Investigate Japan + India before expanding.** 23-33% win rates suggest fundamental wrong-fit or go-to-market issues, not just sales execution.
7. **Geographic T1 weight:** US (volume), Switzerland + DACH + Nordics (high win rate).
8. **Loss-reason hygiene fix:** "Unknown (go dark)" at 32% of losses obscures real loss patterns. Worth a stage-exit-criteria conversation with Scandit RevOps.
9. **Domain cleanup before Clay push:** 3,571 dupes + ~400 junk placeholders. 4-8 hours of normalization work.

---

## Follow-Ups (Not Done in V1)

- [ ] Re-run sales cycle filtered to `Type LIKE 'New Business%'` to isolate true new-biz cycle from annual renewals
- [ ] Re-run headcount/revenue band dollar figures using `Converted_Amount__c` for currency-safe values
- [ ] Pull Account `Industry` field (separate from `Vertical__c`) and compare — Scandit may have two parallel classifications
- [ ] Cross-reference loss reasons by Vertical to surface vertical-specific loss patterns
- [ ] Pull Sub-Vertical × Product cut to surface which sub-verticals buy Shelfview vs ID Scanning

---

*Generated 2026-05-15 from Scandit Salesforce via read-only `sf` CLI queries. Raw query outputs are stored alongside this doc in `/SF Correlation Analysis/`.*
