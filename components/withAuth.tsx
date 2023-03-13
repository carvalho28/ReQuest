import { checkUser } from "@/utils/signInUtils";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  const WithAuthComponent = function (props: P & React.Attributes) {
    const router = useRouter();

    useEffect(() => {
      async function checkUserAuth() {
        const user = await checkUser();
        if (!user) {
          router.push("/");
        }
      }
      checkUserAuth();
    }, [router]);

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
