import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import routes from './constant';
import Header from '../components/Header';
import { isRouteAccessible } from '../util/common';
import { PUBLIC_ROUTES_COLLECTIONS } from '../constants/common';

function RestrictedRoutes(mainProps) {
  const { component: Component, token, ...rest } = mainProps;
  return (
    <>
      {
        rest && rest.location && rest.location.pathname
          && (PUBLIC_ROUTES_COLLECTIONS.includes(rest.location.pathname) ||
            rest.location.pathname.indexOf('wa/reset-password') > 0
          ) ? null :
          <Route {...rest}
            render={props => (<>
              < Header />
              <Component {...rest} {...props} />
            </>)} />
      }
    </>
  );
}
export default RestrictedRoutes;
