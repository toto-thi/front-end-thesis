<template>
  <v-container>
    <v-row>
      <v-card
        color="primary"
        class="rounded-xl mb-16 white--text font-weight-bold"
        height="20vh"
        width="100%"
      >
        <v-row justify="center" align="center">
          <v-col cols="6" align-self="center">
            <v-card-title class="justify-center pb-12 text-capitalize">
              <h1>{{ $t('KRequestTitle') }}</h1>
            </v-card-title>
          </v-col>
          <v-col cols="6">
            <v-img src="/request-table-img.svg" contain height="25vh"></v-img>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
    <v-row>
      <v-card class="rounded-xl" width="100%">
        <v-card-title>{{ $t('kRequestBtn') }}</v-card-title>
        <v-data-table
          :headers="headers"
          :items="pendingProject"
          :items-per-page="5"
          item-key="title"
          class="elevation-1"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.title }}</td>
              <td class="text-xs-right">
                <ShortText :text="item.description" :target="15" />
              </td>
              <td class="text-center">{{ item.startDate }}</td>
              <td class="text-center">{{ item.endDate }}</td>
              <td class="text-center">{{ item.targetAmount }}</td>
              <td class="text-center">
                <v-icon
                  color="#53A700"
                  class="mx-2"
                  @click="approveProject(item)"
                  >mdi-check-decagram</v-icon
                >
                <v-icon
                  color="#DF0000"
                  class="mx-2"
                  @click="rejectProject(item)"
                  >mdi-cancel</v-icon
                >
              </td>
            </tr>
          </template>
        </v-data-table>
        <v-dialog v-model="dialogApprove" max-width="50%" max-height="200px">
          <v-card color="white">
            <v-card-title class="text-h5">{{
              $t('kDialogApprove')
            }}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="#DF0000"
                text
                @click="dialogApprove = !dialogApprove"
                >{{ $t('kCancelBtn') }}</v-btn
              >
              <v-btn color="#53A700" text @click="confirmApproval">{{
                $t('KConfirmBtn')
              }}</v-btn>
            </v-card-actions>
            <v-overlay :value="dLoading">
              <v-progress-circular
                indeterminate
                size="64"
              ></v-progress-circular>
            </v-overlay>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="dialogReject"
          max-width="50%"
          max-height="200px"
          class="primary"
        >
          <v-card color="white">
            <v-card-title class="text-h5">{{
              $t('kDialogReject')
            }}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="#DF0000"
                text
                @click="dialogReject = !dialogReject"
                >{{ $t('kCancelBtn') }}</v-btn
              >
              <v-btn color="#53A700" text @click="confirmReject">{{
                $t('KConfirmBtn')
              }}</v-btn>
            </v-card-actions>
            <v-overlay :value="dLoading">
              <v-progress-circular
                indeterminate
                size="64"
              ></v-progress-circular>
            </v-overlay>
          </v-card>
        </v-dialog>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import ShortText from '~/utils/ShortText.vue'
import { mapGetters } from 'vuex'

export default {
  props: {
    pendingProject: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['dLoading']),
  },
  components: { ShortText },
  data() {
    return {
      dialogApprove: false,
      dialogReject: false,
      loading: false,
      selected: [],
      headers: [
        {
          text: 'Title',
          align: 'start',
          value: 'title',
          width: '1%',
        },
        {
          text: 'Description',
          align: 'start',
          sortable: false,
          value: 'description',
          width: '1%',
        },
        {
          text: 'Start Date',
          align: 'center',
          sortable: false,
          value: 'startDate',
          width: '1%',
        },
        {
          text: 'End Date',
          align: 'center',
          sortable: false,
          value: 'endDate',
          width: '1%',
        },
        {
          text: 'Target (ETH)',
          align: 'center',
          sortable: true,
          value: 'targetAmount',
          width: '1%',
        },
        {
          text: 'Approval',
          align: 'center',
          value: 'approval',
          sortable: false,
          width: '1%',
        },
      ],
    }
  },
  methods: {
    approveProject(item) {
      this.dialogApprove = true
      this.selected.id = item.id
      this.selected.approval = true
    },
    async confirmApproval() {
      await this.$store.dispatch('approveProject', this.selected)
      this.selected = []
      this.dialogApprove = false
    },
    rejectProject(item) {
      this.dialogReject = true
      this.selected.id = item.id
      this.selected.rejection = true
    },
    async confirmReject() {
      await this.$store.dispatch('rejectProject', this.selected)
      this.selected = []
      this.dialogReject = false
    },
  },
}
</script>

<style>
</style>