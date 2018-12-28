let filters = []

addFilter = (name, types) => {
  const item = {
    name,
    types,
  }
}

changeFilter = (name, newType) => {
  item = filters.find(item => {
    item.name === name
  })
  if (!item) return false
  return item.types.push(newType)
}

exports.updateFilter = (name, type) => {
  item = filters.find(item => {
    item.name === name
  })
  if (item) {
    changeFilter(name, type)
  } else {
    addFilter(name, type)
  }
  return filters
}
