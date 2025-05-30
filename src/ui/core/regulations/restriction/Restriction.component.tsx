import * as React from 'react'
const classes = require('./Restriction.scss')
/* eslint no-unneeded-ternary: 0 */

export interface IRestrictionComponent {
  color: 'red' | 'yellow' | 'blue' | 'green' | 'white' | 'blueGray'
  pattern: 'solid' | 'stipple' | 'dot'
  text: string
  length: string
  hollow: boolean
  heightMultiplier: number
}

export const RestrictionComponent = (props: IRestrictionComponent) => {
  const { color, pattern, text, length } = props
  const colorClass = classes[color]
  const patternClass = classes[pattern]
  const hollowClass = props.hollow ? classes.hollow : ''
  const heightMultiplier = props.heightMultiplier == null ? 0 : props.heightMultiplier
  const borderWidthOverride = heightMultiplier < 0.2 ? {
    borderWidth: `${heightMultiplier * 1.2}em`,
    boxSizing: 'border-box',
  } : {}
  const heightOverride = heightMultiplier > 0 ? { ...borderWidthOverride, height: `${heightMultiplier}em` } : { ...borderWidthOverride }
  return (
    <div className={classes.container}>
      <div className={classes.symbolContainer}>
        <span className={`${patternClass} ${colorClass} ${hollowClass}`} style={heightOverride}/>
      </div>
      <span className={classes.length}>{length}</span>
      <span className={classes.definition}>{text}</span>
    </div>
  )
}
