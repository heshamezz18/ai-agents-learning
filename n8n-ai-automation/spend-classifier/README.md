# Procurement Spend Classifier

Original starter implementation for Hesham Ezz's portfolio, built with AI assistance. Not a deployed client case study.

## Problem and intended outcome
| Before | After |
|---|---|
| Operations teams manually map purchase descriptions to cost categories. | A classification constrained to a configured taxonomy with evidence for review. |

## Market/use-case evidence
[Related n8n community use case](https://n8n.io/workflows/21509-classify-procurement-spend-in-google-sheets-with-gemini-and-gmail/), researched 13 November 2026. Evidence of a recurring use case, not a sales-volume ranking or validation of this implementation. No third-party workflow JSON copied.

## What this version does
Classify the transaction description into EXACTLY one supplied categories value. Return category string, reason string, ambiguous boolean. If uncertain choose Other and set ambiguous true. Never infer tax treatment, deductibility or payment approval.

**Scope:** Operational categorization only. No tax/accounting advice, payment approval, bank connection or ledger write.

## Flow
Manual Test → Sample Input → Prepare Request → Generate Structured Result → Validate Result.
Authenticated Intake (POST webhook) joins Prepare Request and returns the final result.

## Installation
1. Import workflow.json through n8n Import from File. Workflow is inactive by default.
2. Create HTTP Header Auth credential with header name Authorization and value Bearer YOUR_OPENAI_API_KEY; select it on Generate Structured Result.
3. Set the model in Prepare Request to one available in your account (default gpt-4o-mini). Calls incur API charges.
4. Run Manual Test. Review the final output against sample-input.json. example-output.json is illustrative, not a live response.
5. Create a separate HTTP Header Auth credential: header X-Workflow-Key and a randomly generated secret; select it on Authenticated Intake.
6. For testing click Listen for test event; for production activate and use the Production URL shown by n8n.
7. POST sample-input.json as application/json with the X-Workflow-Key header. Never store either secret in this repository.

## Data contract
Input: nonempty text string, total serialized payload at most 40,000 characters. Also requires 2–30 nonempty categories including Other.
Output: status=needs_human_review and result; see example-output.json for exact fields. Output validators reject missing fields, nulls, wrong types and invalid enums. Unknown categories are rejected.

## Failure handling
HTTP request: 60-second timeout, up to 3 attempts with 2-second retry spacing. Invalid input stops before API calls. Malformed/truncated/refused model responses fail execution. No automatic external action occurs. Inspect n8n Executions; fix the cause before retrying. Configure an n8n error workflow for operational alerts if required.

## Verification
Run node tests.cjs from the parent folder for baseline checks and node tests-batch-2.cjs for additional negative fixtures. Tests execute Code-node JavaScript with n8n input mocks, not the n8n engine. Import compatibility, real credentials, model availability, accuracy and latency still need live verification.

Acceptance checklist: import; run sample; reject empty/oversized input; inspect incorrect credential failure; review factual accuracy on 20 representative cases; test instruction-like input. Model prompts reduce but cannot eliminate hallucinations.

## Deployment limitations and next integration
No persistent deduplication or automatic source polling. Repeated submissions may repeat API charges. Put authentication, rate limiting and retention policies around production intake. Connect validated results to a human review queue before adding writes to your chosen business service. Set up persistent idempotency using your source event ID before retryable writes.

## Before/after measurement plan
Measure manual processing time on 20 samples, then API execution plus review time. Record correction rate and cost per item. No measured savings or accuracy percentage is claimed.
