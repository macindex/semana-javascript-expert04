import { constants } from "../src/util/constants.js"

export default class RoomsController {
    #users = new Map()
    constructor() { 
        this.rooms = new Map()
    }

    onNewConnection(socket) {
        const { id } = socket
        console.log('connection stablished with', id)
        this.#updateGlobalUserData(id)
    }
    joinRoom(socket, {user, room}) {

        const userId = user.id = socket.id
        const roomId = room.id

        // console.log('connection stabilish with', id)
        
        const updateUserData = this.#updateGlobalUserData(
            userId, 
            user, 
            roomId
            )

        socket.emit(constants.event.USER_CONNECTED, data)
    }

    #updateGlobalUserData(userId, userData = {}, roomId = '') {
        
        const user = users.get(userId) ?? {}
        const existingRoom = this.rooms.has(roomId)
        const updateUserData = new Atendee ({
            ...user,
            ...userData,
            roomId,
            // Se for o único na sala 
            isSpeaker: !existingRoom,
        })
        this.#users.set(userId, updateUserData)

        return this.#users.set(userId, updateUserData)
    }

    getEvents() {
        const functions = Reflect.ownKeys(RoomsController.prototype)
        .filter(fn => fn !== 'constructor')
        .map(name => [name, this[name].bind(this)])

        return new Map(functions)
    }
}
