import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const dynamic = 'force-static'

export const size = {
  width: 192,
  height: 192,
}

export const contentType = 'image/png'

export default async function Icon() {
  const logoData = await readFile(join(process.cwd(), 'public', 'images', 'logo-4x4-unit.png'))
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#0a1628',
          borderRadius: 36,
          border: '6px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoBase64}
          alt=""
          width={160}
          height={160}
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    size
  )
}
