# 770labs

Independent digital product studio website. Original identity, responsive editorial layout, English/Hebrew and full RTL support, lightweight motion, real project showcase, and four-step project brief.

## Local preview

Node.js 18+; no dependencies or build required.

```sh
npm start
```

Open http://127.0.0.1:4177. `npm run check` validates JavaScript syntax.

## Deployment

Publish the contents of `dist/` on any static host. All asset URLs are relative, including GitHub project Pages support. The GitHub Actions workflow publishes `dist/` to GitHub Pages when Pages is configured to use GitHub Actions. Add a custom domain later in repository Settings → Pages, update DNS, then add canonical and Open Graph URLs for the final domain.

## Contact flow

Submitting the four-step project brief automatically sends the enquiry to `770labs@gmail.com` (via FormSubmit AJAX) and offers a one-click option to continue the conversation on WhatsApp (`+972538203770`). A floating WhatsApp button in the bottom corner opens a pre-filled WhatsApp message tailored to the active display language (Hebrew or English). Change these destinations in `dist/index.html` and `dist/app.js` if needed.

## Content and identity

- Brand: 770labs, original geometric 770 mark (`dist/assets/mark.svg`).
- Palette: charcoal #151613, warm white #f2f2e9, electric lime #c4ff48.
- Type: Manrope / Heebo via Google Fonts with system fallbacks.
- Positioning: From what if. To what’s next.
- Chabad Calendar is the only supplied portfolio project; screenshot captured from its public interface. No invented clients, testimonials, awards, or performance metrics.
- Services and studio vision are proposed marketing copy; validate business offerings before promotion.
- All visible copy has English/Hebrew variants in HTML or the JS dictionary. English is default; visitor choice is stored in localStorage.
- Dialogs support Escape, keyboard focus, previous-step editing, validation, and safely escaped user text.
- CSS respects reduced motion. Decorative art is CSS, not a heavy video or WebGL dependency.

## References

Reviewed as inspiration only: https://hello.cuberto.com/, https://www.strv.com/, https://clay.global/, https://www.orizon.co/. No copied source or proprietary imagery from reference studios.

