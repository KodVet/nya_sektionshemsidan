import Swup from 'swup'
import SwupHeadPlugin from '@swup/head-plugin'
import SwupPreloadPlugin from '@swup/preload-plugin';
import SwupScrollPlugin from '@swup/scroll-plugin';
import SwupSlideTheme from '@swup/slide-theme';

const swup = new Swup({
  plugins: [new SwupHeadPlugin(), new SwupScrollPlugin(), new SwupSlideTheme(), new SwupPreloadPlugin()],
  ignoreVisit: (href, { el } = {}) => (
    el?.matches('[data-no-swup], [href$=".pdf"]')
  )
});