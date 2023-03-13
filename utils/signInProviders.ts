import supabase from "./supabaseClient";

async function signUpGithub() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "https://re-quest.vercel.app/dashboard",
      },
    });
    if (error) {
      throw error;
    }
    console.log(data);
    localStorage.setItem("is-auth", "true");
  } catch (error) {
    throw error;
  }
}

async function signUpGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://re-quest.vercel.app/dashboard",
      },
    });
    if (error) {
      throw error;
    }
    console.log(data);
    localStorage.setItem("is-auth", "true");
  } catch (error) {
    throw error;
  }
}

export { signUpGithub, signUpGoogle };
