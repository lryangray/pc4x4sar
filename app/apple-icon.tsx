import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const dynamic = 'force-static'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default async function AppleIcon() {
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
          borderRadius: 32,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoBase64}
          alt=""
          width={158}
          height={158}
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    size
  )
}
