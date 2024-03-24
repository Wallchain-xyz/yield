/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/ban-ts-comment */

export function Scene() {
  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <img
        style={{
          position: 'absolute',
          height: '100%',
          top: 0,
          left: -125,
        }}
        src="http://localhost:3000/static/bg.jpg"
      />
      <img
        style={{
          position: 'absolute',
          width: 380,
          top: 180,
          left: 390,
        }}
        src="http://localhost:3000/static/mascot.png"
      />
    </div>
  );
}
