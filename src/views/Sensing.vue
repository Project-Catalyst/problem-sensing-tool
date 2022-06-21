<template>
  <div class="sensing">
    <section class="box">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="title">{{$t('page.TITLE')}}</div>
          <div class="subtitle" v-html="$t('page.SUBTITLE')"></div>
        </div>
        <div class="inputs column is-12">
          <b-field label="What problem do you see?*">
            <b-input 
              maxlength="35" 
              placeholder="Insert your answer here">
            </b-input>
          </b-field>
          <b-field label="Why is solving this problem important to the mission of Project Catalyst?*">
            <b-input 
              maxlength="140" 
              placeholder="Insert your answer here">
            </b-input>
          </b-field>
          <b-field label="Can you articulate the gap between the current state of the problem and the expected or envisioned state?">
            <b-input 
              maxlength="250" 
              placeholder="Insert your answer here">
            </b-input>
          </b-field>
          <b-field label="How might the value of solving this problem be quantified and/or measured?">
            <b-input 
              maxlength="250" 
              placeholder="Insert your answer here">
            </b-input>
          </b-field>
          <b-field label="Tags">
            <b-taginput
                ref="tagInput"
                v-model="selectedTags"
                :data="filteredTags"
                autocomplete
                icon="label"
                :open-on-focus="true"
                placeholder="Search a tag"
                max-height="450px"
                @remove="getFilteredTags(false)"
                @typing="getFilteredTags">
                <template v-slot="props">
                    {{props.option}}
                </template>
                <template #empty>
                    There are no items
                </template>
            </b-taginput>
          </b-field>
          <b-field label="Attachments/Links">
          </b-field>
        </div>

      </div>
      <div class="buttons is-flex is-justify-content-center">
        <b-button  type="is-primary is-large">
          {{ $t('page.SAVE') }}
        </b-button>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Sensing',
  components: {
  },
  data() {
    return {
      search: '',
      filteredTags: [],
      selectedTags: [],
      tags: ['Tag1', 'Tag11', 'Tag111', 'Tag2', 'Tag22', 'Tag222', 'Tag3', 'Tag33', 'Tag333']
    }
  },
  methods: {
    getFilteredTags(text) {
      let filteredTags
      if (text) {
        filteredTags = this.tags.filter((option) => {
          return option
              .toString()
              .toLowerCase()
              .indexOf(text.toLowerCase()) >= 0
        })
      } else {
        filteredTags = this.tags
      }
      this.filteredTags = filteredTags.filter((option) => {
        return this.selectedTags.indexOf(option) === -1
      })
    }
  },
  mounted() {
    this.getFilteredTags()
  }
}
</script>