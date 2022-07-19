<template>
  <div>
    <v-container class="mt-8">
      <v-row align="center" justify="center">
        <v-sheet rounded="xl" color="#44496c" width="85%">
          <v-row align="center">
            <v-col cols="6" xl="6" sm="6" md="6" align-self="center">
              <v-img
                src="/charity-pic-1.png"
                contain
                height="600"
                width="100%"
              ></v-img>
            </v-col>
            <v-col cols="6" xl="6" sm="6" md="6">
              <v-img
                src="/charity-pic-2.png"
                contain
                height="600"
                width="100%"
              ></v-img>
            </v-col>
          </v-row>
        </v-sheet>
      </v-row>
    </v-container>

    <v-container v-if="approved" class="mt-16">
      <v-row align="center" justify="start" class="mx-16">
        <v-btn
          large
          color="primary"
          class="text-capitalize mx-16"
          rounded
          @click="createProject"
        >
          <h3>{{ $t('kCreateBtn') }}</h3>
          &nbsp;
          <v-icon>mdi-file-plus-outline</v-icon>
        </v-btn>
        <add-project-dialog :status="addDialog" @closeDialog="closeDialog" />
      </v-row>
      <v-row justify="center" align="center" class="mt-16 mx-16">
        <v-data-iterator
          :items="approved"
          :items-per-page.sync="perPage"
          :page.sync="page"
          hide-default-footer
        >
          <template v-slot:default="props">
            <v-row>
              <v-col
                cols="4"
                xl="4"
                sm="6"
                md="6"
                v-for="project in props.items"
                :key="project.id"
              >
                <v-lazy
                  min-height="200"
                  :options="{ threshold: 1 }"
                  transition="slide-y-reverse-transition"
                >
                  <v-card
                    color="primary"
                    class="white--text mb-10 mx-10 rounded-xl"
                  >
                    <v-card-title>
                      <v-avatar>
                        <v-img :src="project.imgUrl"></v-img>
                      </v-avatar>
                      <span class="subheadline ml-3"> {{ project.title }}</span>
                    </v-card-title>
                    <v-divider color="white"></v-divider>
                    <v-card-text class="white--text">
                      <ShortText :text="project.description" :target="100" />
                    </v-card-text>
                    <v-card-text class="white--text text-capitalize">
                      {{ $t('kProjectStart') }}: {{ project.startDate }} <br />
                      {{ $t('kProjectClose') }}: {{ project.endDate }} <br />
                      {{ $t('kCreatedBy') }}: {{ project.createdBy.firstname }}
                      {{ project.createdBy.lastname }}
                    </v-card-text>
                    <v-card-text class="white--text text-capitalize">
                      {{ $t('kProgress') }}:
                      <v-progress-linear
                        :value="
                          calPercentage(
                            project.donateAmount,
                            project.targetAmount
                          )
                        "
                        color="#53A700"
                        height="25"
                        :buffer-value="100"
                        class="white--text rounded-xl"
                      >
                        <template v-slot:default="{ value }">
                          <strong>{{ value }}%</strong>
                        </template>
                      </v-progress-linear>
                    </v-card-text>
                    <v-card-actions class="mr-4">
                      <v-row align="center" justify="end">
                        <v-btn
                          rounded
                          outlined
                          color="white"
                          class="text-capitalize mb-4"
                        >
                          <nuxt-link
                            class="white--text non-dec text-capitalize"
                            :to="`/charity/${project.id}`"
                            >{{ $t('kDonate') }}</nuxt-link
                          >
                          <v-icon small>mdi-arrow-right</v-icon>
                        </v-btn>
                      </v-row>
                    </v-card-actions>
                  </v-card>
                </v-lazy>
              </v-col>
            </v-row>
          </template>
          <template v-slot:footer>
            <v-row justify="center" align="center" class="mt-8">
              <v-pagination
                v-model="page"
                :length="totalPage"
                :total-visible="Math.ceil(approved.length / perPage)"
              ></v-pagination>
            </v-row>
          </template>
        </v-data-iterator>
      </v-row>
    </v-container>
    <v-container v-else height="20vh" class="pb-16">
      <v-row align="center" justify="center">
        <h1>There is no available charity project at the moment.</h1>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ShortText from '~/utils/ShortText.vue'

export default {
  name: 'CharityPage',
  computed: {
    ...mapGetters(['approved', 'user']),
    totalPage() {
      return Math.ceil(this.approved.length / this.perPage)
    },
  },
  async mounted() {
    await this.$store.dispatch('getApprovedProject')
  },
  data() {
    return {
      page: 1,
      perPage: 6,
      addDialog: false,
    }
  },
  methods: {
    calPercentage(donateVal, maxVal) {
      return (donateVal * 100) / maxVal
    },
    createProject() {
      if (Object.keys(this.user).length === 0) {
        // change to dialog box later
        return alert('Please login to continue...')
      } else {
        this.addDialog = true
      }
    },
    closeDialog() {
      this.addDialog = false
    },
  },
  components: { ShortText },
}
</script>

<style scoped>
.non-dec {
  text-decoration: none;
}
</style>