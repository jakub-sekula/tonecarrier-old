import Header from "./Header";
import Footer from "./Footer";

export const Layout = ({ children, ...props }) => {
  return (
    <div id="wrapper" className="flex flex-col min-h-screen min-w-screen w-full h-full bg-[#141414]">
      <Header title={props.title}></Header>
      <main className="flex-1 p-8 w-full lg:w-[1400px] mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
};
