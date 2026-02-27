//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {

  // sponsorOrg autocomplete is now handled by the renderQuestion macro in _question.html
  // Items are defined in questions.js and initialised inline when the select type is rendered

  initMojSubNavAsTabs()

})

function initMojSubNavAsTabs() {
  const nav = document.querySelector('.moj-sub-navigation')
  if (!nav) return

  const links = Array.from(nav.querySelectorAll('.moj-sub-navigation__link'))
  if (!links.length) return

  // Only panels with these classes (matches your markup)
  const panels = Array.from(document.querySelectorAll('.govuk-tabs__panel'))

  const setActive = (hash) => {
    // Clear current state
    links.forEach((a) => a.removeAttribute('aria-current'))
    panels.forEach((p) => p.classList.add('govuk-tabs__panel--hidden'))

    // If no hash, default to first link's target
    const targetHash = hash || links[0].getAttribute('href')
    if (!targetHash || !targetHash.startsWith('#')) return

    // Set aria-current on matching link
    const activeLink = links.find((a) => a.getAttribute('href') === targetHash)
    if (activeLink) activeLink.setAttribute('aria-current', 'page')

    // Show matching panel (use getElementById so numeric IDs like "1" work)
    const id = targetHash.slice(1)
    const panel = document.getElementById(id)
    if (panel) panel.classList.remove('govuk-tabs__panel--hidden')
  }

  // Initial state (use current hash if present)
  setActive(window.location.hash)

  // When the hash changes (back/forward, manual edit, etc.)
  window.addEventListener('hashchange', () => setActive(window.location.hash))

  // On click, update instantly (and set the hash if the browser doesn’t for some reason)
  nav.addEventListener('click', (e) => {
    const link = e.target.closest('.moj-sub-navigation__link')
    if (!link) return

    const href = link.getAttribute('href')
    if (!href || !href.startsWith('#')) return

    // Update UI immediately
    setActive(href)

    // Ensure URL updates (also triggers hashchange in most browsers)
    if (window.location.hash !== href) window.location.hash = href
  })
}
