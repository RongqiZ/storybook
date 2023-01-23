import { rewriteImport } from './externals-plugin';

const packageName = '@storybook/package';
const globals = { [packageName]: '_STORYBOOK_PACKAGE_' };

const cases = [
  {
    globals,
    packageName,
    input: `import { Rain, Jour as Day, Nuit as Night, Sun } from "${packageName}"`,
    output: `const { Rain, Jour: Day, Nuit: Night, Sun } = ${globals[packageName]}`,
  },
  {
    globals,
    packageName,
    input: `import{Rain,Jour as Day,Nuit as Night,Sun}from '${packageName}'`,
    output: `const {Rain,Jour: Day,Nuit: Night,Sun} = ${globals[packageName]}`,
  },
  {
    globals,
    packageName,
    input: `const { Afternoon } = await import('${packageName}')`,
    output: `const { Afternoon } = ${globals[packageName]}`,
  },
];

test('rewriteImport', () => {
  cases.forEach(({ input, output, globals: caseGlobals, packageName: casePackage }) => {
    expect(rewriteImport<false>(input, caseGlobals, casePackage)).toStrictEqual(output);
  });
});
