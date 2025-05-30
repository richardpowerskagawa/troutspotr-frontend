import * as React from 'react'

export interface IClipboardIconProps {
  readonly size: number
  readonly style: object
  readonly onClick?: any
}

const ClipboardIcon: React.SFC<IClipboardIconProps> = ({ size, style, onClick }) => (
  <span style={style}>
    (Copy{' '}
    <svg height={size} width={size} style={style} onClick={onClick} viewBox="0 0 1024 896">
      <path d="M128 768h256v64H128v-64z m320-384H128v64h320v-64z m128 192V448L384 640l192 192V704h320V576H576z m-288-64H128v64h160v-64zM128 704h160v-64H128v64z m576 64h64v128c-1 18-7 33-19 45s-27 18-45 19H64c-35 0-64-29-64-64V192c0-35 29-64 64-64h192C256 57 313 0 384 0s128 57 128 128h192c35 0 64 29 64 64v320h-64V320H64v576h640V768zM128 256h512c0-35-29-64-64-64h-64c-35 0-64-29-64-64s-29-64-64-64-64 29-64 64-29 64-64 64h-64c-35 0-64 29-64 64z" />
    </svg>)
  </span>
)

export { ClipboardIcon }
