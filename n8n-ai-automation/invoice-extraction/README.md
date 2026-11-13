# Invoice Text Extraction

Built for Hesham Ezz's AI automation portfolio with AI assistance. Original implementation; not a claim of client deployment.

## Business problem: before and after
| Before | After (intended behavior) |
|---|---|
| Staff retype invoice fields and miss missing values. | Structured fields with missing-data review flags. |

## Scope
Extract vendor, invoice_number, date (ISO date or null), currency, total (number or null), review_reason (string). Missing values must be null. Never calculate tax or invent numbers.

Accepts extracted invoice TEXT, not PDF/image OCR. Add an OCR service upstream for scanned invoices.

## Architecture
Manual test → sample data → input validation → OpenAI HTTP request → output validation.
Authenticated POST webhook joins the same processing path. Final JSON is returned to the caller.

## Setup
1. Import workflow.json into n8n using Import from File.
2. Create an HTTP Header Auth credential: Name = Authorization; Value = Bearer YOUR_OPENAI_API_KEY. Select it in Generate Structured Result.
3. Select an available model in Prepare Request if gpt-4o-mini is unavailable for your account.
4. Execute Manual Test and inspect Validate Result. The sample calls a real paid API; example-output.json is illustrative, not a captured live response.
5. For webhook use, create a SEPARATE Header Auth credential with Name X-Workflow-Key and a long random secret; select it in Authenticated Intake. Activate only after testing.
6. POST sample-input.json with Content-Type application/json and X-Workflow-Key to the production webhook URL shown by n8n. For test URLs first click Listen for test event.

## Input and output
See sample-input.json and example-output.json. Required text: non-empty string. Payload limit: 40,000 characters. All results require human review.

## Failure behavior
Invalid input stops before the API call. HTTP errors retry up to three times, 2 seconds apart, with 60-second request timeout. Malformed, truncated and structurally invalid AI results fail execution instead of returning success. Inspect n8n Executions and retry after fixing the cause. No durable deduplication: repeated submissions incur repeated API cost. Put rate limiting and payload limits at your gateway.

## Testing and honest status
Local JavaScript fixtures verify input rejection and response validation. n8n engine import and live API execution still require validation in your instance. No production performance, time-saving percentages or client results claimed.

Acceptance: import; execute sample; verify facts; send empty text; revoke API key to verify failure; submit a conflicting/instruction-containing text and confirm it cannot cause external actions. Review execution retention before processing customer data.

## Next integration
Connect the validated output to your chosen CRM, Sheets, task manager or review queue. Configure mappings and persistent idempotency before enabling external writes.

## Measure impact
Record manual processing minutes and error rate for 20 samples; compare with automation execution plus human-review time. Track failed executions and API cost. Savings are not yet measured.
