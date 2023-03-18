import Sidebar from "./Sidebar";

interface Props {
  children: React.ReactNode;
  currentPage: string;
  avatarUrl: string;
}

const Layout = ({ children, currentPage, avatarUrl }: Props) => {
  return (
    <>
      <div className="fixed top-0 left-0 h-full w-64 flex flex-col overflow-y-auto sidebar-background pt-5 pb-4">
        <Sidebar currentPage={currentPage} avatar_url={avatarUrl} />
      </div>
      <div className="mt-16 ml-80 mr-16">
        <div className="text-3xl text-black font-bold">
          {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </>
  );
};
export default Layout;
