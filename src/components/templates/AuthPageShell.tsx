interface AuthPageShellProps {
  children: React.ReactNode;
  variant?: 'login' | 'register';
}

export function AuthPageShell({ children, variant = 'login' }: AuthPageShellProps) {
  const backgroundTop = variant === 'register' ? 'top-[-116px]' : 'top-[-11.86px]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(166,192,254,0.5)_0%,rgba(255,234,246,0.5)_100%)]" />
      <div
        className={`${backgroundTop} pointer-events-none absolute left-1/2 h-[695.86px] w-[min(928px,100vw)] -translate-x-1/2 opacity-20 [background-image:linear-gradient(to_right,transparent_calc(52.56px_-_0.55px),#BA6262_calc(52.56px_-_0.55px),#BA6262_52.56px),linear-gradient(to_bottom,transparent_calc(52.56px_-_0.55px),#BA6262_calc(52.56px_-_0.55px),#BA6262_52.56px)] [background-size:52.56px_52.56px]`}
      />
      <section className="relative mx-auto flex min-h-[559px] w-[min(360px,calc(100vw-32px))] flex-col gap-8 pt-16 lg:pt-[162px]">
        {children}
      </section>
    </main>
  );
}
