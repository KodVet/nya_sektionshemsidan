import Swup from 'swup'
import SwupHeadPlugin from '@swup/head-plugin'
import SwupScrollPlugin from '@swup/scroll-plugin';

const swup = new Swup({
  plugins: [new SwupHeadPlugin(), new SwupScrollPlugin(),]
});