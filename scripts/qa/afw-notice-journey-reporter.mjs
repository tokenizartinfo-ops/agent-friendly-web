export default async function* report(events) {
  const results = [];
  let summaries = 0;
  let success = false;
  for await (const {type, data} of events) {
    if (type === 'test:pass' || type === 'test:fail') {
      if (results.length >= 8) throw new Error('Too many test results');
      const passed = type === 'test:pass' && data.skip === undefined && data.todo === undefined;
      results.push({name: data.name, passed});
    }
    if (type === 'test:summary') {
      summaries++;
      success = data.success === true;
    }
  }
  yield JSON.stringify({results, summaries, success}) + '\n';
}
