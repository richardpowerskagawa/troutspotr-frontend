import * as React from 'react'
const styles = require('./PageLayout.scss')

export interface IPageLayoutDispatchProps {
  fetchTableOfContents?(): void
}

export interface IPageLayoutStateProps {}

export interface IPageLayoutProps extends IPageLayoutDispatchProps, IPageLayoutStateProps {
  readonly header: React.ReactNode
  readonly content: React.ReactNode
  readonly footer: React.ReactNode
  readonly theme: 'dark' | 'light'
}

export const PageLayoutComponent: React.SFC<IPageLayoutProps> = (props): JSX.Element => {
  const { header, content, footer, theme } = props
  const themeClass = theme === 'dark' || theme == null ? 'ts-dark' : 'ts-light'
  return (
    <div className={`${styles.viewport} ${themeClass}`}>
      <header>{header}</header>
      <section className={styles.content}>{content}</section>
      <footer>{footer}</footer>
    </div>
  )
}
