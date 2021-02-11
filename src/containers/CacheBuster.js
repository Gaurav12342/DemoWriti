import React from 'react';
import { CURRENT_VERSION } from '../constants/versionControl'

// version from response - first param, local version second param
const semverGreaterThan = (versionA, versionB) => {
    if (versionB && versionA) {
        if (parseFloat(versionB) > parseFloat(versionA)) {
            localStorage.setItem('latestVersion', versionB.toString())
            return true
        }
    }
    return false
};

class CacheBuster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isLatestVersion: false,
            refreshCacheAndReload: () => {
                console.log('Clearing cache and hard reloading...')
                if (caches) {
                    // Service worker cache should be cleared with caches.delete()
                    caches.keys().then(function (names) {
                        for (let name of names) caches.delete(name);
                    });
                }

                // delete browser cache and hard reload
                window.location.reload(true);
            }
        };
    }
    componentDidMount() {
        const latestVersion = localStorage.getItem('latestVersion')
        const currentVersion = CURRENT_VERSION
        console.log('local storage latest Version', latestVersion)
        console.log('current Version', currentVersion)
        const shouldForceRefresh = semverGreaterThan(latestVersion, currentVersion);
        if (shouldForceRefresh) {
            console.log(`We have a new version - ${latestVersion}. Should force refresh`);
            this.setState({ loading: false, isLatestVersion: false });
        } else {
            console.log(`You already have the latest version - ${latestVersion}. No cache refresh needed.`);
            this.setState({ loading: false, isLatestVersion: true });
        }
    }
    render() {
        const { loading, isLatestVersion, refreshCacheAndReload } = this.state;
        return this.props.children({ loading, isLatestVersion, refreshCacheAndReload });
    }
}

export default CacheBuster;