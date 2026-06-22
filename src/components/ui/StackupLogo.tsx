type StackupLogoProps = {
  className?: string
  height?: number
  textSize?: string
  inverted?: boolean
}

export default function StackupLogo({ className = '', height = 44, textSize = 'text-xl', inverted = false }: StackupLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Geometric S mark */}
      <svg width={Math.round(height * 0.75)} height={height} viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Top shape — navy */}
        <path d="M4 2 L32 2 L32 10 L20 10 L20 22 L4 22 Z" fill="#1E3A5F" />
        {/* Bottom shape — gold */}
        <path d="M4 26 L16 26 L16 38 L32 38 L32 46 L4 46 Z" fill="#F59E0B" />
        {/* Connector bridge — electric blue */}
        <path d="M16 10 L32 10 L32 26 L16 26 Z" fill="#2D7DD2" />
      </svg>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <span className={`font-extrabold tracking-tight ${textSize} ${inverted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
          Stackup
        </span>
        <span className="text-xs font-semibold text-[#F59E0B] tracking-[0.15em] uppercase">
          Agency
        </span>
      </div>
    </div>
  )
}
