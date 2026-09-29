---
id: FirstShot
title: FirstShot
order: 2
github: https://github.com/vihdutta/FirstShot
live: https://firstshot.vihdutta.com/
technologies: [Python, FastAPI, Oracle SQL, GitHub API, Plotly]
description: >-
  A dashboard for finding open-source projects to contribute to by comparing
  good first issues, closure times, and signs of existing activity. A Python
  pipeline refreshes GitHub issue data in Oracle nightly, while FastAPI serves cached
  snapshots for interactive charts and repository rankings.
---

## Finding a place to contribute

FirstShot compares repositories by their good first issues: how many are open, how long closed issues took to resolve, and how many have gone inactive. It also highlights open issues with no comments or linked pull requests. These signals help narrow down issues to explore before checking their current status with maintainers.

## Collecting the data

The Python pipeline searches GitHub for labeled issues and stores issue records and repository snapshots in Oracle. When a search exceeds GitHub's 1,000-result window, it splits the query by state and creation date. Requests are paced around the search limit, with retries for rate-limit responses. GraphQL queries collect linked pull requests so the dashboard can distinguish an untouched issue from one with work already attached.

The dashboard combines open issue counts, closure times, inactivity, and repository stars into a ranking. Plotly charts let users compare repositories and see how resolution times vary across organizations.

## Serving the dashboard

FastAPI serves precomputed API responses from an in-memory snapshot. A background thread checks a database version fingerprint and rebuilds the snapshot when the scraped data changes, keeping database queries out of the request path.

Snapshots are also saved to disk using a temporary file and rename. After a restart, the app can load the saved data; if a database refresh fails, it continues serving the last successful snapshot.
