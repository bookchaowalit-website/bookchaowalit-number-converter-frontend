# Number Base Converter — Product truth

> Product truth inferred from the existing README, routes, copy, and implementation because this batch was explicitly authorized to proceed without an interview.

## Purpose

Number Base Converter is a fully client-side learning/developer utility for translating one integer between binary, octal, decimal, and hexadecimal as the user types. It should make positional notation and the relationship between the four representations visible at a glance.

## Core flow

1. Edit any one base field.
2. Read the synchronized values in the other three bases.
3. Copy an individual representation when needed.

## Boundaries

- Integer-only; `BigInt` supports large values but there is no floating-point conversion.
- No API, account, server persistence, history, or multi-user workspace.
- Invalid digits should remain visible as an error and never be presented as a converted value.

