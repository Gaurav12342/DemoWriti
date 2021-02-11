import React from 'react'
const parse = JSON.parse, serialize = JSON.stringify
const useCacheQuery = (queryKey, fetchFn, config = { clearOnTabClose: true }) => {
  //Please check SearchMedicationCopy.js file for how to use.
  const [state, setState] = React.useState({
    loading: false,
    data: null,
    error: null
  });

  React.useEffect(() => {
    window.onbeforeunload = () => {
      if (config.clearOnTabClose) {
        localStorage.removeItem(queryKey)
      }
    }
  }, [])

  if (!queryKey || !fetchFn) {
    throw new Error("Please provide query key and data fetch function or promise.")
  }

  const getCacheItem = React.useCallback((key) => {
    let allLocalData = parse(localStorage.getItem(queryKey)) || {};
    return allLocalData[key]
  }, [])

  const setCacheData = React.useCallback((key, data) => {
    let allLocalData = parse(localStorage.getItem(queryKey)) || {};
    allLocalData[key] = data;
    localStorage.setItem(queryKey, serialize(allLocalData))
  }, [])

  const setData = React.useCallback(data => {
    setState({ loading: false, data, error: null })
  }, [])
  const setError = React.useCallback(error => {
    setState({ loading: false, data: null, error })
  }, [])

  const fetchResults = (...params) => {
    setState({ ...state, loading: true })
    const cacheKey = params.join('');

    const localData = getCacheItem(cacheKey)

    if (!!localData) {
      console.log("local data bind")
      setData(localData)
    } else {
      const fetcher = fetchFn(...params);
      if (fetcher instanceof Promise) {
        fetcher.then(data => {
          setData(data)
          setCacheData(cacheKey, data)
        }).catch(setError)
      } else {
        //if fetch is not promise then its already resolved data from function
        setData(fetcher)
        setCacheData(cacheKey, fetcher)
      }
    }
  }

  return {
    fetchResults,
    ...state
  }

}
export default useCacheQuery