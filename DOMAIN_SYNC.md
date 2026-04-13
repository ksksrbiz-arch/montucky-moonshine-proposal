# Domain Sync — montuckymoonshine.com

## When Daryl confirms the domain, run this one command:

```bash
# Single sed command swaps ALL canonicals + og:urls across the entire site
find . -name "*.html" -not -path "./.git/*" -exec sed -i \
  's|https://montucky-moonshine-proposal.netlify.app|https://montuckymoonshine.com|g' {} \;
```

Then:
1. git add -A && git commit -m "Domain sync: netlify → montuckymoonshine.com" && git push
2. In Netlify dashboard: Site Settings → Domain Management → Add custom domain → montuckymoonshine.com
3. Add CNAME record in domain registrar: www → montucky-moonshine-proposal.netlify.app
4. Netlify provisions SSL automatically (2-5 min)
5. Update Shopify store to redirect homepage traffic to new URL (or use as subdomain)

## What changes with the domain:
- All canonical tags (SEO — tells Google which URL is the real one)
- All og:url tags (social share links)
- JSON-LD @id fields

## What stays the same:
- All external links (montuckymoonshine.com/collections/ etc)
- Logo/favicon (already from montuckymoonshine.com CDN)
- Netlify Forms (work on any domain)
