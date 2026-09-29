---
id: leetcode-feedback
title: LeetCode Feedback
order: 2
repo: LeetCode-Feedback/LeetCode-Feedback
github: https://github.com/LeetCode-Feedback/LeetCode-Feedback
description: >-
  Reported a missing 4Sum test case where interleaved duplicates let an incorrect solution pass the judge; the case was accepted for the test suite.
stats:
  - value: Accepted
    label: "Issue #38670"
    homeLabel: Issue
    highlight: true
  - value: "100"
    label: LeetCoins Awarded
cta:
  label: View the accepted issue
  url: https://github.com/LeetCode-Feedback/LeetCode-Feedback/issues/38670
---

## Overview

LeetCode's "4Sum" problem asks for all unique quadruplets in an array that sum to a target value. A common but flawed approach uses a hashmap that stores only one index per value, then looks up complements. That approach silently breaks when the correct quadruplet is made of four copies of the same value interleaved with other values in the array, so the hashmap overwrites earlier indices for repeated values and the quadruplet is never found.

I noticed this while testing a hashmap-based solution against a case I wrote myself: `nums = [0,-1,1,-1,1,-1,1,-1]`, `target = -4`, which should return `[[-1,-1,-1,-1]]`. The buggy solution returned an empty list on my local test, yet was still accepted by LeetCode's official judge, meaning the existing test suite for the problem had no case that exercised this failure mode.

## What I reported

### Missing test case: interleaved-duplicate quadruplets in 4Sum

[Issue #38670 · Accepted](https://github.com/LeetCode-Feedback/LeetCode-Feedback/issues/38670)

I filed a report against LeetCode's public feedback tracker describing the gap, along with the reproduction case and the incorrect hashmap approach that slips past every existing test. The LeetCode team confirmed the report and used it to strengthen the problem's test suite, then credited my account 100 LeetCoins as thanks.

[View the issue](https://github.com/LeetCode-Feedback/LeetCode-Feedback/issues/38670)
