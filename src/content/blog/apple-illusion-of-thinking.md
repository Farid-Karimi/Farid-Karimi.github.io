---
title: "Apple's AI research exposes the illusion of thinking"
date: "2026-07-12"
tags: "AI, Research"
excerpt: "Apple's new paper shows reasoning models collapse on hard logic puzzles — and the debate over why is still raging."
---

Apple just dropped a research paper that should make you question everything you've heard about AI reasoning.

It's called "The Illusion of Thinking". The title is not subtle.

Six researchers tested the most advanced reasoning models available: OpenAI o1 and o3, DeepSeek R1, Claude 3.7 Sonnet Thinking, and Google Gemini Flash Thinking. They didn't use standard benchmarks. They used classic logic puzzles like the Tower of Hanoi, the river-crossing problem, and block-stacking challenges.

The results are brutal.

## Three performance regimes

The researchers identified three distinct patterns:

Low complexity. Standard models without reasoning capabilities actually outperform the fancy reasoning models. The extra thinking gets in the way.

Medium complexity. This is where reasoning models shine. The additional thinking tokens provide a real advantage.

High complexity. Complete collapse. Both models fail entirely. Accuracy drops to zero.

The models don't just struggle. They give up.

## The counter-intuitive scaling limit

Here's the strangest finding.

As problems get harder, reasoning models initially increase their effort. They use more tokens. They "think" harder.

But at a certain point, something flips. Despite having an adequate token budget, the models reduce their output. They stop trying.

The paper suggests this might be a form of internal uncertainty estimation. The model implicitly detects that the task is beyond its capabilities and abandons the effort.

## The Tower of Hanoi test

Take the Tower of Hanoi puzzle. You have disks stacked on three pegs. The goal is to move all disks to the third peg without placing a larger disk on a smaller one.

It's a simple problem. Humans can solve it by following a recursive algorithm.

Claude 3.7 Sonnet and DeepSeek R1 start failing when you add a fifth disk. With eight disks, they collapse completely.

The models literally tell you they're stopping to save tokens.

## The rebuttal

Not everyone agrees with Apple's framing.

Alex Lawsen from Open Philanthropy published a detailed rebuttal called "The Illusion of the Illusion of Thinking". He argues that Apple's experimental design has problems.

First, token limits. At the point where Apple claims models collapse, models were hitting their output ceilings.

Second, impossible puzzles. Apple's river-crossing test included unsolvable instances. Models were penalized for recognizing that and refusing to solve them.

Third, rigid evaluation. Apple's automated scripts judged models solely by complete move lists, even when the task exceeded token limits.

Lawsen reran the tests. He asked models to generate recursive code that solves the puzzle instead of listing every move. The models had no trouble solving 15-disk Hanoi problems.

## The middle ground

A subsequent paper from Spanish researchers tried to clarify the debate.

They replicated and refined both contested benchmarks. Their finding? Both sides have a point.

The Tower of Hanoi failures weren't purely about output constraints. LRMs genuinely struggle with cognitive limitations when complexity rises moderately.

But the river-crossing results were a different story. Once you limit tests to solvable problems, LRMs effortlessly solve large instances with over 100 agent pairs.

## What this means for you

The debate matters for one simple reason: money.

Billions are being poured into reasoning models. Companies are betting that these systems can solve complex real-world problems.

Apple's research suggests there's a ceiling. Beyond a certain complexity, throwing more processing power at the problem doesn't help.

The practical takeaway? Focus AI on structured, low-to-mid complexity tasks. Don't expect it to formulate high-level strategy or solve chaotic real-world problems.

Use it to extract key points from contracts. Create summaries. Automate straightforward workflows. Leave the complex reasoning to humans.

The models are useful. But they're not thinking. They're pattern-matching at scale.

And once the puzzle gets hard enough, even the pattern-matching stops.

Source: https://machinelearning.apple.com/research/illusion-of-thinking