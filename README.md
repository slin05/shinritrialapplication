# shinritrialapplication

An always-on-top notes overlay for **Shinri Trial**, the Danganronpa roleplay gamemode in Garry's Mod.

During an investigation you have 7 to 15 minutes to track fingerprints, witnesses, alibis and Monokuma events. Alt-tabbing to Notepad costs time. This app keeps the community's agreed note format on top of the game, lets you fill it in by voice or keyboard, and copies the finished notes in one click.

---

## Features

- **The community note format, ready to fill.** It has 16 fingerprint slots, fingerprints by location, the investigation fields, Monokuma events, gloves and night vision.
- **One-click copy.** **Copy notes** outputs the exact `════` / `──` block, ready to paste into chat or Discord.
- **Voice input.** Each field has a 🎤 button. Click it, talk, and Windows voice typing fills that field.
- **Name autocomplete** for the full 56-character Shinri Trial roster: Trigger Happy Havoc, Goodbye Despair, Danganronpa Zero, Killing Harmony, and Ultra Despair Girls. Type a few letters and pick the name, so it's spelled right every time.
- **Detective cheat sheet**, with:
  - an investigation timer calculator
  - body discovery rules
  - fingerprint, glove and shoeprint mechanics
  - every sink location
  - freezer and sauna death times
  - kill-limit rules
  - repair stages
- **Stays on top of the game**, with adjustable transparency and a hotkey to hide it.
- **Autosave.** Your notes survive closing the app, until you click **New trial**.

## Download and install

1. Go to this repo's **Releases** page and download one of these:
   - `ShinriTrialNotes-Setup-x.x.x.exe` installs the app with a Start menu shortcut.
   - `ShinriTrialNotes-Portable-x.x.x.exe` is a single file you can run from anywhere, with no install.
2. Run it. Windows SmartScreen may say the app is unrecognized, because it isn't code-signed. Click **More info → Run anyway**.

> No release yet? Open the **Actions** tab, click the latest **Build Windows app** run, and download **ShinriTrialNotes-windows** at the bottom of the page.

### Required GMod setting

In Garry's Mod, set **Options → Video → Display Mode** to **Windowed (no border)**. No overlay can appear on top of a game running in fullscreen.

## How to use it

1. **Start a trial.** Click **New trial** to clear the previous notes. It asks once to confirm.
2. **Fill in fields** by typing, or click a 🎤 button and speak. In name-list fields such as witnesses and locations, each new dictation is added after a comma.
3. **Use autocomplete.** Start typing a name ("tog", "kiri") and press **Enter** or **Tab** to accept the suggestion.
4. **Copy your notes.** Click **Copy notes** and paste wherever your group shares them.

### Hotkeys

These work even while GMod has focus.

| Keys | Action |
| --- | --- |
| `Ctrl+Shift+N` | Show or hide the overlay |
| `Ctrl+Shift+↑` | Make the overlay more solid |
| `Ctrl+Shift+↓` | Make the overlay more see-through |
| 🎤 or `Win+H` | Dictate into the selected field |

The title bar also has an opacity slider, a 📌 button to turn always-on-top on or off, and minimize and close buttons. Drag the title bar to move the window. The app remembers its size and position.

### Output example

```
════════════════════════════════════════

── FINGERPRINTS: ──────────────────────

 1. # 1 - Byakuya Togami
 2. # 1 - Kyoko Kirigiri
 3. # -
...

── INVESTIGATION: ─────────────────────

Whose murder are we investigating?: Sayaka Maizono

Murder weapon: Kitchen knife
...
```

## Troubleshooting

| Problem | Fix |
| --- | --- |
| The overlay disappears behind GMod | Set GMod to **Windowed (no border)**, and make sure 📌 is pink (on). |
| 🎤 does nothing | Press `Win+H` once by hand. Windows will prompt you to turn on voice typing. After that, the button works. |
| The first 🎤 click is slow | The voice helper warms up when the app starts. Later clicks are instant. |
| Hotkeys don't work | Another program may be using the same shortcut. Close it, or use the title bar buttons instead. |
| The window is off-screen | Close and reopen the app. It moves itself back to a visible screen. |

## Building from source

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm start        # run the app
npm run dist     # build the Windows installer and portable .exe into dist/
```

Every push to `main` builds the Windows `.exe` files automatically with GitHub Actions. To publish a release, push a version tag:

```bash
git tag v1.0.0
git push --tags
```

### Project layout

```
main.js          Window, always-on-top, hotkeys, voice typing helper
preload.js       Safe bridge between the window and the page
app/index.html   The notes page (form, copy, autocomplete, cheat sheet)
.github/         Automatic Windows build
```

## Credits

- Cheat sheet facts and the character roster are summarized from the [Shinri Trial Guidebook](https://kirigiris.press/guidebook?lang=en).
- The note format is the Shinri Trial community's agreed investigation template.
- Built with [Electron](https://www.electronjs.org).

This is a fan-made tool. It isn't affiliated with the Shinri Trial developers, Spike Chunsoft, or the Danganronpa series.

## License

[MIT](https://opensource.org/license/mit)
