import { PlainRoute } from 'react-router'
import { LegalLayout } from './Legal.layout'
import { LegalIntroContainer } from 'ui/routes/legal/intro/LegalIntro.container'

// routes

export const createLegalRoutes = (store = null): PlainRoute => ({
  path: '/legal',
  component: LegalLayout,
  indexRoute: {
    component: LegalIntroContainer,
  },
// tslint:disable-next-line: only-arrow-functions
  getChildRoutes: function(location, cb) {
    import(/* webpackChunkName: "legal" */ './Legal.imports').then(
      ({ createPrivacyPolicyRoutes, createThankYouRoutes, createTermsOfServiceRoutes }) => {
        cb(null, [
          createPrivacyPolicyRoutes(store),
          createThankYouRoutes(store),
          createTermsOfServiceRoutes(store),
        ])
      }
    )
  },
})
