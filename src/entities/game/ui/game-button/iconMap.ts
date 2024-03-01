import { TurnType } from '../../model';

import RockIcon from 'shared/icons/rock.svg';
import PaperIcon from 'shared/icons/paper.svg';
import ScissorsIcon from 'shared/icons/scissors.svg';
import LizardIcon from 'shared/icons/lizard.svg';
import SpockIcon from 'shared/icons/spock.svg';

export const iconMap: Record<TurnType, string> = {
  rock: RockIcon,
  paper: PaperIcon,
  scissors: ScissorsIcon,
  lizard: LizardIcon,
  spock: SpockIcon,
};
