// TODO: Implement Auth
// For now, we will use a simple mock and return the user

export async function auth() {
  const TESTUSER_ID = process.env.TESTUSER_ID!;
  const TESTUSER_NAME = process.env.TESTUSER_NAME!;
  const TESTUSER_EMAIL = process.env.TESTUSER_EMAIL!;

  return {
    session: {
      user: {
        id: TESTUSER_ID,
        name: TESTUSER_NAME,
        email: TESTUSER_EMAIL,
      },
    },
  };
}
