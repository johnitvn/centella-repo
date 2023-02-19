import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    transform: {
        "^.+\\.tsx?$": ["ts-jest", {
            tsconfig: 'tsconfig.test.json'
        }]
    },
    testMatch: [
        '**/?(*.)test.[jt]s?(x)',
    ],
    testPathIgnorePatterns: [
        'utils.test.tsx',
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testEnvironment: "jsdom"
};

export default config;