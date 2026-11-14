import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export const destinations = [
  { id: 'overview', label: 'Overview' },
  { id: 'library', label: 'Components' },
  { id: 'saved', label: 'Saved offline' },
  { id: 'docs', label: 'Documentation' },
];
export const tabIds = ['preview', 'explanation', 'props', 'export'];

export function readRoute() {
  const params = new URLSearchParams(window.location.search);
  const component = params.get('component') || '';
  const view = params.get('view') || (component ? 'library' : 'overview');
  const tab = params.get('tab');
  return {
    view: destinations.some((item) => item.id === view) ? view : 'overview',
    component,
    tab: tabIds.includes(tab) ? tab : 'preview',
    category: params.get('category') || 'All',
    query: params.get('q') || '',
  };
}

export function routeHref(route) {
  const params = new URLSearchParams();
  if (route.view !== 'overview') params.set('view', route.view);
  if (route.category && route.category !== 'All') params.set('category', route.category);
  if (route.query) params.set('q', route.query);
  if (route.component) params.set('component', route.component);
  if (route.component && route.tab !== 'preview' && route.tab) params.set('tab', route.tab);
  return window.location.pathname + (params.size ? '?' + params : '');
}

export function followRoute(event, action) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey ||
      event.shiftKey || event.altKey) return;
  event.preventDefault();
  action();
}

export function useShowcaseNavigation() {
  const [route, setRoute] = useState(readRoute);
  const mainRef = useRef(null);
  const pending = useRef(null);

  useEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    const onPop = () => {
      pending.current = { restore: history.state?.showcaseScroll, focus: true };
      setRoute(readRoute());
    };
    window.addEventListener('popstate', onPop);
    return () => {
      history.scrollRestoration = previous;
      window.removeEventListener('popstate', onPop);
    };
  }, []);

  useLayoutEffect(() => {
    const next = pending.current;
    pending.current = null;
    if (!next) return;
    const item = next.restore?.anchor && document.getElementById('catalogue-' + next.restore.anchor);
    if (next.focus) (item || mainRef.current)?.focus({ preventScroll: true });
    if (!next.focus) return;
    if (item && Math.abs(item.getBoundingClientRect().top + window.scrollY - next.restore.y) > window.innerHeight) {
      item.scrollIntoView({ block: 'center', behavior: 'instant' });
    } else {
      window.scrollTo({ top: next.restore?.y ?? 0, behavior: 'instant' });
    }
  }, [route]);

  function navigate(next, { replace = false, focus = true, anchor } = {}) {
    next = { category: 'All', query: '', component: '', ...next };
    const href = routeHref(next);
    if (href === window.location.pathname + window.location.search) return;
    if (!replace) {
      history.replaceState({ ...history.state, showcaseScroll: { y: window.scrollY, anchor } }, '');
    }
    history[replace ? 'replaceState' : 'pushState'](replace ? history.state : {}, '', href);
    pending.current = { focus };
    setRoute(next);
  }

  function backToCatalogue() {
    if (history.state?.showcaseFromCatalogue) history.back();
    else navigate({ ...route, component: '', tab: 'preview' });
  }

  function openComponent(component) {
    navigate({ ...route, component, tab: 'preview' }, { anchor: component });
    if (!route.component) history.replaceState({ ...history.state, showcaseFromCatalogue: true }, '');
  }

  function selectTab(tab) {
    navigate({ ...route, tab }, { replace: true, focus: false });
  }

  return { route, mainRef, navigate, openComponent, backToCatalogue, selectTab };
}
