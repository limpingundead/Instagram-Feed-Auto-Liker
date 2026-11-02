# Instagram-Feed-Auto-Liker
A lightweight standalone JavaScript tool for Instagram Web that detects visible feed posts, performs controlled Like actions, and automatically scrolls the feed.  No Chrome extension, Python installation, external API, or additional software is required.
Features

Automatic Like Detection: Detects visible Instagram Like controls.

Automatic Feed Scrolling: Scrolls the feed when no eligible visible Like control is found.

Already-Liked Detection: Avoids interacting with controls that are already marked as liked.

Session Limits: Maximum 10 Like actions per run.

Configurable Timing: Adjustable Like interval with a 30-second minimum.

Automatic Stop: Stops when common Instagram restriction warnings are detected.

Simple Controls: Start, stop, and check status directly through the browser console.

Requirements

Windows 10/11

Google Chrome

Instagram account

Internet connection

Project Structure

instagram-feed-auto-liker/
│
├── instagram-auto-liker.js
├── README.md
└── LICENSE

Installation

Download or clone this repository.

Open Google Chrome.

Visit https://www.instagram.com/

Sign in to your Instagram account.

Press Ctrl + Shift + J to open Developer Tools.

Open the Console tab.

Copy the complete contents of instagram-auto-liker.js.

Paste the code into the Console and press Enter.

The script is now loaded into your Instagram browser session.

Usage

Start the Auto Liker

IGAutoLiker.start(30000);

Check Current Status

IGAutoLiker.status();

Stop the Auto Liker

IGAutoLiker.stop();

The timing argument is expressed in milliseconds.

Default Configuration

Setting

Value

Maximum Like actions per session

10

Minimum Like interval

30 seconds

Automatic scroll check

5 seconds

Maximum configurable Like interval

300 seconds

Automatic feed scrolling and Like timing operate independently.

How It Works

The script identifies Instagram's Like SVG using:

svg[aria-label="Like"]

It then identifies the associated clickable control:

svg.closest('[role="button"]')

The script checks visibility and eligibility before interacting with the control.

When no eligible visible Like control is found, it attempts to scroll the feed to load additional posts.

Limitations

Requires an active Instagram browser session.

Instagram frontend updates may affect compatibility.

Only visible eligible Like controls are considered.

Does not bypass Instagram restrictions or rate limits.

A 300 ms automated Like interval is not supported.

Responsible Use

This is an independent, unofficial project and is not affiliated with Instagram or Meta.

Automated engagement may violate Instagram's platform rules or trigger account restrictions. Use responsibly and stop if Instagram displays an activity warning.

License

MIT License. See the LICENSE file.

Contributions

Contributions, bug reports, and compatibility improvements are welcome through GitHub Issues and Pull Requests.

Instagram Feed Auto Liker
Standalone JavaScript · No Extension · No API · No Python
