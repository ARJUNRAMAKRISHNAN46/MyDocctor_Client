// import io from "socket.io-client";
// const SOCKET_URL = import.meta.env.VITE_REACT_APP_SOCKET_URL;

// const VideoCall = () => {
//   const userName = "tbud-" + Math.floor(Math.random() * 100000);
//   const password = "x";

//   const newSocket = io(SOCKET_URL, {
//     query: {
//       userName,
//       password,
//     },
//   });

//   let localStream;
//   let remoteStream;
//   let peerConnection;
//   let didIOffer = false;

//   return (
//     <div>
//       <div className=" mb-3 mt-3 justify-center">
//         <div id="user-name">{userName}</div>
//         <button id="call">Call!</button>
//         <button id="hangup">Hangup</button>
//         <div id="answer"></div>
//       </div>
//       <div id="videos">
//         <div id="video-wrapper">
//           <div id="waiting">Waiting for answer...</div>
//           <video id="local-video" controls />
//         </div>
//         <video id="remote-video" controls />
//       </div>
//     </div>
//   );
// };

// export default VideoCall;

import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const VideoCall: React.FC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);
  const [socket, setSocket] = useState<any>(null);
  const [userId, setUserId] = useState<string>(
    `user-${Math.floor(Math.random() * 1000000)}`
  );

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:4007", {
      query: { userId },
      withCredentials: true,
    });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [userId]);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ socket:", socket);
    if (socket) {
      socket.on("incomingCall", handleIncomingCall);
      socket.on("callAnswered", handleCallAnswered);
      socket.on("iceCandidate", handleNewICECandidate);
    }
    console.log("🚀 ~ useEffect ~ on:", socket);
  }, [socket, ]);

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("iceCandidate", { candidate: event.candidate, userId });
      }
    };

    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    setPeerConnection(pc);
    return pc;
  };

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      return stream;
    } catch (err) {
      console.error("Failed to get local stream", err);
    }
  };

  const call = async (receiverId: string) => {
    const stream = await getMedia();
    const pc = createPeerConnection();
    stream?.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    try {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("call", { offer: pc.localDescription, receiverId });
      console.log(
        "--------------------------------------------------------------------------->"
      );
    } catch (err) {
      console.error("Error creating offer", err);
    }
  };

  const handleIncomingCall = async (data: {
    offer: RTCSessionDescriptionInit;
    callerId: string;
  }) => {
    console.log("🚀 ~ handleIncomingCall ~ data:", data);
    const stream = await getMedia();
    const pc = createPeerConnection();

    stream?.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socket.emit("answerCall", {
      answer: pc.localDescription,
      callerId: data.callerId,
    });
  };

  const handleCallAnswered = async (data: {
    answer: RTCSessionDescriptionInit;
  }) => {
    await peerConnection?.setRemoteDescription(
      new RTCSessionDescription(data.answer)
    );
  };

  const handleNewICECandidate = async (data: {
    candidate: RTCIceCandidateInit;
  }) => {
    if (peerConnection) {
      try {
        await peerConnection.addIceCandidate(
          new RTCIceCandidate(data.candidate)
        );
      } catch (e) {
        console.error("Error adding received ice candidate", e);
      }
    }
  };

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted playsInline />
      <video ref={remoteVideoRef} autoPlay playsInline />
      <input type="text" placeholder="Receiver ID" id="receiverId" />
      <button
        onClick={() =>
          call(
            (document.getElementById("receiverId") as HTMLInputElement).value
          )
        }
      >
        Call
      </button>
    </div>
  );
};

export default VideoCall;
