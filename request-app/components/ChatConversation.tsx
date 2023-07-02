import { Database } from "@/types/supabase";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { RiMessage2Fill, RiSendPlaneFill } from "react-icons/ri";

interface ChatConversationProps {
  chatId: number;
}

/**
 * ChatConversation component is the component used to render the chat conversation
 * @param chatId - The chat id of the current chat
 * @returns Returns the ChatConversation component base
 */
const ChatConversation = ({ chatId }: ChatConversationProps) => {
  const [message, setMessage] = useState("");
  const maxRows = 5;

  const supabaseClient = useSupabaseClient();
  const user = useUser();

  function handleInput(event: any) {
    setMessage(event.target.value);
    event.target.style.height = "auto"; // reset the height to auto to recalculate the number of rows
    event.target.style.height = `${Math.min(
      event.target.scrollHeight,
      maxRows * 20
    )}px`; // set the height based on the number of rows and a row height of 20px

    // adjust the height of the chat-messages container based on the number of rows
    const chatMessages = document.getElementById("chat-messages");
    if (chatMessages) {
      chatMessages.style.height = `calc(100% - ${event.target.style.height})`;
    }
  }

  // useEffect to scroll to the bottom of the chat-messages container
  useEffect(() => {
    if (chatId === undefined || chatId === -1) {
      const chatMessages = document.getElementById("chat-messages");
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }
  }, [chatId]);

  const [messages, setMessages] = useState<
    Database["public"]["Tables"]["messages"]["Row"][]
  >([]);

  // send message
  const sendMessage = async () => {
    if (message === "") {
      return;
    }
    const { data: newMessage, error: errorNewMessage } = await supabaseClient
      .from("messages")
      .insert([
        {
          chat_id: chatId,
          author_id: user?.id,
          content: message,
        },
      ]);
    if (errorNewMessage) {
      return;
    }
    setMessage("");
    // clear the textarea
    const textarea = document.getElementById("message") as HTMLTextAreaElement;
    textarea.value = "";
  };

  // on enter send message
  function handleKeyDown(event: any) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  }

  // retrieve messages from the database
  useEffect(() => {
    if (chatId === undefined || chatId === -1) {
      return;
    }
    const getMessages = async () => {
      const { data: messages, error: errorMessages } = await supabaseClient
        .from("messages")
        .select("*")
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true });
      if (errorMessages) {
        console.log("error", errorMessages);
      }
      if (messages) {
        console.log("messages", messages);
        setMessages(
          messages as Database["public"]["Tables"]["messages"]["Row"][]
        );
      }
    };

    let mess_channel: RealtimeChannel;
    async function getMessagesRealtime() {
      mess_channel = supabaseClient
        .channel(`messages:chat_id=eq.${chatId}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
          },
          async () => {
            // get the new message
            getMessages();
          }
        )
        .subscribe();

      return () => {
        supabaseClient.removeChannel(mess_channel);
      };
    }
    getMessages();
    getMessagesRealtime();
  }, [chatId, sendMessage]);

  return (
    <>
      {chatId === undefined || chatId === -1 ? (
        // render a big message icon saying "Select a chat to start messaging"
        <div className="flex flex-col justify-center items-center h-full">
          <div className="flex flex-col justify-center items-center">
            <RiMessage2Fill className="text-primaryblue h-24 w-24" />
            <p className="text-gray-500 text-xl font-semibold mt-6">
              Select a chat to start messaging
            </p>
          </div>
        </div>
      ) : (
        <div
          className="relative bg-gray-50"
          style={{ height: "calc(100vh - 12em)" }}
        >
          <div
            className="p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 h-full bg-transparent"
            id="chat-messages"
            style={{ height: "calc(100% - 4em)" }}
          >
            {/* if message */}
            {messages.map((message) => (
              <div key={message.id}>
                {message.author_id === user?.id ? (
                  <div className="flex flex-row chat chat-end justify-end">
                    <div
                      className="chat chat-bubble chat-bubble-primary text-white text-justify"
                      data-theme="chat"
                    >
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row chat chat-start">
                    <div
                      className="chat chat-bubble chat-bubble-secondary text-black text-justify"
                      data-theme="chat"
                    >
                      {message.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 w-full bg-white border-t-2 border-b-2">
            <div className="flex flex-row justify-center h-auto min-h-12 p-3">
              <textarea
                rows={1}
                name="message"
                id="message"
                className="block w-full text-gray-900 px-4 ring-0 border-0 
            focus:outline-none resize-none h-auto bg-gray-100 rounded-md
            py-1 ml-2 overflow-y-scroll"
                placeholder="Type a message..."
                value={message}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
              />
              {/* icon of send*/}
              <div className="ml-2 flex items-end align-middle">
                <RiSendPlaneFill
                  className="text-gray-400 h-6 w-6 mr-4 
            hover:text-gray-800 hover:cursor-pointer"
                  onClick={sendMessage}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatConversation;
