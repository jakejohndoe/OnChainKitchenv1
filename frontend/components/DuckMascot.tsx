'use client'

interface DuckMascotProps {
  size?: 'small' | 'medium' | 'large'
  expression?: 'happy' | 'curious' | 'excited'
  className?: string
}

export default function DuckMascot({
  size = 'medium',
  expression = 'happy',
  className = ''
}: DuckMascotProps) {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-24 h-24'
  }

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Duck body */}
        <ellipse cx="50" cy="70" rx="25" ry="20" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>

        {/* Duck head */}
        <circle cx="50" cy="35" r="20" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>

        {/* Duck bill */}
        <ellipse cx="60" cy="35" rx="8" ry="4" fill="#fed7aa" stroke="#ea580c" strokeWidth="1"/>

        {/* Duck eyes */}
        <circle cx="45" cy="30" r="2" fill="#374151"/>
        <circle cx="55" cy="30" r="2" fill="#374151"/>

        {/* Eye highlights */}
        <circle cx="46" cy="29" r="0.5" fill="#ffffff"/>
        <circle cx="56" cy="29" r="0.5" fill="#ffffff"/>

        {/* Wing */}
        <ellipse cx="35" cy="65" rx="8" ry="12" fill="#fed7aa" stroke="#ea580c" strokeWidth="1"/>

        {expression === 'excited' && (
          <>
            {/* Excited blush */}
            <circle cx="35" cy="40" r="3" fill="#fecaca" opacity="0.6"/>
            <circle cx="65" cy="40" r="3" fill="#fecaca" opacity="0.6"/>
          </>
        )}

        {expression === 'curious' && (
          <>
            {/* Curious head tilt effect */}
            <ellipse cx="48" cy="33" rx="1" ry="2" fill="#374151" transform="rotate(-15 48 33)"/>
            <ellipse cx="52" cy="33" rx="1" ry="2" fill="#374151" transform="rotate(15 52 33)"/>
          </>
        )}
      </svg>
    </div>
  )
}