# Shinri Trial Notes

I made this because I kept losing time during investigations. You've got somewhere between 7 and 15 minutes to figure out whose prints are where, who saw what, and whether that blackout happened before or after the murder. Alt-tabbing to Notepad mid-investigation kept costing me, so I made a little window that sits on top of GMod with our community note format already in it.

You fill it in as you go (typing or talking), hit **Copy notes**, and paste it wherever your group shares notes. That's basically it.

## What it does

- It has our agreed note format built in: all 16 fingerprint slots, prints by location, the investigation questions, Monokuma events, and who has gloves or night vision.
- **Copy notes** gives you the exact `════` / `──` block everyone uses, so you don't have to fix formatting before you paste.
- Every field has a 🎤 button. Click it, say what you need, and Windows voice typing fills it in. Handy when you're running between rooms.
- Names autocomplete for the whole 56-character roster (THH, SDR2, Zero, V3, and UDG). Type "tog" or "kiri" and pick the name, so nobody ends up as "Byakya Togomi" in the notes.
- There's a cheat sheet at the bottom with all the stuff I always forget mid-trial: how long the investigation lasts, how fingerprints and gloves actually work, where every sink is, how long the freezer and sauna take to kill someone, kill limits, and the repair order.
- It stays on top of the game. You can make it see-through or hide it with a hotkey.
- Your notes save automatically, so closing the app by accident won't wipe them. They only clear when you hit **New trial**.

## Getting it

Head to the **Releases** page and grab one of these:

- `ShinriTrialNotes-Setup-x.x.x.exe` if you want it installed with a Start menu shortcut
- `ShinriTrialNotes-Portable-x.x.x.exe` if you'd rather just run a single file

Windows will probably throw a SmartScreen warning the first time, since I didn't pay for code signing. Click **More info**, then **Run anyway**.

If there's no release up yet, go to the **Actions** tab, open the latest **Build Windows app** run, and download **ShinriTrialNotes-windows** from the bottom of the page.

### One GMod setting you need

Set **Options → Video → Display Mode** to **Windowed (no border)**. If GMod runs in true fullscreen, nothing can show on top of it, including this.

## Using it

When a new chapter starts, hit **New trial** to clear out the old notes. It'll ask you once to make sure you meant it.

From there, just fill things in. Type, or click a 🎤 and talk. In the fields that hold several names (witnesses, prints by location), each thing you say gets added after a comma instead of replacing what's there. When you start typing a name, press **Enter** or **Tab** to take the suggestion.

When you're ready to share, hit **Copy notes** and paste.

### Hotkeys

These work even while you're in the game.

| Keys | What it does |
| --- | --- |
| `Ctrl+Shift+N` | Show or hide the window |
| `Ctrl+Shift+↑` | Make it more solid |
| `Ctrl+Shift+↓` | Make it more see-through |
| 🎤 or `Win+H` | Talk into the selected field |

The title bar also has an opacity slider, a 📌 button for always-on-top, and the usual minimize and close buttons. Drag the title bar to move the window around. It remembers where you left it.

### What the copied notes look like

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

## If something's off

**The window keeps going behind GMod.** Make sure GMod is on Windowed (no border), and check that the 📌 is pink. Pink means it's on.

**The 🎤 button doesn't do anything.** Press `Win+H` once yourself. Windows will ask you to turn on voice typing, and after that the button works.

**The first 🎤 click is a bit slow.** That's normal. It warms up when the app opens, and every click after that is instant.

**The hotkeys don't work.** Something else on your PC is probably using the same shortcut. You can still use the buttons in the title bar.

**The window is off-screen somewhere.** Close it and open it again. It'll put itself back on a screen you can see.

## Building it yourself

You'll need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm start        # run it
npm run dist     # build the .exe files into dist/
```

GitHub builds the `.exe` files automatically every time something gets pushed to `main`. To put out a proper release, tag it:

```bash
git tag v1.0.0
git push --tags
```

If you want to poke around the code, `main.js` handles the window, hotkeys, and voice typing, `preload.js` connects the window to the page, and everything you actually see is in `app/index.html`.

## Credits

The cheat sheet and the character list come from the [Shinri Trial Guidebook](https://kirigiris.press/guidebook?lang=en), which is worth reading if you haven't. The note format is the one our community agreed on. I just put it in a window.

This is a fan project. It's not affiliated with the Shinri Trial devs, Spike Chunsoft, or Danganronpa.

## License

[MIT](LICENSE). Use it, change it, share it.
