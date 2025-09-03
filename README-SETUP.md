# AndroidApp – Expo Managed Setup (Single Download)

This project is **Expo-managed** (no native `android/` or `ios/` folders). You can run it on an **Android emulator** via **Android Studio** _without converting the project to native_.

## 1) Requirements
- **Node.js 18+** (LTS recommended). Confirm with `node -v`.
- One package manager: **npm** (bundled with Node), or yarn/pnpm.
- **Android Studio** (just to launch an **Android Virtual Device**, AVD).

> You do **not** need to open this project in Android Studio. Use Android Studio only to create/start the emulator.

## 2) Install dependencies
```bash
cd AndroidApp
npm install
# or: yarn
# or: pnpm install
```

## 3) Start the Expo dev server
```bash
npx expo start
```

- A browser window/terminal menu will open.
- Keep it running while you test the app.

## 4) Launch an Android emulator (AVD)
1. Open **Android Studio** → **More Actions** → **Virtual Device Manager** (or **Device Manager**).
2. Create a device if you don't have one (e.g., Pixel 6 on a recent API).
3. **Start** the emulator.

## 5) Install & run on the emulator
- Return to the terminal that’s running Expo.
- Press **a** to target Android.
  - Expo will install **Expo Go** on the emulator (using ADB) and open the app automatically.
  - If prompted, allow network permissions.

## 6) Optional: run on a physical Android device
1. Enable **Developer options** → **USB debugging** on your phone.
2. Plug it in; confirm `adb devices` shows it.
3. In the Expo terminal/UI, select the physical device under Android targets.

## Notes
- This app remains **Expo managed**—no native Android project is created.
- If you later want native code or a Play Store build without EAS, you can run `npx expo prebuild -p android` to generate `/android` (not required for emulator testing).

---

### Handy files
- `PROJECT_TREE.txt` – quick view of the folder structure.
- `PROJECT_REPORT.txt` – detection summary (Expo managed, SDK version, etc.).

Generated: 2025-09-03
