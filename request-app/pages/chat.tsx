import ChatConversation from "@/components/ChatConversation";
import ChatList from "@/components/ChatList";
import Layout from "@/components/Layout";
import { ProjectChildren } from "@/components/utils/sidebarHelper";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const user = session.user;
  const { data, error } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", user?.id);
  if (error) console.log(error);
  if (!data) throw new Error("No data found");
  const avatar_url = data[0].avatar_url;

  // get user projects info
  const { data: dataProjects, error: errorProjects } = await supabase.rpc(
    "projects_user",
    { user_id: user?.id }
  );

  // convert to a ProjectChildren type where href is the /projects/[id] route
  const projectsChildren: ProjectChildren[] = dataProjects.map(
    (project: any) => {
      return {
        name: project.name,
        href: `/projects/${project.id}`,
      };
    }
  );

  // get all users i have interected with, which means are in a project with me
  const { data: connectedUsers, error: errorConnectedUsers } =
    await supabase.rpc("get_connected_users", { my_user_id: user?.id });
  if (errorConnectedUsers) console.log(errorConnectedUsers);

  console.log(connectedUsers);

  return {
    props: {
      avatar_url: avatar_url,
      projectsChildren: projectsChildren,
      connectedUsers: connectedUsers,
    },
  };
};

export type connectedUsers = {
  id: number;
  name: string;
  email: string;
  avatar_url: string;
  selected: boolean;
};

export default function Chat({
  avatar_url,
  projectsChildren,
  connectedUsers,
}: any) {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  // set selected to false for all users
  connectedUsers.forEach((user: connectedUsers) => {
    user.selected = false;
  });

  const [connUserId, setConnUserId] = useState<number>(-1);
  const [chatId, setChatId] = useState<number>(-1);

  useEffect(() => {
    console.log("connUserId: ", connUserId);
    if (connUserId === -1) return;
    const verifyChat = async (connUserId: number) => {
      const { data: chat, error: errorChat } = await supabaseClient.rpc(
        "get_chat_id",
        { user_id_1: user?.id, user_id_2: connUserId }
      );

      if (errorChat) console.log(errorChat);
      console.log("chat: ", chat);
      console.log("chat.length: ", chat?.length);
      if (!chat || chat?.length === 0 || chat === undefined) {
        // create chat and and add both users to it
        const { data: newChat, error: errorNewChat } = await supabaseClient
          .from("chats")
          .insert({})
          .select();
        if (errorNewChat) console.log(errorNewChat);
        if (newChat) {
          let newChatID = newChat[0].id;
          const { data: addUsers, error: errorAddUsers } = await supabaseClient
            .from("chat_users")
            .insert([
              { chat_id: newChatID, user_id: user?.id },
              { chat_id: newChatID, user_id: connUserId },
            ])
            .select();
          if (errorAddUsers) console.log(errorAddUsers);
          if (addUsers) {
            setChatId(newChatID);
          }
          //
          console.log("newChat: ", newChat);
        }
      } else {
        setChatId(chat[0].chat_id);
      }
    };

    verifyChat(connUserId);
  }, [connUserId]);

  // refresh chatconversation when chatId changes
  useEffect(() => {
    console.log("chatId: ", chatId);
  }, [chatId]);

  return (
    <div>
      <Layout
        currentPage="Chat"
        avatar_url={avatar_url}
        projectChildren={projectsChildren}
      >
        {/* chat layout  */}
        <div
          className="flex flex-row bg-whitepages border-gray-200 rounded-lg 
        border-2"
          style={{ height: "calc(100vh - 12em)" }}
        >
          {/* first column for chat selection */}
          <div
            className="flex flex-col w-1/4 overflow-y-auto 
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          >
            <ChatList
              connectedUsers={connectedUsers}
              onUserSelect={setConnUserId}
            />
          </div>
          {/* second column for chat */}
          <div className="flex flex-col w-3/4">
            <ChatConversation chatId={chatId} />
          </div>
        </div>
      </Layout>
    </div>
  );
}
