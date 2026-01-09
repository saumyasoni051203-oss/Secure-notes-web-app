# Secure-notes-web-app
A lightweight, client-side notes application that allows users to create, edit, and protect notes using password-based locking.
The project focuses on clear state management, intentional UX decisions, and clean logic, rather than feature bloat.

# Features:
(1) Create, edit, and delete notes.
(2) Optional password protection for notes.
(3) Password-based locking and unlocking.
(4) Locked notes hide content until unlocked.
(5) Cancel editing mid-way without saving.
(6) Persistent storage using localStorage.

# Security model (Important design decision):
# This application uses password-based locking only.
(1) A note cannot be locked without a password.
(2) Locking always implies password protection.
(3) Unlocking always requires password verification.
(4) There is no "soft lock" or visibility-only lock.
# This design was chosen intentionally to:
(1) Avoid ambiguous lock states.
(2) Keep security semantics consistent.
(3) Reduce edge cases and UX confusion.
Passwords are stored as hashed values (not plaintext) in local storage. This project is not intended for high-security use, but demonstrates correct security reasoning for client-side applications.

# Design Philosophy:
(1) Clarity over complexity: Features are added only when they improve correctness or usability.
(2) Explicit state transitions: Notes move through clear states, unproteted --> protected (locked) --> protected (unlocked).
(3) Mninmal UI, strong logic: The interface stays simple while the internal logic remains robust and predictable.

# Tech stack:
(1) HTML.
(2) CSS.
(3) Vanilla JavaScript.
(4) Browser localStorage.
(No frameworks used intentionally.)

# Project structure:
index.html
style.css
script.js

# Limitations:
(1) Client-side only (no backend).
(2) Passwords are hashed but stored locally.
(3) Not suitable for sensitive or production-grade data.

# Why this project exists:
This project was built to:
(1) Practice real-world state handling.
(2) Demonstrate intentional UX and security decisions.
(3) Avoid tutorial-style or over-engineered implementations.

