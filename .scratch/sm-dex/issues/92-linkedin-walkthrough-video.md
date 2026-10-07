# Ticket 92: LinkedIn site walkthrough video

Type: task
Status: resolved
Blocked by: none

## Goal

Record a silent, 60-second landscape walkthrough of the live shivammahajan.com site for a LinkedIn post.

## Acceptance criteria

- Deliver a playable 1920 by 1080 H.264 MP4 lasting 60 seconds.
- Show real site interactions, generation changes, portfolio content, and the public roster form.
- Do not submit the form or publish the video.

## Answer

Recorded the live website with Playwright and exported a silent H.264 MP4 with FFmpeg.
The walkthrough covers device navigation, all nine generations, the about and experience
sections, projects, and the public roster form. No form was submitted.

Output: `.scratch/sm-dex/linkedin-video/shivam-mahajan-linkedin-60s.mp4`.
Capture script: `.scratch/sm-dex/record-linkedin.cjs`.

Verification: FFprobe reports 60.000 seconds, 1920 by 1080, 30 fps, H.264, yuv420p,
and 11,070,482 bytes. Full FFmpeg decode completed without errors. A contact sheet
was inspected for framing and scene coverage.

## Handoff

**Built:** A one-minute landscape video ready for the user's LinkedIn post. The MP4 and raw capture are under `.scratch/sm-dex/linkedin-video/`.
**Deviated:** Nothing. This is a recording of production, with no application changes.
**Watch out:** The video is silent and has not been published. The capture script operates the current production UI and depends on its accessible button names.
