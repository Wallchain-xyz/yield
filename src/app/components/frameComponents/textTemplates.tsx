import { AutomatonState } from '@/app/frames/automaton';

interface Lookup {
  address: string;
  amount: number | null;
}

const highlightedStyle = {
  fontFamily: 'monospace',
  fontSize: '0.9em',
  fontWeight: 'bold',
  backgroundColor: 'rgb(63, 58, 70)',
  borderRadius: '8px',
  padding: '0.1em 0.5em',
};

function Address({ address }: { address: string }) {
  return (
    // stupid hack of server side image rendering
    <table>
      <tr>
        <td
          style={{
            ...highlightedStyle,
            color: 'rgb(116, 214, 254)',
          }}
        >
          {address}
        </td>
      </tr>
    </table>
  );
}

function RandomLookup({ address, amount }: Lookup) {
  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
      <p style={{ marginTop: 0, marginBottom: '0.5em' }}>The estimated payoff for a random address</p>
      <Address address={address} />
      <p style={{ marginTop: '0.5em', marginBottom: '0.5em' }}>
        is about
        <span
          style={{
            color: '#73c984',
            ...highlightedStyle,
            marginLeft: '0.5em',
          }}
        >
          ${amount?.toFixed(2)}
        </span>
      </p>
    </div>
  );
}

function EmailGathering({ success }: { success?: boolean }) {
  if (success === false) {
    return (
      <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <p style={{ marginTop: 0, marginBottom: '0.5em' }}>I&apos;m sorry, Dave.</p>
        <p style={{ marginTop: 0 }}>I can&apos;t do that. It&apos;s not an email.</p>
      </div>
    );
  }
  if (success === true) {
    return (
      <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <p style={{ marginTop: 0, marginBottom: '0.5em' }}>Thank you, Dave.</p>
        <p style={{ marginTop: 0 }}>I will keep you informed.</p>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
      <p style={{ marginTop: 0, marginBottom: '0.5em' }}>Want to stay informed?</p>
      <p style={{ marginTop: 0 }}>Gimme your mail 👇</p>
    </div>
  );
}

function ErrorText({ message, randomLookup }: { message: string; randomLookup?: Lookup }) {
  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
      <p style={{ marginTop: 0, marginBottom: '0.5em' }}>{message}</p>
      <p style={{ marginTop: 0, marginBottom: '0.5em' }}>I&apos;m sorry, I can&apos;t do that. Try again, Dave.</p>
      {randomLookup && <p style={{ marginTop: 0, marginBottom: '0.5em' }}>One more thing.</p>}
      {randomLookup && <RandomLookup address={randomLookup.address} amount={randomLookup.amount} />}
    </div>
  );
}

function MainMenuText({ lookup, randomLookup }: { lookup?: Lookup; randomLookup?: Lookup }) {
  if (lookup) {
    return (
      <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <p style={{ marginTop: 0, marginBottom: '0.5em' }}>
          Estimated earnings are around{' '}
          <span
            style={{
              color: '#73c984',
              ...highlightedStyle,
              marginLeft: '0.5em',
            }}
          >
            ${lookup.amount?.toFixed(2)}
          </span>
        </p>
        <p style={{ marginTop: 0, marginBottom: '0.5em' }}>Go to wallchain.xyz for early access.</p>
        {randomLookup && <p style={{ marginTop: 0, marginBottom: '0.5em' }}>One more thing.</p>}
        {randomLookup && <RandomLookup address={randomLookup.address} amount={randomLookup.amount} />}
      </div>
    );
  }

  if (randomLookup) {
    return (
      <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <RandomLookup address={randomLookup.address} amount={randomLookup.amount} />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
      <p style={{ marginTop: 0, marginBottom: '0.5em' }}>GM!</p>
      <p style={{ marginTop: 0, marginBottom: '0.5em' }}>
        By simply holding ETH and stablecoins, you are losing money to a form of inflation and yield opportunity.
      </p>
      <p style={{ marginTop: 0, marginBottom: '0.5em' }}>
        Wallchain introduces interest bearing wallet accounts that work like native yield.
      </p>
      <p style={{ marginTop: 0, marginBottom: '0.5em' }}>
        Check out how much ETH & USDC the address could’ve earned 👇
      </p>
    </div>
  );
}

function GameScreen({
  score,
  accounts,
  referenceAccount,
  stepResult,
}: {
  score: number;
  accounts: Lookup[];
  referenceAccount: Lookup;
  stepResult: boolean | 'won' | 'lost';
}) {
  if (accounts.length === 0) {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <table>
          <tr>
            <td>
              Estimate is:
              <span
                style={{
                  color: '#73c984',
                  ...highlightedStyle,
                  marginLeft: '0.5em',
                }}
              >
                ${referenceAccount.amount?.toFixed(2)}
              </span>
            </td>
          </tr>
        </table>
        <div
          style={{
            display: 'flex',
            marginTop: 64,
            alignItems: 'center',
          }}
        >
          Total score:
          <table>
            <tr>
              <td>
                <span
                  style={{
                    ...highlightedStyle,
                    fontSize: 48,
                    marginLeft: '0.5em',
                  }}
                >
                  {score}/9
                </span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }

  if (stepResult) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 300,
            height: 100,
            fontSize: '56px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            backgroundColor: stepResult === 'won' ? 'rgb(73, 201, 96)' : 'rgb(201, 73, 73)',
            marginBottom: '32px',
          }}
        >
          {stepResult === 'won' ? 'Correct!' : 'Incorrect!'}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <table>
            <tr>
              <td>
                Estimate is:
                <span
                  style={{
                    color: '#73c984',
                    ...highlightedStyle,
                    marginLeft: '0.5em',
                  }}
                >
                  ${referenceAccount.amount?.toFixed(2)}
                </span>
              </td>
            </tr>
          </table>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            marginTop: 32,
          }}
        >
          <p style={{ marginTop: 0, marginBottom: '0.5em' }}>Next address will be:</p>
          <Address address={accounts[0].address} />
          <p style={{ marginTop: '0.5em', marginBottom: '0.5em' }}>What would be the estimated payoff?</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <RandomLookup address={referenceAccount.address} amount={referenceAccount.amount} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          marginTop: 24,
        }}
      >
        <p style={{ marginTop: 0, marginBottom: '0.5em' }}>Next address will be:</p>
        <Address address={accounts[0].address} />
        <p style={{ marginTop: '0.5em', marginBottom: '0.5em' }}>What would be the estimated payoff?</p>
      </div>
    </div>
  );
}

export function stateToText(state: AutomatonState) {
  switch (state.id) {
    case 'mainMenu':
      return <MainMenuText lookup={state.lookUp} randomLookup={state.randomLookup} />;
    case 'error':
      return <ErrorText message={state.message} randomLookup={state.randomLookup} />;
    case 'emailGathering':
      return <EmailGathering success={state.success} />;
    case 'game':
      return (
        <GameScreen
          score={state.score}
          accounts={state.accounts}
          referenceAccount={state.referenceAccount}
          stepResult={'stepResult' in state ? state.stepResult : false}
        />
      );
    default:
      return JSON.stringify(state);
  }
}
