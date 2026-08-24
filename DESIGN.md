---
name: Base / 4
description: A measured radix board that keeps four integer representations in view.
---

# Design System: Base / 4

## Overview

Base / 4 is a focused integer utility and learning instrument. One value is inspected through four registers—binary, octal, decimal, and hexadecimal—so conversion is visible rather than hidden behind a submit step. The board is deliberately closer to a lab worksheet than a calculator card.

## Colors

- **Bone** `#eee9dc`: measured page ground.
- **Paper** `#f8f5ec`: register board.
- **Ink** `#202b35`: numbers, labels, and frame.
- **Instrument blue** `#47719a`: radix signal and secondary prefix.
- **Signal red** `#cb5747`: invalid state, focus, and copy action.
- **Decimal yellow** `#e1c358`: the decimal register’s reference mark.
- **Rule** `#bdb6a8`: register separation.

Red is reserved for correction and action; yellow belongs to the decimal reference register.

## Typography

Geist Sans handles the explanatory headline and field notes. Geist Mono handles every radix label, prefix, value, copy action, and error rail so the four representations read as measured data.

## Layout

The hero’s rotated 2×2 signal previews the four voices, then a full-width board presents two register columns on desktop and one stacked column below 780px. Each register keeps its label, large editable value, base hint, and copy action in a stable reading order.

## Elevation & Depth

The instrument is flat: bone around paper, one-pixel rules between registers, and a strong board frame. The red error rail is the only state that interrupts the board. No shadow, gradient, or decorative dashboard chrome is necessary.

## Shapes

Registers are square worksheet cells. The small rotated signal is an inspection stamp, not a reusable container pattern. Prefixes are bordered rectangles and values sit on a single measurement rule.

## Components

- **Radix signal:** four labeled cells with decimal visibly marked.
- **Register board:** editable binary, octal, decimal, and hexadecimal fields with copy actions.
- **Error rail:** plain invalid-digit feedback that never presents a false conversion.

## Do's and Don'ts

- Do keep all four voices visible while editing any one field.
- Do preserve integer-only behavior and BigInt-safe values.
- Do make invalid input legible before any copied result is offered.
- Don't hide conversion behind a modal or submit button.
- Don't add history, accounts, APIs, or calculator-style decorative controls.
