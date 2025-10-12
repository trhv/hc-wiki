# HC Wiki CLI

A command-line tool for HC Wiki.

## Installation

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Link the command globally (for local testing):
```bash
npm link
```

Now you can use the command anywhere:
```bash
hc-wiki "some input"
```

### Global Installation (from npm)

If published to npm:
```bash
npm install -g hc-wiki
```

## Usage

```bash
hc-wiki "your input text here"
```

## Development

### Run in development mode (without building):
```bash
npm run dev "your input"
```

### Watch mode (auto-rebuild on changes):
```bash
npm run watch
```

### Build:
```bash
npm run build
```

## Uninstall

If you linked it locally:
```bash
npm unlink -g hc-wiki
```

## Project Structure

- `src/cli.ts` - CLI entry point
- `src/index.ts` - Main logic
- `dist/` - Compiled JavaScript output

