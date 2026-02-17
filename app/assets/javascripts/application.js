//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {

  const sponsorOrgs = [
    "Airedale NHS Foundation Trust",
    "AstraZeneca UK Limited",
    "Belfast Health and Social Care Trust",
    "Cambridge University Hospitals NHS Foundation Trust",
    "Cardiff & Vale University LHB",
    "Cardiff University",
    "Derbyshire Healthcare NHS Foundation Trust",
    "East Lancashire Hospitals NHS Trust",
    "Greater Glasgow and Clyde",
    "Guy's and St Thomas' NHS Foundation Trust",
    "Imperial College Healthcare NHS Trust",
    "Lifescan Scotland Ltd.",
    "Prifysgol Aberystwyth",
    "Queen Victoria Hospital NHS Foundation Trust",
    "University Hospital Southampton NHS Foundation Trust",
    "University of Aberdeen",
    "University of Birmingham",
    "University of Bristol",
    "University of Edinburgh",
    "University of Manchester"
  ]

  const container = document.querySelector('#autocomplete-container')

  if (container && window.accessibleAutocomplete) {
    window.accessibleAutocomplete({
      element: container,
      id: 'sponsor-org',
      name: 'sponsorOrg',
      source: sponsorOrgs,
      minLength: 2,
      autoselect: true
    })
  }
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
