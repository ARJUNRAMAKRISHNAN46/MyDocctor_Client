import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useRef, useEffect, useState } from "react";
import { useSocketContext } from "../../contexts/SocketContext";
import { useConversation } from "../../zustand/useConversation";

function randomID(len: number) {
  let result = "";
  const chars =
      "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length;
  len = len || 5;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function VideoCall() {
  const [roomID, setRoomID] = useState("");
  const meetingContainerRef = useRef(null);
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();

  useEffect(() => {
    const initialRoomID = getUrlParams().get("roomID") || randomID(5);
    setRoomID("78945612");
    console.log("🚀 ~ App ~ roomID:", initialRoomID);
    console.log(
      window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?roomID=" +
        initialRoomID
    );

    if (meetingContainerRef.current) {
      myMeeting(meetingContainerRef.current, initialRoomID);
    }
  }, []);

  const myMeeting = async (element: any, roomID: string) => {
    if (!element) return;
    console.log("🚀 ~ myMeeting ~ element:", element);
    const appID = 1413445535;
    const serverSecret = "c24fe95e7a568c950d662ed24ab10a9e";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );

    console.log("🚀 ~ myMeeting ~ roomID:", roomID);
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };

  socket.emit("videoCall", {
    recieverId: selectedConversation?._id,
    recieverName: selectedConversation?.name,
    url:
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?roomID=" +
      roomID,
  });

  console.log(
    "🚀 ~ VideoCall ~ roomID:",
    window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?roomID=" +
      roomID
  );

  return (
    <div>
      <div
        className="myCallContainer"
        ref={meetingContainerRef}
        style={{ width: "100vw", height: "100vh" }}
      ></div>
    </div>
  );
}
