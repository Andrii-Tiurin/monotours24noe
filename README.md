# Monotours24 CMS Website

## Start
```bash
npm install
npm start
```
Open:
- Site: `http://localhost:3010/`
- Admin: `http://localhost:3010/admin`

## Admin login
Required environment variables:
- `SESSION_SECRET` — at least 32 random characters (the server refuses to start without it).
- `ADMIN_PASSWORD` — optional, at least 12 characters, used only when `data/users.json` does not exist yet.
  Without it a random initial password is generated and printed once in the server log.

Username: `admin`. Change the password in the admin panel after the first login.
`data/users.json` is created at first start and is not committed (see `.gitignore`).

## What you can manage in admin
- Site name, tagline, logo text, favicon text/icon
- Menu labels/links (via JSON in `data/content.json` or full content save)
- Footer text
- Hot tours
- Popular countries
- Articles
- Contacts
- Email for lead notifications
- SMTP settings for outgoing email

## Data files
- `data/content.json` — website content
- `data/users.json` — admin auth hash
- `data/leads.json` — contact form requests
