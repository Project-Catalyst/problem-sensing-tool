<template>
  <div class="home">
    <section class="box">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="title">{{$t('general.TITLE')}}</div>
          <div class="subtitle" v-html="$t('general.SUBTITLE')"></div>
        </div>
        <div class="column is-12">
          <div class="content" v-html="$t('general.EXPLANATION')"></div>
        </div>
      </div>
      <div class="buttons is-flex is-justify-content-center">
        <b-button tag="router-link"
          :to="{ name: 'sensing' }" type="is-primary is-large">
          {{ $t('general.START') }}
        </b-button>
      </div>
    </section>
    <b-button
      tag="a"
      @click="open = !open"
      type="is-primary is-light" outlined>
      {{openMsg}}
    </b-button>
    <section class="box list-problems" v-if="open">
      <div class="title">My Sensed Problems</div>
      <div class="list content">
        <sensed-preview
          :key="sensed.id"
          v-for="sensed in sensedProblems"
          :sensed="sensed"
        />
      </div>
      <div class="content">
        <b-message class="buttons" v-if="sensedProblems.length > 0">
          <b-button 
            icon-left="download" 
            type="is-primary is-light" 
            @click="exportSensed">
            Export assessments
          </b-button>
          <b-button
            icon-left="delete" type="is-danger is-light"
            @click="confirmClear">
            Clear local database
          </b-button>
        </b-message>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import SensedPreview from '@/components/SensedPreview'

// import downloadCsv from "@/utils/export-csv";

export default {
  name: 'Home',
  components: {
    SensedPreview
  },
  data() {
    return {
      open: false
    }
  },
  computed: {
    ...mapGetters("sensed", ["getAll"]),
    sensedProblems() {
      return this.getAll
    },
    openMsg() {
      return (this.open) ? 'Close list' : 'Open my list of Sensed Problems'
    }
  },
  methods: {
    confirmClear() {
      this.$buefy.dialog.confirm({
        title: 'Clear database',
        message: 'Are you sure you want to <b>clear</b> the local database? This action cannot be undone and you will lose your work.',
        confirmText: 'Clear Database',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.clear();
          this.$buefy.notification.open({
            message: 'Database cleared!',
            type: 'is-primary',
            position: 'is-bottom-right'
          })
        }
      })
    },
    exportSensed() {
      // const localSensed = this.sensedProblems
      // downloadCsv(localSensed)
      console.log("SAVED CSV")
    }
  }
}
</script>
