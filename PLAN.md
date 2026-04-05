# Site Polish Plan — Montucky Moonshine

## Audit Summary

Full audit revealed these categories of issues across ~45 HTML files:

1. **Broken internal links**: 3 root-level recipe pages referenced but missing (recipe-campfire-sour.html, recipe-peach-shine.html, recipe-straight-pour.html)
2. **Nav/footer inconsistency**: Footers vary wildly across pages (different column structures, missing payment icons, different link sets). Social links still use # placeholders on index.html.
3. **SEO gaps**: 6+ pages missing meta descriptions, 5+ missing OG tags, 5+ missing canonical URLs, 24+ pages missing JSON-LD structured data. No robots.txt.
4. **Accessibility**: 10+ hero/content images with empty alt text that should be descriptive. Missing print stylesheet for recipes.
5. **Duplicate content**: Root-level recipes.html and recipe-*.html overlap with lifestyle/recipes/ pages — SEO cannibalization risk.
6. **Missing preloader**: 8 lifestyle recipe pages missing the preloader component.
7. **Inconsistent preloader markup**: Some pages use different preloader HTML (class vs id differences).
8. **Missing redirects in netlify.toml**: Several existing pages have no redirect entries.
9. **No robots.txt**: Missing entirely.

## Work Units

### Unit 1: Fix broken links & consolidate duplicate recipe pages
**Files**: recipe-campfire-sour.html (create stub or remove refs), recipe-peach-shine.html, recipe-straight-pour.html, recipes.html, recipe-montana-mule.html, recipe-huckleberry-shine.html, recipe-midnight-smoke.html
**Change**: Remove references to 3 non-existent recipe pages. Update old root recipe pages to redirect to lifestyle equivalents. Clean up recipes.html to redirect to lifestyle/recipes/.

### Unit 2: Standardize footer across all root-level pages
**Files**: index.html, shop.html, venue.html, about.html, contact.html, faq.html, history.html, recipes.html, product.html, 404.html, thank-you.html, deliverables.html, email-flows.html, growth-plan.html
**Change**: Make all root-level page footers consistent — same column structure, same links, same payment icons, same social links with real URLs (not # placeholders).

### Unit 3: Standardize footer across all lifestyle pages
**Files**: lifestyle/index.html, lifestyle/recipes/index.html, lifestyle/recipes/*.html (18 files), lifestyle/culture/index.html, lifestyle/culture/*.html (5 files), lifestyle/guides/*.html (3 files)
**Change**: Make all lifestyle page footers consistent with the same pattern, proper relative paths.

### Unit 4: Add missing SEO metadata to root pages
**Files**: 404.html, thank-you.html, email-flows.html, growth-plan.html, product.html, deliverables.html, faq.html, shop.html, venue.html, about.html, history.html
**Change**: Add missing meta descriptions, OG tags, canonical URLs. Add JSON-LD where appropriate (FAQPage for faq.html already done, LocalBusiness for contact.html already done).

### Unit 5: Add JSON-LD Recipe schema to all lifestyle recipe pages
**Files**: lifestyle/recipes/*.html (18 recipe pages)
**Change**: Add complete JSON-LD Recipe schema with recipeIngredient array and recipeInstructions to every recipe page that's missing it.

### Unit 6: Add JSON-LD Article schema to culture/guide pages
**Files**: lifestyle/culture/*.html (5 articles), lifestyle/guides/*.html (3 guides), lifestyle/culture/index.html, lifestyle/recipes/index.html, lifestyle/index.html
**Change**: Add JSON-LD Article schema to all culture articles and guides. Add CollectionPage schema to index pages.

### Unit 7: Fix accessibility — alt text, skip links, preloader consistency
**Files**: All HTML files with empty alt="" on content images (~15 files), 8 lifestyle recipe pages missing preloader
**Change**: Add descriptive alt text to all hero/content images. Add preloader to 8 recipe pages that are missing it. Ensure all pages have skip link.

### Unit 8: Add robots.txt, print stylesheet, update sitemap
**Files**: robots.txt (create), css/style.css (add print styles), sitemap.xml (update)
**Change**: Create robots.txt with sitemap reference and proper directives. Add @media print styles for recipe pages. Update sitemap.xml with any missing URLs.

### Unit 9: Fix netlify.toml — missing redirects + legacy redirect cleanup
**Files**: netlify.toml
**Change**: Add missing redirect entries for all pages. Add 301 redirects from old root recipe pages to lifestyle equivalents. Clean up redirect ordering.

### Unit 10: Social links fix + final nav consistency pass
**Files**: All HTML files with social links (index.html footer, contact.html, about.html footers)
**Change**: Replace all # placeholder social links with real brand URLs. Ensure Facebook URL is consistent across all pages. Verify nav links are correct on every page.

## E2E Test Recipe

This is a static HTML site with no build step, no test suite, and no dev server needed. Workers should verify by:
1. Run `grep -rn 'href="#' *.html lifestyle/**/*.html` to confirm no broken anchor links remain
2. Run `grep -rn 'alt=""' *.html lifestyle/**/*.html` to confirm no empty alt text on content images
3. Validate HTML file count and structure: `find . -name "*.html" | wc -l`
4. Check for conflict markers: `grep -rn '<<<<<<' . --include="*.html"`
5. Skip browser-based e2e — no dev server available

## Worker Instructions

(Included verbatim in each agent prompt)
