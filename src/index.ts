import {default as io, Socket as socket} from "socket.io-client";
import micromatch from "micromatch";
import { Event } from './interfaces/Event';

/**
 * Class in charge of handling the events launched from node.js through laravel events.
 */
class SocketModule {

    /**
     * Subscribed events.
     *
     * @var {any} subscribed
     */
    subscribed: any = []

    /**
     * Socket.io instance.
     *
     * @var {io.Socket} io
     */
    private io!: typeof socket;

    /**
     * Init a socket io instance.
     *
     * @param {string} host
     */
    constructor(host: string) {
        this.io = io(host);
        // Function to start listen channel events.
        this.listenChannels();
    }

    /**
     * Listen any socket event.
     * 
     * @returns {SocketIOClient.Emitter}
     */
    on(event: string, fn: (data: any) => any) {
        return this.io.on(event, fn);
    }

    /**
     * Get io instance.
     * 
     * @returns {SocketIOClient.Socket}
     */
    getInstance() {
        return this.io;
    }

    /**
     * Listen event channels.
     */
    private listenChannels() {

        // Listener for io events,
        this.io.on("message", ({event: e, data, channel}: Event) => {

            // Event name format
            // App\Events\SendMessage -> SendMessage
            e = e.substring(e.lastIndexOf("\\") + 1);

            /**
             * Event function
             *
             * @var {any} event
             */
            const keys = Object.keys(this.subscribed)
                .filter(key => micromatch.isMatch(channel, key)); // Accept regex.

            for(const key of keys)
                this.subscribed[key][e](data);
        });
    }

    /**
     * Listen a socket io event.
     *
     * @param {string} channel - Socket io channel
     * @param {string} event - Socket io event
     * @param {any} func - Socket io function
     */
    private listen(channel: string, event: string, func: any) {

        this.subscribed[channel][event] = func;

        return {
            listen: (event: string, func: any) => this.listen(channel, event, func)
        };
    }

    /**
     * Emit a socket io event to server.
     *
     * @param args
     */
    emit(...args: [string, any]) {
        this.io.emit(...args);
    }

    /**
     * Public channel listen event.
     *
     * @param {string} name - Channel title
     */
    channel(name: string) {

        /**
         * Channel data.
         *
         * @var {any} channel
         */
        let channel = this.subscribed[name];

        // If the channel doesn't exists will be created.
        if(!channel)
            channel = this.subscribed[name] = [];

        return {
            listen: (event: string, func: any) => this.listen(name, event, func)
        }
    }

    /**
     * Private channel listen event.
     *
     * @param {string} name
     */
    private(name: string) {
        return this.channel("private-" + name);
    }
}

export const Socket = SocketModule;