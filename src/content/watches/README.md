# Aditya Watches — how to add an entry

Each item in this folder is a single markdown file (`some-title.md`). The file
name becomes the slug, but since Watches is list-only it isn't used in any URL —
name it whatever's convenient (e.g. `frieren.md`).

Only the frontmatter (the block between the `---` lines) matters. There is no
body content; put any commentary in the `notes` field.

> Note: `README.md` is explicitly excluded by the loader in
> `src/content.config.ts`, so it won't show up as an entry. Keep it here as a
> reference.

## Template

```md
---
title: "Frieren: Beyond Journey's End"   # required
mediaType: "anime"                        # required — see "Media types" below
genre: ["fantasy", "adventure"]           # optional — any tags you like
rating: 5                                  # optional — number 0–5 (halves ok, e.g. 4.5)
progress: "consuming"                      # required — see "Progress" below
notes: "Short blurb / why I rate it."      # optional
startDate: "2026-05-18"                    # optional — YYYY-MM-DD
finishedDate: "2026-06-02"                 # optional — YYYY-MM-DD
date: "2026-05-20"                         # optional — when added; used for sorting
---
```

## Fields

| field          | required | type              | notes                                                        |
| -------------- | -------- | ----------------- | ------------------------------------------------------------ |
| `title`        | ✅       | string            | The name of the thing.                                       |
| `mediaType`    | ✅       | string            | Free text — use a known type below or add your own.          |
| `genre`        | ❌       | list of strings   | Tags. Power the genre filter on the page. Defaults to empty. |
| `rating`       | ❌       | number 0–5        | Whole or half numbers. Omit for things you haven't rated.    |
| `progress`     | ✅       | one of the values | See "Progress" — this controls the colored status badge.     |
| `notes`        | ❌       | string            | Short commentary shown on the card.                          |
| `startDate`    | ❌       | date              | When you started. `YYYY-MM-DD`.                              |
| `finishedDate` | ❌       | date              | When you finished. `YYYY-MM-DD`.                            |
| `date`         | ❌       | date              | When the entry was added/updated. Used to sort newest-first. |

## Progress (status badge)

`progress` must be **exactly one** of these keys:

| key         | shown as             | badge color |
| ----------- | -------------------- | ----------- |
| `consuming` | currently consuming  | blue        |
| `want`      | want to consume      | yellow      |
| `finished`  | finished             | green       |
| `dropped`   | left                 | red         |

## Media types

`mediaType` is free text, so you can add anything. The common ones:

- `movie`
- `anime`
- `manga`
- `light novel`
- `book`
- `articles`
- `other` (or just type whatever fits — e.g. `tv`, `webtoon`, `podcast`)

Whatever value you use becomes a filter pill on the page automatically.

## Genres / tags

`genre` is a free list of strings — add as many as you want. Each unique genre
across all entries becomes a filter pill, so keep spelling/casing consistent
(e.g. always `slice of life`, not `Slice of Life`) to avoid duplicate pills.

Common examples: `fantasy`, `sci-fi`, `action`, `drama`, `romance`, `horror`,
`thriller`, `mystery`, `slice of life`, `isekai`, `historical`, `comedy`,
`psychological`, `adventure`.
