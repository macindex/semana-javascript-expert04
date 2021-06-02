import Room from "../entities/room.js"
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
        
        const updatedUserData = this.#updateGlobalUserData(
            userId, 
            user, 
            roomId
            )
        const updatedRoom = this.#joinUserRoom(socket, updatedUserRoom, room)
      
        this.#notifyUsersOnRoom(socket, roomId, updatedUserData)
    }
    #notifyUsersOnRoom(socket, roomId, user) {
        const event = constants.event.USER_CONNECTED
        socket.to(roomId).emit(event, user)
    }

    #joinUserRoom(socket, user, room) {
        const roomId = room.id
        const existingRoom = this.rooms.has(roomId)
        const currentRoom = existingRoom ? this.rooms.get(roomId) : {}
        const currentUser = new Atendee ({
            ...user,
            roomId
        })
        existingRoom ?
        [currentRoom.owner, currentRoom.users] :
        [currentUser, new Set()]

        const updatedRoom = this.#mapRoom({
            ...currentRoom,
            ...room,
            owner,
            users: new Set([ ...this.#users, ...[currentUser]])

        })
        this.rooms.set(roomId, updatedRoom)

        socket.join(roomId)

        return this.rooms.get(roomId)
    }
    #mapRoom(room){
        const users = [...room.users.values()]
        const speakersCount = users.filter(user => user.isSpeaker).length
        const featuredAtendees = new users.slice(0, 3)
        const mappedRoom = new Room ({
            ...room,
            featuredAtendees,
            speakersCount,
            atendeesCount: room.users.size
        })
    }


    #updateGlobalUserData(userId, userData = {}, roomId = '') {
        
        const user = this.#users.get(userId) ?? {}
        const existingRoom = this.rooms.has(roomId)
        const updateUserData = new Atendee ({
            ...user,
            ...userData,
            roomId,
            // Se for o único na sala 
            isSpeaker: !existingRoom,
        })
        this.#users.set(userId, updateUserData)

        return this.#users.get(userId, updatedUserData)
    }

    getEvents() {
        const functions = Reflect.ownKeys(RoomsController.prototype)
        .filter(fn => fn !== 'constructor')
        .map(name => [name, this[name].bind(this)])

        return new Map(functions)
    }
}
