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
                v-model="input.tags"
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
        <b-button tag="router-link"
          :to="{ name: 'home'}" type="is-danger is-large">
          Cancel
        </b-button>
        <b-button 
          type="is-primary is-large"
          :disabled="isDisabled"
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
  name: 'SensingForm',
  components: {
  },
  data() {
    return {
      min_input: 5,
      search: '',
      filteredTags: [],
      tags: [],
      input: false
    }
  },
  computed: {
    ...mapGetters("sensed", ["getNewSensed"]),
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
    isDisabled() {
      if (this.input) {
        let l_desc = this.input.description.length;
        let l_imp = this.input.importance.length;
        if(l_desc > this.min_input && l_imp > this.min_input){
          return false
        } else {
          return true
        }
        
      }
      return false
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
          this.clearInput()
          this.$router.push({ name: "home"})
        }
      })
    },
    clearInput() {
      this.input = false;
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
        return this.input.tags.indexOf(option) === -1
      })
    }
  },
  mounted() {
    this.input = {...this.getNewSensed}
    this.tags = ['Tag1', 'Tag11', 'Tag111', 'Tag2', 'Tag22', 'Tag222', 'Tag3', 'Tag33', 'Tag333'];
    this.getFilteredTags()
  }
}
</script>