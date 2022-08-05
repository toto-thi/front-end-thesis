<template>
  <CharityProjectDetail :project="project" :showTransaction="showTransaction" />
</template>

<script>
import { getAllTransactions } from '~/helpers/transactionContext'
import CharityProjectDetail from '~/components/CharityProjectDetail.vue'

export default {
  name: 'ProjectShow',
  data() {
    return {
      showTransaction: [],
    }
  },
  async asyncData({ params, store }) {
    const projectData = await store.dispatch('getProjectDetail', params.id)

    return {
      project: projectData,
    }
  },
  async mounted() {
    await this.getData()
  },
  async updated() {
    await this.getData()
  },
  methods: {
    async getData() {
      const res = await getAllTransactions(this.project.contractAddress)

      this.showTransaction = res.reverse()
    },
  },
  components: {
    CharityProjectDetail,
  },
}
</script>

<style>
</style>