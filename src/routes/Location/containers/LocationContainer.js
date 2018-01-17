import { connect } from 'react-redux'
import Location from '../components/LocationView'
import Loading from '../components/Loading'
import { actions } from '../modules/LocationModule'

const mapDispatchToProps = actions

const mapStateToProps = (state) => (state.locationRoute)

export default connect(mapStateToProps, mapDispatchToProps)(
  (props) => {
    if (props.loading) {
      return Loading(props)
    } else {
      return Location(props)
    }
  }
)
