import Link from 'next/link';

interface AuthFooterLinkProps {
  href: string;
}

export function AuthFooterLink({ href }: AuthFooterLinkProps) {
  return (
    <p className="flex h-5 w-full items-center justify-center gap-1 font-['Inter'] text-[14px] font-normal leading-5 tracking-[0] text-[#475467]">
      Don&apos;t have an account?
      <Link className="font-semibold text-[#6941C6]" href={href}>
        Sign up
      </Link>
    </p>
  );
}
