# Part 2 — Product Understanding: AbleSpace "Take Data" (Caseload tab)

> **Note on how this document was produced:** I don't have access to
> AbleSpace — it's a private, authenticated product (likely used by SLPs/
> OTs/therapists for caseload and data tracking), so I can't log in, click
> through the actual "Take Data" screen, or take real screenshots of it.
> This document is a **structured template** for *you* to fill in after
> exploring the screen yourself, built around what the assessment brief
> asks for: a plain-language explanation of the workflow, plus any UX/UI
> or functionality improvements you notice. Replace every bracketed
> `[ ... ]` section with your own screenshots and observations.

---

## 1. How to get here

1. Log into AbleSpace.
2. Open the **Caseload** tab.
3. Select a student/client from the caseload list.
4. Open **Take Data** for that student.

`[Screenshot: Caseload tab with a student selected]`

---

## 2. What this screen is for (in your own words)

`[1–2 sentences: what problem is this screen solving for the therapist?
 e.g. "This is where a therapist logs a student's performance on their
 IEP goals during or right after a session, instead of writing it on paper."]`

---

## 3. Walking through the workflow

Break the actual flow into numbered steps, one screenshot per step. A
reasonable structure to fill in (adjust to match what you actually see):

### Step 1 — Selecting the goal(s) to track
`[Screenshot]`
`[What you clicked, what options were shown, any defaults selected for you]`

### Step 2 — Recording a data point
`[Screenshot]`
`[Is it a tap-to-score (e.g. + / − buttons)? A trial-by-trial count?
 A percentage slider? Describe the actual input mechanism.]`

### Step 3 — Adding context (notes, prompts used, accuracy level, etc.)
`[Screenshot]`
`[What optional fields exist — notes, prompt level, cueing type?]`

### Step 4 — Saving / submitting the session's data
`[Screenshot]`
`[What happens after you save — confirmation? Does it auto-calculate a
 percentage or trend? Does it return you to the caseload list?]`

### Step 5 — Reviewing past data (if reachable from this screen)
`[Screenshot, if applicable]`
`[Can you see a history/graph of past sessions from here?]`

---

## 4. Summary of the end-to-end flow

`[3–5 sentence plain-language summary a non-technical reviewer could read
 and understand the whole workflow without seeing the screenshots — e.g.
 "A therapist opens a student's profile, picks which goal(s) they're
 working on today, scores each trial as it happens using large tap
 targets so they don't need to look away from the student, optionally
 adds a note about prompting, and saves — the app then updates that
 goal's progress graph automatically."]`

---

## 5. UX/UI observations & suggested improvements

For each item: what you noticed, why it matters, and (briefly) what you'd
change. Aim for specific, actionable notes rather than generic ones —
this is what the assessment is actually evaluating.

| # | Observation | Why it matters | Suggested improvement |
|---|---|---|---|
| 1 | `[e.g. "Save button is small and at the bottom of a long scroll on mobile"]` | `[e.g. "Therapists are often taking data one-handed, mid-session, on a phone/tablet — friction here directly costs attention on the student"]` | `[e.g. "Sticky save button, or auto-save on each trial entry"]` |
| 2 | `[...]` | `[...]` | `[...]` |
| 3 | `[...]` | `[...]` | `[...]` |
| 4 | `[...]` | `[...]` | `[...]` |
| 5 | `[...]` | `[...]` | `[...]` |

Things worth specifically checking while you explore, since they tend to
matter a lot for a "take data mid-session" workflow like this one:

- **Speed of input** — how many taps/screens between "open the app" and
  "record one data point"? Fewer is almost always better for this use case.
- **Error recovery** — if you mis-tap a score, how do you undo it? Is that
  obvious?
- **Offline/connectivity handling** — many therapy settings have poor wifi;
  does the screen indicate whether data is saved locally vs. synced?
- **Accessibility** — tap target sizes, color contrast (especially if
  status/progress is color-coded), screen-reader labels.
- **Consistency** — does this screen's interaction pattern (buttons, icons,
  spacing) match the rest of the app, or does it feel like a different tool?
- **Empty/edge states** — what does the screen look like for a student with
  no goals set up yet, or a goal with no data history?

---

## 6. Functionality suggestions (beyond visual UX)

`[Optional: anything about what the screen *does*, not just how it looks —
 e.g. "Add a quick-repeat button for the last-used prompt level," or
 "Allow scoring multiple goals in one continuous session view instead of
 navigating back and forth between goals."]`

---

## Submission format

The brief allows either this as a written document with screenshots, or a
short video walkthrough — a video is often faster to produce for a flow
like this (you can narrate steps 1–5 above in ~3–5 minutes) and lets you
show timing/friction more naturally than screenshots can. Either is fine;
pick whichever you can produce with the least friction given your 14-day
window.
