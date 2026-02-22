import express from 'express';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import fs from 'fs-extra';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3010;
const DATA_DIR = path.join(__dirname, 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

await fs.ensureDir(DATA_DIR);
if (!(await fs.pathExists(LEADS_FILE))) await fs.writeJson(LEADS_FILE, []);
if (!(await fs.pathExists(USERS_FILE))) {
  const hash = await bcrypt.hash('Monotours24!ChangeMe', 10);
  await fs.writeJson(USERS_FILE, { username: 'admin', passwordHash: hash });
}

app.use(express.json({ limit: '20mb' }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'change-this-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 8 }
}));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/admin', (_req, res) => res.sendFile(path.join(__dirname, 'public/admin.html')));

app.use((err, _req, res, next) => {
  if (err?.type === 'entity.too.large') {
    return res.status(413).json({ error: 'payload_too_large', message: 'Bild zu groß. Bitte kleineres Bild nutzen.' });
  }
  return next(err);
});

const readContent = async () => fs.readJson(CONTENT_FILE);
const writeContent = async (obj) => fs.writeJson(CONTENT_FILE, obj, { spaces: 2 });

function auth(req, res, next) {
  if (!req.session?.auth) return res.status(401).json({ error: 'unauthorized' });
  next();
}

app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body || {};
  const user = await fs.readJson(USERS_FILE);
  const ok = username === user.username && await bcrypt.compare(password || '', user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'invalid_credentials' });
  req.session.auth = true;
  res.json({ ok: true });
});

app.post('/api/admin/logout', (req, res) => req.session.destroy(() => res.json({ ok: true })));

app.post('/api/admin/change-password', auth, async (req, res) => {
  const { newPassword } = req.body || {};
  if (!newPassword || newPassword.length < 10) return res.status(400).json({ error: 'weak_password' });
  const user = await fs.readJson(USERS_FILE);
  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await fs.writeJson(USERS_FILE, user, { spaces: 2 });
  res.json({ ok: true });
});

app.get('/api/public/content', async (_req, res) => res.json(await readContent()));
app.get('/api/admin/content', auth, async (_req, res) => res.json(await readContent()));
app.put('/api/admin/content', auth, async (req, res) => {
  await writeContent(req.body);
  res.json({ ok: true });
});

app.post('/api/public/contact', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'invalid_payload' });

  const leads = await fs.readJson(LEADS_FILE);
  leads.push({ name, email, message, at: new Date().toISOString() });
  await fs.writeJson(LEADS_FILE, leads, { spaces: 2 });

  const content = await readContent();
  const smtp = content.smtp || {};
  if (smtp.host && smtp.user && smtp.pass && content.contacts?.notifyEmail) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtp.host,
        port: Number(smtp.port || 587),
        secure: Number(smtp.port) === 465,
        auth: { user: smtp.user, pass: smtp.pass }
      });
      await transporter.sendMail({
        from: smtp.from || smtp.user,
        to: content.contacts.notifyEmail,
        subject: `Neue Anfrage von ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`
      });
    } catch (e) {
      console.error('email send error', e.message);
    }
  }

  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Monotours24 CMS running on http://localhost:${PORT}`);
  console.log('Default admin login: admin / Monotours24!ChangeMe (change immediately)');
});
