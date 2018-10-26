import gql from "graphql-tag";

export const GET_CLOSED_ISSUES_OF_REPOSITORY = gql`
  query($owner: String!, $project: String!, $cursor: String) {
    repository(name: $project, owner: $owner) {
      id
      issues(first: 5, states: CLOSED, after: $cursor) {
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
