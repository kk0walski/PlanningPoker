import gql from "graphql-tag";

export const GET_OPEN_ISSUES_OF_REPOSITORY = gql`
  query($owner: String!, $project: String!, $cursor: String) {
    repository(name: $project, owner: $owner) {
      id
      issues(first: 5, states: OPEN, after: $cursor) {
        edges {
          node {
            id
            number
            state
            title
            url
            bodyHTML
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;
