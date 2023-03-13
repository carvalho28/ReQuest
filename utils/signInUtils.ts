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
  const user = supabase.auth.getUser();
  if (user) {
    return user;
  }
  return null;
}

export { signUpGithub, signUpGoogle, checkUser };
