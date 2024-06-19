const getRepoQuery = (org: string, slug: string) => {
  return `{
  repository(owner: "${org}", name: "${slug}") {
    name
    description
    url
    openGraphImageUrl
    sshUrl
    updatedAt
    
    repositoryTopics(first: 100) {
      nodes {
        topic {
          name
        }
      }
    }

    collaborators(first:10) {
      nodes {
        avatarUrl
        email
        login
        name
      }
    }


    defaultBranchRef {
      target {
        ... on Commit {
          history(first: 8) {
            edges {
              node {
                ... on Commit {
                  committedDate
                  author {
                    avatarUrl
                    name
                  }
                  message
                  id
                }
              }
            }
          }
        }
      }
    }


    primaryLanguage {
      name
      color
    }
    languages(first: 100, orderBy: {field: SIZE, direction: DESC}) {
      edges {
        node {
          name
          color
        }
        size
      }
    }
  }
}`;
};

export default getRepoQuery;
