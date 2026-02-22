# Monotours24 CMS Website

## Start
```bash
npm install
npm start
```
Open:
- Site: `http://localhost:3010/`
- Admin: `http://localhost:3010/admin`

## Default admin login
- Username: `admin`
- Password: `Monotours24!ChangeMe`

⚠️ Change password immediately in admin panel.

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
