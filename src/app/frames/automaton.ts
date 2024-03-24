/* eslint-disable import/no-unused-modules */
/* eslint-disable no-console */
import { FrameButton } from 'frames.js';

import { dataStore } from '@/lib/DataStore';
import { isAddress } from '@/lib/utils/isAddress';

interface Controls {
  inputText?: string;
  buttons:
    | [FrameButton]
    | [FrameButton, FrameButton]
    | [FrameButton, FrameButton, FrameButton]
    | [FrameButton, FrameButton, FrameButton, FrameButton];
}

const mainMenuControls: Controls = {
  inputText: 'Give me your address',
  buttons: [
    {
      label: 'Lookup',
      action: 'post',
    },
    {
      label: 'Random',
      action: 'post',
    },
    {
      label: 'Play a game',
      action: 'post',
    },
    {
      label: 'Subscribe',
      action: 'post',
    },
  ],
} as const;

const gameControls: Controls = {
  buttons: [
    {
      label: 'Less',
      action: 'post',
    },
    {
      label: 'More',
      action: 'post',
    },
    {
      label: 'To menu',
      action: 'post',
    },
  ],
};

const finishGameControls: Controls = {
  buttons: [
    {
      label: 'Play again',
      action: 'post',
    },
    {
      label: 'Main menu',
      action: 'post',
    },
  ],
};

const subscribeControls: Controls = {
  inputText: 'Email',
  buttons: [
    {
      label: 'Confirm',
      action: 'post',
    },
    {
      label: 'Back',
      action: 'post',
    },
  ],
};

const errorControls: Controls = {
  buttons: [
    {
      label: 'Main menu',
      action: 'post',
    },
  ],
};

interface MainMenuState {
  id: 'mainMenu';
  lookUp?: {
    address: string;
    amount: number | null;
  };
  randomLookup?: {
    address: string;
    amount: number;
  };
}

interface InitialGameStep {
  id: 'game';
  score: number;
  accounts: { address: string; amount: number }[];
  referenceAccount: { address: string; amount: number };
}

interface GameState extends InitialGameStep {
  stepResult: 'won' | 'lost';
}

interface EmailGatheringState {
  id: 'emailGathering';
  success?: boolean;
}

interface ErrorState {
  id: 'error';
  message: string;
  randomLookup?: {
    address: string;
    amount: number;
  };
}

export type AutomatonState = MainMenuState | InitialGameStep | GameState | EmailGatheringState | ErrorState;

export class Automaton {
  state: AutomatonState;

  constructor(prevState: string) {
    if (!prevState) {
      this.state = {
        id: 'mainMenu',
      };
    } else {
      this.state = JSON.parse(prevState);
    }
  }

  get controls() {
    switch (this.state.id) {
      case 'game':
        if (this.state.accounts.length === 0) {
          return finishGameControls;
        }
        return gameControls;
      case 'mainMenu':
        return mainMenuControls;
      case 'emailGathering':
        return subscribeControls;
      case 'error':
        return errorControls;
      default:
        throw new Error('No controls for this state');
    }
  }

  async makeGame() {
    const accounts = await Promise.all([...new Array(10)].map(() => dataStore.getRandom()));
    const referenceAccount = accounts.shift() as { address: string; amount: number };
    this.state = {
      id: 'game',
      score: 0,
      accounts,
      referenceAccount,
    };
  }

  async doGameStep(clickedButton: string) {
    if (this.state.id !== 'game') {
      this.state = {
        id: 'error',
        message: 'Invalid game state',
      };
      return;
    }

    const { referenceAccount, score, accounts } = this.state;
    const nextAccount = accounts.shift() as { address: string; amount: number };

    const nextProfit = nextAccount.amount;
    const diff = nextProfit > referenceAccount.amount ? 'more' : 'less';
    const result = diff === clickedButton.toLowerCase() ? 'won' : 'lost';

    this.state = {
      id: 'game',
      score: result === 'won' ? score + 1 : score,
      accounts,
      referenceAccount: nextAccount,
      stepResult: result,
    };
  }

  clickedButtonTitle(buttonIndex: number): string {
    const { controls } = this;
    return controls.buttons[buttonIndex - 1].label as string;
  }

  async changeState(clickedButtonNumber: number, inputText: string) {
    const clickedButton = this.clickedButtonTitle(clickedButtonNumber);
    switch (this.state.id) {
      case 'emailGathering':
        if (clickedButton === 'Confirm') {
          const isEmailValid = !!inputText && /.+@.+\..+/.test(inputText);
          this.state = {
            id: 'emailGathering',
            success: isEmailValid,
          };
        }
        if (clickedButton === 'Back') {
          this.state = {
            id: 'mainMenu',
          };
        }
        break;
      case 'mainMenu':
        if (clickedButton === 'Subscribe') {
          this.state = {
            id: 'emailGathering',
          };
        }
        if (clickedButton === 'Play a game') {
          await this.makeGame();
        }
        if (clickedButton === 'Lookup') {
          if (!inputText || !isAddress(inputText)) {
            this.state = {
              id: 'error',
              message: 'It`s not an address.',
              randomLookup: await dataStore.getRandom(),
            };
            return;
          }
          const result = await dataStore.getProfits(inputText);
          this.state = {
            id: 'mainMenu',
            lookUp: {
              address: inputText,
              amount: result,
            },
          };
        }
        if (clickedButton === 'Random') {
          this.state = {
            id: 'mainMenu',
            randomLookup: await dataStore.getRandom(),
          };
        }
        break;
      case 'game':
        if (clickedButton === 'Play again') {
          await this.makeGame();
        } else if (clickedButton === 'Main menu') {
          this.state = {
            id: 'mainMenu',
          };
        } else {
          await this.doGameStep(clickedButton);
        }
        break;
      case 'error':
        this.state = {
          id: 'mainMenu',
        };
        break;
      default:
        this.state = {
          id: 'error',
          message: 'Unknown error',
        };
    }
  }

  stringify() {
    return encodeURI(JSON.stringify(this.state));
  }
}
