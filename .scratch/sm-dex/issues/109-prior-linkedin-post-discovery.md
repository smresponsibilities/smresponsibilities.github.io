# Ticket 109: Discover prior LinkedIn challenge posts

Type: research
Status: resolved
Blocked by: none

## Question

Can public search or LinkedIn's unauthenticated pages recover earlier 2002 Days of Code posts from the Day 1236 example?

## Answer

Verified the supplied LinkedIn embed returns HTTP 200 and identifies Shivam Mahajan as author. Its visible content names `#day1236` and LeetCode 1111; it does not include code or a solution. Corrected the local Day 1236 article and blog index to reflect that.

Searched Google, Bing, DuckDuckGo, Yandex, Startpage, Qwant, and Brave with exact challenge text, days 1233–1235, profile handle, both tagged names, and LinkedIn post URL patterns. No prior post URL could be verified. The profile's recent-activity page redirects an unauthenticated browser to LinkedIn's sign-up wall; direct HTTP requests return 999. The known embed exposes only its own share/activity IDs, not a list of earlier posts. Adjacent numeric IDs cannot be assumed to belong to this profile.

No earlier posts were added. Reliable recovery needs links or access to the signed-in profile's activity list. The official Posts API requires approved `r_member_social` access for reading member posts.

## Handoff

**Built:** Corrected Day 1236 article and blog index. Build, page HTTP check, and SlopMonster check pass.
**Deviated:** Nothing.
**Watch out:** Do not infer earlier day numbers, URLs, topics, or continuity from one post. Search visibility is insufficient for automated import.
