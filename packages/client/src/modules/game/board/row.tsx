import { PIECES, SLOTS } from '@shared/utils';

import { Layout } from '../../styles';

import Team from './_team';
import Slot from './slot';


interface Props { team: Team }

const _row = Array(SLOTS).fill(PIECES);

export default function Row({ team }: Props) {

    const teamBlack = team == Team.black;

    function label(id: string) {
        return `${id}-${team.toString()}`;
    }

    /* ------------------------------------------- STYLING ELEMENTS ------------------------------------------- */

    const flow = 'landscape:flex-row portrait:flex-col';
    const order = (teamBlack) ? '' : 'landscape:flex-row-reverse portrait:flex-col-reverse';

    const _slots = `justify-evenly ${flow} ${order} ${Layout.fill} ${Layout.center}`;


    return (
        <div id={label('row')} className={`relative ${Layout.fill} ${Layout.center}`}>

            <div id={label('slots')} className={_slots}>

                {_row.map((_, i) => <Slot key={i} col={i} team={team} />)}

            </div>

        </div>
    );

}