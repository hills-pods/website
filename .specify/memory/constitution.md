<!--
SYNC IMPACT REPORT
==================
Version change: [TEMPLATE/unversioned] → 1.0.0
Rationale: Initial ratification of the project constitution. MAJOR baseline (1.0.0)
           established from the template; all placeholder tokens resolved.

Modified principles: N/A (initial adoption)
Added principles:
  - I. Code Quality
  - II. Testing Standards (NON-NEGOTIABLE)
  - III. User Experience Consistency
  - IV. Performance Requirements
Added sections:
  - Quality Gates & Tooling Standards
  - Development Workflow & Review Process
  - Governance
Removed sections: None

Templates requiring updates:
  - .specify/templates/plan-template.md ✅ compatible (Constitution Check is generic;
    gates derive dynamically from this file — no edit required)
  - .specify/templates/spec-template.md ✅ compatible (no constitution-specific coupling)
  - .specify/templates/tasks-template.md ✅ compatible (task categories already cover
    testing, UX, and performance work)

Deferred TODOs: None
-->

# Mandra Hills Website Constitution

## Core Principles

### I. Code Quality

Code MUST be readable, consistent, and maintainable before it is merged.

- All code MUST pass the project linter and formatter with zero errors and zero
  warnings; formatting is automated and not subject to manual debate.
- Every module, component, and public function MUST have a single, clearly named
  responsibility. Functions exceeding ~50 lines or files exceeding ~400 lines MUST
  be justified in review or refactored.
- No dead code, commented-out blocks, or `TODO` without an associated tracked issue
  may be merged.
- Dependencies MUST be justified: prefer the standard library and existing project
  dependencies over adding new packages. Each new dependency requires reviewer sign-off.
- Code MUST be reviewed by at least one person other than the author before merge.

**Rationale**: A website is a living artifact maintained over years by changing
contributors. Consistency and small, single-purpose units keep the cost of every
future change low and make defects easier to locate.

### II. Testing Standards (NON-NEGOTIABLE)

Tests are written to define and protect behavior, not as an afterthought.

- Every bug fix MUST add a regression test that fails before the fix and passes after.
- Every new feature MUST ship with automated tests covering its primary success path
  and its known failure/edge cases.
- Pull requests MUST NOT be merged while any test is failing or skipped without a
  documented, time-boxed reason.
- The test suite MUST run in CI on every pull request and MUST be green before merge.
- Tests MUST be deterministic: no reliance on wall-clock timing, network flakiness,
  or test execution order. Flaky tests MUST be fixed or quarantined immediately.

**Rationale**: Untested code is unverified code. Deterministic, enforced tests are
the only scalable way to change a website confidently without re-checking everything
by hand.

### III. User Experience Consistency

The site MUST feel like one product, not a collection of pages.

- All UI MUST use the shared design system: defined tokens for color, typography,
  spacing, and components. Ad-hoc one-off styles MUST NOT be introduced.
- Interaction patterns (navigation, forms, error messages, loading and empty states)
  MUST be consistent across the site; a pattern solved once is reused, not reinvented.
- Every interactive interface MUST be responsive across the supported breakpoints and
  MUST meet WCAG 2.1 AA accessibility: keyboard navigability, sufficient contrast,
  meaningful alt text, and correct semantic markup.
- User-facing copy MUST follow a consistent voice and tone; errors MUST tell the user
  what happened and what to do next.

**Rationale**: Consistency is what makes an interface learnable and trustworthy.
Visitors transfer expectations from one page to the next, and accessibility ensures
the experience is consistent for every user, not just some.

### IV. Performance Requirements

Performance is a feature and MUST be treated as a budget, not an aspiration.

- Core Web Vitals targets (measured at the 75th percentile on representative
  hardware/network) MUST be met: Largest Contentful Paint ≤ 2.5s, Interaction to
  Next Paint ≤ 200ms, Cumulative Layout Shift ≤ 0.1.
- Each page MUST honor an asset budget. Changes that increase shipped JavaScript or
  total page weight beyond budget MUST be justified and approved in review.
- Images and media MUST be optimized (appropriate format, compression, and lazy
  loading); render-blocking resources MUST be minimized.
- Performance MUST be measured in CI or a recurring audit (e.g., Lighthouse); a
  regression past budget blocks release until resolved.

**Rationale**: Slow sites lose users and rank poorly. Enforcing measurable budgets at
review time prevents the gradual, unnoticed decay that quietly degrades every site.

## Quality Gates & Tooling Standards

The following gates MUST be automated and enforced in CI; they are not optional manual
steps:

- **Lint & format**: zero errors, zero warnings.
- **Tests**: full suite green; coverage MUST NOT decrease on a merge without justification.
- **Accessibility**: automated a11y checks on changed pages/components MUST pass.
- **Performance**: automated audit MUST confirm budgets and Core Web Vitals targets.
- **Build**: a clean production build MUST succeed.

A pull request that fails any gate MUST NOT be merged. Gates MAY be tightened over time
but MUST NOT be silently weakened.

## Development Workflow & Review Process

- All work MUST be done on a branch and merged via pull request; direct pushes to the
  main branch are prohibited.
- Each pull request MUST link to its specification or issue and MUST describe what
  changed and how it was verified.
- At least one reviewer other than the author MUST approve before merge. Reviewers are
  responsible for verifying compliance with all four core principles.
- Where a feature defines behavior, tests SHOULD be written before or alongside the
  implementation so the intended behavior is captured explicitly.
- Any deviation from a principle MUST be raised in the pull request and explicitly
  justified; unjustified deviations are grounds to block the merge.

## Governance

This constitution supersedes ad-hoc conventions and informal practices. When a conflict
arises between this document and another guideline, this document wins.

- **Amendments**: Changes are proposed via pull request, MUST document the rationale and
  any migration impact, and require approval before merge.
- **Versioning**: This constitution follows semantic versioning:
  - **MAJOR** — backward-incompatible governance changes, or removal/redefinition of a
    principle.
  - **MINOR** — a new principle or section is added, or guidance is materially expanded.
  - **PATCH** — clarifications, wording, and non-semantic refinements.
- **Compliance review**: Every pull request review MUST verify adherence to the core
  principles and quality gates. Recurring or systemic violations MUST be raised as an
  amendment proposal rather than tolerated as exceptions.
- **Runtime guidance**: Detailed, changeable engineering practices belong in supporting
  docs and templates (e.g., `.specify/templates/`), which MUST remain consistent with
  the principles defined here.

**Version**: 1.0.0 | **Ratified**: 2026-05-20 | **Last Amended**: 2026-05-20
