export async function checkTokenValidity(
  token: string | null,
  apikey: string | undefined,
  setError: React.Dispatch<React.SetStateAction<Error | null | unknown>>
): Promise<boolean> {
  try {
    if (token === "undefined" || apikey === undefined)
      throw new Error("Erreur, token ou clée API invalide");

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apikey}`,
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
      const responseData = await response.json();
      throw new Error(`Erreur: ${responseData.error.message}, veuillez vous reconnecter.`);
    }
    return true;
  } catch (error) {
    setError(error);
    return false;
  }
}
