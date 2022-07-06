import { PENDING_PROJECT } from '~/graphql/queries/projectQuery'

export default function (context, inject) {
  inject('projectApi', {
    fetchPendingProjects
  })

  async function fetchPendingProjects() {
    let client = this.app.apolloProvider.defaultClient

    try {
      return await client
        .query({
          query: APPROVED_PROJECTS,
        })
        .then(({ data }) => data && data.getApprovedProjects)
    } catch (err) {
      console.error(err)
    }
  }
}
