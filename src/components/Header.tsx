import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center">
        <div className="flex items-center gap-2">
          <Image
            src="https://jobsglobal.com/assets/images/logo_red.png"
            alt="JobsGlobal Logo"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-8"
          />
          <span className="text-lg font-bold text-red-800">JobsGlobal.com</span>
        </div>
      </div>
    </header>
  )
}
