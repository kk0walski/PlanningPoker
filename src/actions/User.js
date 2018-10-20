export const enterAsUser = (user, token) => {
  console.log("TOKEN: ", token);
  return {
    type: "ENTER_AS_USER",
    payload: {
      user,
      token
    }
  };
};
