export const fetchProjects = async (client, query) => {
  return await client
    .query({
      query: query,
    })
    .then(({ data }) => data)
}

export const fetchProjectById = async (client, query, id) => {
  return await client
    .query({
      query: query,
      variables: {
        id: id,
      },
    })
    .then(({ data }) => data)
}
