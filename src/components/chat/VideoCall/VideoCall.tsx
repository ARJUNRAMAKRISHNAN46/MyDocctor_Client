import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useLocation } from "react-router-dom";
import { useSocketContext } from "../../../contexts/SocketContext";

function randomID(len: any) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

const VideoCall = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const senderId = queryParams.get("senderId");
  const { socket } = useSocketContext();
  const roomID = getUrlParams().get("roomID") || randomID(5);
  const meetingContainerRef = useRef(null);

  useEffect(() => {
    if (meetingContainerRef.current) {
      myMeeting(meetingContainerRef.current);
    }

    async function myMeeting(element: any) {
      const appID = 1055358616;
      const serverSecret = "8c6de53aa2140d72314c6aa407979f46";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        randomID(5),
        randomID(5)
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: "Copy link",
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

      const data = {
        id: id,
        senderId: senderId,
        link:
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          "?roomID=" +
          roomID,
      };

      socket?.emit("videoCall", data);
    }
  }, [roomID, socket, id]);

  return (
    <div
      className="myCallContainer"
      ref={meetingContainerRef}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
};

export default VideoCall;
