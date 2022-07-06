<template>
  <div class="sensing">
    <section class="box">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="title">{{$t('page.TITLE')}}</div>
          <div class="subtitle" v-html="$t('page.SUBTITLE')"></div>
        </div>
        <div class="inputs column is-12">
          <b-field><template #label>{{$t('problem.DESCRIPTION')}}</template>
            <b-input 
              type="textarea" 
              v-model="debouncedDescription"
              maxlength="35" 
              placeholder="Insert your answer here"
              required>
            </b-input>
          </b-field>
          <b-field><template #label>{{$t('problem.IMPORTANCE')}}</template>
            <b-input 
              type="textarea" 
              v-model="debouncedImportance"
              maxlength="140" 
              placeholder="Insert your answer here"
              required>
            </b-input>
          </b-field>
          <b-field><template #label>{{$t('problem.GAP')}}</template>
            <b-input 
              type="textarea" 
              v-model="debouncedGap"
              maxlength="250" 
              placeholder="Insert your answer here">
            </b-input>
          </b-field>
          <b-field><template #label>{{$t('problem.VALUE')}}</template>
            <b-input 
              type="textarea" 
              v-model="debouncedValue"
              maxlength="250" 
              placeholder="Insert your answer here">
            </b-input>
          </b-field>
          <b-field><template #label>{{$t('problem.TAGS')}}</template>
            <b-taginput
                ref="tagInput"
                v-model="input.selectedTags"
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
          <b-field><template #label>{{$t('problem.ATTACHMENTS')}}</template>
          </b-field>
        </div>

      </div>
      <div class="buttons is-flex is-justify-content-center">
        <b-button 
          type="is-primary is-large"
          :disabled="canSave"
          @click="saveSensed">
          {{ $t('page.SAVE') }}
        </b-button>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapGetters } from "vuex";
import debounce from 'lodash.debounce';

export default {
  name: 'Sensing',
  components: {
  },
  data() {
    return {
      min_input: 5,
      search: '',
      filteredTags: [],
      tags: ['Tag1', 'Tag11', 'Tag111', 'Tag2', 'Tag22', 'Tag222', 'Tag3', 'Tag33', 'Tag333'],
      input: false
    }
  },
  computed: {
    ...mapGetters("sensed", ["getNewSensed", "getById"]),
    debouncedDescription: {
      get() {
        return this.input.description;
      },
      set: debounce(function(val) {
        this.setValue('description', val)
      }, 500)
    },
    debouncedImportance: {
      get() {
        return this.input.importance;
      },
      set: debounce(function(val) {
        this.setValue('importance', val)
      }, 500)
    },
    debouncedGap: {
      get() {
        return this.input.gap;
      },
      set: debounce(function(val) {
        this.setValue('gap', val)
      }, 500)
    },
    debouncedValue: {
      get() {
        return this.input.value;
      },
      set: debounce(function(val) {
        this.setValue('value', val)
      }, 500)
    },
    canSave() {
      let l_desc = this.input.description.length;
      let l_imp = this.input.importance.length;
      if(l_desc > this.min_input && l_imp > this.min_input){
        return false
      }
      return true
    }
  },
  methods: {
    saveSensed() {
      this.$buefy.dialog.confirm({
        title: 'Save Sensed Problem',
        message: `By confirming, you will save this problem on local storage
                  for further editing or file download.`,
        cancelText: 'Cancel',
        confirmText: 'Save',
        type: 'is-success',
        onConfirm: () => {
          this.$store.commit('sensed/addSensed', this.input);
          this.$router.push({ name: "home"})
        }
    })
    },
    setValue(field, val) {
      this.input[field] = val
    },
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
        return this.input.selectedTags.indexOf(option) === -1
      })
    }
  },
  mounted() {
    console.log("MOUNTING...")
    console.log("id: ", this.$route.params.id)
    if (this.$route.params.id === 'empty') {
      // (this.input) read empty default sensed
      console.log('into empty')
      this.input = this.getNewSensed
      console.log(this.input)
    } else {
      console.log('into else')
      this.input = this.getById(this.$route.params.id)
    }
    this.getFilteredTags()
  }
}
</script>