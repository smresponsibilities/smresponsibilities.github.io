// Rear components follow g7-02, the SM concept sheet selected by the user.
// Arm plates sit inside the two zigzag recesses. The front SVG takes over after
// the half-turn and extends the arms from these same horizontal positions.
// The silhouette mirrors this study's adapted front, not the concept's perspective.
export const rotomRear = `<g stroke="#56272e" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <g transform="translate(940 0) scale(-1 1)">
    <path d="M370 202C373 160 359 98 370 48Q374 35 384 49C409 79 438 139 461 194Z" fill="#f05a59"/>
    <path d="M310 599C309 622 327 658 346 666Q363 673 367 651L361 605Z" fill="#cd3d4c"/>
    <path d="M580 597C578 621 603 659 624 663Q641 666 639 645C637 624 621 601 607 589Z" fill="#f05a59"/>
    <path d="M235 270C276 221 342 190 424 184C533 176 653 193 721 237Q733 245 726 259L697 319L692 579Q692 612 658 620H284Q252 620 246 587L231 333L200 315Q190 310 198 296Z" fill="#f05a59"/>
    <path d="M206 303C253 246 319 211 391 201M466 193C563 189 652 211 710 243" fill="none" stroke="#ffa08a"/>
    <path d="M242 338L257 582Q261 607 286 608H652Q678 605 680 579L686 333" fill="none" stroke="#cd3d4c" stroke-width="5"/>
  </g>
  <path data-part="rear-camera-module" d="M405 226Q470 211 533 227L520 305H422Z" fill="#d74250"/>
  <circle cx="469" cy="260" r="25" fill="#f4f8e8"/>
  <circle cx="469" cy="260" r="17" fill="#294858"/>
  <circle cx="469" cy="260" r="9" fill="#4fbedf" stroke="none"/>
  <path d="M458 250Q465 243 474 249" fill="none" stroke="#c9ffff" stroke-width="3"/>
  <path data-part="rear-left-slot" d="M298 260L390 238L413 398L382 414L404 471L371 482L386 530L360 536L320 448L350 436L331 386L312 390Z" fill="#873642"/>
  <path data-part="rear-right-slot" d="M548 240L641 262L622 391L603 387L585 437L615 449L574 537L548 531L563 483L531 472L552 414L520 399Z" fill="#873642"/>
  <g data-motion="rear-stowed-left-arm">
    <path data-part="rear-left-recess" d="M298 260L390 238L413 398L382 414L404 471L371 482L386 530L360 536L320 448L350 436L331 386L312 390Z" fill="#db4652"/>
    <path data-part="rear-stowed-left-arm" d="M337 279L373 270L392 389L366 404L387 468L364 476L376 516" fill="none" stroke="#8f3542" stroke-width="12"/>
    <path d="M339 279L369 272L386 386" fill="none" stroke="#f27b72" stroke-width="3"/>
    <ellipse cx="371" cy="493" rx="13" ry="20" transform="rotate(-17 371 493)" fill="#c84e52"/>
  </g>
  <g data-motion="rear-stowed-right-arm">
    <path data-part="rear-right-recess" d="M548 240L641 262L622 391L603 387L585 437L615 449L574 537L548 531L563 483L531 472L552 414L520 399Z" fill="#db4652"/>
    <path data-part="rear-stowed-right-arm" d="M603 281L568 272L548 390L574 405L553 469L576 477L563 516" fill="none" stroke="#8f3542" stroke-width="12"/>
    <path d="M601 281L572 274L554 387" fill="none" stroke="#f27b72" stroke-width="3"/>
    <ellipse cx="569" cy="494" rx="13" ry="20" transform="rotate(17 569 494)" fill="#c84e52"/>
  </g>
  <circle data-part="rear-round-cover" cx="469" cy="561" r="22" fill="#e85055"/>
  <path d="M449 561H452M486 561H489M469 541V544M469 578V581" stroke="#56272e"/>
</g>`;
