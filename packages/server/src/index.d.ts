declare type Trackers = { users: number, rooms: number };

// Shared Type Aliases ---------------------------------------------------------------------------------------

// Lobby: Room
declare type Room = {
    id: string, name: string, pass: string, members: number,
    host: { id: string, name: string, ready: boolean },
    guest: { id: string, name: string, ready: boolean }
};


// Chat: Message
declare type Message = { user: string, userID: string, time: string, text: string };


// Game: Board
declare type Row = [number, number, number, number, number, number, number];
declare type Board = [Row, Row];

// Game: Move
declare type Move = [number, number];
declare type Update = { move: Move, value: number };


// Sockets: Records
declare type Rooms = Record<string, Room>;
declare type Boards = Record<string, Board>;