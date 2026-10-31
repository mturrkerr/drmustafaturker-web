// Tüm siteyi (sayfalar ve görüntüler dahil) kullanıcı adı ve şifre ile korur.
// Kullanıcı adı ve şifre koda yazılmaz; Vercel panelinde ortam değişkeni
// olarak tanımlanır: SITE_USER ve SITE_PASSWORD.
import { next } from '@vercel/functions';
import { timingSafeEqual, createHash } from 'node:crypto';

function same(a, b) {
  const ha = createHash('sha256').update(a).digest();
  const hb = createHash('sha256').update(b).digest();
  return timingSafeEqual(ha, hb);
}

export default function middleware(request) {
  const user = process.env.SITE_USER;
  const password = process.env.SITE_PASSWORD;

  // Şifre tanımlanmamışsa site açık kalmasın.
  if (!user || !password) {
    return new Response('Site henüz yapılandırılmadı.', {
      status: 503,
      headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
    });
  }

  const header = request.headers.get('authorization') || '';
  if (header.startsWith('Basic ')) {
    let decoded = '';
    try {
      decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
    } catch {}
    const i = decoded.indexOf(':');
    if (i !== -1 && same(decoded.slice(0, i), user) && same(decoded.slice(i + 1), password)) {
      return next();
    }
  }

  return new Response('Bu siteye erişmek için giriş yapmanız gerekiyor.', {
    status: 401,
    headers: {
      'www-authenticate': 'Basic realm="Dr. Mustafa Turker", charset="UTF-8"',
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}
