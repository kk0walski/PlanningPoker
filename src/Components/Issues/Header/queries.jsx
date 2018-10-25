import gql from "graphql-tag";

import { REPOSITORY_FRAGMENT } from "../../Repository";

export const GET_REPOSITORY = gql`
  query($repositoryOwner: String!, $repositoryName: String!) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      ...repository
    }
  }

  ${REPOSITORY_FRAGMENT}
`;
