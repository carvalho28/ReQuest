import { RiSendPlaneFill } from "react-icons/ri";

const messages = [
  {
    id: 1,
    chat_id: 1,
    user_id: 1,
    content: "Hello",
    created_at: "2021-07-01T00:00:00.000Z",
    is_user: true,
  },
  {
    id: 2,
    chat_id: 1,
    user_id: 2,
    content: "Hi",
    created_at: "2021-07-01T00:00:00.000Z",
    is_user: false,
  },
  {
    id: 3,
    chat_id: 1,
    user_id: 1,
    content: "How are you?",
    created_at: "2021-07-01T00:00:00.000Z",
    is_user: true,
  },
  {
    id: 4,
    chat_id: 1,
    user_id: 1,
    content: "Any plans for the weekend?",
    created_at: "2021-07-01T00:00:00.000Z",
    is_user: true,
  },
  {
    id: 5,
    chat_id: 1,
    user_id: 2,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in risus orci. Praesent neque neque, scelerisque vitae auctor sed, finibus sed lacus. Nullam sit amet justo lectus. Curabitur feugiat condimentum lacus. Proin mattis turpis at congue fermentum. Aliquam eu condimentum velit, tincidunt luctus mi. Sed convallis enim sed leo imperdiet pulvinar. Mauris rutrum, turpis vel mattis tincidunt, odio nunc commodo erat, eget suscipit risus metus sed magna. Sed tincidunt ipsum sit amet lectus maximus, quis faucibus lacus fringilla. Cras sed neque vel ipsum consectetur pellentesque sed at ligula. Donec vitae tellus auctor, sollicitudin mi quis, aliquet quam. Proin vestibulum ut ante ut molestie. Donec ultricies justo sem, nec porttitor diam pharetra ut. Etiam hendrerit sit amet nibh pulvinar vehicula. Donec sit amet eleifend ligula, vitae vestibulum lectus. Maecenas at felis felis. Sed nunc mi, placerat non ultrices et, dapibus sed enim. In hac habitasse platea dictumst. Cras non tortor sodales, maximus justo ut, tincidunt tortor. Ut rutrum dui et augue bibendum, eu dapibus urna faucibus. Morbi semper tristique aliquet. Duis ullamcorper porttitor nisi sed egestas. Sed sapien turpis, placerat id tincidunt dictum, maximus id massa. Vivamus quis justo quam. In odio libero, facilisis sed arcu nec, maximus ultricies nulla. Aliquam malesuada lacus dui, sed condimentum nibh varius eu. Aenean sit amet feugiat tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris molestie a velit ac viverra. In at turpis a ligula sodales bibendum fermentum sed orci. Aenean blandit diam nec sem pharetra, ut efficitur nisi auctor. Sed luctus at nibh a pulvinar. Donec sagittis gravida nulla sed hendrerit. Praesent sit amet placerat nisl. Sed sit amet accumsan enim. Proin viverra, nibh in malesuada egestas, sapien elit placerat elit, non faucibus quam neque id massa. Morbi lacinia id odio eget ornare. Maecenas in odio id mi eleifend pharetra nec non risus. Fusce volutpat magna ac lacus posuere hendrerit id quis risus. Cras purus sem, tincidunt at orci feugiat, tempus ultricies mauris. Vivamus lacus quam, convallis non velit vitae, iaculis commodo ante. Nullam aliquam mauris elementum, commodo lacus nec, tincidunt purus.",
    is_user: false,
  },
  {
    id: 6,
    chat_id: 1,
    user_id: 1,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in risus orci. Praesent neque neque, scelerisque vitae auctor sed, finibus sed lacus. Nullam sit amet justo lectus. Curabitur feugiat condimentum lacus. Proin mattis turpis at congue fermentum. Aliquam eu condimentum velit, tincidunt luctus mi. Sed convallis enim sed leo imperdiet pulvinar. Mauris rutrum, turpis vel mattis tincidunt, odio nunc commodo erat, eget suscipit risus metus sed magna. Sed tincidunt ipsum sit amet lectus maximus, quis faucibus lacus fringilla. Cras sed neque vel ipsum consectetur pellentesque sed at ligula. Donec vitae tellus auctor, sollicitudin mi quis, aliquet quam. Proin vestibulum ut ante ut molestie. Donec ultricies justo sem, nec porttitor diam pharetra ut. Etiam hendrerit sit amet nibh pulvinar vehicula. Donec sit amet eleifend ligula, vitae vestibulum lectus. Maecenas at felis felis. Sed nunc mi, placerat non ultrices et, dapibus sed enim. In hac habitasse platea dictumst. Cras non tortor sodales, maximus justo ut, tincidunt tortor. Ut rutrum dui et augue bibendum, eu dapibus urna faucibus. Morbi semper tristique aliquet. Duis ullamcorper porttitor nisi sed egestas. Sed sapien turpis, placerat id tincidunt dictum, maximus id massa. Vivamus quis justo quam. In odio libero, facilisis sed arcu nec, maximus ultricies nulla. Aliquam malesuada lacus dui, sed condimentum nibh varius eu. Aenean sit amet feugiat tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris molestie a velit ac viverra. In at turpis a ligula sodales bibendum fermentum sed orci. Aenean blandit diam nec sem pharetra, ut efficitur nisi auctor. Sed luctus at nibh a pulvinar. Donec sagittis gravida nulla sed hendrerit. Praesent sit amet placerat nisl. Sed sit amet accumsan enim. Proin viverra, nibh in malesuada egestas, sapien elit placerat elit, non faucibus quam neque id massa. Morbi lacinia id odio eget ornare. Maecenas in odio id mi eleifend pharetra nec non risus. Fusce volutpat magna ac lacus posuere hendrerit id quis risus. Cras purus sem, tincidunt at orci feugiat, tempus ultricies mauris. Vivamus lacus quam, convallis non velit vitae, iaculis commodo ante. Nullam aliquam mauris elementum, commodo lacus nec, tincidunt purus.",
    is_user: true,
  },
];

const ChatConversation = () => {
  return (
    <div className="relative" style={{ height: "calc(100vh - 12em)" }}>
      <div
        className="p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 h-full"
        style={{ height: "calc(100% - 4em)" }}
      >
        {/* if message */}
        {messages.map((message) => (
          <>
            {message.is_user ? (
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
          </>
        ))}
      </div>
      <div className="absolute bottom-0 w-full bg-white">
        <div className="flex flex-row items-center justify-center h-14">
          <input
            name="message"
            id="message"
            className="block w-full text-gray-900 px-4 ring-0 border-0 
            focus:outline-none resize-none h-auto bg-gray-100 rounded-full py-1 ml-2"
            placeholder="Type a message..."
          />
          {/* icon of send*/}
          <div className="ml-2 flex items-center justify-center">
            <RiSendPlaneFill
              className="text-gray-400 h-8 w-8 mr-4 
            hover:text-gray-800 hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatConversation;
