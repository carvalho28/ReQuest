import { checkUser } from "@/utils/signInUtils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LoadingFull from "@/components/LoadingFull";

function WithAuth<P>(
  WrappedComponent: React.ComponentType<P>,
  isDashboard?: boolean
) {
  const WithAuthComponent = function (props: P & React.Attributes) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function checkUserAuth() {
        const user = await checkUser();
        if (isDashboard) {
          if (!user) {
            router.push("/");
          }
        } else {
          if (user) {
            router.push("/dashboard");
          }
        }
        setTimeout(() => setLoading(false), 500); // 1 second delay
      }
      const token = localStorage.getItem("sb-nvvxhbjuugqdzpygnaaw-auth-token");
      if (token) {
        checkUserAuth();
      } else {
        setLoading(false);
      }
    }, []);

    if (loading) {
      return <LoadingFull />;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${getDisplayName(
    WrappedComponent
  )})`;

  return WithAuthComponent;
}

function getDisplayName(WrappedComponent: React.ComponentType<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default WithAuth;
