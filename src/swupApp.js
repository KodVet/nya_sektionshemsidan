import Swup from "swup";
import SwupHeadPlugin from "@swup/head-plugin";
import SwupPreloadPlugin from "@swup/preload-plugin";
import SwupScrollPlugin from "@swup/scroll-plugin";
import SwupSlideTheme from "@swup/slide-theme";
import SwupScriptsPlugin from "@swup/scripts-plugin";
import SwupRouteNamePlugin from '@swup/route-name-plugin';

const scrollPlugin = new SwupScrollPlugin({
  animateScroll: {
    samePageWithHash: true,
    betweenPages: true
  },
  doScrollingRightAway: false,
})

const swup = new Swup({
  plugins: [
    new SwupScriptsPlugin({
      optin: true
    }),
    new SwupHeadPlugin(),
    new SwupRouteNamePlugin({
      routes: [
        { name: 'start', path: '/'}
      ]
    }),
    scrollPlugin,
    new SwupSlideTheme({ reversed: true }),
    new SwupPreloadPlugin(),
  ],
  ignoreVisit: (href, { el } = {}) =>
    el?.matches('[data-no-swup], [href$=".pdf"]'),
});


document.getElementById('Start').addEventListener('click', ()=> {
  scrollPlugin.options.animateScroll.betweenPages = false
})

swup.on('scrollDone', () => scrollPlugin.options.animateScroll.betweenPages = true)