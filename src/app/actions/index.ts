'use server'

import { signIn, signOut } from "../../auth";

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData: FormData): Promise<any> {
  
  const username = formData.get("userName") as string; 
  const password = formData.get("password") as string; 
  try {
    const response = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (!response) {
        console.error("Login failed: ", response?.error);
        return;
      }
      return response;
   } catch (err: any) {
      throw err;
   }
}