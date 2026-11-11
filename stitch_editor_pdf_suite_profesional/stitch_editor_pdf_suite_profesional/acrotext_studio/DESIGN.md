---
name: AcroText Studio
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c3c6d7'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#8d90a0'
  outline-variant: '#434655'
  surface-tint: '#b4c5ff'
  primary: '#b4c5ff'
  on-primary: '#002a78'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#0053db'
  secondary: '#d2bbff'
  on-secondary: '#3f008e'
  secondary-container: '#6001d1'
  on-secondary-container: '#c9aeff'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#996100'
  on-tertiary-container: '#ffeedd'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#5a00c6'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
  caption:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-tablet: 1rem
  margin: 1rem
  margin-tablet: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system targets mobile knowledge workers, legal professionals, enterprise editors, and technical reviewers demanding desktop-grade document authoring on tactile touchscreens. The identity balances the clinical precision of desktop desktop suites with tactile, contemporary mobile ergonomics.

The visual direction combines **Modern Corporate Precision** with **Controlled Glassmorphic Tactility**. It rejects consumer toy-like aesthetics, flat neo-brutalism, and loud novelty in favor of razor-sharp hierarchy, muted slate substrates, micro-milled vector interfaces, and restrained depth. 

Emotional objectives:
- **Authority & Trust**: Evoking the permanence and compliance expected of certified PDF and contract workflows.
- **Micro-Mechanical Precision**: Instant feedback loops through refined micro-states, sub-pixel outlines, and predictable tool placement.
- **Distraction-Free Focus**: Canvas-first real estate with secondary controls receding behind balanced graphite surfaces.

## Colors

The palette is engineered around high-density technical reading and document manipulation under varying ambient lighting conditions. The default posture is dark mode ("Graphite Canvas"), minimizing OLED battery drain and visual fatigue during multi-page audits.

- **Primary (`#2563eb` / `#1e40af`)**: Deep Indigo & High-Fidelity Cobalt. Reserved strictly for primary callouts, active editing states, text selection pins, vector anchor handles, and confirming modal actions.
- **Secondary (`#7c3aed`)**: Electric Violet. Used exclusively for smart generative document transformations, structural node rewrites, optical character recognition (OCR) triggers, and automated signature validation.
- **Tertiary (`#f59e0b`)**: Amber Ochre. Applied sparingly to non-blocking alerts, annotation flags, tracked-change pending states, and digital certificate validation notices.
- **Neutral Core (`#0f172a`, `#1e293b`, `#334155`)**: Deep Charcoal, Obsidian, and Tempered Slate. These compose the structural tiers, docked bottom-bars, contextual tool strips, and canvas surroundings.
- **Document Paper Mode**: While the chrome stays dark, the active PDF canvas renders in authentic neutral-warm white (`#ffffff` / `#f8fafc`) with a hardware-calibrated toggle for inverted reading mode (`#111827`).

## Typography

The type scale combines **Plus Jakarta Sans** for structural chrome headings and modal sheet titles with **Inter** for core functional labels, dense telemetry panels, and native form elements.

Rules for typographic hygiene:
- Prohibit emojis across all application states, empty states, and system notifications. All graphic accents must be single-path geometric SVG icons.
- Numerical readouts (page numbers, zoom percentage, coordinate inspectors, file sizes) must use tabular lining figures (`font-variant-numeric: tabular-nums`).
- Document body rendering must preserve the embedded PDF typography without forcing device UI fonts onto the document stream.

## Layout & Spacing

The layout uses a **fluid viewport containment model** tuned for high single-thumb ergonomics and expansive split-screen workflows.

- **Mobile Viewport (< 600px)**: The canvas occupies 100% width with floating, decoupled tool ribbons pinned above the thumb-zone. Margins sit firmly at `1rem` (16px) with an intrinsic safe-area top and bottom offset.
- **Tablet / Foldable (600px - 1024px)**: Grid shifts to an adaptive split screen: page outline / bookmark tree occupies a left collateral drawer (280px fixed width), while the main viewport hosts the live document with a centered `1.5rem` canvas margin.
- **Touch-Target Minimum**: Interactive targets maintain a minimum active boundary of `44x44px`, even when visual icons render inside a compact `20x20px` or `24x24px` footprint.
- **Tool Ribbons**: Contextual format ribbons utilize horizontal continuous inertia scrolling, snap-aligned to `48px` cell increments with transparent gradient masking at boundary edges.

## Elevation & Depth

Visual hierarchy rejects exaggerated drop shadows in favor of **Tonal Layering**, **High-Efficiency Sub-pixel Outlines**, and **Hardware-Accelerated Glassmorphism**.

- **Level 0 (Document Bed)**: `#090d16` (Deepest canvas backing). Completely matte.
- **Level 1 (Docked Bars & Navigation)**: `#0f172a` with a subtle top border: `1px solid rgba(255, 255, 255, 0.08)`.
- **Level 2 (Contextual Ribbons & Popovers)**: `#1e293b` with a hairline stroke: `1px solid rgba(255, 255, 255, 0.12)` and a soft shadow: `0 4px 16px -2px rgba(0, 0, 0, 0.4)`.
- **Level 3 (Bottom Sheets & Modals)**: Solid `#1e293b` infused with a frosted glass backdrop filter (`backdrop-blur: 24px`, over `rgba(15, 23, 42, 0.75)`). Sheet edge is crowned with a `1px` inner bevel highlight (`rgba(255, 255, 255, 0.15)`).
- **Floating Controls & Handles**: Pinned editing anchors, cursor loupes, and active node badges cast a focused micro-shadow: `0 2px 8px rgba(0, 0, 0, 0.5)`.

## Shapes

The design system enforces a disciplined **Rounded Level 2** geometry, balancing professional software solidity with soft physical comfort.

- Standard elements (inputs, action tiles, contextual menu cells) maintain `0.5rem` (8px) corner radii.
- Surface containers, bottom sheets, and modal frames use `1rem` (16px) top and corner radii.
- Badges, status markers, and text-selection node handles retain circular or pill geometry (`9999px`).
- Form elements, selection bounding boxes, and document margin rulers strictly utilize crisp `0px` inner angles to avoid distorting typographic baselines.

## Components

### Buttons & Quick Actions
- **Primary Action**: Solid `#2563eb` fill, pure white text, 8px radius. Active tap state triggers subtle haptic response with scale transition to `0.97` and a surface tint darkening to `#1d4ed8`.
- **Secondary / Icon Buttons**: Enclosed in transparent `#1e293b` backgrounds, 1px border `rgba(255, 255, 255, 0.08)`, 8px radius. Iconography uses strict 1.75px stroke SVG paths in `#cbd5e1`.
- **Tool Toggle Buttons**: Flat state when inactive. When active: high-contrast `#2563eb` background with an illuminated white icon.

### Contextual Formatting Ribbon
- Compact 44px height bar anchored directly above the software keyboard or bottom navigation.
- Smooth horizontal swipe with momentum. Dividers between tool groups (Font, Paragraph, Annotate, Shapes) are styled as 16px high vertical hairlines (`rgba(255, 255, 255, 0.1)`).
- Zero text labels in minimal mode; icons are paired with persistent active dot indicators below the graphic.

### Bottom Sheets (Replacing Standard Alerts & Dialogs)
- Never deploy generic OS system alerts for document choices. All interactions resolve via bottom sheets anchored with an ergonomic drag handle (`36x4px`, `#475569`, 8px margin-top).
- Header includes bold semantic title, close icon button, and dynamic content height with a max boundary of `85vh`.
- Backing scroller renders over a `backdrop-blur: 24px` scrim.

### Input Fields & Parameter Steppers
- Background: `#0f172a`. Border: `1px solid #334155`. Text: `#f8fafc`.
- Focus state: Border shifts to `#2563eb` with an immediate `0 0 0 2px rgba(37, 99, 235, 0.2)` glow ring.
- Numeric controls (font size, letter spacing, line height) implement dual inline tap-steppers (`+` / `-`) paired with horizontal glide scrubbing.

### Interactive Floating Toasts
- Compact capsule containers positioned `16px` above the bottom toolbar.
- Color: `#1e293b` with a primary accent left strip (`#2563eb` for status, `#f59e0b` for warnings).
- Includes single-line typographic status and right-aligned interactive inline action (e.g., "DESHACER" / "VER") in bold 12px uppercase. Dismissible via horizontal flick.

### Selection Pins & Bounding Boxes
- Document text selections render with an indigo wash (`rgba(37, 99, 235, 0.22)`).
- Boundary bounding boxes for images, vector paths, and signatures draw a crisp `1.5px` stroke in `#2563eb` terminated by solid white 10px circular nodules with `#2563eb` borders.