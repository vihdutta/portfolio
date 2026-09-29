---
id: manim
title: Manim
order: 1
repo: ManimCommunity/manim
github: https://github.com/ManimCommunity/manim
description: >-
  Fixed text becoming thicker when scaling compound objects and added a regression test.
stats:
  - value: "2"
    label: Merged PRs
    highlight: true
  - value: 40K+
    label: GitHub stars
  - value: "3"
    label: Pull requests
cta:
  label: View the merged PR
  url: https://github.com/ManimCommunity/manim/pull/4694
---

## Overview

> 2 merged PRs: a rendering fix and a regression test to protect it.

I decided to contribute to ManimCommunity/manim, an animation engine for explanatory math videos. This framework particularly allows one to write concise Python scripts to generate mathematical animations and is popular amongst researchers and YouTubers. In fact, I had chosen this project because I discovered 3Blue1Brown uses it to create their math videos. Further, choosing this project provides me the sense of "giving back"-- the Manim framework was originally created by 3Blue1Brown too.

## Project background

When the creator of 3Blue1Brown, Grant Sanderson, was finishing his undergraduate degree in mathematics at Stanford University, he wanted to create a project that would enable him to illustrate "mathematical functions better as transformations". He fiddled around and created a simple Python script to complete that task. Later, he used the script to produce the first video on 3Blue1Brown. His first video was well received, and so Grant kept updating his tool to create new videos, and the cycle continued. Today, 3Blue1Brown is one of the best known math channels on YouTube with over 8 million subscribers.

While 3Blue1Brown started gaining traction, Grant discovered he still had to spend a lot of time balancing his life and creating videos– he was having less and less time to be attentive to issues the community created on Manim's github repository. Further, with 3Blue1Brown's increasing popularity, people became interested in Manim but noted it was difficult to work on as it was maintained primarily by Grant as a personal project. Fans of Grant forked Manim into what is now ManimCE– Manim Community Edition. This version of Manim is backed by organizations and maintains Manim as a community-supported, developer friendly version of the project Grant started.

## What I built

### Consistent stroke width when scaling compound objects

[PR #4694 · Merged](https://github.com/ManimCommunity/manim/pull/4694)

When scaling built-in compound objects in Manim, components of the compound object that have 0 stroke width incorrectly scale with the rest of the object. For example, if you scale a number line from its original size to a smaller size then back to its original size, the text associated with the number line will become much thicker when it should have retained its original boldness.

To implement this issue, I first spent some time looking through the compound object class in the source code. Once I had a comprehension of the class and understood how the scale function associated with the class worked, I noted that the code simply scaled the compound object class linearly– that is, it took every object in the compound object and applied the same scaling throughout it. To fix this issue, I created a loop that went through each object in the compound object and multiplied that specific object's stroke width with the scaling factor. That way, subobjects which defaulted to a "0" stroke width would not have its stroke width affected and the other parts of the compound object would.

[View PR](https://github.com/ManimCommunity/manim/pull/4694)

### Correct center of rotation for fixed-orientation text

[PR #4701](https://github.com/ManimCommunity/manim/pull/4701)

The calculated center for fixed orientation objects in Manim is incorrect for text strings. Specifically, the text's center of rotation is placed on the left edge of the text, instead of the actual center. This bug is painfully obvious when rotating the text in the interactive viewer as the text "orbits" where it should be.

Notably, this issue involved incorrect interaction with text. As I was already familiar with debugging text issues from my first PR, I decided to tackle the issue with confidence. Fortunately, this confidence was not in vain– the issue was indeed very similar to the first PR's text issue– the fix_orientation function needed to consider the relation between child and parent objects for the text. After independently applying a fixed orientation to all subobjects of the parent object in the fix_orientation function, the issue appeared to be resolved based on the reproduction code the issue poster provided.

[View PR](https://github.com/ManimCommunity/manim/pull/4701)

### Regression test for the stroke-width fix

[PR #4703 · Merged](https://github.com/ManimCommunity/manim/pull/4703)

This PR was simply for quality control of PR1. I did not initially include a regression test for PR1, so I decided to create another PR with the integration test.

The test is built from the original reproduction code attached to the issue my first PR closed, so it fails against the pre-fix code and passes after it. Locking the behavior down in the test suite matters here because the fixed-orientation bug I tackled in PR #4701 stems from the same underlying interaction between compound objects and their text subobjects– without a regression test, a future refactor in that area could quietly reintroduce the scaling bug.

[View PR](https://github.com/ManimCommunity/manim/pull/4703)
