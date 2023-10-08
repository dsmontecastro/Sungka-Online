import { ROW } from '@shared/utils/ts';

import { Layout } from '../../styles';

import Team from './_team';
import Slot from './slot';


interface Props { team: Team }

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

                {ROW.map((_, i) => <Slot key={i} col={i} team={team} />)}

            </div>

        </div>
    );

}