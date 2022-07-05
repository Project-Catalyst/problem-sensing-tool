// import dayjs from 'dayjs'
// initial state
const getDefaultState = () => ({
  all: []
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
  sensedCount: (state) => {
    return state.all.length
  }
}

// actions
const actions = {
}

// mutations
const mutations = {
  setAssessments (state, assessments) {
    state.all = assessments
  },
  addAssessment (state, proposalId) {
    let assessment = defaultSensed(proposalId)
    state.all.push(assessment)
  },
  deleteAssessment (state, id) {
    var found = state.all.filter((assessment) => assessment.id === id)
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
