import Login from "../components/common/Login";

function Home() {
  return (
    <div className="font-metropolis h-screen w-screen flex item-center justify-center flex-col md:flex-row transition-all ease-linear">
      <div className="h-full w-full flex items-center justify-center p-10 md:w-[50%] md:p-5 transition-all ease-linear">
        <Login />
      </div>
      <div className="h-screen w-full flex justify-center items-center text-white bg-gradient-to-r from-[#00c0ff] to-[#0082fe] md:w-[50%] flex-col transition-al ease-linear">
        <div className="h-44 flex items-center justify-evenly flex-col text-center p-5 gap-4">
          <h1 className="text-3xl font-bold">New Here ?</h1>
          <p className="text-base font-medium">
            Signup and discover a greate amount of new opportunities!
          </p>
          <button className="ease-in duration-200 text-center bg-white p-3 mt-5 text-[#0082fe] pl-8 pr-8 rounded-full font-bold text-lg">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
