import RoomsController from "../controllers/roomsController.js";
import SocketServer from "./util/socket.js";


const port = process.env.PORT || 3000
const socketServer = new SocketServer({ port })

const server = await socketServer.start()

const roomController = new RoomsController()

const namespaces = {
    room: { controller: RoomsController, eventEmitter: new Event()  }
}
console.log('socket server is running at: ', server.address().port)
