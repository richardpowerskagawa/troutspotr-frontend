export interface IAccessPoint {
  gid: number
  street_name: string
  stream_gid: number
  linear_offset: number
  is_over_publicly_accessible_land: boolean
  road_gid: number
  centroid_latitude: number
  centroid_longitude: number
  is_over_trout_stream: boolean
  distance_to_previous_neighbor: number
  is_previous_neighbor_same_road: boolean
  road_type_id: number
}
