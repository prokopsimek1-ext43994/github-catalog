const repoCount = 100;

// set the query parameters only if are set and not empty
const listOrgReposQuery = (
  org: string,
  fullTextQuery: string,
  labels: string[] | undefined,
  languages: string[] | undefined
) => {
  return `{
  search(first:${repoCount}, query: """
    org:${org} ${fullTextQuery || ''}
    ${labels?.map((label) => `topic:${label}`).join(' ') || ''}
    ${languages?.map((lang) => `language:${lang}`).join(' ') || ''}
  """
  , type: REPOSITORY) {
    repos: edges {
      repo: node {
        ... on Repository {
          name
          description
          url
          updatedAt
          repositoryTopics: repositoryTopics(first:10) {
            nodes {
              topic {
                name
              }
            }
          }
          primaryLanguage {
            name
            color
          }
          languages: languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              node {
                name
                color
              }
              size
            }
          }
        }
      }
    }
  }
}`;
};

export default listOrgReposQuery;
