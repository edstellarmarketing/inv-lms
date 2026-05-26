import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footerHint?: React.ReactNode;
  wide?: boolean;
};

export default function AuthFrame({ title, subtitle, children, footerHint, wide }: Props) {
  return (
    <div className="auth-shell">
      <div className="auth-bg" aria-hidden />
      <div className={`auth-card${wide ? " wide" : ""}`}>
        <Link href="/" className="auth-logo">
          <Image
            src="/invensis-learning-logo.svg"
            alt="Invensis Learn"
            width={140}
            height={34}
            priority
          />
        </Link>
        <h1>{title}</h1>
        {subtitle && <p className="auth-sub">{subtitle}</p>}
        <div className="auth-body">{children}</div>
        {footerHint && <div className="auth-foot">{footerHint}</div>}
      </div>
    </div>
  );
}
