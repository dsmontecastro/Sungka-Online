export class Layout {

    static fill = 'w-full h-full';

    static col = 'flex flex-col';
    static row = 'flex flex-row';

    static center = 'flex justify-center content-center items-center';
    static colC = `flex-col ${this.center}`;
    static rowC = `flex-row ${this.center}`;

}

export class _Side {

    static bgGray = `bg-gray-500`;

    static bgOuter = 'bg-gray-700';
    static divider = `w-[90%] mx-[1%] border-b-2 border-solid ${this.bgOuter} ${Layout.center}`;

    static bgInner = 'bg-white';
    static container = `w-full mt-[5%] flex text-center text-black ${this.bgInner} ${Layout.colC}`;

    static input = `text-white`;
    static button = `text-white ${this.bgOuter}`;

}

export class _Game {

    static black = `text-white border-white bg-black`;
    static white = `text-black border-black bg-white`;

    static circle = 'aspect-square rounded-full border-8';

}