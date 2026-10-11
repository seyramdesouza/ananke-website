// Cloudflare Pages Function: finishes the GitHub login for Decap CMS and hands
// the token back to the /admin window. Needs GITHUB_CLIENT_ID and
// GITHUB_CLIENT_SECRET set in Cloudflare Pages → Settings → Environment variables.

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookieState = (request.headers.get('Cookie') || '').match(/(?:^|;\s*)decap_oauth_state=([^;]+)/)?.[1];

  if (!code || !state || state !== cookieState) {
    return reply(url.origin, 'error', { error: 'Login could not be verified. Please try again.' });
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': 'ananke-decap-oauth',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/api/callback`,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!data.access_token) {
    return reply(url.origin, 'error', { error: data.error_description || 'GitHub login failed.' });
  }

  return reply(url.origin, 'success', { token: data.access_token, provider: 'github' });
}

// Decap's popup handshake: announce "authorizing:github", wait for the admin
// window to answer, then send the result back to that same origin only.
function reply(origin, status, content) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  const safe = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Signing in…</title></head>
<body>
<p>Completing sign-in…</p>
<script>
  (function () {
    var origin = ${safe(origin)};
    function receive(event) {
      if (event.origin !== origin) return;
      window.opener.postMessage(${safe(message)}, origin);
      window.removeEventListener('message', receive);
    }
    window.addEventListener('message', receive, false);
    window.opener.postMessage('authorizing:github', origin);
  })();
</script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Set-Cookie': 'decap_oauth_state=; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
    },
  });
}
