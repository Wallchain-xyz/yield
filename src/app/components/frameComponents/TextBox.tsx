import { PropsWithChildren } from 'react';

export function TextBox({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 1146 - 600,
        left: 32,
        display: 'flex',
        height: 600 - 32,
        width: 1146 - 64,
        backgroundColor: 'rgb(42, 36, 50)',
        borderRadius: 16,
        boxSizing: 'border-box',
        fontFamily: 'var(--theme-mono-font)',
        padding: 32,
        color: '#fff',
        fontWeight: 700,
        fontSize: 38,
      }}
    >
      {children}
    </div>
  );
}
