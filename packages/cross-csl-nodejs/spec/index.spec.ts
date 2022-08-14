import { init } from '../src';

import { setupTests } from '../../cross-csl-core/spec/index.spec';

setupTests(init() as any, 'Cross CSL Core');
