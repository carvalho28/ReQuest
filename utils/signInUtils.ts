import supabase from "./supabaseClient";
import { SupabaseClient } from "@supabase/auth-helpers-react";

interface Props {
  supabaseClient: SupabaseClient;
}

async function signUpGithub({ supabaseClient }: Props) {
  try {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    });
    if (error) {
      throw error;
    }
    console.log(data);
  } catch (error) {
    throw error;
  }
}

async function signUpGoogle({ supabaseClient }: Props) {
  try {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    });
    if (error) {
      throw error;
    }
    console.log(data);
  } catch (error) {
    throw error;
  }
}

// check if user is logged in
async function checkUser() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      return user;
    }
  } catch (error) {
    throw error;
  }
}

export { signUpGithub, signUpGoogle, checkUser };
