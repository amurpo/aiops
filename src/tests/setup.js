// Setup global para Jest
process.env.NODE_ENV = 'test';
process.env.PORT = '0'; // Puerto random para tests

// Mock de console para tests más limpios
if (process.env.JEST_SILENT) {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  };
}

// Timeout más largo para tests que involucran APIs externas
jest.setTimeout(30000);