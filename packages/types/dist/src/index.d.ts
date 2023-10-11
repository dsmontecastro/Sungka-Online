export type Room = {
    id: string;
    name: string;
    pass: string;
    members: number;
    host: {
        id: string;
        name: string;
        ready: boolean;
    };
    guest: {
        id: string;
        name: string;
        ready: boolean;
    };
};
export type Message = {
    user: string;
    userID: string;
    time: string;
    text: string;
};
export type Row = [number, number, number, number, number, number, number];
export type Board = [Row, Row];
export type Move = [number, number];
export type Update = {
    move: Move;
    value: number;
};
export type Rooms = Record<string, Room>;
export type Boards = Record<string, Board>;
