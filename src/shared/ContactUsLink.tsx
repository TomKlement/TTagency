import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

type Props = {
  className?: string
  onClick?: () => void
}

export function ContactUsLink({
  className = 'underline hover:text-[var(--color-text)]',
  onClick,
}: Props) {
  const { t } = useTranslation()

  return (
    <Link to="/contact" className={className} onClick={onClick}>
      {t('common.cta.contactUs')}
    </Link>
  )
}
