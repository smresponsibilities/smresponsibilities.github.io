---
title: Why I Built an Android Reminder App That Calls You Instead of Sending Push Notifications
published: true
description: Notification fatigue leads to missed critical tasks. Here is how I architected Productivity Caller in Kotlin with automated calls and a 80+ pattern regex NLP parser.
tags: android, kotlin, productivity, opensource
canonical_url: https://shivammahajan.com/projects/productivity-caller/
---

Most productivity apps suffer from a fundamental design flaw: **notification blindness**. 

When a standard push notification arrives, our brains are conditioned to swipe it away alongside spam emails, group chat pings, and social media notifications. For low-priority reminders, that is fine. For urgent deadlines, medication, and flight check-ins, a swiped notification is a missed commitment.

To solve this, I built **[Productivity Caller](https://shivammahajan.com/projects/productivity-caller/)**, a native Android reminder application that replaces passive push banners with **automated incoming phone calls**.

Here is the engineering breakdown of how it works, the Android platform constraints, and how I built the natural language parser.

---

## 1. Core Architecture: Bypassing Notification Blindness

A phone call commands immediate cognitive attention. Android’s system handles incoming calls through priority audio channels and full-screen intents that bypass standard Do Not Disturb and notification grouping.

### The Stack:
- **Language:** 100% Kotlin
- **UI Framework:** Jetpack Compose (Declarative state-driven UI)
- **Scheduling Engine:** Android `AlarmManager` with exact alarms (`setExactAndAllowWhileIdle`)
- **Persistence:** Room Database (SQLite) + Kotlin Coroutines & Flow
- **Background Dispatch:** Android Telecom & Telephony APIs

When a scheduled task reaches its timestamp, the app triggers a high-priority broadcast receiver that initializes an incoming call intent, ringing the device with full-screen context until explicitly acknowledged.

---

## 2. Natural Language Parsing (80+ Datetime Formats)

Typing reminders with multi-step date and time pickers introduces high input friction. I engineered a zero-dependency, regex-based Natural Language Processing (NLP) parser capable of extracting timestamps directly from everyday speech patterns:

- *"Call dentist tomorrow at 4:30 pm"*
- *"Review pull request in 45 minutes"*
- *"Submit quarterly taxes next Friday 10 am"*

The parser recognizes **80+ distinct datetime permutations**, splitting the input into clean task metadata:
1. Strips out relative tokens (`tomorrow`, `next monday`, `in 2 hours`).
2. Computes the target epoch timestamp via `java.time` / `ZonedDateTime`.
3. Isolates the remaining string as the clean task description (`"Review pull request"`).

---

## 3. Platform Hurdles: Battery Optimizations & Exact Alarms

Building reliable background schedulers on modern Android (API 31+) comes with aggressive OS power management:

1. **Doze Mode & Standby Buckets:** Standard `WorkManager` jobs can be delayed by minutes or hours under aggressive battery savers. For exact-time reminders, `AlarmManager.setExactAndAllowWhileIdle()` is mandatory.
2. **`SCHEDULE_EXACT_ALARM` Permission:** Starting in Android 12+, exact alarm capabilities must be explicitly declared and checked at runtime. If revoked, the app falls back to user-guided permission settings.
3. **Full-Screen Intents (`USE_FULL_SCREEN_INTENT`):** Ensures that when the phone is locked, the incoming reminder call wakes the screen immediately rather than burying the notification in the lock screen shade.

---

## 4. Performance & Test Coverage

To guarantee zero missed reminders, the parser and scheduling state machines are validated against 425+ unit and integration tests covering:
- Leap year calculations and daylight saving transitions.
- Ambiguous time resolutions (e.g. "at 7" defaulting to the next upcoming 7:00 AM/PM).
- Battery-saver state recovery across system reboots via `BOOT_COMPLETED` broadcast receivers.

---

## Takeaways & Next Steps

Push notifications are great for passive updates, but critical tasks require higher friction to ignore. Building Productivity Caller showed how native platform APIs can reshape user habits when designed around genuine human attention constraints.

- **Deep Dive & Alternatives Matrix:** Read the full technical case study and comparison matrix on my site: [Productivity Caller vs Traditional Alarm Apps](https://shivammahajan.com/projects/productivity-caller-vs-alternatives/).
- **Live Demo Video:** [Watch the demo walk-through](https://drive.google.com/file/d/1O9mQD-Qeo7GR40SdG440pdqSM8NdXV_K/view?usp=sharing).

*Author: [Shivam Mahajan](https://shivammahajan.com/) — Software Engineer & Open Source Builder.*
