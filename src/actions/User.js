export const enterAsUser = (user, token) => {
  return {
    type: "ENTER_AS_USER",
    payload: {
      user,
      token
    }
  };
};
