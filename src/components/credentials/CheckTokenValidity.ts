export async function checkTokenValidity(token: string | null, apikey : string | undefined) {
  const response = await fetch(
    `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${apikey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken: token,
      }),
    }
  );
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
}
