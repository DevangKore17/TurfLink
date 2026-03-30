const palette = ['#C8E6C9', '#FFE0B2', '#D1C4E9', '#B3E5FC', '#FFCDD2']

function AvatarGroup({ avatars = [] }) {
  return (
    <div className="flex items-center">
      {avatars.map((avatar, index) => (
        <div
          key={`${avatar}-${index}`}
          className="-ml-2 first:ml-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-semibold text-text-primary"
          style={{ backgroundColor: palette[index % palette.length], zIndex: avatars.length - index }}
        >
          {avatar}
        </div>
      ))}
    </div>
  )
}

export default AvatarGroup
