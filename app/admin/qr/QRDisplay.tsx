'use client'

import QRCode from 'react-qr-code'

export default function QRDisplay({ url }: { url: string }) {
  const download = () => {
    const svg = document.getElementById('czysty-qr')
    if (!svg) return
    const serializer = new XMLSerializer()
    const svgStr = serializer.serializeToString(svg)
    const blob = new Blob([svgStr], { type: 'image/svg+xml' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'czysty-qr-code.svg'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <div className="flex flex-col items-center">
      {/* QR Code */}
      <div className="bg-white p-8 shadow-sm border border-czysty-green/10 mb-6">
        <QRCode
          id="czysty-qr"
          value={url}
          size={240}
          fgColor="#09100A"
          bgColor="#FFFFFF"
          level="H"
        />
      </div>

      {/* URL display */}
      <div className="bg-white border border-czysty-green/10 px-6 py-4 max-w-sm w-full mb-6">
        <p className="font-body text-[9px] text-czysty-muted uppercase tracking-widest mb-1">QR Code URL</p>
        <p className="font-body text-czysty-black/60 text-[12px] break-all">{url}</p>
      </div>

      {/* Download SVG */}
      <button
        onClick={download}
        className="czysty-btn czysty-btn-primary px-10 py-4 text-sm"
      >
        Download SVG
      </button>

      <p className="font-body text-czysty-muted/50 text-[11px] mt-3 text-center">
        SVG scales to any size — perfect for print
      </p>
    </div>
  )
}
