// initial state
const getDefaultState = () => ({
  all: [],
  nextId: 0
})
const state = getDefaultState()

// utils
const defaultSensed = (id) => {
  return {
    id: id,
    description: '',
    importance: '',
    gap: '',
    value: '',
    tags: [],
    attachments: false
  }
}

// getters
const getters = {
  indexed: state => {
    let indexed = {}
    state.all.forEach(el => {
      indexed[el.id] = el
    })
    return indexed
  },
  ids: (state, getters) => {
    return Object.keys(getters.indexed).map((a) => parseInt(a))
  },
  getById: (state, getters) => (id) => {
    if (getters.indexed[id]) {
      return getters.indexed[id]
    }
    return false
  },
  getAll: (state) => {
    return state.all
  },
  sensedCount: (state) => {
    return state.all.length
  },
  getNewSensed: () => {
    return defaultSensed('empty')
  }
}

// actions
const actions = {
}

// mutations
const mutations = {
  addSensed (state, sensed) {
    let id = state.nextId
    sensed.id = id
    state.all.push(sensed)
    state.nextId += 1
  },
  updateSensed (state, update) {
    var found = state.all.filter((sensed) => sensed.id === update.id)
    if (found.length > 0) {
      let index = state.all.indexOf(found[0])
      state.all[index] = update
    }
  },
  deleteSensed (state, id) {
    var found = state.all.filter((sensed) => sensed.id === id)
    if (found.length > 0) {
      let index = state.all.indexOf(found[0])
      state.all.splice(index, 1)
    }
  },
  setValue (state, data) {
    let assessment = state.all.find(a => parseInt(a.id) === parseInt(data.id));
    if (assessment) {
      assessment[data.field] = data.value
    }
  },
  resetState (state) {
    Object.assign(state, getDefaultState())
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
