---
id: CollegeLabMatch
title: CollegeLabMatch
order: 3
github: https://github.com/vihdutta/CollegeLabMatch
live: https://labmatcher.vihdutta.com/
technologies: [Python, FastAPI, Pinecone]
description: >-
  Uses vector embeddings of lab website content to semantically match students'
  research interests or resumes with Michigan robotics labs. A Python pipeline
  crawls and indexes lab descriptions in Pinecone, while FastAPI ranks matches
  by similarity and returns research summaries and links to each lab.
---

## Overview

CollegeLabMatch brings Michigan robotics lab information into one searchable interface. Students can describe their research interests or upload a resume, then explore matching labs alongside their faculty, research areas, and websites.

## Building the lab index

The Python pipeline starts with Michigan's robotics faculty directory and follows links to individual lab websites. Crawl4AI extracts page content, and Gemini produces a short research description from it. The pipeline embeds each lab's name and description with `all-MiniLM-L6-v2` through Hugging Face, then stores the vector and lab metadata in Pinecone.

## Matching interests to labs

FastAPI embeds a student's query with the same model and retrieves the closest lab vectors from Pinecone. For resume searches, the backend extracts document text and uses section headings such as research experience, projects, and skills to select content for the query.

The frontend supports text searches and resume uploads, with ranked results showing lab descriptions and links to the original websites. Matching uses embedding similarity, so students can describe an interest in their own words rather than needing the exact terms used on a lab's page.
