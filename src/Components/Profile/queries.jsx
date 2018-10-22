import gql from "graphql-tag";

export const GET_USER_PROFILE = gql`
  {
    viewer {
      login
      email
      avatarUrl
      bio
      company
      companyHTML
    }
  }
`;
