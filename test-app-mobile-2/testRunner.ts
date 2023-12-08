
export const mockDescribe = () => {
  const testsSuites:Array<[string, () => Promise<void>]> = [];
  const describe = async (name: string, callback: () => Promise<void>) => testsSuites.push([name, callback]);
  Object.assign(global, {describe});
  return {testsSuites};
};


export const executeTests = async (options: {testsSuites:Array<[string, () => Promise<void>]>}) => {
  let succeeded = 0;
  let failed = 0;
  for(const [name, callback] of options.testsSuites) {
    console.log(`Test suite: ${name}`);
    const tests:Array<[string, () => Promise<void>]> = [];
    const it = async (name: string, callback: () => Promise<void>) => tests.push([name, callback]);
    Object.assign(global, {it});
    await callback();

    for(const [name, callback] of tests) {
      try {
        await callback();
        succeeded++;
        console.log('PASSED', name);
      }
      catch(e) {
        failed++;
        console.log('FAILED', name);
        console.log('ERROR', e);
      }
    }
  }
  return {succeeded, failed};
};