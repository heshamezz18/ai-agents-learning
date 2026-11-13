# n8n AI Automation Portfolio — Hesham Ezz

Six original, configurable AI workflow projects with authenticated webhook intake, manual samples, API retries and output checks. **Starter implementations; not production-certified or live-tested.**

- [AI Lead Qualification](lead-qualification/README.md) — Validated lead scoring and a review-ready follow-up draft.
- [Invoice Text Extraction](invoice-extraction/README.md) — Structured fields with missing-data review flags.
- [AI Support Triage](support-triage/README.md) — Priority, department and a suggested reply ready for agent review.
- [Meeting Action Extractor](meeting-actions/README.md) — Structured summary and action list for review.
- [Content Repurposing Studio](content-repurposing/README.md) — LinkedIn, short posts and newsletter drafts from a single source.
- [Grounded Knowledge Answers](knowledge-answers/README.md) — Evidence-linked answers or an explicit insufficient-evidence result.

## Research rationale
Selected for recurring business needs, not a statistically verified popularity ranking. Research checked 13 November 2026.

- Demand for lead/CRM automation: https://www.upwork.com/freelance-jobs/n8n/
- Lead qualification example: https://n8n.io/workflows/9739-qualify-and-route-leads-across-channels-with-gpt-4o-slack-and-crm-integration/
- Invoice processing: https://n8n.io/workflows/3396-parse-incoming-invoices-from-outlook-using-ai-document-understanding/
- Support triage: https://n8n.io/workflows/18904-triage-and-route-support-tickets-with-gemini-jira-slack-and-gmail/
- Meeting actions: https://n8n.io/workflows/2328-actioning-your-meeting-next-steps-using-transcripts-and-ai/
- Content repurposing: https://community.n8n.io/t/automated-multi-channel-content-repurposing-workflow-ai-native/259937
- Knowledge base: https://n8n.io/workflows/6538-company-knowledge-base-agent-rag/

Examples establish use cases, not proof that these implementations have run in production. No third-party template JSON copied. Credentials must be created in n8n and are not included.

Run local fixture checks with `node tests.cjs`. These do not replace importing into your installed n8n version and running live acceptance tests.
