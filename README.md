# Client Timesheet

A phone app for logging time spent on accounting clients: client, time, and the task performed, with day, week and month summaries you can tap into.

- Works offline once installed.
- Entries are kept in the phone's own browser storage. Nothing is sent anywhere and no account is needed.
- No outside services: fonts and icons are included in this folder.

## 1. Put it online (once)

A phone can only install a web app from an https address, so this folder needs to be hosted somewhere once. The host serves the app's files only. It never sees any entries.

GitHub Pages is free:

1. Create a new repository on GitHub, for example `timesheet`.
2. Upload everything in this folder, keeping the `fonts` and `icons` folders.
3. Go to **Settings → Pages**, set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`, then click **Save**.
4. After a minute or two the app is at `https://<your-username>.github.io/timesheet/`.

Any static host works the same way, for example Netlify, Cloudflare Pages or your own web server.

## 2. Install it on the phone

Open the address in the phone's browser, then:

- **Android (Chrome):** tap ⋮, then **Install app**. Newer Chrome calls this **Install and create shortcut**.
- **iPhone (Safari):** tap **Share**, then **Add to Home Screen**.

It then opens from the home screen like any other app, with or without internet.

## Looking after the data

- Entries live only on that phone. Uninstalling the app or clearing the browser's data for the site deletes them.
- Use **Settings → Download backup file** regularly. The app reminds you after 14 days without a backup.
- **Settings → Restore from backup file** brings entries back, on the same phone or a new one.
- **Export CSV** creates a spreadsheet for invoicing. On a phone it opens the share sheet, so you can send it by email, WhatsApp or Drive.

## Updating the app

Edit the files, change `VERSION` at the top of `sw.js` (for example to `timesheet-v2`), and upload again. The phone picks up the new version the second time the app is opened while online. Entries are not affected.
