// Decap CMS 的 GitHub OAuth 代理（Vercel Serverless Function）
// 路由（经 vercel.json rewrite）：
//   /auth     → 302 重定向到 GitHub 授权页
//   /callback → 用 code 换 access_token，postMessage 回 Decap 主窗口
export default async function handler(req, res) {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host;
  const origin = `${proto}://${host}`;
  const path = req.query.path || req.url.split("?")[0];

  if (path.endsWith("/auth") || path === "auth") {
    const redirectUri = `${origin}/callback`;
    const target =
      `https://github.com/login/oauth/authorize` +
      `?client_id=${process.env.GITHUB_CLIENT_ID}` +
      `&scope=repo` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}`;
    res.writeHead(302, { Location: target });
    return res.end();
  }

  if (path.endsWith("/callback") || path === "callback") {
    const code = req.query.code;
    if (!code) return html(res, errorScript("缺少 code 参数"));
    try {
      const resp = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: `${origin}/callback`,
        }),
      });
      const data = await resp.json();
      if (data.error || !data.access_token) {
        return html(res, errorScript(data.error_description || data.error || "换取 token 失败"));
      }
      return html(res, successScript(data.access_token));
    } catch (e) {
      return html(res, errorScript(String(e)));
    }
  }

  res.statusCode = 200;
  res.end("OAuth proxy for Decap CMS");
}

function successScript(token) {
  const payload = JSON.stringify({ token, provider: "github" });
  return `<!doctype html><html><head><meta charset="utf-8"><title>登录成功</title></head>
<body><p>登录成功，您可以关闭本页面。</p>
<script>
(function () {
  function send() {
    if (window.opener) {
      window.opener.postMessage("authorizing:github", "*");
      window.opener.postMessage("authorization:github:success:" + ${JSON.stringify(payload)}, "*");
    }
  }
  send();
  setTimeout(send, 250);
})();
</script></body></html>`;
}

function errorScript(msg) {
  const payload = JSON.stringify({ error: String(msg), provider: "github" });
  return `<!doctype html><html><head><meta charset="utf-8"><title>登录失败</title></head>
<body><p>登录失败：${String(msg)}</p>
<script>
(function () {
  if (window.opener) {
    window.opener.postMessage("authorization:github:error:" + ${JSON.stringify(payload)}, "*");
  }
})();
</script></body></html>`;
}

function html(res, body) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(body);
}
