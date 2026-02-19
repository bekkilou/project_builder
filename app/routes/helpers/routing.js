function asArray(value) {
  return Array.isArray(value) ? value : (value ? [value] : [])
}

function clear(data, keys) {
  keys.forEach(k => { delete data[k] })
}

function addError(errors, field, message) {
  errors.push({ text: message, href: `#${field}` })
}

function renderWithErrors(res, view, errors) {
  const errorMap = errors.reduce((acc, e) => {
    const key = e.href.replace('#', '')
    acc[key] = { text: e.text }
    return acc
  }, {})
  return res.render(view, { errors, errorMap })
}

module.exports = {
  asArray,
  clear,
  addError,
  renderWithErrors
}
