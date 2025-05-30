import * as React from 'react'
import debounce from 'lodash-es/debounce'
require('mapbox-gl/dist/mapbox-gl.css')
import groupBy from 'lodash-es/groupBy'
import { Map, Style as MapboxStyle } from 'mapbox-gl'
const styles = require('./MapboxGl.scss')

type MapboxGeoJSONLayers = any[]

const token = 'pk.eyJ1IjoiYW5kZXN0MDEiLCJhIjoibW02QnJLSSJ9._I2ruvGf4OGDxlZBU2m3KQ'
// https://stackoverflow.com/a/44393954

export interface IMapboxGlDispatchProps {
  onMapInitialized(t: boolean): void
}

export interface IMapboxGlStateProps {
  readonly style: MapboxStyle | string
  readonly mapboxGl: any
  readonly debugMode?: boolean
}

export interface IMapboxGlPassedProps {
  onFeaturesSelected(t: any): void
}

export interface IMapboxGlProps
  extends IMapboxGlDispatchProps,
    IMapboxGlStateProps,
    IMapboxGlPassedProps {}

export interface IMapboxGlState {
  readonly map: Map
  readonly isLoaded: boolean
}
export class MapboxGlComponent extends React.Component<IMapboxGlProps, IMapboxGlState> {
  private mapContainer: HTMLDivElement
  private static defaultProps = {
    debugMode: process.env.NODE_ENV === 'development'
  }
  constructor(props, state) {
    super(props, state)
    this.resizeEvent = this.resizeEvent.bind(this)
    this.onClick = this.onClick.bind(this)
    this.getInteractiveFeaturesOverPoint = this.getInteractiveFeaturesOverPoint.bind(this)
    this.onDataLoad = this.onDataLoad.bind(this)
    this.state = {
      map: null,
      isLoaded: false,
    }
  }

  private resizeEvent() {
    if (this.state != null && this.state.map != null) {
      const map = this.state.map
      map.resize()
    }
  }

  // tslint:disable-next-line:no-empty
  protected debouncedResizeEvent = () => {}

  public onClick(e) {
    const features = this.getInteractiveFeaturesOverPoint(e.point)
    if (features == null || features.length === 0) {
      return
    }

    const groups = groupBy(features, f => f.layer.id)
    this.props.onFeaturesSelected(groups)
  }

  public componentWillMount() {
    if (window) {
      this.debouncedResizeEvent = debounce(this.resizeEvent, 80)
      window.addEventListener('resize', this.debouncedResizeEvent)
      window.addEventListener('orientationchange', this.debouncedResizeEvent)
    }
  }

  public componentWillUpdate(nextProps, nextState) {
    const nextStyle = nextProps.style
    const { isLoaded, map } = nextState
    if (this.props.style !== nextStyle && isLoaded) {
      map.setStyle(nextStyle, { diff: true })
    }
  }

  // tslint:disable-next-line:no-any
  public getInteractiveFeaturesOverPoint(point): MapboxGeoJSONLayers {
    const BOX_DIMENSION = 20
    const boundingBox = [
      [point.x - BOX_DIMENSION / 2, point.y - BOX_DIMENSION / 2],
      [point.x + BOX_DIMENSION / 2, point.y + BOX_DIMENSION / 2],
    ]

    const features = this.state.map.queryRenderedFeatures(boundingBox)
    return features
  }

  public componentDidMount() {
    const { mapboxGl } = this.props
    Object.getOwnPropertyDescriptor(mapboxGl, 'accessToken').set(token)
    const map = new mapboxGl.Map({
      container: this.mapContainer,
      style: this.props.style,
      center: [-90.04663446020976, 42],
      zoom: 4,
      minZoom: 2,
      maxZoom: 18.5,
      // dragRotate: false,
      // touchZoomRotate: false,
      renderWorldCopies: true,
    }) as Map
    // map.dragRotate.disable()
    // map.touchZoomRotate.disableRotation()
    // TODO: REMOVE THIS
    // map.showCollisionBoxes = true
    if (this.props.debugMode === true) {
      setTimeout(() => map.resize(), 200)
    }

    map.on('click', this.onClick)
    map.on('load', e => {
      this.setState(
        () => {
          return {
            map: map,
            isLoaded: true,
          }
        },
        () => {
          const scale = new mapboxGl.ScaleControl({
            maxWidth: 90,
            unit: 'imperial'
          });
          map.addControl(scale);
          this.onDataLoad(e)
        }
      )
    })
  }

  public onDataLoad(e) {
    this.props.onMapInitialized(true)
  }

  public componentWillUnmount() {
    if (this.state.map) {
      this.state.map.off('click', this.onClick)
      this.state.map.remove()
    }
  }

  private renderChildren(children) {
    if (children == null || !children) {
      return null
    }

    const { isLoaded, map } = this.state
    if (isLoaded === false || map == null) {
      return null
    }

    const activeChildren = React.Children.toArray(children).filter(x => x != null && x)

    return activeChildren.map(child =>
      React.cloneElement(child as React.ReactElement<any>, { map: map })
    )
  }

  public componentDidCatch(error, info) {
    console.error('an error was caught in mapbox-gl-component')
    console.error(error)
  }

  public render() {
    const { children } = this.props
    return (
      <div className={styles.container} ref={el => (this.mapContainer = el)}>
        {this.renderChildren(children)}
      </div>
    )
  }
}
