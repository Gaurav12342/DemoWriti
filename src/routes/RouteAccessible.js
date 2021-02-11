import React, { useState, useEffect } from 'react'
import { isRouteAccessible } from '../util/common'
function RouteAccessible(props) {
    const { location } = props
    const [isAccessible, setIsAccessible] = useState(undefined)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        let ans = isRouteAccessible(props)
        setIsAccessible(ans)
    }, [location.pathname])

    useEffect(()=>{
        setLoading(false)
    },[isAccessible])

    
    return props.children({ isAccessible,loading })
}
export default RouteAccessible