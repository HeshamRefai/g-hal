# G-HAL API Documentation

## Overview

G-HAL exposes a unified tRPC API with the following routers. All endpoints are type-safe and accessible via the auto-generated client.

## Authentication

All endpoints except `auth.me` and `auth.logout` require authentication via session cookie.

### Auth Router

| Endpoint | Type | Input | Output | Description |
|----------|------|-------|--------|-------------|
| `auth.me` | query | - | `User` | Returns current user profile |
| `auth.logout` | mutation | - | `{ success: boolean }` | Clears session cookie |

## Process Router

| Endpoint | Type | Input | Output | Description |
|----------|------|-------|--------|-------------|
| `process.stats` | query | `{ tenantId: string }` | `ProcessStats` | Process metrics summary |
| `process.list` | query | `{ tenantId: string }` | `Process[]` | List processes |

## AI Router

| Endpoint | Type | Input | Output | Description |
|----------|------|-------|--------|-------------|
| `ai.discover` | mutation | `{ context: string, question: string }` | `AIResponse` | Discovery Agent |
| `ai.redesign` | mutation | `{ currentProcess: string, goals: string }` | `AIResponse` | Redesign Agent |

## Error Handling

| Code | HTTP | Description |
|------|------|-------------|
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `BAD_REQUEST` | 400 | Invalid input |
