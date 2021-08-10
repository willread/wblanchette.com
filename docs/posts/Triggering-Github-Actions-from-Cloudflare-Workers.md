---
title: Triggering Github Actions from Cloudflare Workers
date: August 8, 2021
writtenBy: Will Read
---

I recently encountered an issue when trying to trigger a Github Action via a webhook from the [Prismic CMS](https://prismic.io/), as Prismic doesn't support specifying a custom POST body for a webhook, but the [Github API](https://docs.github.com/en/rest) requires a `ref` parameter to be passed.

To work around this, I set up a simple Cloudflare Worker to make the request.

For security reasons, it requires an `Access-Token` header be passed when calling the worker function. This and a few configuration parameters are stored in [wrangler secrets](https://developers.cloudflare.com/workers/cli-wrangler/commands#secret):

- ACCESS_TOKEN: An access token used to secure the worker
- GITHUB_USERNAME: The github username where the Github Action lives
- GITHUB_REPO: The name of the repository where the Github Action lives
- GITHUB_BRANCH: The branch (or tag) to run the Github Action on
- GITHUB_PWA: A [person access token](https://github.com/settings/tokens) with the `workflow` scope

These can be set using `wrangler secret put <SECRET_NAME>`.

Create a new Cloudflare Worker with the following code:

```
addEventListener('fetch', (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});

async function handleRequest(request) {
  if (request.headers.get('Access-Token') !== ACCESS_TOKEN) {
    return new Response('Invalid access token!', { status: 403 });
  }

  const url = `https://api.github.com/repos/${GITHUB_USERNAME}}/${GITHUB_REPO}/actions/workflows/main.yml/dispatches`;
  const body = JSON.stringify({ref: GITHUB_BRANCH});
  const headers = {
    'Content-type': 'application/x-www-form-urlencoded',
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${GITHUB_PWA}`,
    'User-Agent': GITHUB_USERNAME,
  };
  const response = await fetch(url, {
    method: 'POST',
    body,
    headers,
  });

  return new Response(JSON.stringify(response));
}
```
Once deployed, the worker is ready to run:

```
curl \
  -X GET \
  -H "Access-Token: <YOUR_ACCESS_TOKEN>" \
  https://<YOUR_SUBDOMAIN>.workers.dev
```
