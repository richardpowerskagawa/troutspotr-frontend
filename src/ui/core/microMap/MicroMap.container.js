import { connect } from 'react-redux'
import MicroMapComponent from './MicroMap.component'
// import { isListVisible } from 'ui/core/Core.selectors'
import { getGpsCoordinateFeatureSelector, getIsActiveAndSuccessful } from 'ui/core/gps/Gps.selectors'
const mapDispatchToProps = {
}

const mapStateToProps = (state) => {
  let props = {
    gpsCoordinates: getGpsCoordinateFeatureSelector(state),
    isGpsActive: getIsActiveAndSuccessful(state)
  }
  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(MicroMapComponent)
