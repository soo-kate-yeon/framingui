# Contributing to Tekton

## Development Setup

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build the project
npm run build
```

## TDD Workflow

This project follows strict TDD (Test-Driven Development):

1. **RED**: Write a failing test
2. **GREEN**: Write minimal code to pass the test
3. **REFACTOR**: Improve code quality while keeping tests green

## Code Quality Standards

- Test coverage: ≥85%
- WCAG AA compliance: 100%
- TypeScript strict mode
- All tests must pass

## Project Structure

```
tekton/
├── src/           # Source code
├── tests/         # Test files
├── dist/          # Build output
└── docs/          # Documentation
```

## Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```
