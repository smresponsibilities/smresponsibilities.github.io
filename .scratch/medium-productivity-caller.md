# Why I Built an Android Reminder App That Actually Calls Your Phone

*Most to-do lists fail because push notifications are too easy to ignore. Here is how I built a native Kotlin/Jetpack Compose alarm that forces an incoming call interface.*

---

**Canonical URL:** `https://shivammahajan.com/projects/productivity-caller/`  
*(In Medium: Story settings -> Advanced Settings -> "Customize canonical link" -> Enter URL above)*

---

Every developer and knowledge worker has experienced **notification blindness**.

At 2:00 PM, a push notification appears on your phone screen: *"Review quarterly report."* Without breaking focus, your thumb swipes it away. It blends seamlessly with Slack messages, Uber Eats updates, and group chat memes. Two hours later, you realize you missed the deadline.

Standard reminder applications—Todoist, TickTick, Google Tasks—rely on passive banner notifications. For casual errands, that is fine. But for high-stakes tasks, medication adherence, or urgent flights, a swiped banner is a failure mode.

To fix this for myself, I engineered **[Productivity Caller](https://shivammahajan.com/projects/productivity-caller/)**, an open-core native Android application that replaces passive notifications with **automated incoming phone calls**.

Here is an architectural breakdown of how it works under the hood, how it handles aggressive modern Android battery restrictions, and how its zero-dependency natural language parser was built.

---

## 1. Why Incoming Calls Beat Push Notifications

A phone call triggers an entirely different cognitive reaction than an app badge or banner. 

Android treats calls as high-priority real-time events. By routing reminders through Android’s native Telecom subsystem:
1. **Full-Screen Penetration:** If your device is locked, an incoming call wakes the display and presents the full-screen interaction overlay rather than hiding inside a notification tray.
2. **Audio Stream Prioritization:** Calls utilize the phone's primary ringer stream, ensuring the alert cuts through media volume and standard notification dampening.
3. **Active Dismissal Friction:** Swiping a banner is unconscious; declining or answering an incoming call requires deliberate physical interaction.

---

## 2. The Core Android Architecture

Productivity Caller is written in 100% Kotlin across 25,000+ lines of code, following clean architecture principles:

* **UI Layer:** Declarative UI built entirely in Jetpack Compose (101 `@Composable` functions, zero XML).
* **Scheduling Engine:** Android `AlarmManager` with exact execution (`setExactAndAllowWhileIdle`).
* **Persistence:** Room Database (SQLite) + reactive Kotlin Flow.
* **Call Subsystem:** Android Telecom Framework (`ConnectionService` + `addNewIncomingCall()`).

```kotlin
// Exact alarm dispatch ensuring execution during Doze mode
val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
val intent = Intent(context, ReminderReceiver::class.java).apply {
    action = ACTION_TRIGGER_CALL
    putExtra(EXTRA_TASK_ID, taskId)
}
val pendingIntent = PendingIntent.getBroadcast(
    context,
    taskId.hashCode(),
    intent,
    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
)

alarmManager.setExactAndAllowWhileIdle(
    AlarmManager.RTC_WAKEUP,
    triggerEpochMillis,
    pendingIntent
)
```

---

## 3. Surviving Android Battery Management (Doze & API 31+)

Building reliable schedulers on modern Android requires overcoming strict battery optimizations:

1. **Doze Mode Bypassing:** Background workers like `WorkManager` are batched during idle periods. For second-exact alerts, `AlarmManager.setExactAndAllowWhileIdle()` is mandatory.
2. **`SCHEDULE_EXACT_ALARM` Permissions:** Android 12+ restricts background exact alarm scheduling. The app implements a proactive runtime permission flow that detects when permissions are missing and directs the user to system settings.
3. **Reboot Persistence:** A `RECEIVE_BOOT_COMPLETED` broadcast receiver automatically reschedules all pending alarms from the Room SQLite database after device restarts.

---

## 4. Deterministic NLP Task Parser (80+ Datetime Formats)

Typing a task and manually opening date wheels and time pickers creates friction. I built a deterministic regex-based Natural Language Processing (NLP) parser (`NlpTaskParser.kt`) that extracts time metadata in under 3ms with zero cloud dependencies:

* *"Doctor appointment tomorrow at 10:30 am"* -> Extracted datetime: tomorrow 10:30 AM | Clean title: *"Doctor appointment"*
* *"Review pull request in 45 minutes"* -> Extracted datetime: +45m | Clean title: *"Review pull request"*
* *"Submit tax return next Friday 4 pm #urgent"* -> Tag: `urgent` | Datetime: next Friday 4:00 PM

By compiling 55 distinct regex rules, the parser resolves complex relative expressions without sending a single byte of user data to an external LLM API.

---

## 5. Architectural Comparison Matrix

| Evaluation Metric | Productivity Caller | Traditional Clock Alarms | To-Do Apps (Todoist / TickTick) |
|---|---|---|---|
| **Alert Type** | **Full-Screen Phone Call** | Continuous Audio Overlay | Passive Banner Notification |
| **Lock-Screen Wake** | **100% (Full UI)** | 100% (Full UI) | Low (Notification Shade) |
| **Dismissal Friction** | **High (Call Response)** | Medium (Swipe / Button) | Zero (Single Swipe) |
| **Cloud Dependency** | **100% Offline / Local** | 100% Offline | Cloud Required |
| **NLP Quick-Add** | **Yes (80+ Patterns)** | No (Manual Wheels) | Yes (Paid Tiers) |

For a comprehensive breakdown against competing alarm engines, see the full [Productivity Caller Alternatives Matrix](https://shivammahajan.com/projects/productivity-caller-vs-alternatives/).

---

## Demo & Verification

* **Full Case Study:** [shivammahajan.com/projects/productivity-caller/](https://shivammahajan.com/projects/productivity-caller/)
* **Comparison Matrix:** [shivammahajan.com/projects/productivity-caller-vs-alternatives/](https://shivammahajan.com/projects/productivity-caller-vs-alternatives/)
* **Video Demo:** [Watch the demo walk-through](https://drive.google.com/file/d/1O9mQD-Qeo7GR40SdG440pdqSM8NdXV_K/view?usp=sharing)
* **Test Suite:** 425+ unit and integration tests passing.

---

*Authored by [Shivam Mahajan](https://shivammahajan.com/) — Software Engineer & Open Source Developer.*
