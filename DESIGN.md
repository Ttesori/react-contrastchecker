# ContrastFix Design Guide

> Lightweight visual and interaction reference for the ContrastFix frontend.
> This document records settled design decisions so implementation can stay consistent without treating the Figma mockups as pixel-perfect specifications.

## 1. Design goals

ContrastFix should feel:

- Calm, clear, and professional
- Helpful rather than technical or intimidating
- Visually restrained so the user's colors remain the main focus
- Polished without feeling over-designed
- Accessible by default

The interface should act like a neutral workbench. ContrastFix provides the structure and guidance; the user's colors provide most of the visual energy.

## 2. Typography

Google Fonts only.

### Font families

**Lora**
- Brand name / wordmark
- Main page and result headings
- Section headings
- Large primary action labels, such as `Check Contrast` and `Check Another Pair`

**Lato**
- Body copy
- Inputs
- Utility labels
- Technical details
- Captions
- Helper text
- Small UI text
- Compact utility/action buttons, such as `Copy Suggested Color`

### Weight guidance

**Lora**
- 600–700 for headings and buttons

**Lato**
- 400 for body copy
- 700 for supporting emphasis
- 900 for small utility headings or controls when stronger emphasis is needed

Avoid very light font weights.

### Type hierarchy

Exact sizes can be tuned in-browser. Preserve the hierarchy rather than matching Figma pixel-for-pixel.

- Brand: largest serif display treatment
- Result/page headline: prominent Lora heading
- Section heading: smaller Lora heading
- Utility heading: small uppercase Lato, e.g. `CONTRAST DETAILS`, `UPDATED PAIRING`
- Body: Lato, comfortable reading size and line-height
- Inputs: minimum 16px
- Technical/caption text: smaller than body but still comfortably readable

## 3. Core color palette

### Page background

The app sits on a dark storm-blue background.

```css
--background-top: #203040;
--background-bottom: #18232F;
```

A subtle blue glow may be layered into the background:

```css
--background-glow: rgba(93, 124, 156, 0.28);
```

The glow should remain subtle. It adds depth, not a visible decorative effect.

### Primary surfaces

```css
--surface-primary: #F4F6F8;
--surface-secondary: #FAFBFC;
--surface-input: #FFFFFF;
```

### Accent

```css
--accent-primary: #314356;
--brand-on-dark: #EEF4F7;
```

`--accent-primary` is used for:
- Primary buttons
- Numbered step circles
- Strong interface emphasis
- Selected dark UI details

### Text

```css
--text-primary: #1F2932;
--text-section: #24303B;
--text-body: #425464;
--text-muted: #697786;
```

### Borders and dividers

```css
--border-default: #D7DEE5;
```

Borders should be thin and quiet. Avoid adding boxes unless they improve grouping or hierarchy.

## 4. Semantic color

Semantic color should be used sparingly.

### Warning / mixed result

Use a muted amber for the warning icon on the "So close" result.

Current direction:

```css
--status-warning: #B9985A;
```

The exact amber can be tuned slightly during implementation, but it should remain muted and compatible with the storm-blue palette.

Do not apply amber to the entire result heading.

### Success

Success does not need a bright green treatment. A dark neutral / storm-blue checkmark is acceptable unless testing shows a dedicated success color would improve clarity.

Status must never rely on color alone. Icons and text communicate meaning.

## 5. Supporting information panel

The three explanatory questions on the home screen sit **outside** the light tool card and remain visually secondary against the dark background.

```css
--info-panel-bg: rgba(31, 43, 55, 0.72);
--info-panel-border: rgba(219, 229, 237, 0.13);
--info-heading: #E7EEF4;
--info-text: #B7C4CF;
```

This panel may be wider than the main light tool card.

That width difference is intentional:

- Main card = focused task
- Supporting panel = secondary explanation

## 6. Layout

### General

- Center the primary experience within the viewport.
- Use generous dark background around the light content area.
- Do not force the home screen and results screen to use identical content widths.
- Prefer content-driven widths over filling available space.

### Home screen

The home screen uses:

1. Compact light primary card
2. Brand / title
3. Intro sentence
4. Two color swatches and text inputs
5. Primary `Check Contrast` button
6. Wider muted supporting information panel below

The main card should be narrower than the supporting information panel.

### Results screen

The results screen uses one larger light panel because it contains substantially more information.

Result hierarchy:

1. Status / result summary
2. Step 1: current result
3. Step 2: recommended fix
4. Step 3: alternate combinations
5. `Check Another Pair`

Horizontal dividers separate major sections.

## 7. Result status treatment

The result summary at the top should stand out from the rest of the page without becoming visually loud.

For the "So close" state:

- Subtle outlined container
- Muted amber warning icon
- Lora headline
- Important phrase may use stronger weight
- Supporting result text remains dark neutral

This is a status message, not an error alert.

## 8. Numbered steps

Steps 1–3 use dark filled circles:

```css
background: #314356;
color: #FFFFFF;
```

They should remain visually understated enough that they do not look like interactive wizard controls.

The circles are structural markers, not buttons.

## 9. Color pair previews

User colors should be the strongest visual colors on the page.

### Labels

- Use `Color 1` and `Color 2`
- In result previews, use title case rather than all caps so these labels do not compete with utility headings
- Utility headings such as `CONTRAST DETAILS` and `UPDATED PAIRING` may remain uppercase

### Text on user colors

Text displayed directly on arbitrary colors must remain readable.

Implementation should determine appropriate foreground text dynamically or provide a neutral backing treatment when needed.

Do not assume white text works on every user-entered color.

## 10. Primary recommendation area

Step 2 is the visual payoff and should receive the strongest emphasis after the result summary.

Structure:

- Left: original color → suggested color
- Right: updated pairing
- Subtle divider between them on desktop
- Updated pairing receives more visual space than the original/suggested swatches
- Copy action stays tightly associated with the suggested color
- Success statement appears directly beneath the updated pairing

The updated pairing may use a quiet outlined container.

## 11. Contrast details

Contrast details are technical information and should remain secondary to the plain-language explanation.

Include:

- Contrast ratio
- Regular text result
- Large text result
- UI element result

Keep the card compact but readable.

Use text and symbols for pass/fail; never use color alone.

## 12. Alternate combinations

Alternate accessible combinations should:

- Use simple equal-weight cards
- Show the pairing visually
- Include color values
- Use a short label beneath the preview

These are alternatives, not competing primary recommendations.

## 13. Buttons

Primary buttons use:

```css
background: #314356;
color: #FFFFFF;
```

Current visual direction:
- Medium radius
- Strong but not oversized
- Large primary actions such as `Check Contrast` and `Check Another Pair` use Lora
- Smaller utility actions such as `Copy Suggested Color` use Lato, typically with a stronger weight
- Clear hover and focus states in implementation

Copy buttons may include a copy icon.

Do not communicate state changes through color alone. After copying, provide a text confirmation such as `Copied #86509F` and announce it through an appropriate live region.

## 14. Borders and radius

Use a small set of radii rather than arbitrary values.

General direction:

- Main light panels: large radius
- Supporting info panel: medium-large radius
- Inner result/detail cards: medium radius
- Inputs/buttons: smaller radius
- Swatches: small-to-medium radius

Borders are generally `1px` using the default border color.

Avoid excessive nesting of bordered boxes.

## 15. Responsive behavior

Desktop mockups establish hierarchy, not fixed dimensions.

### Home

On smaller screens:
- Stack Color 1 and Color 2 vertically
- Primary button may become full width
- Supporting three-column panel becomes a vertical list
- Maintain comfortable side padding

### Results

On smaller screens:
- Step 1 pair preview and contrast details stack
- Step 2 becomes sequential:
  1. original → suggested
  2. updated pairing
- Original and suggested swatches may remain side-by-side when space allows
- Alternate combinations stack vertically
- `Check Another Pair` may become full width

Do not shrink text excessively to preserve desktop composition.

## 16. Accessibility requirements

- Semantic HTML first; use ARIA only when needed
- All interactive controls must be keyboard accessible
- Provide visible focus styles
- Inputs should use at least 16px text
- Do not rely on color alone for status
- Ensure text on arbitrary user colors meets readable contrast or uses an alternate presentation
- Support browser zoom and text resizing without clipping or loss of content
- Maintain logical heading order
- Error messages should be associated with their fields
- Copy confirmation should be announced to assistive technology
- Honor reduced-motion preferences if motion is added later

## 17. Design references

The latest Figma mockups establish the intended visual direction for:

- Home / initial input state
- Full-pass result
- Nearby full-fix result ("So close")
- Partial improvement result
- Larger adjustment result

The mockups are references for hierarchy and visual language, not exact pixel specifications.

Spacing, wrapping, dimensions, and type sizes should be refined in-browser during implementation.

## 18. Implementation principle

Do not add decoration simply to fill space.

When making implementation decisions, prefer:

1. Clarity
2. Accessibility
3. Consistency
4. User colors as the focal point
5. Simplicity

If implementation reveals a genuine usability problem, update the design. Otherwise, avoid reopening settled visual decisions for minor pixel-level differences.
