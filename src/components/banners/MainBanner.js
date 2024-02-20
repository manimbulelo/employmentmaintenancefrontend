import reactCsharp from "../../images/hqdefault.jpg";

function MainBanner() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-[50px] font-semibold">Welcome</p>
      <p className="font-thin text-lg">to</p>
      <p className="font-thin text-lg">Employee Maintenance System</p>
      <img src={reactCsharp} alt="Main Banner" className="p-[200px]" />
    </div>
  );
}

export default MainBanner;
