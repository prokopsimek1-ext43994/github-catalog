const repoCount = 100;

// set the query parameters only if are set and not empty
const listOrgReposQuery = (
  org: string,
  fullTextQuery: string | undefined,
  labels: string[] | undefined = ["commons"],
  languages: string[] | undefined
) => {
  console.log('org:', org);
  console.log('fullTextQuery:', fullTextQuery);
  console.log('labels:', labels);
  console.log('languages:', languages);
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
