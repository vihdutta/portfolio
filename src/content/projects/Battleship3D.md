---
id: Battleship3D
title: Battleship3D
order: 5
github: https://github.com/vihdutta/Battleship3D
technologies: [Java]
details:
  - Classic Battleship reimagined with a 3D twist
  - Runs entirely in the terminal
  - Turn-based AI opponent
preview: https://raw.githubusercontent.com/vihdutta/Battleship3D/refs/heads/master/img/autoplay_demo.gif
---

## Overview

Battleship3D takes the board game everyone knows and stretches it into a third dimension — all inside the terminal. Instead of a flat grid, ships occupy a stack of layers, which quietly changes how you hunt and how you hide.

Building it in Java was a study in clean object modeling: representing the board, ships, and shots as their own well-defined pieces, then wiring up an opponent that plays a reasonable game rather than firing at random. The terminal rendering was its own puzzle — making a 3D space legible with nothing but text.

## Key Highlights

- 3D coordinate system that extends classic Battleship rules across layers
- Readable terminal rendering of a multi-layer board
- Turn-based AI that targets intelligently instead of guessing randomly
- Object-oriented design separating board, fleet, and game logic
