import { Layout } from '../../styles';

import Team from './_team';

import Base from './base';
import Row from './row';


export default function Board() {

    const name = 'board';

    function label(id: string) {
        return `${name}-${id}`;
    }

    /* -------------------------------------- BOARD (BACKGROUND) STYLING -------------------------------------- */

    const boardFlow = `landscape:flex-row portrait:flex-col ${Layout.center}`;
    const _board = `min-h-[240px] w-[98%] h-[98%] relative flex-grow ${boardFlow}`;

    /* ------------------------------------ SLOTS (ROWS CONTAINER) STYLING ------------------------------------ */

    const portrait = 'portrait:w-full portrait:h-[70%] portrait:flex-row';
    const landscape = 'landscape:w-2/3 landscape:h-full landscape:flex-col';
    const _slots = `flex justify-evenly ${landscape} ${portrait}`;

    /* ----------------------------------------- SVG & STROKE STYLING ----------------------------------------- */

    const _svg = `absolute border-0 border-transparent ${Layout.fill}`;

    const strokeWidth = 'stroke-[1%]';
    const strokeBlack = `stroke-white ${strokeWidth}`;
    const strokeWhite = `stroke-black ${strokeWidth}`;

    return (

        <div id={name} className={_board}>


            {/* BOARD ELEMENTS */}

            <Base team={Team.black} />

            <div id={label('rows')} className={_slots}>

                <Row team={Team.black} />

                <Row team={Team.white} />

            </div>

            <Base team={Team.white} />



            {/* SVG ELEMENTS */}

            <svg id={label('lines-portrait')} strokeLinecap='round' className={`landscape:hidden ${_svg}`}>

                {/* Black Team */}
                <line x1={'25%'} y1={'15%'} x2={'50%'} y2={'5%'} className={strokeBlack} />
                <line x1={'25%'} y1={'15%'} x2={'25%'} y2={'80%'} className={strokeBlack} />

                {/* White Team */}
                <line x1={'75%'} y1={'85%'} x2={'50%'} y2={'95%'} className={strokeWhite} />
                <line x1={'75%'} y1={'85%'} x2={'75%'} y2={'20%'} className={strokeWhite} />

            </svg>

            <svg id={label('lines-landscape')} strokeLinecap='round' className={`portrait:hidden ${_svg}`}>

                {/* Black Team */}
                <line x1={'10%'} y1={'50%'} x2={'16%'} y2={'25%'} className={strokeBlack} />
                <line x1={'16%'} y1={'25%'} x2={'80%'} y2={'25%'} className={strokeBlack} />

                {/* White Team */}
                <line x1={'90%'} y1={'50%'} x2={'84%'} y2={'75%'} className={strokeWhite} />
                <line x1={'84%'} y1={'75%'} x2={'20%'} y2={'75%'} className={strokeWhite} />

            </svg>

        </div>

    );

}