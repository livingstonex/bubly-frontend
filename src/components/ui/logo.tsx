function Logo({
  size = 'default',
  variant = 'full',
}: {
  size?: 'small' | 'default' | 'large' | 'xl';
  variant?: 'full' | 'icon';
}) {
  const sizes = {
    small: { container: 'h-8', text: 'text-xl', icon: 'w-2 h-6' },
    default: { container: 'h-12', text: 'text-3xl', icon: 'w-3 h-8' },
    large: { container: 'h-16', text: 'text-4xl', icon: 'w-4 h-10' },
    xl: { container: 'h-24', text: 'text-6xl', icon: 'w-6 h-16' },
  };

  const currentSize = sizes[size];

  if (variant === 'icon') {
    return (
      <div
        className={`${currentSize.container} flex items-center justify-center`}
      >
        <div className="relative">
          {/* Abstract geometric shape suggesting "brief" or summary */}
          <div className="relative flex items-center">
            <div
              className={`${currentSize.icon} rounded-sm transform -rotate-12 shadow-lg`}
              style={{ background: '#2d2b55' }}
            />
            <div
              className={`${currentSize.icon} rounded-sm transform rotate-12 -ml-1 shadow-lg`}
              style={{
                background: 'linear-gradient(135deg, #a48fff 0%, #c4c2ff 100%)',
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${currentSize.container} flex items-center gap-3`}>
      {/* Icon Element */}
      <div className="relative">
        <div className="relative flex items-center">
          {/* Background geometric shape */}
          <div
            className={`${currentSize.icon} rounded-sm transform -rotate-12 shadow-lg opacity-90`}
            style={{ background: '#2d2b55' }}
          />
          {/* Foreground accent shape */}
          <div
            className={`${currentSize.icon} rounded-sm transform rotate-12 -ml-1 shadow-lg`}
            style={{
              background: 'linear-gradient(135deg, #a48fff 0%, #c4c2ff 100%)',
            }}
          />
        </div>
      </div>

      {/* Typography */}
      <div className="flex items-baseline">
        <span
          className={`${currentSize.text} font-bold tracking-tight`}
          style={{
            background: 'linear-gradient(135deg, #0f0f1a 0%, #2d2b55 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Bubly
        </span>
        <span
          className={`${currentSize.text} font-bold tracking-tight`}
          style={{
            background: 'linear-gradient(135deg, #a48fff 0%, #c4c2ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Ai
        </span>
      </div>
    </div>
  );
}

export default Logo;
