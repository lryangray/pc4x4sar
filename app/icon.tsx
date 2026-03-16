import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export const size = {
  width: 192,
  height: 192,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0a1628 0%, #132542 100%)',
          color: '#ffffff',
          fontSize: 66,
          fontWeight: 800,
          letterSpacing: '-0.05em',
          borderRadius: 36,
          border: '10px solid #ff6b35',
        }}
      >
        4x4
      </div>
    ),
    size
  )
}
