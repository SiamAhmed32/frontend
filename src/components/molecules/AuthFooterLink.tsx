import Link from 'next/link';

interface AuthFooterLinkProps {
  href: string;
  prompt?: string;
  linkLabel?: string;
}

export function AuthFooterLink({
  href,
  prompt = "Don't have an account?",
  linkLabel = 'Sign up',
}: AuthFooterLinkProps) {
  return (
    <p className="flex h-5 w-full items-center justify-center gap-1 font-['Inter'] text-[14px] font-normal leading-5 tracking-[0] text-[#475467]">
      {prompt}
      <Link className="font-semibold text-[#6941C6]" href={href}>
        {linkLabel}
      </Link>
    </p>
  );
}
