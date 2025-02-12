import Image from "next/image";
import logo from "@/../public/assets/compostlink.png";

const SplashScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image
        src={logo}
        alt="CompostLink Logo"
        width={200}
        height={200}
      />
    </div>
  )
}

export default SplashScreen;