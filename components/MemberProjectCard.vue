<template>
  <v-container fluid>
    <div v-if="createdProject !== null">
      <v-data-iterator
        :items="createdProject"
        :items-per-page.sync="perPage"
        :page.sync="page"
        hide-default-footer
      >
        <template v-slot:default="props">
          <v-row
            align="center"
            justify="center"
            class="mx-4 mr-4"
            v-for="(project, p) in props.items"
            :key="p"
          >
            <v-card
              width="100%"
              color="primary"
              class="rounded-xl mt-6 px-4 pb-4"
            >
              <v-card-title class="white--text">
                {{ $t('kProjectTitle') }}: {{ project.title }}</v-card-title
              >
              <v-card-text class="white--text">
                <h4>{{ $t('kProjectDescription') }}:</h4>
                <ShortText :text="project.description" :target="150" />
                <br />
                <v-row align="center" class="mt-3">
                  <h4 class="mx-3">
                    {{ $t('kTotalDonation') }}: {{ project.donateAmount }}
                  </h4>
                  <v-spacer />
                  <h4>
                    {{
                      statusDisplay(
                        project.isApproved,
                        project.isRejected,
                        project.isPending,
                        project.isClose
                      )
                    }}
                  </h4>
                </v-row>
              </v-card-text>
            </v-card>
          </v-row>
        </template>
        <template v-slot:footer>
          <v-row justify="center" align="center" class="mt-8">
            <v-pagination
              v-model="page"
              :length="totalPage"
              :total-visible="Math.ceil(createdProject.length / perPage)"
            ></v-pagination>
          </v-row>
        </template>
      </v-data-iterator>
    </div>
    <div v-else-if="createdProject === null">
      <v-row align="center" justify="center" class="mx-4 mr-4">
        <v-card height="50vh" width="80%" color="primary">
          <v-card-title class="justify-center white--text"
            >You haven't create any project yet. Create Now!</v-card-title
          >
        </v-card>
      </v-row>
    </div>
    <div v-else>
      <v-row align="center" justify="center" class="mx-4 mr-4">
        <v-card height="50vh" width="80%" color="primary">
          <v-card-title class="justify-center white--text"
            >Something went wrong...</v-card-title
          >
        </v-card>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import ShortText from '~/utils/ShortText.vue'

export default {
  components: { ShortText },
  props: {
    createdProject: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      page: 1,
      perPage: 4,
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.createdProject.length / this.perPage)
    },
  },
  methods: {
    statusDisplay(approve, reject, pending, close) {
      if (approve) return 'Approved'
      if (reject) return 'Rejected'
      if (pending) return 'Pending'
      if (close) return 'Close'
    },
  },
}
</script>

<style>
</style>