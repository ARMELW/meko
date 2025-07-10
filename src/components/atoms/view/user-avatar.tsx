import { useMemo, useState } from "react";

interface UserAvatarProps {
  username?: string;
  size?: number;
  className?: string;
  avatarUrl?: string;
  alt?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  username = '',
  size = 64,
  className = '',
  avatarUrl,
  alt
}) => {
  const avatarColor = useMemo(() => {
    if (!username) return '#6B7280';

    const colors = [
      '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16',
      '#22C55E', '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9',
      '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#D946EF',
      '#EC4899', '#F43F5E', '#6B7280', '#78716C', '#57534E'
    ];

    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  }, [username]);

  const getInitials = (name: string): string => {
    if (!name) return '?';

    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return words.slice(0, 2).map(word => word[0]).join('').toUpperCase();
  };

  const initials = getInitials(username);

  if (avatarUrl) {
    return (
      <div
        className={`flex items-center justify-center rounded-full shadow-md overflow-hidden ${className}`}
        style={{
          width: size,
          height: size,
        }}
      >
        <img
          src={avatarUrl}
          alt={alt || `Avatar ${username}`}
          className="w-full h-full object-cover"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.style.backgroundColor = avatarColor;
              parent.innerHTML = `<span style="color: white; font-size: ${size * 0.4}px; font-weight: 600;">${initials}</span>`;
            }
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center font-semibold text-white rounded-full shadow-md ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: avatarColor,
        fontSize: size * 0.4
      }}
    >
      {initials}
    </div>
  );
};
export default UserAvatar;