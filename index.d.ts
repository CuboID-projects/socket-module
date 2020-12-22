
type listen = (event: string, func: () => void) => {listen: listen};

/**
 * Class in charge of handling the events launched from node.js through laravel events.
 */
declare class Socket {
    /**
     * Init socket io server.
     * 
     * @param host 
     */
    constructor(host: string); 

    /**
     * Listen event channels.
     */
    private listenChannels(): void;

    /**
     * Listen a socket io event.
     *
     * @param {string} channel - Socket io channel
     * @param {string} event - Socket io event
     * @param {any} func - Socket io function
     */
    private listen(): void

    /**
     * Listen any socket event.
     * 
     * @param {string} event - Event's name.
     * @param {() => any} fn - Event's function.
     * 
     */
    on(event: string, fn: (data: any) => any): SocketIOClient.Emitter;

    /**
     * Remove listener of socket event.
     */
    off(...args: [string, any?]): SocketIOClient.Emitter;

    /**
     * Get io instance.
     * 
     * @returns {SocketIOClient.Socket}
     */
    getInstance(): SocketIOClient.Socket;

    /**
     * Emit a socket io event to server.
     *
     * @param args
     */
    emit(...args: [string, any]): void

    /**
     * Public channel listen event.
     *
     * @param {string} name - Channel title
     */
    channel(name: string): {
        listen: listen;
    }

    /**
     * Private channel listen event.
     *
     * @param {string} name
     */
    private(name: string): {
        listen: listen
    }
}

export {Socket};