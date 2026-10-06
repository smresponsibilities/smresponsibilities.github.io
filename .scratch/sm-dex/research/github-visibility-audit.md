# GitHub visibility and contributor outreach

Research date: 15 September 2026. Account: `smresponsibilities`.

## Recommendation

The profile is presentable. The next useful work is making one project easy to try and contribute to, then participating consistently in its surrounding community. More profile decoration is unlikely to address the concrete onboarding gaps found below. This is an assessment, not a claim about GitHub's ranking algorithm.

There are two different objectives: attracting contributors to your projects, and getting established maintainers to recognize you and invite collaboration. The first needs a usable project and clear entry points. The second needs repeated useful interactions in a community. Pursue both, with one flagship project and one upstream community.

## What the view counter actually measures

The profile badge uses Komarev. Its documentation says it counts requests rather than unique people. Refreshes and image-proxy requests can increase it. It is not GitHub repository traffic and does not establish that more developers discovered your work. [Counter documentation](https://github.com/antonkomarev/github-profile-views-counter#why-does-the-counter-increase-every-time-the-page-is-reloaded)

A single Windows PowerShell request to the existing badge endpoint is:

```powershell
curl.exe -s -o NUL "https://komarev.com/ghpvc/?username=smresponsibilities&color=dc4056&style=flat-square"
```

This requests the counter image and can increment the displayed number. It does not generate an audience. No request was executed as part of this research; no loop, counter base offset, or traffic simulation was configured.

## Account audit

Read-only inspection used GitHub's repository, contents, community-profile, and traffic APIs. Public facts can be inspected at the linked repositories. Traffic is an owner-visible snapshot, not independently public evidence.

| Repository | Observed issue | Practical consequence |
| --- | --- | --- |
| [Chain-Code](https://github.com/smresponsibilities/Chain-Code) | Issues disabled; no root README; no topics; no detected root license | Visitors lack a project introduction and an issue channel for participation |
| [QuizDeck](https://github.com/smresponsibilities/QuizDeck) | Empty description and topics; README title is “Kahoot Clone”; documentation contradicts package scripts | Harder to identify the project and trust its setup instructions |
| Productivity-Caller | Private, confirmed through authenticated metadata | Visitors cannot inspect its implementation or contribute through the public profile link; keep using the demo unless visibility is deliberately changed |
| [Portfolio](https://github.com/smresponsibilities/smresponsibilities.github.io) | No root README; no topics; existing issues primarily serve roster submissions | The rendered site communicates more clearly than the source repository |
| [1001daysofcode](https://github.com/smresponsibilities/1001daysofcode) | No root README, description, or topics; last pushed August 2024 | Does not explain where the subsequent public challenge is documented |

QuizDeck's README tells readers to run `npm test` in both folders. The backend script is explicitly `echo "Error: no test specified" && exit 1`; the frontend has no test script. The README references Create React App, while the frontend package uses Vite. The setup sequence also needs verification from a fresh checkout. These are inspection findings, not the result of installing or running the project. [README](https://github.com/smresponsibilities/QuizDeck/blob/main/README.md), [backend package](https://github.com/smresponsibilities/QuizDeck/blob/main/backend/package.json), [frontend package](https://github.com/smresponsibilities/QuizDeck/blob/main/frontend/package.json)

GitHub did not detect a repository license in the audited projects. QuizDeck's backend package does declare ISC; that is distinct from a clear repository-wide license covering all components. Establish the intended scope and rights before choosing a license, especially for multi-author code or third-party artwork. A public repository alone is not equivalent to a general open-source reuse license. [GitHub's licensing explanation](https://choosealicense.com/no-permission/)

### Actual traffic baseline

Rolling previous 14 days, queried on 15 September 2026:

| Repository | Views | Unique visitors |
| --- | ---: | ---: |
| smresponsibilities.github.io | 398 | 12 |
| QuizDeck | 23 | 8 |
| Chain-Code | 17 | 4 |

Do not add these unique counts across repositories: the same person can visit multiple repositories. GitHub traffic also includes sources such as your own visits and is not a measure of contributor intent. The portfolio's returned referrer list included github.com and linkedin.com; empty lists on the other two repositories do not establish that nobody arrived externally. GitHub offers a 14-day traffic window and updates different sections at different frequencies. [Traffic documentation](https://docs.github.com/en/repositories/viewing-activity-and-data-for-your-repository/viewing-traffic-to-a-repository)

```powershell
gh api repos/smresponsibilities/QuizDeck/traffic/views --jq '{views: .count, unique_visitors: .uniques}'
gh api repos/smresponsibilities/QuizDeck/traffic/clones --jq '{clones: .count, unique_cloners: .uniques}'
gh api repos/smresponsibilities/QuizDeck/traffic/popular/referrers
```

These are read-only owner-authorized metrics. They do not generate views. [Traffic API](https://docs.github.com/en/rest/metrics/traffic)

## Highest-priority changes

1. **Choose one flagship for the next month.** Productivity Caller has a specific, demonstrable problem and an Android audience, but it is private. If keeping it private, choose QuizDeck after repairing onboarding. Use the Dex for personal introductions; use the flagship for sustained technical collaboration. This ordering is a recommendation based on the audit, not a popularity prediction.
2. **Make the first five minutes work.** Write a README with a one-sentence purpose, screenshot or 30-second demo, verified setup commands, environment-variable names, test commands that actually work, limitations, and a contact/contribution path. If a feature is planned, label it planned. Publish reproducible details before presenting the 500-user/31ms result as a benchmark.
3. **Add accurate descriptions and topics.** For QuizDeck, candidates are `quiz`, `multiplayer`, `react`, `nodejs`, `socket-io`, and `mongodb`. Do not add unrelated trending tags. Topics support discovery through topic pages and searches; they do not guarantee placement. [GitHub topics](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics)
4. **Offer small, real contribution tasks.** On the flagship, publish three well-scoped issues only after verifying the gaps. Each should give reproduction steps, expected behavior, starting files, acceptance criteria, and the command to check the change. Apply `good first issue` when it really fits; use `help wanted` for wider requests. GitHub uses beginner-friendly labels in contributor discovery. [Labels](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/encouraging-helpful-contributions-to-your-project-with-labels)
5. **Explain contribution expectations.** Add `CONTRIBUTING.md`: local setup, tests, areas accepting work, how to discuss scope, and how reviews happen. GitHub surfaces this file in contribution entry points. [Contributor guidelines](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors)
6. **Put your best public work in pins.** Prefer a small selection of projects you can support. Include an upstream contribution if it is eligible and useful to show. GitHub allows up to six repositories/gists; filling every slot is optional. [Profile pins](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/pinning-items-to-your-profile)

Portfolio constraint: this repository reserves GitHub Issues for public roster submissions and stores engineering tickets locally. Do not silently mix engineering issues into that workflow. A public contribution guide can explain the existing process and contact path; any workflow change needs separate consideration.

## How to get maintainers reaching out

Your Wikimedia experience is an existing connection worth continuing. Start with a project or component where you have already contributed. Pick one problem, reproduce it well, discuss the proposed scope, submit a tested patch, and follow the review through. Then remain available for follow-up work. This gives people evidence of how you collaborate, beyond a profile claim. Wikimedia documents its developer entry points and communities. [New developers](https://www.mediawiki.org/wiki/New_Developers)

For broader discovery, publish technical material that helps a specific audience: a reproducible Socket.IO load test, an Android reminder delivery walkthrough, or a tested PySpark example using synthetic data. Do not publish employer code or internal production details. Link each post to a runnable example and one specific request for feedback. GitHub's Open Source Guides recommend reaching relevant communities and building relationships through useful participation. [Finding users](https://opensource.guide/finding-users/)

Suggested profile invitation, if you want to add it later:

> Open to collaborating on Python data tools and Android apps. If you maintain a project in either area, email me with an issue or idea.

Suggested project post, to adapt after the benchmark is reproducible:

> I built QuizDeck, a multiplayer quiz app using React and Socket.IO. Here is the demo and the load-test setup. I'd like feedback on reconnect behavior, and I've documented one small task for someone who wants to contribute.

Neither draft has been posted or sent. Avoid mass messages and requests for stars. Feedback on a concrete engineering question is a more useful invitation.

## Four-week experiment

| Week | Work | Evidence to record |
| --- | --- | --- |
| 1 | Repair one flagship's README/setup, contribution path, metadata, and license clarity | Someone else can run it; record their setup friction |
| 2 | Publish a demo plus one technical explanation in two relevant communities | Qualified questions, demo feedback, repository referrals |
| 3 | Make one substantive upstream contribution and support a first project contributor | Review discussion, completed setup, accepted patch or actionable feedback |
| 4 | Ship changes from feedback and publish a short release note | Returning participants, real issues/PRs, collaboration inquiries |

Use these as experiment activities, not promised outcomes. Weekly unique visitors and clones provide context; successful setups, useful issues, external contributions, and genuine collaboration messages are closer to the goal. Do not count review bots or your own test traffic as external interest.

## Scope

This session performed research and read-only inspection. It did not alter public repository settings, open issues, choose a license, publish a private project, send outreach, change profile content, or inflate counters. Community/channel research is in `github-discovery-community.md` alongside this report.
