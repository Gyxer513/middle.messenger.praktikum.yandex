import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@core/(.*)$': '<rootDir>/src/@core/$1',
    },
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testMatch: ['**/tests/**/*.test.ts'],
};

export default config;
