export default {
  preset: 'ts-jest',
  clearMocks: true,
  bail: true,
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};