import Logo from "@/../public/assets/compostlink.png";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex h-14 bg-inherit justify-between items-center">
      <p className="text-primary text-sm">Compy</p>
      <Image
        src={Logo}
        alt=""
        width={100}
        height={100}
        className="size-14"
      />
    </div>
  )
}

export default Header;