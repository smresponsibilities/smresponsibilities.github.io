# GitHub discovery and open source relationships

Researched 2026-09-15. Primary sources only. This report distinguishes documented platform behavior from recommendations. It does not claim to know GitHub search or Trending ranking weights. No posts, messages, or repository settings were changed.

## Recommendation

Make one public project easy to try and contribute to, then spend consistent time in one upstream community. The parent session's live repository audit found Productivity Caller private. Its Android product could make a useful demo, but outside contributors cannot browse a private repository; this report does not recommend changing its visibility without a separate decision. QuizDeck is the more immediate public onboarding candidate, after its README and commands are corrected. Shivam's existing Wikimedia contribution gives him a stronger starting relationship than approaching unrelated maintainers. Spark is a second option matching his professional experience, but pursuing all three communities at once would spread his time thin.

The desired outcome is a maintainer who recognizes his work and has a reason to contact him. A profile view alone does not show that. GitHub's Open Source Guides advise finding the people who benefit from the project and building reputation through useful participation in other projects. They make no promise of overnight growth. [Finding users](https://opensource.guide/finding-users/)

## Documented GitHub discovery mechanisms

| Mechanism | Documented behavior | Recommended action |
| --- | --- | --- |
| Repository topics | Topics classify purpose, subject, community, and language; visitors can browse related repositories and search by topic. GitHub permits up to 20. | Give each flagship a small accurate set, such as `android`, `kotlin`, `jetpack-compose`, `productivity`, `reminders` for Caller if supported by its implementation. Do not fill all 20 with unrelated popular tags. |
| Profile pins | GitHub supports up to six combined repositories and gists, with adjustable order. | Put working, documented projects first. Use fewer than six if only three are ready for scrutiny. |
| `good first issue` | GitHub says the label can increase the likelihood of approachable issues being surfaced, and makes them findable by label search. It does not guarantee exposure. | Publish two or three genuinely bounded beginner tasks with reproduction/setup, file pointers, expected result, and test command. |
| `CONTRIBUTING.md` | GitHub links the file during issue/PR creation, on the contribution page, in the repository overview, and in the sidebar. | Supply exact setup, checks, the changes wanted, and the route for discussing bigger changes. |

Sources: [Topics](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics), [Pins](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/pinning-items-to-your-profile), [Issue labels](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/encouraging-helpful-contributions-to-your-project-with-labels), [Contributor guidelines](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors).

Public source availability and an open source license are different. Check the flagship's license before inviting reuse or contributors. GitHub recommends including a license file and explains the permissions it communicates. Do not silently choose a license for third-party assets or employer material. [GitHub licensing documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository)

The portfolio repository is an exception to generic issue advice: its public GitHub Issues are reserved for roster submissions under `AGENTS.md`. Put contributor tickets in the project's established local tracker or direct people to a separate flagship repository, unless that policy is deliberately changed. Do not create generic `good first issue` tickets in the portfolio's public tracker.

## What the flagship should show

These are editorial recommendations, not claims about ranking signals.

1. One sentence naming the user and problem. For example, "An Android task app that calls you when a task is due."
2. A short recording showing task creation, a due task, and the incoming call experience.
3. A trustworthy installation route or runnable demo, required Android version, permissions, and known device restrictions.
4. Exact source build and test commands. State the toolchain version. Test the instructions on a clean environment.
5. A small architecture explanation linked to real code. One diagram is enough.
6. Measured results with reproduction details. For a latency claim, include machine, workload, concurrency, duration, percentile, and test script. Remove unsupported percentages.
7. Two specific contribution opportunities, plus a public contact route.

Suggested profile invitation, after confirming willingness and public project readiness. Do not link strangers to the private Caller repository:

> Open to collaborating on backend and data tooling. Building QuizDeck, a multiplayer quiz app; help with reconnect behavior and load testing is welcome. Email: shivammahajan.mail@gmail.com.

The parent audit found QuizDeck's README describes Create React App although the frontend uses Vite, and advertises a frontend test command that does not exist. The backend test script explicitly exits with an error. Correct those onboarding claims before inviting tests or contributors. Chain-Code currently lacks a root README and has public Issues disabled. Neither project has repository topics in the audit. These are audit findings supplied by the parent session, not independently reverified here.

Suggested beginner issue types, only when they are real outstanding work: document clean setup on an untested OS; add a test for an agreed parser edge case; improve a specific accessibility label. A task requiring an unknown architecture decision is not a beginner task.

Respond to first contributions, explain review decisions, and credit the contributor in the release. Welcoming people and helping early contributors return are explicit themes of GitHub's community guide. [Building community](https://opensource.guide/building-community/)

## Where to participate

### Wikimedia first

The official newcomer guide lists Kiwix for Java/Kotlin Android work and Pywikibot for Python work. It links their source, task trackers, documentation, and communication channels. Wikimedia projects use different systems, including Gerrit and Phabricator, so GitHub contribution squares are not a complete record of that work. [Wikimedia developer guide](https://www.mediawiki.org/wiki/New_Developers)

Recommendation: resume the area where the existing MediaWiki patch landed. Read the recent issues and reviews, reproduce one current bug, then submit a focused fix or a useful test. Link the actual merged patch from the profile with one sentence explaining its effect. If the existing area no longer fits, inspect Kiwix Android or Pywikibot rather than starting in five new projects. Confirm the project's current instructions and task availability before doing work.

### Kotlin community

Kotlin Slack's official guide lists Android and Compose channels. It asks members to choose the right channel, avoid cross-posting, avoid repeating questions, and not ping project owners for attention. Channel-specific rules still apply; the guide is not blanket permission to promote an app. [Kotlin Slack guidelines](https://kotlinlang.org/docs/slack-code-of-conduct.html)

Recommendation: contribute to an existing discussion about a concrete Android reliability problem. Share a minimal reproducible example or technical writeup when it answers that discussion. Ask for feedback on a narrow implementation choice in the appropriate channel. Share a release only where that channel permits it. Do not paste the same launch announcement across every channel.

### Apache Spark community

Spark explicitly welcomes answering user questions, release testing, documentation, and code review. Its contributor guide recommends establishing a record of useful help and supplies criteria for changes that are useful and reviewable. The user mailing list handles usage questions; the developer list handles contribution work. [Contributing to Spark](https://spark.apache.org/contributing.html), [Spark community](https://spark.apache.org/community)

Recommendation: turn the existing PySpark experience into a small public reproduction using synthetic data. A schema or row-count reconciliation example, or a benchmark with clear failure limits, would be relevant. Help a current user diagnose a similar issue. If the reproduction exposes an upstream bug, follow the project's issue and patch process. Do not publish employer code, datasets, or internal architecture to demonstrate experience.

Spark's published committer criteria emphasize sustained, quality contributions and constructive community involvement. This supports a long-term relationship strategy, not a promise that a particular number of PRs yields a role. [Spark committer criteria](https://spark.apache.org/committers.html)

### Show HN when the app is ready

Show HN requires something the author made that people can try, and the author must be available to discuss it. Landing pages and signup-only material do not qualify. Easy access without email/signup barriers is encouraged. Asking friends for votes or comments is prohibited. [Show HN guidelines](https://news.ycombinator.com/showhn.html)

At research time, HN also publishes a notice that Show HN submissions are temporarily restricted due to volume, encouraging newcomers to participate in the community before posting. Therefore a launch cannot assume immediate posting eligibility. [Show HN restriction notice](https://news.ycombinator.com/showlim)

Recommendation: a future title could be "Show HN: Productivity Caller, an Android task app that calls when tasks are due." First verify the live install path, write a short explanation of why calls are useful, describe the actual Android constraints honestly, and be present for feedback. Do not launch a resume page as a Show HN app.

### Other distribution

Recommendation: publish one technical story from each meaningful release on the channel where the intended readers already participate. A personal blog or LinkedIn post can link to the repository and demo. Examples: what happens when an Android reminder survives process death, why a parser rejected ambiguous dates, or a reproducible WebSocket latency test. These are proposed subjects, not assertions that the current projects implement them.

Reddit communities and newsletters are possible secondary channels, but no specific permission to post there was verified in this report. Check current local rules and submission instructions before promoting. Do not assume a community permits self-promotion because an old launch post exists.

## Measure useful attention

GitHub repository Traffic reports visitors, full clones rather than fetches, referrers, and popular content. Visitors and clones cover the last 14 days. Anyone with push access can view traffic for eligible repositories. Visitor/clone data update hourly; referrers and popular content update daily. Referrer links exclude search engines and GitHub itself. [Traffic documentation](https://docs.github.com/en/repositories/viewing-activity-and-data-for-your-repository/viewing-traffic-to-a-repository)

The traffic API provides daily/weekly view breakdowns for 14 days and up to ten referrers. Fine-grained tokens require repository administration read permission for these endpoints. [Traffic API](https://docs.github.com/en/rest/metrics/traffic)

Recommendations:

- Save a weekly snapshot if longer history matters. Do not add overlapping rolling 14-day totals together.
- Record unique repository visitors and clones, but treat clones as interest, not proof of successful installation.
- Track first outside issue, first useful outside PR, returning contributors, release feedback, and actual collaboration messages.
- Ask people who contact you how they found the project. Record the answer with the project and date.
- Compare a release or post against the previous baseline. Small samples cannot establish a causal conversion rate.

GitHub's metrics guide recommends choosing metrics that reflect the project's goals and examining where potential users or contributors stop participating. [Open source metrics](https://opensource.guide/metrics/)

## A practical four-week experiment

This is a proposed schedule, not a forecast of views or inbound contacts.

| Week | Work | Evidence to keep |
| --- | --- | --- |
| 1 | Pick one flagship. Verify installation and README. Add accurate metadata, contribution instructions, and a specific invitation. | Fresh-install result, current traffic baseline, two bounded contribution tasks. |
| 2 | Return to one upstream community. Reproduce a real issue or test an upcoming release. Follow through on the review. | Reproducer, review discussion, useful patch or documented result. |
| 3 | Publish one technical explanation and a demo where permitted. Share the problem and result rather than asking for stars. | Link, substantive feedback, installs or repository interest where measurable. |
| 4 | Fix the repeated friction people reported. Release the improvement and credit help. | Returning users/contributors, resolved issues, relevant inbound conversations. |

Keep doing the work that produces conversations with the people you want to collaborate with. Stop channels that generate visits without useful feedback. No source found supports a magic number of daily commits, badges, or artificial page requests as a reliable path to maintainer outreach.
