# AGENTS.md

## Purpose

This repository is being built as a small, deliberate portfolio project.

AI assistance is welcome, but the goal is **not** to have an agent build the frontend autonomously. The human developer owns the architecture, product decisions, accessibility decisions, and final code review.

Work should proceed in small, understandable steps so the developer can refresh and deepen her React knowledge while using AI as bounded engineering support.

---

## 1. Read before changing code

Before making frontend changes:

1. Read `DESIGN.md`.
2. Inspect the existing project structure and relevant files.
3. Understand the existing core/domain logic before connecting UI code to it.
4. Follow existing project conventions unless the task explicitly asks to change them.

If `README.md`, project requirements, decision logs, or issue descriptions are present and relevant, read those as well.

Do not invent a new architecture before understanding the existing one.

---

## 2. Human / agent responsibilities

### The human developer owns

- Product behavior
- UX decisions
- Component boundaries and architecture
- State ownership
- Data flow
- Accessibility decisions
- Responsive behavior
- Whether a dependency should be added
- Whether a refactor is worthwhile
- Final review and approval of every change

### The agent may help with

- Bounded React implementation
- JSX and CSS based on an approved design
- Repetitive presentational components
- Test scaffolding
- Debugging
- Accessibility review
- Code review
- Small, explicitly requested refactors
- Documentation

The agent should behave like a collaborating engineer, not an autonomous product team.

---


## 3. Plan first; implementation requires approval

This project uses an explicit **plan → discuss → approve → implement → review** workflow.

The agent must **not start editing code immediately** when given a new implementation task.

For each task:

1. Restate the task in plain language.
2. Inspect only the files needed to understand the task.
3. Propose a small implementation plan.
4. Explain the relevant React / TypeScript / CSS concepts in straightforward language.
5. Identify any meaningful choices or tradeoffs.
6. Ask the developer to choose or approve the proposed approach.
7. **Wait for explicit approval before changing code.**
8. Implement only the approved scope.
9. Review the changed files with the developer before moving on.

Approval for one task does not authorize the next task.

### Meaningful decisions must not be made silently

Do not silently choose:

- Component architecture or boundaries
- Where state should live
- A React pattern or hook when multiple reasonable approaches exist
- A new dependency
- A styling approach
- A folder/repository reorganization
- A testing strategy
- A new abstraction
- A change to the core API
- A change to product behavior
- A different accessibility pattern

When one of these decisions comes up, explain the options briefly, give the tradeoffs, and let the developer choose.

For ordinary mechanical details inside an already approved plan, do not interrupt constantly. The goal is deliberate understanding, not approval for every line of code.

### Keep explanations concrete

Prefer explanations such as:

> `App` will own the current screen because both the input form and result view need access to that state. `ColorInput` will receive the current value and an `onChange` callback as props.

Avoid vague explanations such as:

> We will leverage a scalable state architecture and reusable component abstractions.

Use the simplest approach that solves the current problem.

---

## 4. Work in small tasks

Do **not** implement the entire frontend from a broad request.

Each task should be small enough to understand, review, test, and complete in one focused session when possible.

Examples of appropriately sized tasks:

- Add design tokens and global fonts
- Build the page shell
- Build one `ColorInput` component
- Add validation behavior for one input flow
- Build `PairPreview`
- Build `ContrastDetails`
- Build the "So close" result summary
- Add copy-to-clipboard behavior
- Add one responsive layout change
- Add tests for one component or behavior

If a requested task is too broad, propose a smaller breakdown before writing code.

Do not continue into the next task automatically after completing the current one.

---

## 5. File-by-file review is required

A task may require more than one file, but changes should remain tightly scoped.

Before editing:
- State which files you expect to touch.
- Briefly explain why each file is needed.

After editing:
- List every file changed.
- Explain what changed in each file.
- Call out any React pattern, API, or abstraction that may be unfamiliar.
- Explain how the files connect to each other.

The developer should be able to understand the role of every changed file before moving on.

---

## 6. Do not go rogue

Unless explicitly requested:

- Do not build additional screens or components.
- Do not perform unrelated cleanup.
- Do not rename files broadly.
- Do not reorganize folders.
- Do not refactor working code "while you are here."
- Do not add dependencies.
- Do not replace the styling approach.
- Do not introduce a state-management library.
- Do not change build tooling.
- Do not modify CI configuration.
- Do not modify the core contrast/fix algorithm.
- Do not rewrite existing domain logic inside React components.
- Do not add speculative abstractions for possible future features.

If you notice an unrelated problem, mention it separately instead of fixing it.

---

## 7. Protect the existing core logic

The contrast-checking and replacement-color logic was written separately from the React UI and should remain separate.

Frontend code should consume the existing core API rather than duplicating domain rules.

Do not:
- Reimplement WCAG contrast calculations in components
- Reimplement color parsing in components if existing parsing utilities already handle it
- Duplicate replacement-color logic
- Move domain logic into hooks solely for convenience
- Change algorithm behavior without an explicit task

If the current core API is awkward for the UI, describe the mismatch before changing it.

---

## 8. React / TypeScript approach

Prefer straightforward, modern React that is easy to read and maintain.


### Current frontend/tooling choices

Use the existing repository setup unless the developer explicitly approves a change:

- React 19
- TypeScript with strict mode
- Vite
- npm / `package-lock.json`
- Vitest
- ESLint
- Prettier
- Accessibility linting
- Plain CSS with CSS custom properties for design tokens

Current default direction:

- Use local React state first.
- Do not add routing unless a real navigation requirement appears.
- Do not add a component library.
- Do not add a state-management library.
- Do not add Tailwind or CSS-in-JS.
- Keep the existing `src/core` layer separate from React UI code.

React Testing Library may be considered later for meaningful UI interaction tests, but adding it requires an explicit discussion and approval first.

### General rules

- Use TypeScript.
- Keep types explicit at meaningful boundaries.
- Prefer functional components.
- Prefer local state unless there is a demonstrated need for broader state.
- Keep derived values derived rather than storing duplicate state.
- Avoid `useEffect` when the value can be calculated during render or handled directly in an event.
- Do not introduce `useMemo` or `useCallback` without a concrete reason.
- Do not create custom hooks merely to make the code look more abstract.
- Avoid deeply generic components.
- Prefer composition over complicated prop APIs.
- Keep component responsibilities clear.
- Do not prematurely optimize.

If using a React feature or pattern that may be unfamiliar or has changed in recent React versions, explain:
1. what it does,
2. why it is appropriate here,
3. what the simpler alternative would be.

The goal is not merely working code; the developer should understand the code.

---

## 9. Component boundaries

Create a component when it represents:

- A meaningful UI concept
- A repeated pattern
- A unit with its own behavior
- A boundary that improves readability or testing

Do not split trivial markup into tiny components solely to increase component count.

Likely UI concepts include, but are not limited to:

- `ColorInput`
- `PairPreview`
- `ContrastDetails`
- `ResultSummary`
- `FixSuggestion`
- `PairingOption`

These are examples, not mandatory architecture. Confirm boundaries from the current task and existing code.

---

## 10. Styling

Follow `DESIGN.md`.

The Figma designs establish:
- Visual hierarchy
- Palette
- Typography roles
- Component relationships
- Responsive intent

They are **not** pixel-perfect implementation requirements.

Refine spacing, wrapping, and exact dimensions in the browser.

### Styling rules

- Reuse design tokens instead of scattering literal colors.
- Keep the user's colors visually dominant.
- Keep borders and containers restrained.
- Do not add decorative gradients, shadows, boxes, or accent colors that are not part of the approved design.
- Use the existing styling strategy in the repository.
- Do not introduce Tailwind, CSS-in-JS, a component library, or another styling system without approval.

---

## 11. Accessibility

Accessibility is a core product requirement, not a cleanup pass.

Use semantic HTML first.

### Required practices

- Use real buttons for actions.
- Use labels for form controls.
- All controls must be keyboard operable.
- Provide visible focus indicators.
- Maintain logical heading structure.
- Do not rely on color alone to communicate pass/fail/status.
- Associate validation errors with the relevant input.
- Use appropriate live-region behavior for temporary copy confirmations.
- Ensure arbitrary user-entered colors do not make overlaid text unreadable.
- Preserve usability when zoomed or when text size increases.
- Respect reduced-motion preferences if animation is added.
- Test responsive behavior at narrow mobile widths (including ~320px).

Avoid adding ARIA where native HTML already provides the correct semantics.

---

## 12. Input and result behavior

Preserve the agreed product behavior unless the task explicitly changes it.

### Input stage

- Two colors
- No foreground/background role
- Accept supported HEX, RGB, and HSL input through the existing parsing logic
- Live swatch updates only when input is valid
- Incomplete text while focused should not immediately produce an error
- Invalid/incomplete input should show an inline error after blur
- Preserve the user's text rather than silently correcting invalid input
- Checking contrast is an explicit action
- Do not auto-submit

### Result stage

- Results replace the input-focused state
- Results persist until reset
- `Check Another Pair` returns to the initial state
- Do not add an in-place edit flow unless explicitly requested
- Suggested colors are outputs, not editable inputs
- Copying a suggested color does not rerun the contrast check

---

## 13. Testing and verification

For each implementation task, run the relevant checks available in the project.

At minimum, consider:

- TypeScript/type check
- Lint
- Unit/component tests where applicable
- Browser behavior
- Keyboard interaction
- Responsive layout
- Accessible names / form labeling
- Focus visibility

Do not claim a check passed unless it was actually run.

If a check cannot be run, state that clearly.

When generated values such as contrast ratios are displayed in test fixtures or examples, ensure they are mathematically consistent with the colors being shown.

---

## 14. Dependencies

Do not install a package without approval.

If a dependency might help:

1. Explain what problem it solves.
2. Explain whether the platform or existing dependencies can solve the problem already.
3. Give the tradeoff.
4. Wait for approval before adding it.

Prefer the browser and React platform over adding a library for small tasks.

---

## 15. Git / scope discipline

Keep diffs easy to review.

- One issue/task should map to one coherent change.
- Avoid mixing feature work with cleanup.
- Do not modify unrelated files.
- Do not commit, merge, or push unless explicitly asked.
- Do not change branch strategy or CI configuration unless explicitly asked.

A reviewer should be able to understand why every changed line belongs to the current task.

---

## 16. How to respond when implementing

For an implementation request, use this sequence:

### Before coding

Briefly state:

- What you understand the task to be
- Which files you expect to inspect
- Which files you expect to change
- The proposed approach
- The React / TypeScript / CSS concepts involved
- Any meaningful alternatives and their tradeoffs
- The specific decision or approval needed from the developer

Then **stop and wait for explicit approval**.

Do not edit files in the same response that proposes the plan unless the developer has already explicitly approved that exact plan.

### After coding

Report:

- Files changed
- What each change does
- Any noteworthy React/TypeScript concept used
- Tests/checks run and their result
- Anything the developer should manually inspect in the browser

Then stop.

Do not continue into the next feature without a new request.

---

## 17. Learning-oriented collaboration

This project is intentionally being used to refresh React knowledge.

When writing code:

- Favor clarity over cleverness.
- Explain unfamiliar modern React patterns.
- Point out meaningful changes from older React approaches when relevant.
- Do not hide complexity behind abstractions the developer has not reviewed.
- If there are two reasonable approaches, briefly compare them before choosing when the tradeoff is meaningful.
- The developer should be able to explain the final code in an interview or code review.

AI is allowed to accelerate implementation.

AI is not allowed to replace understanding.

---


## 18. Learning checkpoints

This project is intentionally being used to refresh React knowledge. The agent should create opportunities for active learning rather than turning every task into passive review.

### Ask for the developer's first instinct when useful

When a task involves a meaningful React or architecture decision and there are multiple reasonable approaches, ask the developer how she would approach it **before** presenting the recommendation.

Examples:

- Where should this state live?
- Should this be one component or two?
- Should this value be stored in state or derived?
- Should this behavior live in a component, helper, or hook?
- How should this form submit and transition to results?

Do not turn every small implementation detail into a quiz. Use this only for decisions that help build understanding.

After the developer shares her approach:

1. Confirm what is sound about it.
2. Point out any important tradeoffs or problems.
3. Present alternatives if they are genuinely relevant.
4. Let the developer choose the final approach.

### Identify new React concepts before using them

If a task introduces a React concept or pattern that has not yet been used in the frontend, call it out **before implementation**.

Explain:

- What the concept is
- What problem it solves here
- Why it is being considered
- What the simpler or more traditional alternative would be, if one exists

Examples include:

- Controlled inputs
- Lifting state
- Derived state
- Conditional rendering
- Callback props
- Form submission patterns
- Context
- Custom hooks
- Newer React APIs

Do not introduce an unfamiliar abstraction silently.

### Prefer active practice for first occurrences

When practical, let the developer write or sketch the first instance of a meaningful React pattern herself before the agent generates repeated versions.

Good candidates include:

- The first controlled input
- The first form submission flow
- The first connection between UI state and the existing core logic
- The first meaningful component interaction test

After the first instance is understood, the agent may help accelerate repetition.

### Use teach-back when it adds value

After a meaningful implementation slice, the agent may invite the developer to explain the flow back in her own words.

If she does, correct misunderstandings concisely and confirm the accurate mental model.

Do not require teach-back after every task.

### Review diffs as part of learning

Encourage review of the actual diff, not only the final file.

When reviewing a completed task:

- Summarize the important changes
- Point out where state enters and leaves a component
- Explain how changed files connect
- Highlight any new React or TypeScript pattern
- Avoid drowning the review in line-by-line commentary unless asked

### Keep abstractions earned

Do not introduce a custom hook, helper, generic component, context, or other abstraction until there is a concrete problem it solves.

When proposing an abstraction, identify the duplication, complexity, or behavior that justifies it.

### Keep teaching out of production comments

Use the conversation to explain React concepts.

Do not fill source files with tutorial comments that would not belong in normal production code.

### Learning notes are optional and lightweight

At the end of a meaningful issue, the agent may suggest 1–3 short "what was new" notes if they would help reinforce learning.

Do not create a separate learning journal, architecture document, or documentation system unless explicitly requested.

---

## 19. Definition of done for a task

A task is complete when:

- The requested behavior or UI is implemented
- The diff remains within scope
- Relevant checks pass or failures are clearly reported
- Accessibility has been considered
- The developer has enough explanation to review the changed files
- No unrelated work has been added

Then stop and wait for the next task.
