import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  passWithNoTests: true,
  verbose: false,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  modulePathIgnorePatterns: ['test/src/*', 'dist/*'],
  //setupFiles: ['../../packages/config/jest/test-config.ts']
};

export default config;
