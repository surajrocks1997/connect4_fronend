import SockJS from "sockjs-client";
import Stomp from "stompjs";

class WebSocketService {
    constructor() {
        this.stompClient = null;
        this.initWebSocket();
    }

    initWebSocket() {
        console.log("From WebSocketService Class");
        const socket = new SockJS("http://localhost:8080/ws-connect4");
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect(
            {},
            (frame) => {
                console.log("Connected to WebSocket Server");
                console.log(frame);
            },
            () => {
                console.log(
                    "Could not Connect to WebSocket Server. Please Try Again"
                );
            }
        );
    }

    getStompClient() {
        return this.stompClient;
    }

    disconnectStompClient() {
        this.getStompClient().disconnect();
    }
}

const webSocketService = new WebSocketService();
export default webSocketService;
