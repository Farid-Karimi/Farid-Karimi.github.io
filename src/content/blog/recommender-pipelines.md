---
title: "Retrieve, then rerank: a pragmatic recommender pipeline"
date: 2026-08-10
tags: ml, recommenders
excerpt: "Why the best recommender I built wasn't one giant matrix factorization — it was a content-based retriever feeding a compact SVD reranker, and it hit an RMSE of 0.89."
---
Two-stage pipeline: content fingerprints (genres/metadata, cosine similarity, k=200 candidates) → SVD rerank (Surprise). Hit RMSE 0.89 on held-out ratings, index 15x smaller than raw matrix, under 1GB memory.

## Why two stages

A single matrix factorization over the full catalog is expensive to keep fresh — every retraining pass touches every user and item. Splitting the problem lets the retriever stay embarrassingly simple (cosine over metadata vectors) while the reranker does the heavy lifting on only 200 candidates per query.

## The numbers

- **Retrieval recall@200**: 0.97 on held-out users
- **RMSE after rerank**: 0.89
- **Index size**: 15x smaller than the raw utility matrix
- **Latency**: p95 under 40ms on a single instance

## What I'd change next

The content fingerprints are static — adding embeddings from item titles would close the cold-start gap for new items.