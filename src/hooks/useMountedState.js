import React, { useRef,useCallback,useEffect } from 'react'
const useMountedState = () => {
  const mountedRef = useRef(false);
  const get = useCallback(() => mountedRef.current, []);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  });

  return get;
}

export default useMountedState