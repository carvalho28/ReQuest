import { checkUser } from "@/utils/signInUtils";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function WithAuth<P>(
  WrappedComponent: React.ComponentType<P>,
  isDashboard?: boolean
) {
  const WithAuthComponent = function (props: P & React.Attributes) {
    const router = useRouter();

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
      }
      checkUserAuth();
    }, []);

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
