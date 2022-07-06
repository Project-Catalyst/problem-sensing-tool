<template>
  <div class="sensed-preview">
    <div class="columns is-multiline">
      <div class="column is-8">
        Sensed Problem #{{sensed.id}}
        <div class="buttons mt-4">
          <b-button
            tag="router-link" 
            :to="{ name: 'sensing', params: { id: sensed.id} }"
            size="is-small"
            icon-left="pencil"
            type="is-primary">
            Edit problem
          </b-button>
          <b-button
            size="is-small"
            icon-left="delete"
            type="is-danger"
            @click="deleteSensed">
            Delete problem
          </b-button>
        </div>
      </div>
      <div class="column is-4">
        <b-progress
          type="is-success"
          class="complete-progress mt-2"
          :value="completed"
          size="is-medium"
          show-value
          >
          Problem Completion
        </b-progress>
      </div>
    </div>
  </div>
</template>

<script>

// import Assessment from '@/components/Assessment'

export default {
  name: 'SensedPreview',
  props: ['sensed'],
  // components: {
  //   // Assessment
  // },
  data() {
    return {
    }
  },
  computed: {
    completed() {
      console.log("COMPLETED")
      console.log(this.sensed)
      const reducer = (previousValue, currentValue) => previousValue + currentValue;
      let fields =  ["description", "importance", "gap", "value", "tags"]
        .map((el) => (this.sensed[el].length > 0) ? 1 : 0 )
        .reduce(reducer)
      return parseInt((100 * fields) / 5)
    }
  },
  methods: {
    deleteSensed() {
      console.log("DELETE SENSED #", this.sensed.id)
    }
  },
  mounted() {
  }
}
</script>


<style lang="scss">
  .sensed-preview {
    padding: 10px 20px;
    width: 100%;
    &:nth-child(2n + 1) {
      background: #f1f1f1;
      progress::-webkit-progress-bar {
        background-color: #fff !important;
      }
      progress::-moz-progress-bar {
        background-color: #fff !important;
      }
    }
    &:nth-child(2n) {
    }
  }
  // .complete-progress {
  //   color: black !important;
  // }
</style>
