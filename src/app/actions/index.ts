'use server'

import { signIn, signOut } from "../../auth";

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData: FormData): Promise<any> {
  
  const username = formData.get("userName") as string; 
  const password = formData.get("password") as string; 

  const response = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (!response || response?.error || !response.ok) {
      console.log("Login failed (bad credentials)");
      return null;
    }
    return response;
}