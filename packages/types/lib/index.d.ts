// Custom export type Aliases

declare namespace global {

    // Lobby: Room
    export type Room = {
        id: string, name: string, pass: string, members: number,
        host: { id: string, name: string, ready: boolean },
        guest: { id: string, name: string, ready: boolean }
    };


    // Chat: Message
    export type Message = { user: string, userID: string, time: string, text: string };


    // Game: Board
    export type Row = [number, number, number, number, number, number, number];
    export type Board = [Row, Row];

    // Game: Move
    export type Move = [number, number];
    export type Update = { move: Move, value: number };


    // Sockets: Records
    export type Rooms = Record<string, Room>;
    export type Boards = Record<string, Board>;

}