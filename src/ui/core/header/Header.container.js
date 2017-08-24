import {connect} from 'react-redux'
import HeaderComponent from './Header.component'
import {isSearchIconVisibleSelector, isTitleVisibleSelector, titleSelector} from './title/Title.selectors'
import {subtitleSelector} from './subtitle/Subtitle.selectors'
import {isSearchVisibleSelector} from './search/Search.selectors'
import {isOfflineSelector} from 'ui/core/offline/Offline.selectors'
import AnonymousAnalyzerApi from 'api/AnonymousAnalyzerApi'

const mapDispatchToProps = {
  // OnCopyToClipboard: () => { AnonymousAnalyzerApi.recordEvent('copy_to_clipboard', {}) }
}

const mapStateToProps = (state) => ({
  'subtitle': subtitleSelector(state),
  'title': titleSelector(state),
  'isTitleVisible': isTitleVisibleSelector(state),
  'isSearchVisible': isSearchVisibleSelector(state),
  'isIconVisible': isSearchIconVisibleSelector(state),
  'isOffline': isOfflineSelector(state),
  'onCopyToClipboard': () => { AnonymousAnalyzerApi.recordEvent('copy_to_clipboard', {}) },
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)
