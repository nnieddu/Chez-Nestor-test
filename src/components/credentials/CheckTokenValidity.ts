export async function checkTokenValidity(token: string | null, apikey : string | undefined): Promise<boolean> {
  if (token == null) return false;
  
  const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
  
  const response = await fetch(
    `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${apiKey}`,
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
    throw new Error(`Error: ${response.status}`);
  }
  const data = await response.json();
  if (data.hasOwnProperty("error")) return false;
  return true;
}
