const {
  EVENT_RUN_BEGIN,
  EVENT_RUN_END,
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
  EVENT_SUITE_BEGIN,
  EVENT_SUITE_END
} = Mocha.Runner.constants;

export class MochaYoroiReporter {
  private _indents: number = 0;
  private _stats: Mocha.Stats;
  
  constructor(runner: Mocha.Runner) {
    this._stats = runner.stats;

    runner
      .once(EVENT_RUN_BEGIN, () => {
        console.log('starting to run test suites');
      })
      .on(EVENT_SUITE_BEGIN, () => {
        this.increaseIndent();
      })
      .on(EVENT_SUITE_END, () => {
        this.decreaseIndent();
      })
      .on(EVENT_TEST_PASS, test => {
        // Test#fullTitle() returns the suite name(s)
        // prepended to the test title
        console.log('\x1b[32m', `${this.indent()}pass:`, '\x1b[0m', `${test.fullTitle()}`);
      })
      .on(EVENT_TEST_FAIL, (test, err) => {
        console.log(
          `${this.indent()}fail: ${test.fullTitle()} - error: ${err.message}`
        );
      })
      .once(EVENT_RUN_END, () => {
        this.finish();
      });
  }

  indent() {
    return Array(this._indents).join('  ');
  }

  increaseIndent() {
    this._indents++;
  }

  decreaseIndent() {
    this._indents--;
  }

  finish() {
    if (this._stats) {
      console.log(`end: ${this._stats.passes}/${this._stats.passes + this._stats.failures} ok`); 
    }
  }
}