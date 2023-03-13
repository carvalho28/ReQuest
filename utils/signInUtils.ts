import supabase from "./supabaseClient";

async function signUpGithub() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) {
      throw error;
    }
    console.log(data);
  } catch (error) {
    throw error;
  }
}

async function signUpGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
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
