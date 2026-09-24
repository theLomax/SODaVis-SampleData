# SODaVis — Sample Data

Public. Invented officiating data for [SODaVis](https://github.com/theLomax/SODaVis),
so the application and its whole test suite run on any clone with no access to anyone's
real records.

Nothing here describes a real person, league, venue or payment. The names are made up.

## Contents

| File | What it is |
|---|---|
| `games-sample.csv` | An Assignr-shaped export of 27 invented games. |
| `expected.json` | The figures those games produce, by name — `games.total`, `money.grossActual`, and so on. |
| `parks.ts` | Parks for the invented venues, including one with no mileage on purpose. |

## Why it exists

The real export is private, so without this the suites that read a file would have
nothing to read. Two ways to handle that are worse than a sample:

- **Skipping.** A clone reports tests as skipped and a contributor cannot tell whether
  their change broke anything.
- **Guarding every access.** Each test grows an `if (hasData)`, and a bug in that guard
  looks like a passing test rather than a missing one.

With a sample committed, the same code paths run everywhere, and the real export only
adds assertions about one person's actual season.

## Every shape the real data has

The point is not volume — 27 games is plenty — but that each structural oddity a real
export contains appears at least once, because those are what break a parser:

- the full 28-column header, including the columns that are always empty
- **ragged rows**: 26 fields for a solo game, 28 when a partner is listed
- a trailing `TOTALS:` row of 24 fields, and a blank-date row
- self appearing in **both** official slots, with a rotating `(F25)` / `(S26)` suffix
- cancellations at `$0` against a non-zero scheduled fee
- an upward fee adjustment, including a 1.5× single-umpire premium
- a duration stated inside the age group for some competitions and absent for others
- two venue strings differing only by a **trailing period**, which must resolve to one park
- a colour-named field (`: Red Field`, `: Blue Field`) at a single park
- a **multi-park day**, where round-trip mileage would count the drive home twice
- a park reached **only by a cancellation**, so it forms no trip
- a park with **no mileage on record** — a figure the app must surface, never estimate
- two assignors, one of which leaves the sport code blank
- a `Notes` field using the `:::` separator for a rules URL plus a game note
- one of each **fee anomaly**: an active game paying `$0`, a cancellation that paid, and
  a game with no scheduled fee — none of which the real export happens to contain

## Regenerating

Both files are derived, not hand-edited. From the app repo:

```bash
npm run fixture   # regenerates both together
```

Deriving the figures rather than typing them is what keeps them honest: a hand-kept
count drifts the moment the sample changes, and a test asserting a stale number is
worse than no test.
