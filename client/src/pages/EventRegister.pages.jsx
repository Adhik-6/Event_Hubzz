import { useState } from "react";
import axios from 'axios';

export const EventRegister = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    mail: "",
    department: "Select",
    registerNumber: "",
    year: "",
  });
  const [qrCode, setQrCode] = useState("")

  function handleInputChange(e) {
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // download functionality, react-hot-toast

  async function handleDetails(e) {
    e.preventDefault();
    console.log(userDetails);
    try {
      const res = await axios.post(`http://localhost:8000/api/user-details`, userDetails);
      console.log("Data received: ", res.data);
      setQrCode(res.data.qrCode)
    } catch (error) {
      console.error("Error submitting user details:", error);
    }
  }

  async function handleDownload(e) {
    e.preventDefault();
    try {
      const byteCharacters = atob(qrCode.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });
    
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "event_qr_code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href); 
    } catch (err) {
      console.log("Error while downloading")
    }
  }

  return (
    <>
      <div
        className="w-full h-screen bg-amber-200 flex justify-center items-center"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23000b76' fill-opacity='1' d='M0,256L40,229.3C80,203,160,149,240,144C320,139,400,181,480,208C560,235,640,245,720,224C800,203,880,149,960,149.3C1040,149,1120,203,1200,197.3C1280,192,1360,128,1400,96L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        { !qrCode ? (
        <form className="flex flex-col h-auto w-md gap-6 mx-auto px-6 py-10 max-w-md bg-white shadow-lg rounded-lg">
          <div className="w-full">
            <label htmlFor="name">Name</label>
            <input
              onChange={handleInputChange}
              value={userDetails.name}
              name="name"
              className="p-2 mt-1 block rounded-md w-full border"
              type="text"
            />
          </div>
          <div className="w-full">
            <label htmlFor="mail">Mail</label>
            <input
              onChange={handleInputChange}
              value={userDetails.mail}
              name="mail"
              className="p-2 mt-1 block rounded-md w-full border"
              type="text"
            />
          </div>
          {/* Department Dropdown */}
          <div className="w-full">
            <label htmlFor="department">Department</label>
            <select
              onChange={handleInputChange}
              value={userDetails.department}
              name="department"
              className="p-2 mt-1 block rounded-md w-full border"
            >
              <option value="IT">IT</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="registerNumber">Register Number</label>
            <input
              onChange={handleInputChange}
              value={userDetails.registerNumber}
              name="registerNumber"
              className="p-2 mt-1 block rounded-md w-full border"
              type="number"
            />
          </div>
          {/* Year Radio Buttons */}
          <div className="w-full">
            <label>Year</label>
            <div className="flex gap-4 mt-2">
              {[1, 2, 3].map((year) => (
                <label key={year} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="year"
                    value={year}
                    checked={userDetails.year === `${year}`}
                    onChange={handleInputChange}
                  />
                  {year}
                </label>
              ))}
            </div>
          </div>
          {/* Register Button */}
          <div
            onClick={handleDetails}
            className="w-full bg-amber-800 rounded-md text-white text-center py-2 font-semibold cursor-pointer"
          >
            Register
          </div>
        </form>
        ) : (
          <div className="bg-blue-100 flex flex-col justify-center items-center p-4 w-xs h-xs rounded-lg">
          <img
            src={qrCode}
            alt="QR Code"
            className="w-full h-full shadow-lg"
          />
          <button onClick={handleDownload} className="bg-fuchsia-700 py-1 px-2 mt-7 mb-4 text-white font-semibold shadow-[1.5px_1.5px_5px_#00000088] rounded">Download</button>
        </div>
        )}
      </div>
    </>
  );
}
