import http from 'http';
import { Server } from 'socket.io'
import { constants } from './constants.js'


export default class SocketServer {
    #io
    constructor({ port }) {
        this.port = port 
        this.namespaces = { }
    }
    attachEvents({ routeConfig }) {
        for(const namespace of routeConfig) {
            for(const [route, { events, eventEmitter }] of Object.entries(namespace)) {
                const route = this.namespaces[namespace] = this.#io.of(`/${namespace}`)
                route.on('connection', socket => {
                    for (const [functionName, functionValue] of events) {
                        socket.on(functionName, (...args) => functionValue(socket, ...args))
                    }
                    eventEmitter.emit(constants.event.USER_CONNECTED, socket)
                })
            }
        }
    }

    async start () {
        const server = http.createServer((request, response) => {
            response.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS, POST, GET'            
            })

            response.end('hey there!!')
        })

        this.#io = new Server(server, {
            cors: {
                origin: '*',
                credentials: false
            }
        })
        // const room = this.#io.of('/room')
        // room.on('connection', socket => {
        //     socket.emit('userConnection', 'socket id connected' + socket.id)

        //     socket.on('joinRoom', (dados) => {
        //         console.log('dados recebidos', dados)

        //     })
        // })

        return new Promise((resolve, reject) => {
            server.on('error', reject)

            server.listen(this.port, () => resolve(server))
        })

    }
}

