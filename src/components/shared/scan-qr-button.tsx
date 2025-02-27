import MButton from "../m-ui/m-button";

const ScanQRButton = () => {

  const onClick = () => {
    alert("Scan QR");
  }
  return (
    <MButton className="bg-primary h-12 rounded-2xl shadow-lg" onClick={onClick}>
        Scan QR
    </MButton>
  )
}

export default ScanQRButton;