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
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  }
}
</script>
