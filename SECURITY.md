# Security Policy

## Supported Versions

We currently provide security support for the following branch:

| Version/Branch | Supported |
| --- | --- |
| `main` | Yes |
| Other branches/tags | No |

## Reporting a Vulnerability

Please **do not** open public GitHub issues for security vulnerabilities.

Report security concerns through one of the private channels below:

1. GitHub Security Advisories (preferred):
   - `Security` tab -> `Report a vulnerability`
2. Email (fallback):
   - `security@outhsics.com`

If email is used, please include:

- Affected component/file
- Reproduction steps (minimal PoC)
- Impact assessment (confidentiality/integrity/availability)
- Suggested mitigation (if available)
- Your contact info for follow-up

## Response SLA

We aim to follow this timeline:

- Initial acknowledgment: within **72 hours**
- Triage and severity assignment: within **7 business days**
- Fix plan or mitigation guidance: within **14 business days**
- Public disclosure: after patch availability and coordinated disclosure window

Timelines are targets, not guarantees, and may vary with report quality and operational constraints.

## Scope

In scope:

- Scripts under `skills/ai-skills-control/scripts/`
- Installation behavior in `install.sh`
- Local web control service (`skills_web_control_server.mjs`)
- Command allowlisting, local execution flow, and path handling

Out of scope:

- Vulnerabilities in third-party tools (`node`, `npx`, `skills`, OS shell)
- Local machine compromise unrelated to this repository
- Denial-of-service from fully trusted local users on the same host

## Security Best Practices for Operators

- Run the web control API only on trusted local machines.
- Keep default bind address as `127.0.0.1`.
- Do not expose the control API to public networks.
- Review script changes before pulling updates into production workflows.
- Use least-privilege local accounts for automation.

## Coordinated Disclosure

We support responsible disclosure and will coordinate publication timing with reporters when possible.

We will credit reporters in release notes/advisories unless anonymity is requested.

## Safe Harbor

If you make a good-faith effort to avoid privacy violations, data destruction, and service disruption, we will treat your research as authorized under this policy.
