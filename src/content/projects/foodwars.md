---
id: foodwars
title: foodwars
order: 1
github: https://github.com/vihdutta/foodwars
live: https://foodwars.vihdutta.com/
technologies: [TypeScript, Node.js, Redis, Supabase, Express, Socket.IO]
description: >-
  A multiplayer browser shooter where a Node.js server handles movement and combat
  over Socket.IO. A Redis-backed leaderboard tracks stats during each match, with
  results saved in Supabase when it ends. Client-side prediction keeps movement
  responsive while reconciling each player's position with the server.
---

## Why I built it

I spent plenty of time in middle school and high school playing agar.io, slither.io, and other .io games with friends. Being able to open a browser and jump into a game together was a big part of the appeal. I wanted to learn Node.js and socket programming, so I built foodwars: a food-themed multiplayer arena shooter that runs in the browser.

## Keeping everyone in the same game

The browser renders the game with PixiJS and sends movement, aiming, and firing inputs over Socket.IO. The Node.js server owns player positions, bullets, health, and ammo, with separate state for each room.

Movement uses elapsed time measured by the server, so sending more input messages doesn't make a player move faster. Bullets advance in steps of at most 5 ms, with wall and player collision checks between steps to keep them from skipping past obstacles.

## Making movement feel responsive

Waiting for the server before showing every movement would make the controls feel delayed. I added client-side prediction using the same movement and wall-collision code as the server. Each input has a sequence number. When the server acknowledges one, the client starts from the confirmed position and replays the inputs still waiting for acknowledgement.

Small position corrections ease out visually; large ones snap into place. Other players interpolate between server updates and briefly extrapolate through network jitter before stopping if no new update arrives.

## Keeping the results

Players can sign in with Google to save their results. Redis stores live match stats and login sessions, while Supabase stores match history for the persistent leaderboard. Tests cover movement prediction, collisions, round resets, and saving results when a player disconnects during a save.
