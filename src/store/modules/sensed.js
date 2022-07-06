// import dayjs from 'dayjs'
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

///// below here comes from pa-tool assessments.js

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
    console.log(">> GETTER sensed.getNewSensed <<")
    return defaultSensed('empty')
  }
}

// actions
const actions = {
}

// mutations
const mutations = {
  // setAssessments (state, assessments) {
  //   state.all = assessments
  // },
  addSensed (state, sensed) {
    let id = state.nextId
    sensed.id = id
    console.log(">> MUTATION sensed.addSensed <<")
    console.log(sensed)
    state.all.push(sensed)
    state.nextId += 1
  },
  updateSensed (state, sensed) {
    console.log(">> MUTATION sensed.updateSensed <<")
    console.log('before')
    console.log(state.all[sensed.id])
    state.all[sensed.id] = sensed
    console.log('after')
    console.log(state.all[sensed.id])
    
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
      // assessment.last_update = dayjs().unix()
    }
  },
  resetState (state) {
    //state.currentIndex = 0
    //state.keyword = ''
    //state.selectedChallenges = []
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
