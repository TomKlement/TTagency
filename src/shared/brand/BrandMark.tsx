import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

type BrandMarkProps = {
  to?: string
  className?: string
}

export function BrandMark({ to = '/', className }: BrandMarkProps) {
  const { t } = useTranslation()
  const brandName = t('brand.name')
  const brandParts = brandName.split('|').map((p) => p.trim())
  const left = brandParts[0] || brandName
  const right = brandParts.length > 1 ? brandParts.slice(1).join(' | ').trim() : ''

  return (
    <Link to={to} className={className}>
      <span className="tracking-[0.28em]">{left}</span>
      {right ? <span className="tracking-tight"> {' | '}{right}</span> : null}
    </Link>
  )
}

