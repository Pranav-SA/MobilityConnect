import React from 'react';
import RemainingMinutes from '../components/RemainingMinutes';
import PackageDeals from '../components/PackageDeals';

function PackagesView() {

    return (
        <div>
          <RemainingMinutes />
          <PackageDeals />
        </div>
    );

}

export default PackagesView;