// Decap CMS 的 GitHub OAuth 代理（Cloudflare Worker）
// 路由：
//   GET /auth     → 302 重定向到 GitHub 授权页
//   GET /callback → 用 code 换 access_token，postMessage 回 Decap 主窗口
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      const redirectUri = `${url.origin}/callback`;
      const target =
        `https://github.com/login/oauth/authorize` +
        `?client_id=${env.GITHUB_CLIENT_ID}` +
        `&scope=repo` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}`;
      return Response.redirect(target, 302);
    }

    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      if (!code) {
        return htmlResponse(errorScript("缺少 code 参数"));
      }
      try {
        const resp = await fetch("https://github.com/login/oauth/access_token", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code,
            redirect_uri: `${url.origin}/callback`,
          }),
        });
        const data = await resp.json();
        if (data.error || !data.access_token) {
          return htmlResponse(errorScript(data.error_description || data.error || "换取 token 失败"));
        }
        return htmlResponse(successScript(data.access_token));
      } catch (e) {
        return htmlResponse(errorScript(String(e)));
      }
    }

    return new Response("OAuth proxy for Decap CMS", { status: 200 });
  },
};

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

function htmlResponse(body) {
  return new Response(body, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
