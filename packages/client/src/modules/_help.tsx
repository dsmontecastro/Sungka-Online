import { Layout } from './styles';

const link = 'https://www.sungka-game.com/blogs/35/Sungka%20Rules';

export default function Help() {

    const name = 'help';

    function label(id: string) {
        return `${name}-${id}`;
    }

    /* ------------------------------------------- BACKDROP STYLING ------------------------------------------- */

    const shadow = 'bg-black bg-opacity-40';
    const overlay = 'z-20 absolute top-0';

    const _backdrop = `flex break-words ${shadow} ${overlay} ${Layout.fill}`;

    /* -------------------------------------------- DIALOG STYLING -------------------------------------------- */

    const flow = 'justify-start items-center text-center';
    const portrait = 'portrait:w-[95%] portrait:mt-[35px] portrait:mb-[15px]';
    const landscape = 'landscape:w-[50%] landscape:h-[75%] landscape:my-auto';

    const _dialog = `mx-auto pt-[3%] overflow-y-scroll bg-gray-700 ${flow} ${portrait} ${landscape} ${Layout.col}`;

    /* --------------------------------------------- TEXT STYLING --------------------------------------------- */

    const _text = `w-[75%] mb-[7.5%] flex-none flex-nowrap`;
    const _title = `w-[85%] mb-[3%] flex-none flex-nowrap text-xl`;

    /* --------------------------------------------- TABLE STYLING -------------------------------------------- */

    const border = 'border-white border-2';

    const _td = `p-[2%] ${border}`;
    const _table = `w-[95%] mx-auto my-[5%] text-sm`;

    /* --------------------------------------------- LIST STYLING --------------------------------------------- */

    const pos = 'pl-[14%] mx-auto ';
    const style = 'list-disc list-inside';

    const _list = `text-left ${pos} ${style}`;


    return (

        <div id={label('backdrop')} className={_backdrop}>

            <div id={label('dialog')} className={_dialog}>

                <div className={_title}>
                    <strong> How to Play </strong>
                </div>

                <span className={_text}>

                    <b><i>Sungka</i></b> is a board game where each of the <b>two (2)</b> players
                    gets <b>one (1)</b> <i>base</i> and <b>seven (7)</b> <i>slots</i>.

                    Each slot has <b>seven (7)</b> pieces;
                    <b> forty-nine (49)</b> per player or <b>ninety-eight (98)</b> total.

                    <br /> <br />

                    A player starts their <b><i>turn</i></b> by picking one of their <b>non-empty slots</b>,
                    taking all the pieces within.

                    Each piece then corresponds to a <b><i>move</i></b>,
                    allowing the them to traverse the board <b>away from either bases</b>.

                    The player can move through <b>any</b> slot and their <b>own base</b>,
                    effectively gathering points for the latter case.

                    <br /> <br />

                    Their <b>move ends</b> once they run out of pieces, <br />
                    and their <b><i>landing slot</i></b> determines the next game action:

                    <table id={label('landing-table')} className={_table}>

                        <tbody>

                            <tr id={label('landing-headers')} className={border}>
                                <th className={`w-[25%] ${_td}`}> Landing Slot </th>
                                <th className={`px-[25%] ${_td}`}> Effect </th>
                            </tr>

                            <tr id={label('landing-base')} className={border}>
                                <th className={_td}> Own Base </th>
                                <th className={_td}> Player is granted an <i>Extra Turn</i>. </th>
                            </tr>

                            <tr id={label('landing-filled')} className={border}>
                                <th className={_td}> Non-Empty Slot </th>
                                <th className={_td}> Player starts another move from the landing slot. </th>
                            </tr>

                            <tr id={label('landing-enemy')} className={border}>
                                <th className={_td}> Enemy Slot </th>
                                <th className={_td}> Player ends their turn, <i>capturing</i> all pieces from their landing slot and adding them to their base. </th>
                            </tr>

                            <tr id={label('landing-own')} className={border}>
                                <th className={_td}> Own Slot </th>
                                <th className={_td}>
                                    Same as above, but the player also <br />
                                    <i>captures the adjacent enemy slot</i>.
                                </th>
                            </tr>

                        </tbody>

                    </table>

                    <strong>

                        The game ends when there are no more moves or all slots are empty.

                        <br />

                        The player with the most pieces in their base wins.

                    </strong>

                </span>


                <div className={_title}>
                    <strong> Rule Differences </strong>
                </div>

                <div className={_text}>

                    <div>

                        The rules here are mostly the same as regular <b><i>Sungka</i></b>, except:

                        <ul className={_list}>

                            <li className='relative'>
                                The <b>Host (Black Team)</b> always moves first.
                            </li>

                            <li className='relative'>
                                A <b>game over</b> fully resets the board.
                            </li>

                        </ul>

                    </div>



                    <br />

                    For more information on the original ruleset, click this
                    <a href={link} target='_blank' rel='noopener noreferrer'>
                        &nbsp;<b><u>link</u></b>
                    </a>.

                </div>


            </div>

        </div>

    );

}