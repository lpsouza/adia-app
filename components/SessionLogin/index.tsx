import Router from "next/router";
import { useEffect } from "react";

const SessionLogin = () => {

  useEffect(() => {
    (async () => {
      const accessToken = window.localStorage.getItem('access_token');
      const refreshToken = window.localStorage.getItem('refresh_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_CORE_API}/auth/token`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (res.status === 200) {
        const data = await res.json();
        window.localStorage.setItem('email', data.email);
        window.localStorage.setItem('name', data.name);
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_CORE_API}/auth/token`, {
          method: 'POST',
          headers: { ContentType: 'application/json' },
          body: JSON.stringify({ refreshToken })
        });
        if (res.status === 200) {
          const token = await res.json();
          window.localStorage.setItem('access_token', token.access);
          window.localStorage.setItem('refresh_token', token.refresh);
          Router.push('/');
        }
        const excludePages = ['/auth/login', '/auth/register', '/404']
        if (!excludePages.includes(Router.pathname)) {
          Router.push('/auth/login');
        }
      }

    })();
  }, [])
  return (<></>);
}

export default SessionLogin;
