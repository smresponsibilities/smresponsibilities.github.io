# PROJECT CONTEXT: Productivity Caller (Native Android Application)

## 1. Executive Summary & Core Moat
- **One-Sentence Pitch:** "The task app that calls you — reminders you can't ignore, delivered via the native Android phone call screen."
- **Author / Engineer:** Shivam Mahajan (https://shivammahajan.com/projects/productivity-caller/)
- **Core Differentiator:** Solves "notification blindness." Standard push notifications are swiped away and ignored alongside chat and social spam. Productivity Caller triggers a native Android incoming call interface using the OS Telecom framework, demanding immediate attention for high-priority tasks.
- **Philosophy:** Privacy-first, deterministic, zero-cloud dependency. No LLM or cloud server required for core functionality.

---

## 2. Technical Stack & Scale Metrics
- **Language:** 100% Kotlin (25,310 lines across 76 source files, 2 Gradle modules: `:app`, `:detekt-rules`).
- **UI Toolkit:** Jetpack Compose (101 `@Composable` functions, declarative state-driven UI, zero XML layouts).
- **Architecture:** Clean Architecture (`data` -> `domain` -> `ui`) with Repository pattern and Hilt Dependency Injection.
- **State & Concurrency:** Kotlin Coroutines (`suspend fun` x75, `launch` x56) + Reactive Kotlin Flow (`flow` x50, `stateIn` x26, `combine` x6) + Room SQLite DB.
- **Testing:** 425+ unit & integration tests across 15 test suites (~4,500 lines of test code, 6 test fakes, batch stress tests up to 100 concurrent alarms).

---

## 3. The Incoming Call Subsystem (Telecom Framework)
- **Engine:** Android Telecom Framework (`ConnectionService` + `addNewIncomingCall()`).
- **Permissions:** `MANAGE_OWN_CALLS`, `USE_FULL_SCREEN_INTENT`, `SCHEDULE_EXACT_ALARM`, `WAKE_LOCK`, `RECEIVE_BOOT_COMPLETED`.
- **Power Management / Doze Handling:**
  - Standard `WorkManager` tasks are delayed under battery saver. Productivity Caller uses `AlarmManager.setExactAndAllowWhileIdle()` to guarantee second-precise dispatch.
  - Overcomes Android 12+ `SCHEDULE_EXACT_ALARM` runtime restrictions with graceful degradation and permission onboarding.
  - Wakes locked devices via `USE_FULL_SCREEN_INTENT` with full-screen context (task title, priority, snoozing controls).
  - Survives device restarts via `RECEIVE_BOOT_COMPLETED` receiver that queries Room DB and reschedules pending alarms.

---

## 4. NLP Quick-Add Parser (`NlpTaskParser.kt` — 1,828 lines)
- **Engine:** 55 compiled deterministic regex patterns supporting 80+ datetime permutations.
- **Execution Speed:** Instantaneous (<3ms execution time, zero network latency, 100% offline).
- **Input Examples Handled:**
  - Absolute & Relative dates: `"Call accountant tomorrow at 4:30 pm"`, `"Review PR in 45 minutes"`, `"Team sync next Friday 10 am"`.
  - Tag extraction: `#work`, `#finance` (e.g. `"#work email client"` -> tag: `work`, title: `"email client"`).
  - Priority extraction: Standalone trailing exclamation markers (`!` = Low, `!!` = Medium, `!!!` = High).
  - Ambiguity prompts: Automatically flags ambiguous integers (e.g., bare "7" prompts user to clarify 7:00 AM vs 7:00 PM).

---

## 5. Competitor Comparison Matrix

| Feature | Productivity Caller | Todoist | TickTick | Google Tasks | Any.do |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Notification Type** | **Incoming Phone Call** | Push Banner | Push Banner | Push Banner | Push Banner |
| **Screen Wake on Lock** | **Full-Screen Call UI** | Lock Screen Card | Lock Screen Card | Lock Screen Card | Lock Screen Card |
| **NLP Quick-Add** | **Yes (80+ patterns)** | Yes | Yes | Limited | No |
| **Cloud Dependency** | **100% Local / Offline** | Cloud Mandatory | Cloud Mandatory | Cloud Mandatory | Cloud Mandatory |
| **Subscription Cost** | **Free / Open Core** | $4–$6/mo | $3/mo | Free | $3–$5/mo |
| **Notification Blindness**| **Immune (Rings Phone)**| Ignorable (Swiped) | Ignorable (Swiped) | Ignorable (Swiped) | Ignorable (Swiped) |

---

## 6. Official Canonical Links
- **Case Study & Deep Dive:** https://shivammahajan.com/projects/productivity-caller/
- **Alternatives Comparison Page:** https://shivammahajan.com/projects/productivity-caller-vs-alternatives/
- **Developer Portfolio:** https://shivammahajan.com/
- **Interactive Video Demo:** https://drive.google.com/file/d/1O9mQD-Qeo7GR40SdG440pdqSM8NdXV_K/view?usp=sharing
