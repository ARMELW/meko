interface AvatarProps {
  src: string;
  alt?: string;
  size?: string; 
}

export  function Avatar({ src, alt, size = "60px" }: AvatarProps) {
  return (
    <div
      className="rounded-full overflow-hidden border-2 border-white"
      style={{ width: size, height: size, boxShadow: "rgba(0, 15, 71, 0.3) 1px 2px 0px"}}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}
